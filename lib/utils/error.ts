// Error handling utilities
export class AppError extends Error {
  code: string
  constructor(message: string, code: string = 'UNKNOWN') {
    super(message)
    this.name = 'AppError'
    this.code = code
  }
}
export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Co loi xay ra. Vui long thu lai.'
}
export function isFirebaseError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && typeof (error as any).code === 'string' && (error as any).code.startsWith('auth/')
}
export function getFirebaseErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    'auth/user-not-found': 'Khong tim thay tai khoan voi email nay',
    'auth/wrong-password': 'Mat khau khong chinh xac',
    'auth/email-already-in-use': 'Email da duoc su dung',
    'auth/weak-password': 'Mat khau qua yeu',
    'auth/invalid-email': 'Email khong hop le',
    'auth/too-many-requests': 'Qua nhieu yeu cau. Vui long thu lai sau',
    'auth/network-request-failed': 'Loi ket noi mang',
    'auth/popup-closed-by-user': 'Cua so dang nhap da bi dong',
  }
  return messages[code] || 'Co loi xay ra. Vui long thu lai.'
}
