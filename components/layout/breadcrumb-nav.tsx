'use client';
import Link from 'next/link';
interface BreadcrumbItem { label: string; href?: string; }
interface BreadcrumbNavProps { items: BreadcrumbItem[]; }
export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (<nav className='flex items-center gap-2 text-sm text-gray-500'>
    {items.map((item, i) => (<span key={i} className='flex items-center gap-2'>
      {i > 0 && <span>/</span>}
      {item.href ? <Link href={item.href} className='hover:text-gray-900 dark:hover:text-gray-200'>{item.label}</Link> : <span className='text-gray-900 dark:text-gray-200 font-medium'>{item.label}</span>}
    </span>))}
  </nav>);
}
