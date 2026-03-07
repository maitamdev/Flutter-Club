'use client';
interface CertificateCardProps { title: string; recipient: string; date: string; type: string; code: string; }
export function CertificateCard({ title, recipient, date, type, code }: CertificateCardProps) {
  return (<div className='p-6 border-2 border-yellow-300 rounded-xl bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/10 dark:to-gray-900'>
    <span className='text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-800'>{type}</span>
    <h3 className='text-lg font-bold mt-2 text-yellow-800 dark:text-yellow-300'>{title}</h3>
    <p className='text-sm mt-1'>Recipient: <strong>{recipient}</strong></p><p className='text-sm text-gray-500'>{date}</p>
    <p className='text-xs text-gray-400 mt-3 font-mono'>#{code}</p>
  </div>);
}
