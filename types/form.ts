// Form state types
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface FormState<T> {
  data: T
  status: FormStatus
  errors: Partial<Record<keyof T, string>>
  message?: string
}
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}
export interface DateRange {
  from: Date
  to: Date
}
