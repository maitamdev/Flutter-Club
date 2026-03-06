// Sorting and comparison helpers
export function compareByDate(a: Date, b: Date, direction: 'asc' | 'desc' = 'desc'): number {
  return direction === 'asc' ? a.getTime() - b.getTime() : b.getTime() - a.getTime()
}
export function compareByString(a: string, b: string, direction: 'asc' | 'desc' = 'asc'): number {
  const result = a.localeCompare(b, 'vi')
  return direction === 'asc' ? result : -result
}
export function compareByNumber(a: number, b: number, direction: 'asc' | 'desc' = 'desc'): number {
  return direction === 'asc' ? a - b : b - a
}
