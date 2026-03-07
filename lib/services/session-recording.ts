interface SessionEvent { type: string; timestamp: number; data: Record<string, unknown>; }
class SessionRecordingService {
  private events: SessionEvent[] = []; private sessionId: string = ''; private startTime = 0;
  start(): void { this.sessionId = crypto.randomUUID(); this.startTime = Date.now(); this.events = []; this.record('session_start', {}); }
  record(type: string, data: Record<string, unknown>): void { this.events.push({ type, timestamp: Date.now() - this.startTime, data }); }
  stop(): { sessionId: string; duration: number; events: SessionEvent[] } { this.record('session_end', {}); return { sessionId: this.sessionId, duration: Date.now() - this.startTime, events: this.events }; }
  getEventCount(): number { return this.events.length; }
}
export const sessionRecording = new SessionRecordingService();
