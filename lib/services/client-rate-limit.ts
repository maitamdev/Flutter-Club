// Rate limiting for client-side actions
const actionTimestamps = new Map<string, number[]>()

export function isRateLimited(actionKey: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const timestamps = actionTimestamps.get(actionKey) || []
  const recent = timestamps.filter(t => now - t < windowMs)
  actionTimestamps.set(actionKey, recent)
  if (recent.length >= maxAttempts) return true
  recent.push(now)
  actionTimestamps.set(actionKey, recent)
  return false
}
export function clearRateLimit(actionKey: string): void {
  actionTimestamps.delete(actionKey)
}
