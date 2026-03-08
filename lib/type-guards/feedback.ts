// Feedback type guards
export interface Feedback { id: string; userId: string; rating: number; comment: string; }
export function isFeedback(obj: unknown): obj is Feedback { return typeof obj === 'object' && obj !== null && 'id' in obj && 'rating' in obj; }
export function isPositiveFeedback(fb: Feedback): boolean { return fb.rating >= 4; }
