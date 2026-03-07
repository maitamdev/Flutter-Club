export interface Webhook { id: string; url: string; events: WebhookEvent[]; secret: string; isActive: boolean; lastTriggered?: Date; failureCount: number; createdAt: Date; }
export interface WebhookPayload { event: WebhookEvent; data: Record<string, unknown>; timestamp: string; signature: string; }
export type WebhookEvent = 'member.joined' | 'member.left' | 'session.created' | 'assignment.submitted' | 'quiz.completed';
