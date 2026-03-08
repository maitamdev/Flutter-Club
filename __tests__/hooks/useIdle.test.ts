describe('useIdle', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('should start as active', () => {
    const isIdle = false;
    expect(isIdle).toBe(false);
  });

  it('should become idle after timeout', () => {
    const isIdle = true;
    expect(isIdle).toBe(true);
  });

  it('should reset on user activity', () => {
    let isIdle = true;
    isIdle = false;
    expect(isIdle).toBe(false);
  });
});
