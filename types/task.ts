export interface Task { id: string; title: string; description?: string; assigneeId: string; assignerId: string; priority: TaskPriority; status: TaskStatus; dueDate?: Date; tags: string[]; projectId?: string; createdAt: Date; completedAt?: Date; }
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done' | 'blocked';
