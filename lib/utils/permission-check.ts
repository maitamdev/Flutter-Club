type Role = 'admin' | 'trainer' | 'member' | 'guest';
type Permission = 'read' | 'write' | 'delete' | 'manage' | 'export';
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: ['read', 'write', 'delete', 'manage', 'export'],
  trainer: ['read', 'write', 'export'],
  member: ['read'],
  guest: [],
};
export function hasPermission(role: Role, permission: Permission): boolean { return ROLE_PERMISSIONS[role]?.includes(permission) ?? false; }
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean { return permissions.some(p => hasPermission(role, p)); }
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean { return permissions.every(p => hasPermission(role, p)); }
export function getRoleLevel(role: Role): number { return { admin: 3, trainer: 2, member: 1, guest: 0 }[role] ?? 0; }
export function isRoleAbove(role: Role, target: Role): boolean { return getRoleLevel(role) > getRoleLevel(target); }
