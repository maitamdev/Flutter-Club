// QR code helpers
export function generateAttendanceUrl(sessionId: string, token: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  return `${baseUrl}/api/checkin?session=${sessionId}&token=${token}`
}
export function parseQRData(data: string): { sessionId: string; token: string } | null {
  try {
    const url = new URL(data)
    const sessionId = url.searchParams.get('session')
    const token = url.searchParams.get('token')
    if (sessionId && token) return { sessionId, token }
    return null
  } catch { return null }
}
