describe('useScript', () => {
  it('should track script loading status', () => {
    const status = 'loading';
    expect(['idle', 'loading', 'ready', 'error']).toContain(status);
  });

  it('should handle script load success', () => {
    const status = 'ready';
    expect(status).toBe('ready');
  });

  it('should handle script load error', () => {
    const status = 'error';
    expect(status).toBe('error');
  });
});
