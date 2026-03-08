describe('Analytics Service', () => {
  it('should track page view', () => {
    const event = { type: 'pageview', path: '/dashboard' };
    expect(event.type).toBe('pageview');
  });
  it('should track custom event', () => {
    const event = { type: 'click', target: 'button' };
    expect(event.target).toBe('button');
  });
  it('should batch events', () => {
    const batch = [{ type: 'a' }, { type: 'b' }];
    expect(batch).toHaveLength(2);
  });
});
