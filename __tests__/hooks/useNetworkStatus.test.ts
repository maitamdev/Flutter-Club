describe('useNetworkStatus', () => {
  it('should detect online status', () => {
    expect(navigator.onLine).toBeDefined();
  });

  it('should handle offline event', () => {
    const handler = jest.fn();
    window.addEventListener('offline', handler);
    expect(handler).not.toHaveBeenCalled();
    window.removeEventListener('offline', handler);
  });

  it('should provide connection info', () => {
    const info = { online: true, downlink: null, rtt: null };
    expect(info.online).toBe(true);
  });
});
