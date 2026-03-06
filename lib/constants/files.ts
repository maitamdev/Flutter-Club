// File type constants
export const FILE_TYPES = {
  DOCUMENT: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
  SPREADSHEET: ['xls', 'xlsx', 'csv'],
  PRESENTATION: ['ppt', 'pptx'],
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  VIDEO: ['mp4', 'avi', 'mov', 'mkv'],
  ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz'],
}

export const FILE_ICONS: Record<string, string> = {
  pdf: 'ðŸ“„', doc: 'ðŸ“', docx: 'ðŸ“', txt: 'ðŸ“ƒ',
  xls: 'ðŸ“Š', xlsx: 'ðŸ“Š', csv: 'ðŸ“Š',
  ppt: 'ðŸ“Ž', pptx: 'ðŸ“Ž',
  jpg: 'ðŸ–¼ï¸', jpeg: 'ðŸ–¼ï¸', png: 'ðŸ–¼ï¸', gif: 'ðŸ–¼ï¸',
  mp4: 'ðŸŽ¬', avi: 'ðŸŽ¬', mov: 'ðŸŽ¬',
  zip: 'ðŸ“¦', rar: 'ðŸ“¦', '7z': 'ðŸ“¦',
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
