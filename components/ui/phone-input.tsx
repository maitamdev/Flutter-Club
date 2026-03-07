'use client';
import { useState } from 'react';
interface PhoneInputProps { value?: string; onChange?: (phone: string) => void; }
export function PhoneInput({ value='', onChange }: PhoneInputProps) {
  const fmt = (v: string) => { const d = v.replace(/\D/g, '').slice(0,10); if (d.length>=7) return d.slice(0,4)+' '+d.slice(4,7)+' '+d.slice(7); if (d.length>=4) return d.slice(0,4)+' '+d.slice(4); return d; };
  const [display, setDisplay] = useState(fmt(value));
  const handleChange = (v: string) => { setDisplay(fmt(v)); onChange?.(v.replace(/\D/g,'')); };
  return <div className='flex'><span className='px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-r-0 rounded-l-lg text-sm'>+84</span>
    <input value={display} onChange={e => handleChange(e.target.value)} placeholder='0901 234 567' className='flex-1 px-3 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500'/></div>;
}
