export interface AttendanceReport { sessionId: string; sessionTitle: string; date: Date; totalMembers: number; presentCount: number; absentCount: number; lateCount: number; rate: number; details: AttendanceDetail[]; }
export interface AttendanceDetail { userId: string; status: 'present' | 'absent' | 'late' | 'excused'; checkInTime?: Date; note?: string; }
