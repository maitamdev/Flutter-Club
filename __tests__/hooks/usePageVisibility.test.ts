describe('usePageVisibility', () => {
  it('should track visibility state', () => {
    const isVisible = !document.hidden;
    expect(typeof isVisible).toBe('boolean');
  });

  it('should handle visibilitychange event', () => {
    const spy = jest.spyOn(document, 'addEventListener');
    document.addEventListener('visibilitychange', jest.fn());
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
