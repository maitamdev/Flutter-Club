import { z } from 'zod'

export const settingsSchema = z.object({
  clubName: z.string().min(3, 'Ten CLB phai co it nhat 3 ky tu'),
  clubDescription: z.string().optional(),
  semesterName: z.string().min(1, 'Vui long nhap ten hoc ky'),
  maxMembers: z.number().min(5).max(500),
  autoApproveRequests: z.boolean(),
  attendanceDuration: z.number().min(5).max(30),
  qrRotationInterval: z.number().min(5).max(60),
})
export type SettingsFormData = z.infer<typeof settingsSchema>
