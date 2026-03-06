// Storage utility functions
export function safeGetItem<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch { return fallback }
}
export function safeSetItem(key: string, value: unknown): void {
  try { if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value)) } catch {}
}
export function safeRemoveItem(key: string): void {
  try { if (typeof window !== 'undefined') localStorage.removeItem(key) } catch {}
}
export function clearStorage(): void {
  try { if (typeof window !== 'undefined') localStorage.clear() } catch {}
}
export const STORAGE_KEYS = {
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar-collapsed',
  TABLE_PAGE_SIZE: 'table-page-size',
  LAST_VISITED_PAGE: 'last-visited-page',
} as const
