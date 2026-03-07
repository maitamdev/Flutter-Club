'use client';
import { useRef, useCallback } from 'react';
type SwipeDir = 'left' | 'right' | 'up' | 'down';
interface UseSwipeOpts { onSwipe: (dir: SwipeDir) => void; threshold?: number; }
export function useSwipe({ onSwipe, threshold = 50 }: UseSwipeOpts) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => { start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!start.current) return;
    const dx = e.changedTouches[0].clientX - start.current.x;
    const dy = e.changedTouches[0].clientY - start.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) onSwipe(dx > 0 ? 'right' : 'left');
    else if (Math.abs(dy) > threshold) onSwipe(dy > 0 ? 'down' : 'up');
    start.current = null;
  }, [onSwipe, threshold]);
  return { onTouchStart, onTouchEnd };
}
