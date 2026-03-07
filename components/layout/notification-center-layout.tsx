'use client';
interface NotificationCenterLayoutProps { children: React.ReactNode; sidebar: React.ReactNode; }
export function NotificationCenterLayout({ children, sidebar }: NotificationCenterLayoutProps) {
  return (<div className='flex h-full'>
    <div className='w-80 border-r overflow-y-auto bg-white dark:bg-gray-900'>{sidebar}</div>
    <div className='flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-6'>{children}</div>
  </div>);
}
