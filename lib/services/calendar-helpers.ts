// Calendar event helpers
import { CalendarEvent } from '@/types/calendar'

export function getEventsForDate(events: CalendarEvent[], date: Date): CalendarEvent[] {
  return events.filter(event => {
    const eventDate = new Date(event.start)
    return eventDate.getFullYear() === date.getFullYear() && eventDate.getMonth() === date.getMonth() && eventDate.getDate() === date.getDate()
  })
}
export function getEventsForMonth(events: CalendarEvent[], year: number, month: number): CalendarEvent[] {
  return events.filter(event => {
    const d = new Date(event.start)
    return d.getFullYear() === year && d.getMonth() === month
  })
}
export function eventTypeColors(type: string): string {
  const colors: Record<string, string> = {
    session: 'bg-blue-500', assignment: 'bg-amber-500', quiz: 'bg-purple-500', announcement: 'bg-emerald-500',
  }
  return colors[type] || 'bg-gray-500'
}
