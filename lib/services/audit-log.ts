interface AuditEntry { action: string; userId: string; targetType: string; targetId: string; changes?: Record<string, unknown>; timestamp: Date; }
class AuditLogService {
  private logs: AuditEntry[] = [];
  log(entry: Omit<AuditEntry, 'timestamp'>): void { this.logs.push({ ...entry, timestamp: new Date() }); console.log(`[AUDIT] ${entry.action} by ${entry.userId} on ${entry.targetType}/${entry.targetId}`); }
  getByUser(userId: string): AuditEntry[] { return this.logs.filter(l => l.userId === userId); }
  getByTarget(targetType: string, targetId: string): AuditEntry[] { return this.logs.filter(l => l.targetType === targetType && l.targetId === targetId); }
  getRecent(limit = 50): AuditEntry[] { return this.logs.slice(-limit).reverse(); }
}
export const auditLog = new AuditLogService();
