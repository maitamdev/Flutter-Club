// Analytics service helpers
import { formatDate } from '@/lib/utils'

export function calculateAttendanceRate(attended: number, total: number): number {
  if (total === 0) return 0
  return Math.round((attended / total) * 100)
}
export function calculateAverageScore(scores: number[]): number {
  if (scores.length === 0) return 0
  return Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length * 10) / 10
}
export function getGradeLabel(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100
  if (pct >= 90) return 'Xuat sac'
  if (pct >= 80) return 'Gioi'
  if (pct >= 70) return 'Kha'
  if (pct >= 50) return 'Trung binh'
  return 'Yeu'
}
export function getGradeColor(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100
  if (pct >= 90) return 'text-emerald-600'
  if (pct >= 80) return 'text-blue-600'
  if (pct >= 70) return 'text-amber-600'
  if (pct >= 50) return 'text-orange-600'
  return 'text-red-600'
}
