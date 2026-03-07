'use client';
import { useState } from 'react';
interface PopoverProps { trigger: React.ReactNode; children: React.ReactNode; align?: 'left'|'center'|'right'; }
export function PopoverCustom({ trigger, children, align='center' }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const alignClass = { left:'left-0', center:'left-1/2 -translate-x-1/2', right:'right-0' };
  return (<div className='relative inline-block'>
    <div onClick={() => setOpen(!open)}>{trigger}</div>
    {open && <><div className='fixed inset-0' onClick={() => setOpen(false)} />
      <div className={`absolute top-full mt-2 ${alignClass[align]} z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-3 min-w-[200px]`}>{children}</div></>}
  </div>);
}
