'use client';
import { useState, useEffect } from 'react';
interface ScrollPosition { x: number; y: number; }
export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  useEffect(() => {
    const handler = () => setPosition({ x: window.scrollX, y: window.scrollY });
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return position;
}
