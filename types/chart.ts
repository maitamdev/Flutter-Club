// Chart data types
export interface ChartDataPoint {
  label: string
  value: number
  color?: string
}
export interface TimeSeriesPoint {
  date: string
  value: number
}
export interface PieChartData {
  name: string
  value: number
  color: string
}
export interface BarChartData {
  category: string
  values: Record<string, number>
}
