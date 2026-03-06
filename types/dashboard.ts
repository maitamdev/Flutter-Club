// Dashboard widget types
export interface DashboardWidget {
  id: string
  title: string
  type: 'stats' | 'chart' | 'list' | 'calendar'
  size: 'small' | 'medium' | 'large'
  position: number
}
export interface WidgetData {
  widgetId: string
  data: unknown
  lastUpdated: Date
}
