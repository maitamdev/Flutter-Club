'use client';
import { ResponsiveContainer, RadarChart as RC, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
interface RadarChartProps { data: { subject: string; value: number; fullMark?: number }[]; color?: string; }
export function RadarChart({ data, color='#3b82f6' }: RadarChartProps) {
  return (<ResponsiveContainer width='100%' height={300}><RC data={data}><PolarGrid/><PolarAngleAxis dataKey='subject'/><PolarRadiusAxis/><Radar dataKey='value' stroke={color} fill={color} fillOpacity={0.3}/></RC></ResponsiveContainer>);
}
