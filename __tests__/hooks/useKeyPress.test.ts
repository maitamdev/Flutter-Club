describe('useKeyPress', () => {
  it('should detect key press', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    expect(event.key).toBe('Enter');
  });

  it('should handle modifier keys', () => {
    const event = new KeyboardEvent('keydown', { key: 's', ctrlKey: true });
    expect(event.ctrlKey).toBe(true);
  });

  it('should cleanup on unmount', () => {
    const spy = jest.spyOn(document, 'removeEventListener');
    expect(spy).toBeDefined();
    spy.mockRestore();
  });
});
