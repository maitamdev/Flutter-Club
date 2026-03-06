'use client'
import { useState, useCallback } from 'react'

export function useMap<K, V>(initialEntries?: [K, V][]) {
  const [map, setMap] = useState(new Map<K, V>(initialEntries))
  const set = useCallback((key: K, value: V) => setMap(prev => new Map(prev).set(key, value)), [])
  const remove = useCallback((key: K) => setMap(prev => { const next = new Map(prev); next.delete(key); return next }), [])
  const clear = useCallback(() => setMap(new Map()), [])
  const get = useCallback((key: K) => map.get(key), [map])
  return { map, set, get, remove, clear, size: map.size, has: (key: K) => map.has(key) }
}
