'use client';
import { useState, useCallback } from 'react';
export function useList<T>(init: T[] = []) {
  const [list, setList] = useState<T[]>(init);
  const push = useCallback((item: T) => setList(p => [...p, item]), []);
  const removeAt = useCallback((i: number) => setList(p => p.filter((_, idx) => idx !== i)), []);
  const updateAt = useCallback((i: number, item: T) => setList(p => p.map((v, idx) => idx === i ? item : v)), []);
  const clear = useCallback(() => setList([]), []);
  return { list, push, removeAt, updateAt, clear, size: list.length };
}