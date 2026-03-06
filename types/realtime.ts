// Realtime subscription types
export type UnsubscribeFn = () => void

export interface RealtimeConfig {
  collection: string
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
  limitTo?: number
  where?: { field: string; op: string; value: unknown }[]
}
