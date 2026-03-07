interface Experiment { id: string; name: string; variants: string[]; weights: number[]; }
class ABTestingService {
  private experiments = new Map<string, Experiment>();
  private assignments = new Map<string, string>();
  register(exp: Experiment): void { this.experiments.set(exp.id, exp); }
  getVariant(expId: string, userId: string): string {
    const key = `${expId}:${userId}`; if (this.assignments.has(key)) return this.assignments.get(key)!;
    const exp = this.experiments.get(expId); if (!exp) return 'control';
    const hash = userId.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 100;
    let cumulative = 0; for (let i = 0; i < exp.variants.length; i++) { cumulative += exp.weights[i]; if (hash < cumulative) { this.assignments.set(key, exp.variants[i]); return exp.variants[i]; } }
    return exp.variants[0];
  }
  trackConversion(expId: string, userId: string): void { console.log(`[AB] Conversion: ${expId} user:${userId} variant:${this.getVariant(expId, userId)}`); }
}
export const abTesting = new ABTestingService();
