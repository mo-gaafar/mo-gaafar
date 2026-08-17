/**
 * Minimal Markdown -> Lexical editor-state converter for migration.
 * Handles headings, unordered lists, paragraphs, inline links, and strips
 * bold/italic markers. Good enough to preserve text; polish in the CMS.
 */

type Node = Record<string, unknown>

const textNode = (text: string): Node => ({
  type: 'text',
  text,
  format: 0,
  style: '',
  mode: 'normal',
  detail: 0,
  version: 1,
})

const linkNode = (text: string, url: string): Node => ({
  type: 'link',
  version: 3,
  direction: 'ltr',
  format: '',
  indent: 0,
  fields: { linkType: 'custom', newTab: true, url },
  children: [textNode(text)],
})

const stripInline = (s: string): string =>
  s
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/(^|[^*])\*(?!\*)(.+?)\*/g, '$1$2')
    .replace(/`(.+?)`/g, '$1')

/** Parse a line into inline children (text + link nodes). */
const inlineChildren = (line: string): Node[] => {
  const out: Node[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) out.push(textNode(stripInline(line.slice(last, m.index))))
    out.push(linkNode(stripInline(m[1]), m[2]))
    last = m.index + m[0].length
  }
  if (last < line.length) out.push(textNode(stripInline(line.slice(last))))
  return out.length ? out : [textNode('')]
}

const paragraph = (line: string): Node => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  children: inlineChildren(line),
})

const heading = (line: string, tag: string): Node => ({
  type: 'heading',
  tag,
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: inlineChildren(line),
})

const listItem = (line: string): Node => ({
  type: 'listitem',
  value: 1,
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: inlineChildren(line),
})

const list = (items: string[]): Node => ({
  type: 'list',
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: items.map(listItem),
})

export const markdownToLexical = (md: string) => {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const children: Node[] = []
  let para: string[] = []
  let bullets: string[] = []

  const flushPara = () => {
    if (para.length) {
      children.push(paragraph(para.join(' ')))
      para = []
    }
  }
  const flushList = () => {
    if (bullets.length) {
      children.push(list(bullets))
      bullets = []
    }
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      flushPara()
      flushList()
      continue
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/)
    const b = line.match(/^[-*]\s+(.*)$/)
    if (h) {
      flushPara()
      flushList()
      const level = Math.min(h[1].length + 1, 4) // # -> h2
      children.push(heading(h[2], `h${level}`))
    } else if (b) {
      flushPara()
      bullets.push(b[1])
    } else {
      flushList()
      para.push(line)
    }
  }
  flushPara()
  flushList()

  if (!children.length) children.push(paragraph(''))

  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children,
    },
  }
}

/** Split Hugo front matter from body; returns the markdown body only. */
export const stripFrontMatter = (raw: string): string => {
  const s = raw.replace(/\r\n/g, '\n')
  if (s.startsWith('---')) {
    const end = s.indexOf('\n---', 3)
    if (end !== -1) {
      const after = s.indexOf('\n', end + 1)
      return s.slice(after + 1).trim()
    }
  }
  return s.trim()
}
