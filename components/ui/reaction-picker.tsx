'use client';
import { useState } from 'react';
const REACTIONS = ['+1', 'heart', 'laugh', 'wow', 'sad', 'party'];
interface ReactionPickerProps { onReact: (reaction: string) => void; selected?: string; }
export function ReactionPicker({ onReact, selected }: ReactionPickerProps) {
  const [open, setOpen] = useState(false);
  return (<div className='relative inline-block'>
    <button onClick={() => setOpen(!open)} className='text-gray-400 hover:text-gray-600 text-sm'>React</button>
    {open && <div className='absolute bottom-full mb-1 flex gap-1 bg-white dark:bg-gray-800 shadow-lg rounded-full px-2 py-1 border'>
      {REACTIONS.map(r => <button key={r} onClick={() => { onReact(r); setOpen(false); }} className={`text-sm px-1 hover:scale-110 transition-transform ${selected===r?'font-bold':''}`}>{r}</button>)}
    </div>}
  </div>);
}
