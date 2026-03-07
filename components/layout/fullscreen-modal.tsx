'use client';
interface FullscreenModalProps { isOpen: boolean; onClose: () => void; children: React.ReactNode; title?: string; }
export function FullscreenModal({ isOpen, onClose, children, title }: FullscreenModalProps) {
  if (!isOpen) return null;
  return (<div className='fixed inset-0 z-50 bg-white dark:bg-gray-950 overflow-y-auto'>
    <div className='sticky top-0 flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-950 z-10'>
      {title && <h2 className='text-lg font-semibold'>{title}</h2>}
      <button onClick={onClose} className='ml-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'>Close</button>
    </div>
    <div className='p-6'>{children}</div>
  </div>);
}
