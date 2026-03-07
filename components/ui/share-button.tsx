'use client';
import { useState } from 'react';
interface ShareButtonProps { url: string; title: string; text?: string; }
export function ShareButton({ url, title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    if (navigator.share) { await navigator.share({ title, text, url }); }
    else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };
  return <button onClick={share} className='inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50'>{copied ? 'Copied!' : 'Share'}</button>;
}
