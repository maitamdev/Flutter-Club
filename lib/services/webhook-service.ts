interface WebhookConfig { id: string; url: string; events: string[]; secret: string; active: boolean; }
class WebhookService {
  private hooks: WebhookConfig[] = [];
  register(config: WebhookConfig): void { this.hooks.push(config); }
  async trigger(event: string, payload: Record<string, unknown>): Promise<{ success: number; failed: number }> {
    const matching = this.hooks.filter(h => h.active && h.events.includes(event));
    let success = 0;
    for (const hook of matching) {
      try { await fetch(hook.url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Webhook-Secret': hook.secret }, body: JSON.stringify({ event, data: payload, timestamp: new Date().toISOString() }) }); success++; }
      catch { console.error(`Webhook failed: ${hook.url}`); }
    }
    return { success, failed: matching.length - success };
  }
  getHooks(): WebhookConfig[] { return this.hooks; }
}
export const webhookService = new WebhookService();
