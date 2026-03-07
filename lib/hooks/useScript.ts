'use client';
import { useState, useEffect } from 'react';
type ScriptStatus = 'loading' | 'ready' | 'error';
export function useScript(src: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>('loading');
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src; script.async = true;
    script.onload = () => setStatus('ready');
    script.onerror = () => setStatus('error');
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, [src]);
  return status;
}
