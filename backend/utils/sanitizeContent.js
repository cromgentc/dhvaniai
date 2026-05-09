const blockedTags = /<\/?(script|iframe|object|embed|link|meta|style)[^>]*>/gi
const eventHandlers = /\s+on[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi
const unsafeProtocols = /(href|src)\s*=\s*("|')\s*javascript:[\s\S]*?\2/gi

export function sanitizeContent(content = '') {
  return String(content)
    .replace(blockedTags, '')
    .replace(eventHandlers, '')
    .replace(unsafeProtocols, '$1="#"')
    .trim()
}

export function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
