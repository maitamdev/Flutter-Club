'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SimpleAreaChartProps {
  data: Record<string, any>[]
  xDataKey: string
  yDataKey: string
  color?: string
  height?: number
}

export function SimpleAreaChart({ data, xDataKey, yDataKey, color = 'hsl(var(--primary))', height = 300 }: SimpleAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={xDataKey} className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip />
        <Area type="monotone" dataKey={yDataKey} stroke={color} fill={color} fillOpacity={0.1} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
