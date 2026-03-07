interface MigrationStep { version: string; description: string; up: () => Promise<void>; down: () => Promise<void>; }
class DataMigrationService {
  private migrations: MigrationStep[] = []; private appliedVersions = new Set<string>();
  register(migration: MigrationStep): void { this.migrations.push(migration); this.migrations.sort((a, b) => a.version.localeCompare(b.version)); }
  async migrateUp(targetVersion?: string): Promise<string[]> {
    const applied: string[] = [];
    for (const m of this.migrations) {
      if (this.appliedVersions.has(m.version)) continue;
      if (targetVersion && m.version > targetVersion) break;
      await m.up(); this.appliedVersions.add(m.version); applied.push(m.version);
    }
    return applied;
  }
  async migrateDown(targetVersion: string): Promise<string[]> {
    const rolled: string[] = [];
    for (const m of [...this.migrations].reverse()) { if (m.version <= targetVersion) break; if (this.appliedVersions.has(m.version)) { await m.down(); this.appliedVersions.delete(m.version); rolled.push(m.version); } }
    return rolled;
  }
  getCurrentVersion(): string { return [...this.appliedVersions].sort().pop() || '0.0.0'; }
}
export const dataMigration = new DataMigrationService();
