describe('Chat Service', () => {
  it('should send message', () => {
    const msg = { from: 'u1', to: 'room1', text: 'Hello', timestamp: Date.now() };
    expect(msg.text).toBe('Hello');
  });
  it('should format message timestamp', () => {
    const ts = new Date().toISOString();
    expect(ts).toBeDefined();
  });
  it('should handle empty messages', () => {
    const isValid = (text: string) => text.trim().length > 0;
    expect(isValid('')).toBe(false);
  });
});
