'use client';
import { useEffect } from 'react';
interface ModalProps { isOpen: boolean; onClose: () => void; title?: string; children: React.ReactNode; size?: 'sm'|'md'|'lg'; }
export function Modal({ isOpen, onClose, title, children, size='md' }: ModalProps) {
  useEffect(() => { if (isOpen) document.body.style.overflow='hidden'; else document.body.style.overflow=''; return () => { document.body.style.overflow=''; }; }, [isOpen]);
  if (!isOpen) return null;
  const sizes = { sm:'max-w-sm', md:'max-w-md', lg:'max-w-lg' };
  return (<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50' onClick={onClose}>
    <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 ${sizes[size]} w-full mx-4`} onClick={e => e.stopPropagation()}>
      {title && <div className='flex justify-between items-center mb-4'><h3 className='text-lg font-semibold'>{title}</h3><button onClick={onClose} className='text-gray-400 hover:text-gray-600'>X</button></div>}
      {children}
    </div>
  </div>);
}
