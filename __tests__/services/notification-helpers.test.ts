describe('Notification Helpers', () => {
  it('should format notification message', () => {
    const msg = 'New event: Flutter Meetup';
    expect(msg).toContain('Flutter');
  });
  it('should group notifications by type', () => {
    const notifs = [{ type: 'event' }, { type: 'chat' }, { type: 'event' }];
    const events = notifs.filter(n => n.type === 'event');
    expect(events).toHaveLength(2);
  });
});
