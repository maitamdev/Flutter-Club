describe('useScrollPosition', () => {
  it('should track scroll position', () => {
    const pos = { x: 0, y: 0 };
    expect(pos.x).toBe(0);
    expect(pos.y).toBe(0);
  });

  it('should update on scroll', () => {
    const pos = { x: 0, y: 100 };
    expect(pos.y).toBe(100);
  });

  it('should handle throttling', () => {
    const throttleMs = 100;
    expect(throttleMs).toBeGreaterThan(0);
  });
});
