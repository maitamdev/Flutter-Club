interface PushPayload { title: string; body: string; icon?: string; url?: string; userId?: string; }
class PushNotificationService {
  private supported = typeof window !== 'undefined' && 'Notification' in window;
  async requestPermission(): Promise<boolean> { if (!this.supported) return false; const p = await Notification.requestPermission(); return p === 'granted'; }
  async send(payload: PushPayload): Promise<boolean> {
    if (!this.supported) return false;
    try { new Notification(payload.title, { body: payload.body, icon: payload.icon }); return true; }
    catch { return false; }
  }
  isSupported(): boolean { return this.supported; }
}
export const pushService = new PushNotificationService();
