// Material categories
export const MATERIAL_CATEGORIES = [
  { value: 'lesson', label: 'Bai hoc' },
  { value: 'exercise', label: 'Bai tap' },
  { value: 'reference', label: 'Tai lieu tham khao' },
  { value: 'tool', label: 'Cong cu' },
  { value: 'video', label: 'Video' },
  { value: 'other', label: 'Khac' },
]
export const MATERIAL_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  MATERIAL_CATEGORIES.map(c => [c.value, c.label])
)
