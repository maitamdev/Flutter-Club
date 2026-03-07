'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
interface NavItem { label: string; href: string; icon: string; }
interface MobileBottomNavProps { items: NavItem[]; }
export function MobileBottomNav({ items }: MobileBottomNavProps) {
  const pathname = usePathname();
  return (<nav className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t md:hidden z-50'>
    <div className='flex justify-around py-2'>
      {items.map(item => <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-0.5 text-xs ${pathname===item.href?'text-blue-500':'text-gray-500'}`}>
        <span>{item.icon}</span><span>{item.label}</span>
      </Link>)}
    </div>
  </nav>);
}
