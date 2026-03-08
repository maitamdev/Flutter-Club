'use client';
import { useState, useCallback } from 'react';
export function useForceUpdate() {
  const [, setState] = useState(0);
  return useCallback(() => setState(s => s + 1), []);
}