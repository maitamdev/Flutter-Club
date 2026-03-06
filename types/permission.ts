// Permission types
export type Permission =
  | 'manage_members'
  | 'create_session'
  | 'create_assignment'
  | 'create_quiz'
  | 'create_announcement'
  | 'grade_submission'
  | 'start_attendance'
  | 'delete_content'
  | 'approve_requests'
  | 'view_analytics'
  | 'export_data'
  | 'upload_material'

export interface RolePermissions {
  role: string
  permissions: Permission[]
}
