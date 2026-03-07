'use client';
import { useState, useEffect } from 'react';
type PermState = 'granted' | 'denied' | 'prompt' | 'not-supported';
export function usePermission(name: PermissionName): PermState {
  const [state, setState] = useState<PermState>('prompt');
  useEffect(() => {
    if (!navigator.permissions) { setState('not-supported'); return; }
    navigator.permissions.query({ name }).then(status => {
      setState(status.state as PermState);
      status.onchange = () => setState(status.state as PermState);
    }).catch(() => setState('not-supported'));
  }, [name]);
  return state;
}
