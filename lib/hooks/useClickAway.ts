'use client';
import { useEffect, useRef } from 'react';
export function useClickAway<T extends HTMLElement>(onClickAway: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClickAway();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClickAway]);
  return ref;
}