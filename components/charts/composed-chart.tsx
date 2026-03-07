'use client';
import { ResponsiveContainer, ComposedChart as CC2, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
interface ComposedChartProps { data: Record<string, unknown>[]; barKey: string; lineKey: string; xKey: string; barColor?: string; lineColor?: string; }
export function ComposedChartComponent({ data, barKey, lineKey, xKey, barColor='#3b82f6', lineColor='#ef4444' }: ComposedChartProps) {
  return (<ResponsiveContainer width='100%' height={300}><CC2 data={data}><CartesianGrid strokeDasharray='3 3'/><XAxis dataKey={xKey}/><YAxis/><Tooltip/><Legend/>
    <Bar dataKey={barKey} fill={barColor}/><Line type='monotone' dataKey={lineKey} stroke={lineColor}/></CC2></ResponsiveContainer>);
}
