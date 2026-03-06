// Navigation types
export interface MenuItem {
  id: string
  label: string
  href: string
  icon?: string
  badge?: number
  children?: MenuItem[]
}
export interface BreadcrumbItem {
  label: string
  href?: string
}
export type ThemeMode = 'light' | 'dark' | 'system'
