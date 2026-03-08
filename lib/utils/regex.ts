// Common regex patterns
export const PATTERNS = { email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, phone: /^(\+84|0)\d{9,10}$/, url: /^https?:\/\/[^\s/$.?#].[^\s]*$/, slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, ipv4: /^(\d{1,3}\.){3}\d{1,3}$/, uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i };
export function testPattern(pattern: keyof typeof PATTERNS, value: string): boolean { return PATTERNS[pattern].test(value); }
