// Event and calendar types
export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: 'session' | 'assignment' | 'quiz' | 'announcement'
  color?: string
  description?: string
}
export interface CalendarDay {
  date: Date
  events: CalendarEvent[]
  isToday: boolean
  isCurrentMonth: boolean
}
