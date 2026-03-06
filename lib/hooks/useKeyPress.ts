'use client'
import { useEffect, useRef } from 'react'

export function useKeyPress(targetKey: string, handler: () => void) {
  const handlerRef = useRef(handler)
  useEffect(() => { handlerRef.current = handler }, [handler])
  useEffect(() => {
    const listener = (e: KeyboardEvent) => { if (e.key === targetKey) handlerRef.current() }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [targetKey])
}
