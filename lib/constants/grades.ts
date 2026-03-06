// Grade scale constants
export const GRADE_SCALE = [
  { min: 90, label: 'Xuat sac', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950' },
  { min: 80, label: 'Gioi', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950' },
  { min: 70, label: 'Kha', color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950' },
  { min: 50, label: 'Trung binh', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950' },
  { min: 0, label: 'Yeu', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950' },
]
export function getGrade(score: number, maxScore: number) {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0
  return GRADE_SCALE.find(g => pct >= g.min) || GRADE_SCALE[GRADE_SCALE.length - 1]
}
