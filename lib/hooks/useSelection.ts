'use client'
import { useState, useCallback } from 'react'

export function useSelection<T extends string | number>() {
  const [selected, setSelected] = useState<Set<T>>(new Set())
  const toggle = useCallback((id: T) => {
    setSelected(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  }, [])
  const selectAll = useCallback((ids: T[]) => setSelected(new Set(ids)), [])
  const deselectAll = useCallback(() => setSelected(new Set()), [])
  const isSelected = useCallback((id: T) => selected.has(id), [selected])
  return { selected, toggle, selectAll, deselectAll, isSelected, count: selected.size }
}
