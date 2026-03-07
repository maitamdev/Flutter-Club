'use client';
interface KanbanItem { id: string; title: string; description?: string; }
interface KanbanColumn { id: string; title: string; items: KanbanItem[]; color?: string; }
export function KanbanBoard({ columns }: { columns: KanbanColumn[] }) {
  return (<div className='flex gap-4 overflow-x-auto pb-4'>
    {columns.map(col => <div key={col.id} className='flex-shrink-0 w-72 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3'>
      <h3 className='font-semibold text-sm mb-3 flex items-center gap-2'>
        <span className='w-2 h-2 rounded-full' style={{backgroundColor:col.color||'#3b82f6'}}/>{col.title}
        <span className='text-gray-400 text-xs'>{col.items.length}</span></h3>
      <div className='space-y-2'>{col.items.map(item => <div key={item.id} className='bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border hover:shadow-md transition-shadow'>
        <p className='text-sm font-medium'>{item.title}</p>{item.description && <p className='text-xs text-gray-500 mt-1'>{item.description}</p>}
      </div>)}</div>
    </div>)}</div>);
}
