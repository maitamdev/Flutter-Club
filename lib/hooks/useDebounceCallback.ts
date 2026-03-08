'use client';
import { useCallback, useRef } from 'react';
export function useDebounceCallback<T extends (...args: any[]) => void>(callback: T, delay: number = 300): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  return useCallback((...args: any[]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]) as T;
}