'use client';
import { useState, useCallback } from 'react';
export function useSet<T>(initial?: Iterable<T>) {
  const [set, setSet] = useState(new Set<T>(initial));
  const add = useCallback((v: T) => setSet(p => new Set(p).add(v)), []);
  const remove = useCallback((v: T) => setSet(p => { const n = new Set(p); n.delete(v); return n; }), []);
  const toggle = useCallback((v: T) => setSet(p => { const n = new Set(p); n.has(v) ? n.delete(v) : n.add(v); return n; }), []);
  const clear = useCallback(() => setSet(new Set()), []);
  return { set, add, remove, toggle, clear, size: set.size };
}