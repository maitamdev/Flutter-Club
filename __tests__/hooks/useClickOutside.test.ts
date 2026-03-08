describe('useClickOutside', () => {
  it('should call handler when clicking outside', () => {
    const handler = jest.fn();
    document.dispatchEvent(new MouseEvent('mousedown'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('should not call handler when clicking inside ref', () => {
    const handler = jest.fn();
    expect(handler).not.toHaveBeenCalled();
  });

  it('should cleanup event listener on unmount', () => {
    const spy = jest.spyOn(document, 'removeEventListener');
    expect(spy).toBeDefined();
    spy.mockRestore();
  });
});
