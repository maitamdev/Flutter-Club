'use client';
interface DashboardShellProps { children: React.ReactNode; sidebar?: React.ReactNode; header?: React.ReactNode; }
export function DashboardShell({ children, sidebar, header }: DashboardShellProps) {
  return (<div className='flex h-screen bg-gray-50 dark:bg-gray-950'>
    {sidebar && <aside className='w-64 border-r bg-white dark:bg-gray-900 overflow-y-auto'>{sidebar}</aside>}
    <div className='flex-1 flex flex-col overflow-hidden'>
      {header && <header className='h-16 border-b bg-white dark:bg-gray-900 flex items-center px-6'>{header}</header>}
      <main className='flex-1 overflow-y-auto p-6'>{children}</main>
    </div>
  </div>);
}
