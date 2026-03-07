'use client';
import { useState, useEffect } from 'react';
interface CommandItem { id: string; label: string; action: () => void; shortcut?: string; }
interface CommandPaletteProps { commands: CommandItem[]; isOpen: boolean; onClose: () => void; }
export function CommandPalette({ commands, isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const filtered = commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key==='Escape') onClose(); }; window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h); }, [onClose]);
  if (!isOpen) return null;
  return (<div className='fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50' onClick={onClose}>
    <div className='w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden' onClick={e => e.stopPropagation()}>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Search commands...' className='w-full px-4 py-3 border-b bg-transparent outline-none' autoFocus />
      <div className='max-h-60 overflow-y-auto'>{filtered.map(c => <button key={c.id} onClick={() => { c.action(); onClose(); }} className='w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-between'>
        <span>{c.label}</span>{c.shortcut && <span className='text-xs text-gray-400'>{c.shortcut}</span>}
      </button>)}</div>
    </div>
  </div>);
}
