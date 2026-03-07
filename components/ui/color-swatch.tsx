'use client';
interface ColorSwatchProps { color: string; label?: string; size?: 'sm'|'md'|'lg'; onClick?: () => void; }
export function ColorSwatch({ color, label, size='md', onClick }: ColorSwatchProps) {
  const sizes = { sm:'w-6 h-6', md:'w-10 h-10', lg:'w-14 h-14' };
  return (<div className='flex flex-col items-center gap-1 cursor-pointer' onClick={onClick}>
    <div className={`${sizes[size]} rounded-lg border shadow-sm`} style={{ backgroundColor: color }} />
    {label && <span className='text-xs text-gray-500'>{label}</span>}
  </div>);
}
