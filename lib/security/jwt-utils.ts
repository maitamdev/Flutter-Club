// JWT utility functions (client-side)
export interface JWTPayload { sub: string; exp: number; iat: number; role?: string; [key: string]: unknown; }
export function decodeJWT(token: string): JWTPayload | null { try { const parts = token.split('.'); if (parts.length !== 3) return null; const payload = JSON.parse(atob(parts[1])); return payload; } catch { return null; } }
export function isTokenExpired(token: string): boolean { const payload = decodeJWT(token); if (!payload || !payload.exp) return true; return Date.now() >= payload.exp * 1000; }
export function getTokenRole(token: string): string | null { const payload = decodeJWT(token); return payload?.role || null; }
