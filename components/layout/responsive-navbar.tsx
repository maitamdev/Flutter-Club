'use client';
import { useState } from 'react';
interface NavItem { label: string; href: string; }
interface ResponsiveNavbarProps { brand: string; items: NavItem[]; }
export function ResponsiveNavbar({ brand, items }: ResponsiveNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (<nav className='bg-white dark:bg-gray-900 border-b'>
    <div className='max-w-7xl mx-auto px-4 flex items-center justify-between h-16'>
      <span className='font-bold text-lg'>{brand}</span>
      <div className='hidden md:flex gap-6'>{items.map(i => <a key={i.href} href={i.href} className='text-sm text-gray-600 hover:text-gray-900'>{i.label}</a>)}</div>
      <button onClick={() => setMobileOpen(!mobileOpen)} className='md:hidden p-2'>Menu</button>
    </div>
    {mobileOpen && <div className='md:hidden border-t px-4 py-2 space-y-2'>{items.map(i => <a key={i.href} href={i.href} className='block py-2 text-sm'>{i.label}</a>)}</div>}
  </nav>);
}
