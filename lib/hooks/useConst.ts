'use client';
import { useRef } from 'react';
export function useConst<T>(initializer: T | (() => T)): T {
  const ref = useRef<{ value: T }>();
  if (ref.current === undefined) {
    ref.current = { value: typeof initializer === 'function' ? (initializer as () => T)() : initializer };
  }
  return ref.current.value;
}