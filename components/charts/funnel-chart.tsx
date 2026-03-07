'use client';
interface FunnelData { label: string; value: number; color?: string; }
interface FunnelChartProps { data: FunnelData[]; }
export function FunnelChart({ data }: FunnelChartProps) {
  const max = Math.max(...data.map(d => d.value));
  return (<div className='space-y-2'>{data.map((d, i) => {
    const width = (d.value / max) * 100;
    return (<div key={i} className='flex items-center gap-3'>
      <span className='text-sm w-24 text-right text-gray-600'>{d.label}</span>
      <div className='flex-1'><div className='h-8 rounded flex items-center px-3 text-white text-sm font-medium' style={{ width: `${width}%`, backgroundColor: d.color || '#3b82f6' }}>{d.value}</div></div>
    </div>);
  })}</div>);
}
