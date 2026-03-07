'use client';
import { useState, useRef } from 'react';
interface OTPInputProps { length?: number; onComplete: (otp: string) => void; }
export function OTPInput({ length=6, onComplete }: OTPInputProps) {
  const [values, setValues] = useState(Array(length).fill(''));
  const refs = useRef<HTMLInputElement[]>([]);
  const handleChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return; const nv = [...values]; nv[i] = v; setValues(nv);
    if (v && i < length-1) refs.current[i+1]?.focus();
    if (nv.every(x=>x)) onComplete(nv.join(''));
  };
  return <div className='flex gap-2'>{values.map((v,i) => <input key={i} ref={el => { if(el) refs.current[i]=el; }} value={v} onChange={e => handleChange(i, e.target.value)} maxLength={1}
    className='w-10 h-12 text-center border rounded-lg text-lg font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none'/>)}</div>;
}
