'use client'
import { useState, useCallback } from 'react'

interface ToggleReturn {
  value: boolean
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
}

export function useToggle(initial: boolean = false): ToggleReturn {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  return { value, toggle, setTrue, setFalse }
}
