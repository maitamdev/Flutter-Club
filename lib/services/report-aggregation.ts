interface ReportData { metric: string; value: number; date: Date; category?: string; }
class ReportAggregationService {
  aggregate(data: ReportData[], groupBy: 'day' | 'week' | 'month'): Record<string, number> {
    const result: Record<string, number> = {};
    data.forEach(d => {
      let key: string;
      if (groupBy === 'day') key = d.date.toISOString().split('T')[0];
      else if (groupBy === 'week') { const w = Math.ceil(d.date.getDate() / 7); key = `${d.date.getFullYear()}-W${w}`; }
      else key = `${d.date.getFullYear()}-${String(d.date.getMonth() + 1).padStart(2, '0')}`;
      result[key] = (result[key] || 0) + d.value;
    });
    return result;
  }
  calculateTrend(current: number, previous: number): { change: number; direction: 'up' | 'down' | 'stable' } {
    if (previous === 0) return { change: 0, direction: 'stable' };
    const change = Math.round(((current - previous) / previous) * 100);
    return { change: Math.abs(change), direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable' };
  }
}
export const reportAggregation = new ReportAggregationService();
