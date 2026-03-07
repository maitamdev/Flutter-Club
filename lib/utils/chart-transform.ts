export interface ChartDataPoint { label: string; value: number; color?: string; }
export function toChartData<T>(items: T[], labelKey: keyof T, valueKey: keyof T): ChartDataPoint[] {
  return items.map(item => ({ label: String(item[labelKey]), value: Number(item[valueKey]) }));
}
export function aggregateByField<T>(items: T[], field: keyof T): Record<string, number> {
  return items.reduce((acc, item) => { const key = String(item[field]); acc[key] = (acc[key] || 0) + 1; return acc; }, {} as Record<string, number>);
}
export function calculatePercentages(data: ChartDataPoint[]): (ChartDataPoint & { percentage: number })[] {
  const total = data.reduce((s, d) => s + d.value, 0);
  return data.map(d => ({ ...d, percentage: total ? Math.round((d.value / total) * 100) : 0 }));
}
