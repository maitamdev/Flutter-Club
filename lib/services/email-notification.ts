interface EmailPayload { to: string; subject: string; body: string; template?: string; data?: Record<string, unknown>; }
class EmailNotificationService {
  private queue: EmailPayload[] = [];
  async send(payload: EmailPayload): Promise<boolean> { try { this.queue.push(payload); console.log(`Email queued: ${payload.subject} -> ${payload.to}`); return true; } catch { return false; } }
  async sendBatch(payloads: EmailPayload[]): Promise<{ sent: number; failed: number }> { let sent = 0; for (const p of payloads) { if (await this.send(p)) sent++; } return { sent, failed: payloads.length - sent }; }
  getQueueLength(): number { return this.queue.length; }
}
export const emailService = new EmailNotificationService();
