'use client';
import { useState } from 'react';
interface TabItem { id: string; label: string; content: React.ReactNode; }
interface TabLayoutProps { tabs: TabItem[]; defaultTab?: string; }
export function TabLayout({ tabs, defaultTab }: TabLayoutProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);
  const activeTab = tabs.find(t => t.id === active);
  return (<div>
    <div className='flex border-b'>{tabs.map(t => <button key={t.id} onClick={() => setActive(t.id)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${active===t.id?'border-blue-500 text-blue-600':'border-transparent text-gray-500 hover:text-gray-700'}`}>{t.label}</button>)}</div>
    <div className='py-4'>{activeTab?.content}</div>
  </div>);
}
