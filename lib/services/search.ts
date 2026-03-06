// Search and filter service
import { removeVietnameseTones } from '@/lib/utils/string'

export function searchItems<T>(items: T[], query: string, fields: (keyof T)[]): T[] {
  if (!query.trim()) return items
  const normalizedQuery = removeVietnameseTones(query.toLowerCase())
  return items.filter(item => fields.some(field => {
    const value = String(item[field] || '')
    return removeVietnameseTones(value.toLowerCase()).includes(normalizedQuery)
  }))
}
export function filterByDateRange<T>(items: T[], dateField: keyof T, from?: Date, to?: Date): T[] {
  return items.filter(item => {
    const date = item[dateField] as unknown as Date
    if (!date) return false
    if (from && date < from) return false
    if (to && date > to) return false
    return true
  })
}
export function filterByField<T>(items: T[], field: keyof T, value: string): T[] {
  if (!value || value === 'all') return items
  return items.filter(item => String(item[field]) === value)
}
