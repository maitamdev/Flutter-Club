'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
export function useSafeState<T>(initialState: T) {
  const [state, setState] = useState(initialState);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const setSafeState = useCallback((value: T | ((prev: T) => T)) => {
    if (mounted.current) setState(value);
  }, []);
  return [state, setSafeState] as const;
}