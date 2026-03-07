'use client';
import { useState } from 'react';
interface FABAction { label: string; icon: string; onClick: () => void; }
interface FABProps { actions: FABAction[]; mainIcon?: string; }
export function FloatingActionButton({ actions, mainIcon='+' }: FABProps) {
  const [open, setOpen] = useState(false);
  return (<div className='fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-2'>
    <button onClick={() => setOpen(!open)} className='w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 text-2xl transition-transform' style={{transform:open?'rotate(45deg)':'none'}}>{mainIcon}</button>
    {open && actions.map((a,i) => <button key={i} onClick={() => { a.onClick(); setOpen(false); }} className='flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-sm hover:shadow-lg transition-shadow'>
      <span>{a.icon}</span><span>{a.label}</span>
    </button>)}
  </div>);
}
