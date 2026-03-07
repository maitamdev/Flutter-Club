export interface Team { id: string; name: string; description: string; leaderId: string; members: TeamMember[]; projectIds: string[]; avatar?: string; createdAt: Date; }
export interface TeamMember { userId: string; role: 'leader' | 'member' | 'mentor'; joinedAt: Date; skills: string[]; }
