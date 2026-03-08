// CORS configuration
export const ALLOWED_ORIGINS = ['https://flutterclub.dev', 'https://www.flutterclub.dev', 'http://localhost:3000'];
export function isAllowedOrigin(origin: string): boolean { return ALLOWED_ORIGINS.includes(origin); }
export function getCorsHeaders(origin: string): Record<string, string> { const headers: Record<string, string> = { 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Max-Age': '86400' }; if (isAllowedOrigin(origin)) headers['Access-Control-Allow-Origin'] = origin; return headers; }
