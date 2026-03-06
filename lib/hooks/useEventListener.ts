'use client'
import { useRef, useEffect, useCallback } from 'react'

export function useEventListener<K extends keyof WindowEventMap>(eventName: K, handler: (event: WindowEventMap[K]) => void, element?: HTMLElement | Window | null) {
  const savedHandler = useRef(handler)
  useEffect(() => { savedHandler.current = handler }, [handler])
  useEffect(() => {
    const targetElement = element || window
    const listener = (event: Event) => savedHandler.current(event as WindowEventMap[K])
    targetElement.addEventListener(eventName, listener)
    return () => targetElement.removeEventListener(eventName, listener)
  }, [eventName, element])
}
