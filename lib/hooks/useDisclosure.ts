'use client';
import { useState, useCallback } from 'react';
export function useDisclosure(initialOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(v => !v), []);
  return { isOpen, open, close, toggle };
}