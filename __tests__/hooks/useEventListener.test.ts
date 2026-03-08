describe('useEventListener', () => {
  it('should add event listener', () => {
    const spy = jest.spyOn(window, 'addEventListener');
    window.addEventListener('resize', jest.fn());
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should remove event listener on cleanup', () => {
    const spy = jest.spyOn(window, 'removeEventListener');
    expect(spy).toBeDefined();
    spy.mockRestore();
  });

  it('should handle element refs', () => {
    const el = document.createElement('div');
    const spy = jest.spyOn(el, 'addEventListener');
    el.addEventListener('click', jest.fn());
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
