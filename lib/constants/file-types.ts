export const FILE_TYPES = {
  IMAGE: { extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'], mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'], maxSize: 5 * 1024 * 1024, icon: 'Image' },
  DOCUMENT: { extensions: ['.pdf', '.doc', '.docx', '.txt', '.rtf'], mimeTypes: ['application/pdf', 'application/msword', 'text/plain'], maxSize: 10 * 1024 * 1024, icon: 'FileText' },
  SPREADSHEET: { extensions: ['.xlsx', '.xls', '.csv'], mimeTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'], maxSize: 10 * 1024 * 1024, icon: 'Table' },
  PRESENTATION: { extensions: ['.pptx', '.ppt'], mimeTypes: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'], maxSize: 20 * 1024 * 1024, icon: 'Presentation' },
  CODE: { extensions: ['.dart', '.js', '.ts', '.py', '.java'], mimeTypes: ['text/plain'], maxSize: 2 * 1024 * 1024, icon: 'Code' },
} as const;
export function getFileCategory(filename: string): keyof typeof FILE_TYPES | 'UNKNOWN' {
  const ext = '.' + filename.split('.').pop()?.toLowerCase();
  for (const [cat, conf] of Object.entries(FILE_TYPES)) { if (conf.extensions.includes(ext)) return cat as keyof typeof FILE_TYPES; }
  return 'UNKNOWN';
}
