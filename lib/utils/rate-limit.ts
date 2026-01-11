import { db } from '@/lib/firebase/config'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'

interface RateLimitConfig {
  maxRequests: number
  windowSeconds: number
}

// Rate limit configs per role
const RATE_LIMITS: Record<string, RateLimitConfig> = {
  student: { maxRequests: 10, windowSeconds: 3600 }, // 10 requests per hour
  trainer: { maxRequests: 50, windowSeconds: 3600 },
  admin: { maxRequests: 1000, windowSeconds: 3600 },
}

interface RateLimitEntry {
  userId: string
  count: number
  windowStart: Timestamp
}

export async function checkRateLimit(
  userId: string,
  userRole: string = 'student'
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const config = RATE_LIMITS[userRole] || RATE_LIMITS.student
  const docRef = doc(db, 'aiAssistantRateLimit', userId)

  try {
    const docSnap = await getDoc(docRef)
    const now = new Date()

    if (!docSnap.exists()) {
      // First request - create new limit entry
      await setDoc(docRef, {
        userId,
        count: 1,
        windowStart: serverTimestamp(),
      })
      return { allowed: true, remaining: config.maxRequests - 1, resetAt: new Date(now.getTime() + config.windowSeconds * 1000) }
    }

    const data = docSnap.data() as RateLimitEntry
    const windowStart = data.windowStart.toDate()
    const windowEnd = new Date(windowStart.getTime() + config.windowSeconds * 1000)

    // Check if window expired
    if (now > windowEnd) {
      // Reset window
      await setDoc(docRef, {
        userId,
        count: 1,
        windowStart: serverTimestamp(),
      })
      return { allowed: true, remaining: config.maxRequests - 1, resetAt: new Date(now.getTime() + config.windowSeconds * 1000) }
    }

    // Window still active - check count
    const remaining = config.maxRequests - data.count
    if (data.count >= config.maxRequests) {
      return { allowed: false, remaining: 0, resetAt: windowEnd }
    }

    // Increment count
    await updateDoc(docRef, {
      count: data.count + 1,
    })

    return { allowed: true, remaining: remaining - 1, resetAt: windowEnd }
  } catch (error) {
    console.error('Rate limit check error:', error)
    // On error, allow the request but log
    return { allowed: true, remaining: -1, resetAt: new Date() }
  }
}
