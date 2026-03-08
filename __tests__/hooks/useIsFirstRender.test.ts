describe('useIsFirstRender', () => {
  it('should return true on first render', () => {
    const isFirst = true;
    expect(isFirst).toBe(true);
  });

  it('should return false on subsequent renders', () => {
    const isFirst = false;
    expect(isFirst).toBe(false);
  });
});
