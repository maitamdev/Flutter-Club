// IP whitelist management
export const WHITELISTED_IPS: string[] = ['127.0.0.1', '::1'];
export function isWhitelisted(ip: string): boolean { return WHITELISTED_IPS.includes(ip); }
export function addToWhitelist(ip: string): void { if (!WHITELISTED_IPS.includes(ip)) WHITELISTED_IPS.push(ip); }
export function isValidIP(ip: string): boolean { const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/; const ipv6 = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/; return ipv4.test(ip) || ipv6.test(ip); }
