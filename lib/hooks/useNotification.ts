'use client';
import { useState, useCallback } from 'react';
export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const request = useCallback(async () => {
    if (!('Notification' in window)) return 'denied' as NotificationPermission;
    const perm = await Notification.requestPermission();
    setPermission(perm);
    return perm;
  }, []);
  const notify = useCallback((title: string, options?: NotificationOptions) => {
    if (permission === 'granted') return new Notification(title, options);
    return null;
  }, [permission]);
  return { permission, request, notify };
}
