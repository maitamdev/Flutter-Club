interface BackupEntry { id: string; collection: string; data: unknown; createdAt: Date; size: number; }
class BackupService {
  private backups: BackupEntry[] = [];
  async createBackup(collection: string, data: unknown): Promise<BackupEntry> {
    const entry: BackupEntry = { id: crypto.randomUUID(), collection, data, createdAt: new Date(), size: JSON.stringify(data).length };
    this.backups.push(entry); return entry;
  }
  getBackups(collection?: string): BackupEntry[] { return collection ? this.backups.filter(b => b.collection === collection) : this.backups; }
  async restore(backupId: string): Promise<unknown> { const backup = this.backups.find(b => b.id === backupId); if (!backup) throw new Error('Backup not found'); return backup.data; }
  deleteOldBackups(daysOld: number): number { const cutoff = Date.now() - daysOld * 86400000; const before = this.backups.length; this.backups = this.backups.filter(b => b.createdAt.getTime() > cutoff); return before - this.backups.length; }
}
export const backupService = new BackupService();
