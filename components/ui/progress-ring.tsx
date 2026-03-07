'use client';
interface ProgressRingProps { value: number; size?: number; strokeWidth?: number; color?: string; label?: string; }
export function ProgressRing({ value, size=80, strokeWidth=6, color='#3b82f6', label }: ProgressRingProps) {
  const r = (size-strokeWidth)/2; const c = 2*Math.PI*r; const offset = c*(1-value/100);
  return (<div className='inline-flex flex-col items-center'>
    <svg width={size} height={size} className='-rotate-90'>
      <circle cx={size/2} cy={size/2} r={r} fill='none' stroke='#e5e7eb' strokeWidth={strokeWidth}/>
      <circle cx={size/2} cy={size/2} r={r} fill='none' stroke={color} strokeWidth={strokeWidth} strokeDasharray={c} strokeDashoffset={offset} strokeLinecap='round' className='transition-all duration-500'/>
    </svg>
    {label && <span className='text-xs text-gray-500 mt-1'>{label}</span>}
  </div>);
}
