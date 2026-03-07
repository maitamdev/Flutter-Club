'use client';
import { useState, useCallback, RefObject } from 'react';
export function useFullscreen(ref: RefObject<HTMLElement>) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const enter = useCallback(async () => { await ref.current?.requestFullscreen(); setIsFullscreen(true); }, [ref]);
  const exit = useCallback(async () => { await document.exitFullscreen(); setIsFullscreen(false); }, []);
  const toggle = useCallback(() => isFullscreen ? exit() : enter(), [isFullscreen, enter, exit]);
  return { isFullscreen, enter, exit, toggle };
}
