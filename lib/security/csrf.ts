// CSRF token management
import { randomBytes } from 'crypto';
export function generateCSRFToken(): string { return randomBytes(32).toString('hex'); }
export function validateCSRFToken(token: string, storedToken: string): boolean { if (!token || !storedToken) return false; return token === storedToken; }
export function getCSRFFromCookie(): string | null { if (typeof document === 'undefined') return null; const match = document.cookie.match(/csrf-token=([^;]+)/); return match ? match[1] : null; }
