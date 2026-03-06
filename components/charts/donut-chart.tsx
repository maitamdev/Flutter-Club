'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface DonutChartProps {
  data: { name: string; value: number; color: string }[]
  innerRadius?: number
  outerRadius?: number
  height?: number
}

export function DonutChart({ data, innerRadius = 60, outerRadius = 90, height = 300 }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={innerRadius} outerRadius={outerRadius} dataKey="value" paddingAngle={2}>
          {data.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
