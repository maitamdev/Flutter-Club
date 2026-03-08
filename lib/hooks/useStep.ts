'use client';
import { useState, useCallback } from 'react';
export function useStep(maxStep: number, initial: number = 0) {
  const [current, setCurrent] = useState(initial);
  const goNext = useCallback(() => setCurrent(s => Math.min(s + 1, maxStep)), [maxStep]);
  const goPrev = useCallback(() => setCurrent(s => Math.max(s - 1, 0)), []);
  const goTo = useCallback((step: number) => setCurrent(Math.max(0, Math.min(step, maxStep))), [maxStep]);
  const reset = useCallback(() => setCurrent(0), []);
  return { current, goNext, goPrev, goTo, reset, isFirst: current === 0, isLast: current === maxStep };
}