'use client';
interface SplitViewProps { left: React.ReactNode; right: React.ReactNode; ratio?: string; }
export function SplitView({ left, right, ratio='1fr 1fr' }: SplitViewProps) {
  return (<div className='grid gap-6 h-full' style={{ gridTemplateColumns: ratio }}>
    <div className='overflow-y-auto'>{left}</div>
    <div className='overflow-y-auto'>{right}</div>
  </div>);
}
