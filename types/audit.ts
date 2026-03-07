export interface AuditLog { id: string; action: AuditAction; userId: string; targetType: string; targetId: string; changes?: Record<string, { before: unknown; after: unknown }>; ipAddress?: string; userAgent?: string; timestamp: Date; }
export type AuditAction = 'create' | 'update' | 'delete' | 'login' | 'logout' | 'export' | 'import';
