// Session management
export interface SessionInfo { userId: string; createdAt: number; expiresAt: number; ip?: string; userAgent?: string; }
export function isSessionExpired(session: SessionInfo): boolean { return Date.now() > session.expiresAt; }
export function getSessionDuration(session: SessionInfo): number { return session.expiresAt - session.createdAt; }
export function createSession(userId: string, durationMs: number = 24 * 60 * 60 * 1000): SessionInfo { const now = Date.now(); return { userId, createdAt: now, expiresAt: now + durationMs }; }
