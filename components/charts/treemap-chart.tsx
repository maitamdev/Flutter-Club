'use client';
import { ResponsiveContainer, Treemap } from 'recharts';
interface TreemapData { name: string; size: number; color?: string; }
interface TreemapChartProps { data: TreemapData[]; }
export function TreemapChart({ data }: TreemapChartProps) {
  const chartData = [{ name: 'root', children: data.map(d => ({ ...d, size: d.size })) }];
  return (<ResponsiveContainer width='100%' height={300}><Treemap data={chartData} dataKey='size' nameKey='name' stroke='#fff' fill='#3b82f6'/></ResponsiveContainer>);
}
