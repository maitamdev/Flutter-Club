// Encryption utilities
export function base64Encode(str: string): string { if (typeof window !== 'undefined') return btoa(str); return Buffer.from(str).toString('base64'); }
export function base64Decode(encoded: string): string { if (typeof window !== 'undefined') return atob(encoded); return Buffer.from(encoded, 'base64').toString('utf-8'); }
export function obfuscateEmail(email: string): string { const [user, domain] = email.split('@'); if (!user || !domain) return email; const visible = user.slice(0, 2); return visible + '***@' + domain; }
export function maskPhoneNumber(phone: string): string { if (phone.length < 4) return '****'; return '****' + phone.slice(-4); }
