// Date utility functions
export function isToday(date: Date): boolean {
  const today = new Date()
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}
export function isFuture(date: Date): boolean { return date.getTime() > Date.now() }
export function isPast(date: Date): boolean { return date.getTime() < Date.now() }
export function getDaysDiff(date1: Date, date2: Date): number {
  return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24))
}
export function getHoursDiff(date1: Date, date2: Date): number {
  return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60))
}
export function getMinutesDiff(date1: Date, date2: Date): number {
  return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60))
}
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
export function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000)
}
export function startOfDay(date: Date): Date {
  const d = new Date(date); d.setHours(0, 0, 0, 0); return d
}
export function endOfDay(date: Date): Date {
  const d = new Date(date); d.setHours(23, 59, 59, 999); return d
}
export function formatDuration(minutes: number): string {
  if (minutes < 60) return minutes + ' phut'
  const h = Math.floor(minutes / 60); const m = minutes % 60
  return m > 0 ? h + ' gio ' + m + ' phut' : h + ' gio'
}
