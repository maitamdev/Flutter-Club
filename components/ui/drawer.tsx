'use client';
interface DrawerProps { isOpen: boolean; onClose: () => void; children: React.ReactNode; position?: 'left'|'right'; width?: string; }
export function Drawer({ isOpen, onClose, children, position='right', width='w-80' }: DrawerProps) {
  return (<>
    {isOpen && <div className='fixed inset-0 bg-black/50 z-40' onClick={onClose} />}
    <div className={`fixed top-0 ${position}-0 h-full ${width} bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : position==='right'?'translate-x-full':'-translate-x-full'}`}>
      <div className='p-4'><button onClick={onClose} className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'>X</button>{children}</div>
    </div>
  </>);
}
