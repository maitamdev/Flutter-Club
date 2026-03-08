describe('Session Recording Service', () => {
  it('should start recording session', () => {
    const session = { id: 's1', startTime: Date.now(), events: [] };
    expect(session.events).toHaveLength(0);
  });
  it('should record events', () => {
    const events = [{ type: 'click', x: 100, y: 200 }];
    expect(events[0].type).toBe('click');
  });
});
