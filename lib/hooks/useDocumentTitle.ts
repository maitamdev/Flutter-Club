'use client';
import { useEffect, useRef } from 'react';
export function useDocumentTitle(title: string, restoreOnUnmount = true) {
  const prevTitle = useRef(document.title);
  useEffect(() => { document.title = title; }, [title]);
  useEffect(() => {
    if (restoreOnUnmount) return () => { document.title = prevTitle.current; };
  }, [restoreOnUnmount]);
}
