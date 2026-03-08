// Content Security Policy configuration
export const CSP_DIRECTIVES = { 'default-src': ["'self'"], 'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'"], 'style-src': ["'self'", "'unsafe-inline'"], 'img-src': ["'self'", 'data:', 'https://*.cloudinary.com'], 'font-src': ["'self'", 'https://fonts.gstatic.com'], 'connect-src': ["'self'", 'https://*.firebaseio.com', 'https://*.googleapis.com'], 'frame-src': ["'none'"] };
export function buildCSPHeader(): string { return Object.entries(CSP_DIRECTIVES).map(([key, values]) => key + ' ' + values.join(' ')).join('; '); }
