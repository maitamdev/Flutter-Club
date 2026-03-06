import { z } from 'zod'

export const searchSchema = z.object({
  query: z.string().min(1, 'Vui long nhap tu khoa tim kiem').max(100, 'Tu khoa tim kiem qua dai'),
})

export const filterSchema = z.object({
  role: z.enum(['all', 'admin', 'trainer', 'member']).optional(),
  status: z.enum(['all', 'active', 'pending', 'blocked']).optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
})

export type SearchFormData = z.infer<typeof searchSchema>
export type FilterFormData = z.infer<typeof filterSchema>
