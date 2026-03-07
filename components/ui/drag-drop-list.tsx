'use client';
import { useState } from 'react';
interface DragDropProps { items: { id: string; content: React.ReactNode }[]; onReorder?: (ids: string[]) => void; }
export function DragDropList({ items: init, onReorder }: DragDropProps) {
  const [items, setItems] = useState(init);
  const [dragIdx, setDragIdx] = useState<number|null>(null);
  const handleDrop = (i: number) => { if (dragIdx===null) return; const n=[...items]; const [m]=n.splice(dragIdx,1); n.splice(i,0,m); setItems(n); onReorder?.(n.map(x=>x.id)); setDragIdx(null); };
  return (<div className='space-y-1'>{items.map((item,i) => <div key={item.id} draggable onDragStart={() => setDragIdx(i)} onDragOver={e => e.preventDefault()} onDrop={() => handleDrop(i)}
    className='p-3 bg-white dark:bg-gray-900 border rounded-lg cursor-move hover:shadow-sm transition-shadow'>{item.content}</div>)}</div>);
}
