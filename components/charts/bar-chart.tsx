'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface SimpleBarChartProps {
  data: Record<string, any>[]
  xDataKey: string
  bars: { dataKey: string; color: string; name: string }[]
  height?: number
}

export function SimpleBarChart({ data, xDataKey, bars, height = 300 }: SimpleBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={xDataKey} className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip />
        <Legend />
        {bars.map(bar => (<Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.color} name={bar.name} radius={[4, 4, 0, 0]} />))}
      </BarChart>
    </ResponsiveContainer>
  )
}
