'use client';
import { useCallback, useRef } from 'react';
export function useThrottleCallback<T extends (...args: any[]) => void>(callback: T, delay: number = 300): T {
  const lastRun = useRef<number>(0);
  return useCallback((...args: any[]) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) { lastRun.current = now; callback(...args); }
  }, [callback, delay]) as T;
}