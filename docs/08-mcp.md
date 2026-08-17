# 08 · MCP Support

The site's CMS is exposed over the **Model Context Protocol** so AI clients can
read and edit portfolio content as tools. Implemented with the official
`@payloadcms/plugin-mcp` (pinned to `3.88.0`, matching Payload exactly).

## Endpoint & auth

- **URL:** `POST`/`GET` `{NEXT_PUBLIC_SERVER_URL}/api/mcp` — Streamable HTTP
  (SSE disabled, so no Redis needed).
- **Auth:** `Authorization: Bearer <api-key>`. Unauthenticated requests get `401`.
- **Kill switch:** `DISABLE_MCP=true`.
- Served through Payload's existing custom-endpoint route
  (`src/app/(payload)/api/[...slug]/route.ts`) — no extra route file.

## Configuration

In `src/payload.config.ts`, `mcpPlugin({...})` declares which
collections/globals are reachable and their default capabilities:

- **Collections (find/create/update, delete off):** projects, case-studies,
  publications, posts, services, testimonials, experience, skill-groups,
  education, certifications. **media:** find only.
- **Globals (find/update):** site-settings, home.
- `serverInfo` = `mngaafar-portfolio` with usage instructions.

The plugin also registers a `payload-mcp-api-keys` collection (admin group
**MCP**) for issuing keys.

## API keys (per-key scoping)

Create keys in `/admin` → **MCP → API Keys**:

- Tick **Enable API Key** — the key is generated and shown once.
- Each key is bound to its creating user and can only manage its **own** keys;
  a key acts as that user for access control.
- Per key, toggle find/create/update for each collection/global. A client only
  sees tools for the capabilities its key grants (verified: a key granted a
  subset exposes only those `find*`/`create*`/`update*` tools).

## Tools

Tool names are camelCase per enabled entity: `findProjects`, `createPosts`,
`updateExperience`, `findSiteSettings`, `updateHome`, etc.

## Verification (done)

Against a running instance with a scoped key:

- `initialize` → returns our `serverInfo` + instructions.
- `tools/list` → returns only the granted `find*`/`create*`/`update*` tools.
- `tools/call findHome` → returns live home content (headline, services heading).
- Unauthenticated request → `401`.

## Client config example

```jsonc
{
  "mcpServers": {
    "mngaafar-portfolio": {
      "type": "http",
      "url": "https://www.mngaafar.com/api/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}
```

## Notes

- Programmatic key creation via the local API does not auto-generate the key
  string; use the admin UI (which generates and displays it). This does not
  affect using the keys.
- `mcp-handler` declares a soft peer on `@modelcontextprotocol/sdk@1.26.0` while
  the tree resolves `1.30.0`; verified working — the warning is harmless.
- Experimental plugin tools (auth/collection/config/jobs modification) are left
  **off**; only content find/create/update is enabled.
