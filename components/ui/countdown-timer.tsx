'use client';
import { useCountdown } from '@/lib/hooks/useCountdown';
interface CountdownProps { targetDate: Date; label?: string; }
export function CountdownTimer({ targetDate, label }: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);
  if (isExpired) return <span className='text-red-500 font-semibold'>Expired</span>;
  return (<div className='flex gap-2 items-center'>
    {label && <span className='text-sm text-gray-500'>{label}</span>}
    {[{v:days,l:'d'},{v:hours,l:'h'},{v:minutes,l:'m'},{v:seconds,l:'s'}].map(({v,l}) =>
      <div key={l} className='text-center'><span className='text-lg font-bold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded'>{String(v).padStart(2,'0')}</span><span className='text-xs block mt-0.5 text-gray-500'>{l}</span></div>)}
  </div>);
}
