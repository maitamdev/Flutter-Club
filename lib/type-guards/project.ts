// Project type guards
export interface Project { id: string; name: string; status: string; members: string[]; }
export function isProject(obj: unknown): obj is Project { return typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj && 'members' in obj; }
export function isActiveProject(project: Project): boolean { return project.status === 'active'; }
