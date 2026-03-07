'use client';
import { cn } from '@/lib/utils';
interface ChipProps { label: string; onRemove?: () => void; variant?: 'default'|'primary'|'success'|'warning'|'error'; size?: 'sm'|'md'; className?: string; }
export function Chip({ label, onRemove, variant='default', size='md', className }: ChipProps) {
  const colors = { default:'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200', primary:'bg-blue-100 text-blue-800', success:'bg-green-100 text-green-800', warning:'bg-yellow-100 text-yellow-800', error:'bg-red-100 text-red-800' };
  return (<span className={cn('inline-flex items-center rounded-full font-medium', size==='sm'?'px-2 py-0.5 text-xs':'px-3 py-1 text-sm', colors[variant], className)}>
    {label}{onRemove && <button onClick={onRemove} className='ml-1 hover:opacity-70'>&times;</button>}
  </span>);
}
