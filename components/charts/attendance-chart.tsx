'use client'

import { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { getSessions, getAttendance } from '@/lib/firebase/firestore'
import { Skeleton } from '@/components/ui/skeleton'

interface ChartData {
  name: string
  attendance: number
  total: number
}

export function AttendanceChart() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessions = await getSessions()
        const recentSessions = sessions
          .filter((s) => new Date(s.startsAt) < new Date())
          .slice(0, 7)
          .reverse()

        const chartData = await Promise.all(
          recentSessions.map(async (session) => {
            const attendance = await getAttendance(session.id)
            return {
              name: new Date(session.startsAt).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
              }),
              attendance: attendance.length,
              total: 30, // Placeholder - should be actual member count
            }
          })
        )

        setData(chartData)
      } catch (error) {
        console.error('Error fetching attendance data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        Chưa có dữ liệu điểm danh
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="name"
          className="text-xs"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis
          className="text-xs"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Area
          type="monotone"
          dataKey="attendance"
          stroke="#3b82f6"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorAttendance)"
          name="Số người điểm danh"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
