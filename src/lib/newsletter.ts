export const validButtondownUsername = (value: unknown): value is string =>
  typeof value === 'string' && /^[a-zA-Z0-9_-]{1,64}$/.test(value)
