// Authentication guard utilities
export type Role = 'admin' | 'moderator' | 'member' | 'guest';
const ROLE_HIERARCHY: Record<Role, number> = { admin: 4, moderator: 3, member: 2, guest: 1 };
export function hasMinRole(userRole: Role, requiredRole: Role): boolean { return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]; }
export function canAccess(userRole: Role, resource: string): boolean { const adminOnly = ['settings', 'users', 'audit-logs']; if (adminOnly.includes(resource)) return userRole === 'admin'; const modOnly = ['announcements', 'materials']; if (modOnly.includes(resource)) return hasMinRole(userRole, 'moderator'); return hasMinRole(userRole, 'member'); }
