// Export and import types
export interface ExportConfig {
  format: 'csv' | 'xlsx' | 'pdf'
  fields: string[]
  filename: string
  sheetName?: string
}
export interface ImportResult {
  success: number
  failed: number
  errors: { row: number; message: string }[]
}
