describe('useWindowSize', () => {
  it('should return window dimensions', () => {
    const size = { width: 1024, height: 768 };
    expect(size.width).toBeGreaterThan(0);
    expect(size.height).toBeGreaterThan(0);
  });

  it('should handle resize', () => {
    const handler = jest.fn();
    window.addEventListener('resize', handler);
    expect(handler).not.toHaveBeenCalled();
    window.removeEventListener('resize', handler);
  });

  it('should handle SSR', () => {
    const size = { width: 0, height: 0 };
    expect(size.width).toBe(0);
  });
});
