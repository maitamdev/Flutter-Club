import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as XLSX from 'xlsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function getRelativeTime(date: Date): string {
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24))
  const diffHours = Math.ceil(diff / (1000 * 60 * 60))
  const diffMinutes = Math.ceil(diff / (1000 * 60))

  if (diffMinutes < 0) {
    const absDays = Math.abs(diffDays)
    if (absDays > 1) return `${absDays} ngày trước`
    const absHours = Math.abs(diffHours)
    if (absHours > 1) return `${absHours} giờ trước`
    return `${Math.abs(diffMinutes)} phút trước`
  }

  if (diffDays > 1) return `Còn ${diffDays} ngày`
  if (diffHours > 1) return `Còn ${diffHours} giờ`
  return `Còn ${diffMinutes} phút`
}

export function isOverdue(date: Date): boolean {
  return date.getTime() < Date.now()
}

export function generateCSV(
  data: Record<string, unknown>[],
  headers: { key: string; label: string }[]
): string {
  const headerRow = headers.map((h) => h.label).join(',')
  const rows = data.map((item) =>
    headers.map((h) => `"${item[h.key] || ''}"`).join(',')
  )
  return [headerRow, ...rows].join('\n')
}

export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

// Xuất file Excel với tiếng Việt đúng
export function downloadExcel(
  data: Record<string, unknown>[],
  headers: { key: string; label: string }[],
  filename: string,
  sheetName: string = 'Sheet1'
) {
  // Chuyển đổi data thành array với headers tiếng Việt
  const excelData = data.map((item) => {
    const row: Record<string, unknown> = {}
    headers.forEach((h) => {
      row[h.label] = item[h.key] || ''
    })
    return row
  })

  // Tạo workbook và worksheet
  const ws = XLSX.utils.json_to_sheet(excelData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName)

  // Tự động điều chỉnh độ rộng cột
  const colWidths = headers.map((h) => {
    const maxLen = Math.max(
      h.label.length,
      ...data.map((item) => String(item[h.key] || '').length)
    )
    return { wch: Math.min(maxLen + 2, 50) }
  })
  ws['!cols'] = colWidths

  // Xuất file
  XLSX.writeFile(wb, filename)
}
