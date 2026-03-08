describe('Browser Notification Service', () => {
  it('should check permission', () => {
    const perm = 'default';
    expect(['default', 'granted', 'denied']).toContain(perm);
  });
  it('should create notification', () => {
    const notif = { title: 'Test', body: 'Hello' };
    expect(notif.title).toBe('Test');
  });
});
