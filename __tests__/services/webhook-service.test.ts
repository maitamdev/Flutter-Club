describe('Webhook Service', () => {
  it('should create webhook config', () => {
    const webhook = { url: 'https://api.example.com/hook', events: ['create', 'update'] };
    expect(webhook.events).toContain('create');
  });
  it('should validate webhook URL', () => {
    const isValid = (url: string) => url.startsWith('https://');
    expect(isValid('https://example.com')).toBe(true);
    expect(isValid('http://example.com')).toBe(false);
  });
});
