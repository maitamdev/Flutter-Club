// Filter types
export interface FilterConfig {
  key: string
  label: string
  type: 'select' | 'date' | 'search' | 'checkbox'
  options?: { value: string; label: string }[]
}
export interface ActiveFilter {
  key: string
  value: string | boolean | Date
  label: string
}
export interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}
