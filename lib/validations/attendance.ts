import { z } from 'zod'
import { ATTENDANCE_CONFIG } from '@/lib/constants/attendance'

export const attendanceWindowSchema = z.object({
  duration: z.number()
    .min(ATTENDANCE_CONFIG.MIN_DURATION_MINUTES, 'Thoi gian it nhat ' + ATTENDANCE_CONFIG.MIN_DURATION_MINUTES + ' phut')
    .max(ATTENDANCE_CONFIG.MAX_DURATION_MINUTES, 'Thoi gian toi da ' + ATTENDANCE_CONFIG.MAX_DURATION_MINUTES + ' phut'),
})
export type AttendanceWindowFormData = z.infer<typeof attendanceWindowSchema>
