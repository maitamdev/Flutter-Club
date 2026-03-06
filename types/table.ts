// Table column types
export interface TableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  width?: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
}
export interface TableAction<T> {
  label: string
  icon?: React.ReactNode
  onClick: (row: T) => void
  variant?: 'default' | 'destructive'
  show?: (row: T) => boolean
}
