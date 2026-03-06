import { z } from 'zod'

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Mat khau phai co it nhat 6 ky tu'),
  newPassword: z.string().min(6, 'Mat khau moi phai co it nhat 6 ky tu'),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'Mat khau moi khong khop',
  path: ['confirmNewPassword'],
}).refine(data => data.currentPassword !== data.newPassword, {
  message: 'Mat khau moi phai khac mat khau cu',
  path: ['newPassword'],
})

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
