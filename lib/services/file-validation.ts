// Validation service for file uploads
import { MAX_FILE_SIZE, FILE_TYPES } from '@/lib/constants/files'

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File qua lon. Kich thuoc toi da la ${MAX_FILE_SIZE / 1024 / 1024}MB` }
  }
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (!ext) return { valid: false, error: 'Khong the xac dinh loai file' }
  const allTypes = [...FILE_TYPES.DOCUMENT, ...FILE_TYPES.SPREADSHEET, ...FILE_TYPES.PRESENTATION, ...FILE_TYPES.IMAGE, ...FILE_TYPES.ARCHIVE]
  if (!allTypes.includes(ext)) {
    return { valid: false, error: `Loai file .${ext} khong duoc ho tro` }
  }
  return { valid: true }
}

export function validateImage(file: File, maxSizeMB: number = 5): { valid: boolean; error?: string } {
  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, error: `Anh qua lon. Kich thuoc toi da la ${maxSizeMB}MB` }
  }
  if (!FILE_TYPES.IMAGE.some(ext => file.name.toLowerCase().endsWith('.' + ext))) {
    return { valid: false, error: 'Chi ho tro file anh (jpg, png, gif, webp)' }
  }
  return { valid: true }
}
