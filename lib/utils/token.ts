// QR Token generation and validation
// Uses a simple HMAC-like approach for rotating tokens

const TOKEN_SECRET = process.env.NEXT_PUBLIC_TOKEN_SECRET || 'default-secret'

// Simple hash function for client-side token generation
async function simpleHash(message: string): Promise<string> {
  // Check if crypto.subtle is available (requires HTTPS or localhost)
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(message)
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    } catch (e) {
      console.warn('crypto.subtle failed, using fallback hash')
    }
  }
  
  // Fallback: simple hash for environments without crypto.subtle
  let hash = 0
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  // Convert to hex and pad to ensure consistent length
  const hexHash = Math.abs(hash).toString(16).padStart(16, '0')
  return hexHash + hexHash + hexHash + hexHash // Make it 64 chars like SHA-256
}

export async function generateToken(
  tokenSeed: string,
  rotationSeconds: number = 10
): Promise<string> {
  const timeSlot = Math.floor(Date.now() / (rotationSeconds * 1000))
  const message = `${TOKEN_SECRET}:${tokenSeed}:${timeSlot}`
  const hash = await simpleHash(message)
  return hash.substring(0, 16) // Return first 16 chars for shorter token
}

// Tạo mã dự phòng động (thay đổi theo thời gian)
export async function generateFallbackCode(
  tokenSeed: string,
  rotationSeconds: number = 10
): Promise<string> {
  const timeSlot = Math.floor(Date.now() / (rotationSeconds * 1000))
  const message = `FALLBACK:${tokenSeed}:${timeSlot}`
  const hash = await simpleHash(message)
  // Lấy 6 ký tự và chuyển thành chữ + số
  return hash.substring(0, 6).toUpperCase()
}

export async function validateToken(
  token: string,
  tokenSeed: string,
  rotationSeconds: number = 10
): Promise<boolean> {
  // Check current time slot
  const currentToken = await generateToken(tokenSeed, rotationSeconds)
  if (token === currentToken) return true

  // Check previous time slot (grace period)
  const prevTimeSlot = Math.floor(Date.now() / (rotationSeconds * 1000)) - 1
  const prevMessage = `${TOKEN_SECRET}:${tokenSeed}:${prevTimeSlot}`
  const prevHash = await simpleHash(prevMessage)
  const prevToken = prevHash.substring(0, 16)

  return token === prevToken
}

// Validate mã dự phòng động
export async function validateFallbackCode(
  code: string,
  tokenSeed: string,
  rotationSeconds: number = 10
): Promise<boolean> {
  // Check current time slot
  const currentCode = await generateFallbackCode(tokenSeed, rotationSeconds)
  if (code.toUpperCase() === currentCode) return true

  // Check previous time slot (grace period)
  const prevTimeSlot = Math.floor(Date.now() / (rotationSeconds * 1000)) - 1
  const prevMessage = `FALLBACK:${tokenSeed}:${prevTimeSlot}`
  const prevHash = await simpleHash(prevMessage)
  const prevCode = prevHash.substring(0, 6).toUpperCase()

  return code.toUpperCase() === prevCode
}

export function generateQRData(
  sessionId: string,
  token: string,
  fallbackCode: string
): string {
  return JSON.stringify({
    sessionId,
    token,
    fallbackCode,
    timestamp: Date.now(),
  })
}

export function parseQRData(
  data: string
): { sessionId: string; token: string; fallbackCode: string; timestamp: number } | null {
  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}
