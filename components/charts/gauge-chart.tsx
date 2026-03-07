'use client';
interface GaugeChartProps { value: number; max?: number; label?: string; color?: string; }
export function GaugeChart({ value, max=100, label, color='#3b82f6' }: GaugeChartProps) {
  const pct = (value / max) * 100; const angle = (pct / 100) * 180;
  return (<div className='flex flex-col items-center'>
    <svg width={200} height={120} viewBox='0 0 200 120'>
      <path d='M 20 100 A 80 80 0 0 1 180 100' fill='none' stroke='#e5e7eb' strokeWidth={16} strokeLinecap='round'/>
      <path d='M 20 100 A 80 80 0 0 1 180 100' fill='none' stroke={color} strokeWidth={16} strokeLinecap='round' strokeDasharray={`${angle * 2.79} 999`}/>
      <text x={100} y={90} textAnchor='middle' className='text-2xl font-bold' fill='currentColor'>{value}</text>
    </svg>
    {label && <span className='text-sm text-gray-500 -mt-2'>{label}</span>}
  </div>);
}
