// MIME type constants
export const MIME_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENT: ['application/pdf', 'application/msword'],
  SPREADSHEET: ['application/vnd.ms-excel'],
  VIDEO: ['video/mp4', 'video/webm'],
  AUDIO: ['audio/mpeg', 'audio/wav'],
} as const;
export function isImage(mime: string): boolean { return (MIME_TYPES.IMAGE as readonly string[]).includes(mime); }
