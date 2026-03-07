'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface SettingsMenuItem { label: string; href: string; icon?: string; }
interface SettingsLayoutProps { children: React.ReactNode; menu: SettingsMenuItem[]; title?: string; }
export function SettingsLayout({ children, menu, title='Settings' }: SettingsLayoutProps) {
  const pathname = usePathname();
  return (<div className='max-w-5xl mx-auto'>
    <h1 className='text-2xl font-bold mb-6'>{title}</h1>
    <div className='flex gap-8'>
      <nav className='w-48 space-y-1'>{menu.map(item => <Link key={item.href} href={item.href} className={`block px-3 py-2 rounded-lg text-sm ${pathname===item.href?'bg-blue-50 text-blue-700 dark:bg-blue-900/20':'text-gray-600 hover:bg-gray-50'}`}>{item.label}</Link>)}</nav>
      <div className='flex-1'>{children}</div>
    </div>
  </div>);
}
