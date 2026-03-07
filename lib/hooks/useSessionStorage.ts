'use client';
import { useState, useCallback } from 'react';
export function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try { const item = sessionStorage.getItem(key); return item ? JSON.parse(item) : initialValue; }
    catch { return initialValue; }
  });
  const setValue = useCallback((value: T) => { setStoredValue(value); sessionStorage.setItem(key, JSON.stringify(value)); }, [key]);
  const removeValue = useCallback(() => { setStoredValue(initialValue); sessionStorage.removeItem(key); }, [key, initialValue]);
  return [storedValue, setValue, removeValue];
}
