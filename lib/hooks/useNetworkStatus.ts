'use client';
import { useState, useEffect } from 'react';
interface NetworkStatus { online: boolean; downlink?: number; effectiveType?: string; rtt?: number; }
export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({ online: navigator.onLine });
  useEffect(() => {
    const update = () => {
      const conn = (navigator as any).connection;
      setStatus({ online: navigator.onLine, downlink: conn?.downlink, effectiveType: conn?.effectiveType, rtt: conn?.rtt });
    };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
  }, []);
  return status;
}
