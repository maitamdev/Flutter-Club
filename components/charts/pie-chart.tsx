'use client';
import { ResponsiveContainer, PieChart as PC, Pie, Cell, Tooltip, Legend } from 'recharts';
const COLORS = ['#3b82f6','#8b5cf6','#ec4899','#f59e0b','#10b981','#06b6d4'];
interface PieChartProps { data: { name: string; value: number }[]; }
export function PieChart({ data }: PieChartProps) {
  return (<ResponsiveContainer width='100%' height={300}><PC><Pie data={data} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={100} label>
    {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}</Pie><Tooltip/><Legend/></PC></ResponsiveContainer>);
}
