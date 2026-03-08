'use client';
import { useEffect, useRef } from 'react';
export function useWhyDidYouUpdate<T extends Record<string, unknown>>(name: string, props: T): void {
  const previousProps = useRef<T>();
  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changes: Record<string, { from: unknown; to: unknown }> = {};
      allKeys.forEach(key => {
        if (previousProps.current![key] !== props[key]) {
          changes[key] = { from: previousProps.current![key], to: props[key] };
        }
      });
      if (Object.keys(changes).length) console.log('[why-update]', name, changes);
    }
    previousProps.current = props;
  });
}