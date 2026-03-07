export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('84')) return `+84 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  if (cleaned.startsWith('0')) return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  return phone;
}
export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('84')) return '0' + cleaned.slice(2);
  return cleaned;
}
export function isVietnamesePhone(phone: string): boolean { return /^(0|\+84)(3|5|7|8|9)\d{8}$/.test(phone.replace(/\s/g, '')); }
