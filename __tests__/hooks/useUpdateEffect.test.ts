describe('useUpdateEffect', () => {
  it('should not run on first render', () => {
    const effect = jest.fn();
    expect(effect).not.toHaveBeenCalled();
  });

  it('should run on updates', () => {
    const effect = jest.fn();
    effect();
    expect(effect).toHaveBeenCalledTimes(1);
  });
});
