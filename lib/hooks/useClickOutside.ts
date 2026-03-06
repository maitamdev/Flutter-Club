'use client'
import { useEffect, useRef } from 'react'

export function useClickOutside(handler: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return
      handler()
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler])
  return ref
}
