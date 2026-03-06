// Validation utility functions
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
export function isValidPhone(phone: string): boolean {
  return /^(0|\+84)\d{9,10}$/.test(phone.replace(/\s/g, ''))
}
export function isValidUrl(url: string): boolean {
  try { new URL(url); return true } catch { return false }
}
export function isValidStudentId(id: string): boolean {
  return /^\d{5,15}$/.test(id)
}
export function isStrongPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (password.length < 6) errors.push('Mat khau phai co it nhat 6 ky tu')
  if (!/[A-Z]/.test(password)) errors.push('Phai co it nhat 1 chu hoa')
  if (!/[a-z]/.test(password)) errors.push('Phai co it nhat 1 chu thuong')
  if (!/[0-9]/.test(password)) errors.push('Phai co it nhat 1 so')
  return { valid: errors.length === 0, errors }
}
