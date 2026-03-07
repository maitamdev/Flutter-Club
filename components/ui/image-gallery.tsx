'use client';
import { useState } from 'react';
interface ImageGalleryProps { images: { src: string; alt?: string }[]; columns?: number; }
export function ImageGallery({ images, columns=3 }: ImageGalleryProps) {
  const [selected, setSelected] = useState<number|null>(null);
  return (<><div className='grid gap-2' style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
    {images.map((img, i) => <img key={i} src={img.src} alt={img.alt||''} onClick={() => setSelected(i)} className='w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity' />)}
  </div>
  {selected !== null && <div className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center' onClick={() => setSelected(null)}>
    <img src={images[selected].src} alt='' className='max-w-[90vw] max-h-[90vh] object-contain rounded-lg' />
  </div>}</>);
}
