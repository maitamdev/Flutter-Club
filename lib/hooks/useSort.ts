'use client'
import { useState, useMemo } from 'react'

type SortDirection = 'asc' | 'desc'

export function useSort<T>(items: T[], defaultKey?: keyof T, defaultDirection: SortDirection = 'asc') {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(defaultKey)
  const [direction, setDirection] = useState<SortDirection>(defaultDirection)
  const sortedItems = useMemo(() => {
    if (!sortKey) return items
    return [...items].sort((a, b) => {
      const aVal = a[sortKey]; const bVal = b[sortKey]
      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })
  }, [items, sortKey, direction])
  const toggleSort = (key: keyof T) => {
    if (sortKey === key) setDirection(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setDirection('asc') }
  }
  return { sortedItems, sortKey, direction, toggleSort }
}
