'use client';
import { useState } from 'react';
interface CarouselProps { children: React.ReactNode[]; }
export function Carousel({ children }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(c => c === 0 ? children.length-1 : c-1);
  const next = () => setCurrent(c => c === children.length-1 ? 0 : c+1);
  return (<div className='relative overflow-hidden rounded-lg'>
    <div className='flex transition-transform duration-300' style={{ transform: `translateX(-${current*100}%)` }}>
      {children.map((child, i) => <div key={i} className='w-full flex-shrink-0'>{child}</div>)}
    </div>
    <button onClick={prev} className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full'>&#8249;</button>
    <button onClick={next} className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full'>&#8250;</button>
  </div>);
}
