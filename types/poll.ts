export interface Poll { id: string; question: string; options: PollOption[]; creatorId: string; type: 'single' | 'multiple'; isAnonymous: boolean; expiresAt?: Date; status: 'active' | 'closed'; totalVotes: number; createdAt: Date; }
export interface PollOption { id: string; text: string; votes: number; voters?: string[]; }
