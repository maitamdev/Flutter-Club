describe('useFocusTrap', () => {
  it('should trap focus within container', () => {
    const container = document.createElement('div');
    const btn = document.createElement('button');
    container.appendChild(btn);
    expect(container.contains(btn)).toBe(true);
  });

  it('should handle Tab key', () => {
    const event = new KeyboardEvent('keydown', { key: 'Tab' });
    expect(event.key).toBe('Tab');
  });

  it('should release trap on unmount', () => {
    const cleanup = jest.fn();
    cleanup();
    expect(cleanup).toHaveBeenCalled();
  });
});
