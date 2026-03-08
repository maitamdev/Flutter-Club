// Quiz type guards
export interface Quiz { id: string; title: string; questions: unknown[]; timeLimit: number; }
export function isQuiz(obj: unknown): obj is Quiz { return typeof obj === 'object' && obj !== null && 'id' in obj && 'title' in obj && 'questions' in obj; }
export function hasTimeLimit(quiz: Quiz): boolean { return quiz.timeLimit > 0; }
