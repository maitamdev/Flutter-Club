// Security audit logging
export type AuditAction = 'login' | 'logout' | 'password_change' | 'role_change' | 'data_export' | 'data_delete' | 'settings_change';
export interface AuditEntry { action: AuditAction; userId: string; timestamp: number; ip?: string; details?: Record<string, unknown>; success: boolean; }
export function createAuditEntry(action: AuditAction, userId: string, success: boolean, details?: Record<string, unknown>): AuditEntry { return { action, userId, timestamp: Date.now(), success, details }; }
export function formatAuditLog(entry: AuditEntry): string { return '[' + new Date(entry.timestamp).toISOString() + '] ' + entry.action + ' by ' + entry.userId + ' - ' + (entry.success ? 'SUCCESS' : 'FAILURE'); }
