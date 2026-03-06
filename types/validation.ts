// Validation result types
export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}
export interface ValidationError {
  field: string
  message: string
  code: string
}
export interface FieldValidation {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: unknown) => string | null
}
