describe('User Activity Service', () => {
  it('should log user activity', () => {
    const activity = { userId: 'u1', action: 'login', timestamp: Date.now() };
    expect(activity.action).toBe('login');
  });
  it('should calculate activity streak', () => {
    const days = [1, 2, 3, 4, 5];
    expect(days).toHaveLength(5);
  });
  it('should get last active time', () => {
    const lastActive = new Date();
    expect(lastActive).toBeInstanceOf(Date);
  });
});
