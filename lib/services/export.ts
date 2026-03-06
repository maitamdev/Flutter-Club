// Export service - generate report data
import { downloadExcel } from '@/lib/utils'

export function exportAttendanceReport(data: any[], sessionTitle: string) {
  const headers = [
    { key: 'userName', label: 'Ho ten' },
    { key: 'studentId', label: 'MSSV' },
    { key: 'status', label: 'Trang thai' },
    { key: 'checkedAt', label: 'Thoi gian' },
  ]
  downloadExcel(data, headers, `diem-danh-${sessionTitle}.xlsx`, 'Diem danh')
}
export function exportMembersReport(data: any[]) {
  const headers = [
    { key: 'name', label: 'Ho ten' },
    { key: 'studentId', label: 'MSSV' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Vai tro' },
    { key: 'status', label: 'Trang thai' },
  ]
  downloadExcel(data, headers, 'danh-sach-thanh-vien.xlsx', 'Thanh vien')
}
export function exportGradesReport(data: any[], assignmentTitle: string) {
  const headers = [
    { key: 'userName', label: 'Ho ten' },
    { key: 'studentId', label: 'MSSV' },
    { key: 'score', label: 'Diem' },
    { key: 'feedback', label: 'Nhan xet' },
    { key: 'submittedAt', label: 'Thoi gian nop' },
  ]
  downloadExcel(data, headers, `diem-${assignmentTitle}.xlsx`, 'Diem so')
}
