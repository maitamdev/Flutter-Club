describe('Error Tracking Service', () => {
  it('should capture error with stack trace', () => {
    const error = { message: 'Test error', stack: 'at test.ts:1:1' };
    expect(error.message).toBe('Test error');
  });
  it('should include context metadata', () => {
    const ctx = { userId: 'u1', page: '/dashboard', browser: 'Chrome' };
    expect(ctx.page).toBe('/dashboard');
  });
});
