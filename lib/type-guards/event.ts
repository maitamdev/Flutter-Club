// Event type guards
import type { ClubEvent } from '@/types/event';
export function isClubEvent(obj: unknown): obj is ClubEvent { return typeof obj === 'object' && obj !== null && 'id' in obj && 'title' in obj && 'type' in obj && 'startDate' in obj; }
export function isUpcomingEvent(event: ClubEvent): boolean { return event.status === 'upcoming'; }
export function isCancelledEvent(event: ClubEvent): boolean { return event.status === 'cancelled'; }
