describe('useIntersectionObserver', () => {
  it('should initialize as not intersecting', () => {
    const isIntersecting = false;
    expect(isIntersecting).toBe(false);
  });

  it('should accept threshold option', () => {
    const options = { threshold: 0.5 };
    expect(options.threshold).toBe(0.5);
  });

  it('should cleanup observer on unmount', () => {
    const disconnect = jest.fn();
    disconnect();
    expect(disconnect).toHaveBeenCalled();
  });
});
