// Member type guards
export interface Member { id: string; name: string; role: string; status: string; }
export function isMember(obj: unknown): obj is Member { return typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj && 'role' in obj; }
export function isAdmin(member: Member): boolean { return member.role === 'admin'; }
export function isActiveMember(member: Member): boolean { return member.status === 'active'; }
