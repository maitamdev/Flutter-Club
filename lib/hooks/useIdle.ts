'use client';
import { useState, useEffect, useCallback } from 'react';
export function useIdle(timeout = 300000): boolean {
  const [idle, setIdle] = useState(false);
  const handleActivity = useCallback(() => setIdle(false), []);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const reset = () => { clearTimeout(timer); setIdle(false); timer = setTimeout(() => setIdle(true), timeout); };
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(e => document.addEventListener(e, reset, { passive: true }));
    timer = setTimeout(() => setIdle(true), timeout);
    return () => { clearTimeout(timer); events.forEach(e => document.removeEventListener(e, reset)); };
  }, [timeout]);
  return idle;
}
