// Assignment type guards
export interface Assignment { id: string; title: string; dueDate: Date; status: string; }
export function isAssignment(obj: unknown): obj is Assignment { return typeof obj === 'object' && obj !== null && 'id' in obj && 'dueDate' in obj; }
export function isOverdue(assignment: Assignment): boolean { return new Date() > new Date(assignment.dueDate) && assignment.status !== 'completed'; }
