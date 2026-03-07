interface ActivityEntry { userId: string; action: string; metadata?: Record<string, unknown>; timestamp: Date; }
class UserActivityTracker {
  private activities: ActivityEntry[] = [];
  track(userId: string, action: string, metadata?: Record<string, unknown>): void { this.activities.push({ userId, action, metadata, timestamp: new Date() }); }
  getUserActivities(userId: string, limit = 20): ActivityEntry[] { return this.activities.filter(a => a.userId === userId).slice(-limit).reverse(); }
  getActiveUsers(sinceMinutes = 30): string[] {
    const since = Date.now() - sinceMinutes * 60000;
    return [...new Set(this.activities.filter(a => a.timestamp.getTime() > since).map(a => a.userId))];
  }
  getPopularActions(limit = 10): { action: string; count: number }[] {
    const counts: Record<string, number> = {}; this.activities.forEach(a => counts[a.action] = (counts[a.action] || 0) + 1);
    return Object.entries(counts).map(([action, count]) => ({ action, count })).sort((a, b) => b.count - a.count).slice(0, limit);
  }
}
export const userActivity = new UserActivityTracker();
