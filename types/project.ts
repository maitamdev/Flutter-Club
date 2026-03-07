export interface Project { id: string; name: string; description: string; status: ProjectStatus; teamMembers: string[]; leaderId: string; techStack: string[]; repoUrl?: string; demoUrl?: string; startDate: Date; deadline?: Date; progress: number; tags: string[]; }
export type ProjectStatus = 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold' | 'cancelled';
