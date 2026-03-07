'use client';
import { useState, useEffect } from 'react';
interface Orientation { angle: number; type: string; }
export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>({ angle: 0, type: 'portrait-primary' });
  useEffect(() => {
    const handler = () => {
      const o = screen.orientation;
      setOrientation({ angle: o.angle, type: o.type });
    };
    screen.orientation?.addEventListener('change', handler);
    handler();
    return () => screen.orientation?.removeEventListener('change', handler);
  }, []);
  return orientation;
}
