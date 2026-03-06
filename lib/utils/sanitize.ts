// Input sanitization
export function sanitizeInput(input: string): string {
  return input.replace(/[<>&"']/g, char => {
    const map: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }
    return map[char] || char
  })
}
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}
export function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim()
}
