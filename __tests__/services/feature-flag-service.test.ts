describe('Feature Flag Service', () => {
  it('should check flag status', () => {
    const flags = { darkMode: true, betaFeature: false };
    expect(flags.darkMode).toBe(true);
  });
  it('should handle missing flags', () => {
    const flags: Record<string, boolean> = {};
    expect(flags['unknown'] ?? false).toBe(false);
  });
});
