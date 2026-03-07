'use client';
import { useState } from 'react';
interface CollapsibleSidebarProps { children: React.ReactNode; header?: React.ReactNode; defaultCollapsed?: boolean; }
export function CollapsibleSidebar({ children, header, defaultCollapsed=false }: CollapsibleSidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  return (<aside className={`${collapsed?'w-16':'w-64'} transition-all duration-300 bg-white dark:bg-gray-900 border-r h-full flex flex-col`}>
    <div className='flex justify-between items-center p-3 border-b'>
      {!collapsed && header}
      <button onClick={() => setCollapsed(!collapsed)} className='p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded'>{collapsed?'>':'<'}</button>
    </div>
    <div className='flex-1 overflow-y-auto p-2'>{children}</div>
  </aside>);
}
