'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface SimpleLineChartProps {
  data: Record<string, any>[]
  xDataKey: string
  lines: { dataKey: string; color: string; name: string }[]
  height?: number
}

export function SimpleLineChart({ data, xDataKey, lines, height = 300 }: SimpleLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={xDataKey} className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip />
        <Legend />
        {lines.map(line => (<Line key={line.dataKey} type="monotone" dataKey={line.dataKey} stroke={line.color} name={line.name} strokeWidth={2} dot={{ r: 4 }} />))}
      </LineChart>
    </ResponsiveContainer>
  )
}
