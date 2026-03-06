'use client'
import { useState, useCallback, useMemo } from 'react'

export function useSearch<T>(items: T[], searchFn: (item: T, query: string) => boolean) {
  const [query, setQuery] = useState('')
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items
    return items.filter(item => searchFn(item, query.toLowerCase()))
  }, [items, query, searchFn])
  const clearSearch = useCallback(() => setQuery(''), [])
  return { query, setQuery, filteredItems, clearSearch, resultCount: filteredItems.length }
}
