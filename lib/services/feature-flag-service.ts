interface FlagConfig { enabled: boolean; rollout?: number; roles?: string[]; }
class FeatureFlagService {
  private flags = new Map<string, FlagConfig>();
  register(name: string, config: FlagConfig): void { this.flags.set(name, config); }
  isEnabled(name: string, userRole?: string): boolean {
    const flag = this.flags.get(name); if (!flag || !flag.enabled) return false;
    if (flag.roles && userRole && !flag.roles.includes(userRole)) return false;
    if (flag.rollout !== undefined) return Math.random() * 100 < flag.rollout;
    return true;
  }
  getAllFlags(): Map<string, FlagConfig> { return new Map(this.flags); }
  toggle(name: string): void { const f = this.flags.get(name); if (f) f.enabled = !f.enabled; }
}
export const featureFlagService = new FeatureFlagService();
