'use client';
interface SidePanelProps { children: React.ReactNode; isOpen: boolean; onClose: () => void; title?: string; width?: string; }
export function SidePanel({ children, isOpen, onClose, title, width='w-96' }: SidePanelProps) {
  if (!isOpen) return null;
  return (<><div className='fixed inset-0 bg-black/30 z-40' onClick={onClose}/>
    <div className={`fixed right-0 top-0 h-full ${width} bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto`}>
      <div className='flex justify-between items-center p-4 border-b'>
        {title && <h2 className='font-semibold text-lg'>{title}</h2>}
        <button onClick={onClose} className='text-gray-400 hover:text-gray-600'>X</button>
      </div>
      <div className='p-4'>{children}</div>
    </div></>);
}
