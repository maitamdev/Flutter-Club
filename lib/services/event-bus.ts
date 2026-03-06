// Event emitter for client-side events
type EventHandler = (...args: any[]) => void

class EventBus {
  private events: Map<string, EventHandler[]> = new Map()

  on(event: string, handler: EventHandler) {
    const handlers = this.events.get(event) || []
    handlers.push(handler)
    this.events.set(event, handlers)
    return () => this.off(event, handler)
  }

  off(event: string, handler: EventHandler) {
    const handlers = this.events.get(event) || []
    this.events.set(event, handlers.filter(h => h !== handler))
  }

  emit(event: string, ...args: any[]) {
    const handlers = this.events.get(event) || []
    handlers.forEach(h => h(...args))
  }

  clear() { this.events.clear() }
}

export const eventBus = new EventBus()

// Event names
export const EVENTS = {
  NOTIFICATION_RECEIVED: 'notification:received',
  USER_UPDATED: 'user:updated',
  THEME_CHANGED: 'theme:changed',
  SESSION_STARTED: 'session:started',
  ATTENDANCE_OPENED: 'attendance:opened',
}
