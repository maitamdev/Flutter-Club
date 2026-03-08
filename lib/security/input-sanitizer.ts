// Input sanitization
export function sanitizeString(input: string): string { return input.trim().replace(/[<>]/g, ''); }
export function sanitizeEmail(email: string): string { return email.trim().toLowerCase().replace(/[^a-z0-9@._+-]/g, ''); }
export function sanitizeUrl(url: string): string { try { const parsed = new URL(url); if (!['http:', 'https:'].includes(parsed.protocol)) return ''; return parsed.toString(); } catch { return ''; } }
export function sanitizeFilename(name: string): string { return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 255); }
export function stripNullBytes(input: string): string { return input.replace(/\0/g, ''); }
