'use client'
import { useState, useCallback } from 'react'

export function useCounter(initial: number = 0, min?: number, max?: number) {
  const [count, setCount] = useState(initial)
  const increment = useCallback(() => {
    setCount(c => max !== undefined ? Math.min(c + 1, max) : c + 1)
  }, [max])
  const decrement = useCallback(() => {
    setCount(c => min !== undefined ? Math.max(c - 1, min) : c - 1)
  }, [min])
  const reset = useCallback(() => setCount(initial), [initial])
  return { count, increment, decrement, reset, setCount }
}
