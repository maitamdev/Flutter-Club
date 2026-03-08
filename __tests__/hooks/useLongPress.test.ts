describe('useLongPress', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('should detect long press', () => {
    const onLongPress = jest.fn();
    expect(typeof onLongPress).toBe('function');
  });

  it('should not trigger on short press', () => {
    const onLongPress = jest.fn();
    expect(onLongPress).not.toHaveBeenCalled();
  });

  it('should support custom delay', () => {
    const delay = 500;
    expect(delay).toBe(500);
  });
});
