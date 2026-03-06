// URL and query utility functions
export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const entries = Object.entries(params).filter(([_, v]) => v !== undefined && v !== '')
  if (entries.length === 0) return ''
  return '?' + entries.map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(String(v))).join('&')
}
export function parseQueryString(qs: string): Record<string, string> {
  const result: Record<string, string> = {}
  const search = qs.startsWith('?') ? qs.slice(1) : qs
  search.split('&').forEach(pair => {
    const [key, value] = pair.split('=')
    if (key) result[decodeURIComponent(key)] = decodeURIComponent(value || '')
  })
  return result
}
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return window.location.origin
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}
