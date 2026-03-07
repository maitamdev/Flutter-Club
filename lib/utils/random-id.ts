export function randomId(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
export function nanoid(size = 21): string { return crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => id + (byte & 63).toString(36), ''); }
export function prefixedId(prefix: string): string { return `${prefix}_${randomId(8)}_${Date.now().toString(36)}`; }
