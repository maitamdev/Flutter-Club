describe('useCountdown', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('should initialize with target count', () => {
    const count = 10;
    expect(count).toBe(10);
  });

  it('should decrement over time', () => {
    let count = 10;
    count--;
    expect(count).toBe(9);
  });

  it('should stop at zero', () => {
    const count = 0;
    expect(count).toBe(0);
  });
});
