'use client';
interface PrintLayoutProps { children: React.ReactNode; title?: string; }
export function PrintLayout({ children, title }: PrintLayoutProps) {
  return (<div className='print-layout'>
    <style>{`@media print { .no-print { display: none !important; } .print-layout { padding: 0; margin: 0; } }`}</style>
    {title && <h1 className='text-xl font-bold mb-4 print:text-black'>{title}</h1>}
    {children}
    <button onClick={() => window.print()} className='no-print mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Print</button>
  </div>);
}
