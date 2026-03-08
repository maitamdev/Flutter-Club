// XSS prevention utilities
const DANGEROUS_TAGS = /<script[^>]*>[\s\S]*?<\/script>/gi;
const EVENT_HANDLERS = /\son\w+\s*=/gi;
const DATA_URLS = /data:\s*text\/html/gi;
export function sanitizeHtml(input: string): string { return input.replace(DANGEROUS_TAGS, '').replace(EVENT_HANDLERS, '').replace(DATA_URLS, ''); }
export function escapeHtml(str: string): string { const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }; return str.replace(/[&<>"']/g, c => map[c] || c); }
export function isXSSAttempt(input: string): boolean { return DANGEROUS_TAGS.test(input) || EVENT_HANDLERS.test(input); }
