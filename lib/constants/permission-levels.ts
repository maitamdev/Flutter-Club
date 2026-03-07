export const PERMISSION_LEVELS = {
  GUEST: 0, MEMBER: 1, TRAINER: 2, ADMIN: 3, SUPER_ADMIN: 4,
} as const;
export const ROLE_LABELS: Record<string, string> = {
  guest: 'KhÃ¡ch', member: 'ThÃ nh viÃªn', trainer: 'Giáº£ng viÃªn', admin: 'Quáº£n trá»‹ viÃªn', super_admin: 'Super Admin',
};
export const ROLE_COLORS: Record<string, string> = {
  guest: 'gray', member: 'blue', trainer: 'green', admin: 'purple', super_admin: 'red',
};
export type PermissionLevel = (typeof PERMISSION_LEVELS)[keyof typeof PERMISSION_LEVELS];
