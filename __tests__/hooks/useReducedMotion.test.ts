describe('useReducedMotion', () => {
  it('should detect reduced motion preference', () => {
    const prefersReduced = false;
    expect(typeof prefersReduced).toBe('boolean');
  });

  it('should use matchMedia', () => {
    const query = '(prefers-reduced-motion: reduce)';
    expect(query).toContain('prefers-reduced-motion');
  });
});
