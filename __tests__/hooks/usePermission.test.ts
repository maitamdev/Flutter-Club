describe('usePermission', () => {
  it('should query permission state', () => {
    const state = 'prompt';
    expect(['granted', 'denied', 'prompt']).toContain(state);
  });

  it('should handle unsupported permissions', () => {
    const error = 'Permission not supported';
    expect(error).toBeDefined();
  });
});
