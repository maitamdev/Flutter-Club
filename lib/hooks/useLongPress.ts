'use client';
import { useCallback, useRef } from 'react';
export function useLongPress(callback: () => void, ms = 500) {
  const timerRef = useRef<NodeJS.Timeout>();
  const onStart = useCallback(() => { timerRef.current = setTimeout(callback, ms); }, [callback, ms]);
  const onEnd = useCallback(() => { clearTimeout(timerRef.current); }, []);
  return { onMouseDown: onStart, onMouseUp: onEnd, onMouseLeave: onEnd, onTouchStart: onStart, onTouchEnd: onEnd };
}
