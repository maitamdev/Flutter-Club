'use client'
import { useCallback, useRef } from 'react'

export function useThrottle<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  const lastCall = useRef(0)
  const throttled = useCallback((...args: any[]) => {
    const now = Date.now()
    if (now - lastCall.current >= delay) {
      lastCall.current = now
      return fn(...args)
    }
  }, [fn, delay]) as T
  return throttled
}
