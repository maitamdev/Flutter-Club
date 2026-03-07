'use client';
import { useState } from 'react';
interface CurrencyInputProps { value?: number; onChange?: (val: number) => void; currency?: string; }
export function CurrencyInput({ value=0, onChange, currency='VND' }: CurrencyInputProps) {
  const fmt = (n: number) => n.toLocaleString('vi-VN');
  const [display, setDisplay] = useState(fmt(value));
  const handleChange = (v: string) => { const num = parseInt(v.replace(/\D/g, '')) || 0; setDisplay(fmt(num)); onChange?.(num); };
  return <div className='flex'><input value={display} onChange={e => handleChange(e.target.value)} className='flex-1 px-3 py-2 border rounded-l-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500'/>
    <span className='px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-lg text-sm font-medium'>{currency}</span></div>;
}
