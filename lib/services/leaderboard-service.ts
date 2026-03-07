interface LeaderEntry { userId: string; score: number; achievements: number; streak: number; }
class LeaderboardService {
  private entries = new Map<string, LeaderEntry>();
  updateScore(userId: string, points: number): void { const e = this.entries.get(userId) || { userId, score: 0, achievements: 0, streak: 0 }; e.score += points; this.entries.set(userId, e); }
  addAchievement(userId: string): void { const e = this.entries.get(userId); if (e) e.achievements++; }
  getRankings(limit = 10): (LeaderEntry & { rank: number })[] {
    return [...this.entries.values()].sort((a, b) => b.score - a.score).slice(0, limit).map((e, i) => ({ ...e, rank: i + 1 }));
  }
  getUserRank(userId: string): number { const sorted = [...this.entries.values()].sort((a, b) => b.score - a.score); return sorted.findIndex(e => e.userId === userId) + 1; }
}
export const leaderboardService = new LeaderboardService();
