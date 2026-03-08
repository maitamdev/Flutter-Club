'use client';
import { useState, useCallback } from 'react';
export function useQueue<T>(init: T[] = []) {
  const [queue, setQueue] = useState<T[]>(init);
  const enqueue = useCallback((item: T) => setQueue(p => [...p, item]), []);
  const dequeue = useCallback(() => setQueue(p => p.slice(1)), []);
  const clear = useCallback(() => setQueue([]), []);
  return { queue, enqueue, dequeue, peek: queue[0], clear, size: queue.length };
}