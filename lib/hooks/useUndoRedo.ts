'use client';
import { useState, useCallback } from 'react';
export function useUndoRedo<T>(initialState: T) {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialState);
  const [future, setFuture] = useState<T[]>([]);
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;
  const set = useCallback((newState: T) => { setPast(p => [...p, present]); setPresent(newState); setFuture([]); }, [present]);
  const undo = useCallback(() => { if (!canUndo) return; const prev = past[past.length - 1]; setPast(p => p.slice(0, -1)); setFuture(f => [present, ...f]); setPresent(prev); }, [canUndo, past, present]);
  const redo = useCallback(() => { if (!canRedo) return; const next = future[0]; setFuture(f => f.slice(1)); setPast(p => [...p, present]); setPresent(next); }, [canRedo, future, present]);
  return { state: present, set, undo, redo, canUndo, canRedo };
}
