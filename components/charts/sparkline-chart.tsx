'use client';
interface SparklineProps { data: number[]; width?: number; height?: number; color?: string; }
export function SparklineChart({ data, width=100, height=30, color='#3b82f6' }: SparklineProps) {
  const max = Math.max(...data); const min = Math.min(...data);
  const points = data.map((v, i) => `${(i/(data.length-1))*width},${height-((v-min)/(max-min||1))*height}`).join(' ');
  return (<svg width={width} height={height} className='inline-block'><polyline points={points} fill='none' stroke={color} strokeWidth={1.5}/></svg>);
}
