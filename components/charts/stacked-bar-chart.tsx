'use client';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const COLORS = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ec4899'];
interface StackedBarChartProps { data: Record<string, unknown>[]; categories: string[]; xKey: string; }
export function StackedBarChart({ data, categories, xKey }: StackedBarChartProps) {
  return (<ResponsiveContainer width='100%' height={300}><BarChart data={data}><CartesianGrid strokeDasharray='3 3'/><XAxis dataKey={xKey}/><YAxis/><Tooltip/><Legend/>
    {categories.map((cat, i) => <Bar key={cat} dataKey={cat} stackId='a' fill={COLORS[i % COLORS.length]}/>)}</BarChart></ResponsiveContainer>);
}
