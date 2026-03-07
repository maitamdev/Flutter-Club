'use client';
import { useState } from 'react';
interface CommentBoxProps { onSubmit: (text: string) => void; placeholder?: string; }
export function CommentBox({ onSubmit, placeholder='Write a comment...' }: CommentBoxProps) {
  const [text, setText] = useState('');
  const handleSubmit = () => { if (text.trim()) { onSubmit(text.trim()); setText(''); } };
  return (<div className='flex gap-2'>
    <input value={text} onChange={e => setText(e.target.value)} placeholder={placeholder} onKeyDown={e => e.key==='Enter' && handleSubmit()}
      className='flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'/>
    <button onClick={handleSubmit} disabled={!text.trim()} className='px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50'>Send</button>
  </div>);
}
