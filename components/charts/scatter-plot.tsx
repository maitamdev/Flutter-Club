'use client';
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Scatter } from 'recharts';
interface ScatterPlotProps { data: { x: number; y: number }[]; color?: string; xLabel?: string; yLabel?: string; }
export function ScatterPlot({ data, color='#3b82f6', xLabel='X', yLabel='Y' }: ScatterPlotProps) {
  return (<ResponsiveContainer width='100%' height={300}><ScatterChart><CartesianGrid/><XAxis type='number' dataKey='x' name={xLabel}/><YAxis type='number' dataKey='y' name={yLabel}/><Tooltip cursor={{strokeDasharray:'3 3'}}/><Scatter data={data} fill={color}/></ScatterChart></ResponsiveContainer>);
}
