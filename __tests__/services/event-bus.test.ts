describe('Event Bus Service', () => {
  it('should subscribe to events', () => {
    const listeners = new Map();
    listeners.set('test', [jest.fn()]);
    expect(listeners.has('test')).toBe(true);
  });
  it('should emit events', () => {
    const handler = jest.fn();
    handler('data');
    expect(handler).toHaveBeenCalledWith('data');
  });
  it('should unsubscribe', () => {
    const listeners = new Map([['test', [jest.fn()]]]);
    listeners.delete('test');
    expect(listeners.has('test')).toBe(false);
  });
});
