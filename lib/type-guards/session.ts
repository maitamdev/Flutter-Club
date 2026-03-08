// Session type guards
export interface Session { id: string; topic: string; date: Date; duration: number; status: string; }
export function isSession(obj: unknown): obj is Session { return typeof obj === 'object' && obj !== null && 'id' in obj && 'topic' in obj; }
export function isActiveSession(session: Session): boolean { return session.status === 'active'; }
