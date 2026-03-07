export const RATE_LIMITS = {
  API_GENERAL: { maxRequests: 100, windowMs: 60 * 1000, message: 'QuÃ¡ nhiá»u yÃªu cáº§u, vui lÃ²ng thá»­ láº¡i sau' },
  AUTH_LOGIN: { maxRequests: 5, windowMs: 15 * 60 * 1000, message: 'QuÃ¡ nhiá»u láº§n Ä‘Äƒng nháº­p tháº¥t báº¡i' },
  AUTH_REGISTER: { maxRequests: 3, windowMs: 60 * 60 * 1000, message: 'QuÃ¡ nhiá»u láº§n Ä‘Äƒng kÃ½' },
  FILE_UPLOAD: { maxRequests: 10, windowMs: 60 * 1000, message: 'QuÃ¡ nhiá»u file upload' },
  AI_CHAT: { maxRequests: 20, windowMs: 60 * 1000, message: 'Giá»›i háº¡n AI chat, vui lÃ²ng chá»' },
  EXPORT: { maxRequests: 5, windowMs: 5 * 60 * 1000, message: 'Giá»›i háº¡n export dá»¯ liá»‡u' },
  NOTIFICATION: { maxRequests: 50, windowMs: 60 * 1000, message: 'QuÃ¡ nhiá»u thÃ´ng bÃ¡o' },
} as const;
export type RateLimitKey = keyof typeof RATE_LIMITS;
