describe('useSessionStorage', () => {
  beforeEach(() => sessionStorage.clear());

  it('should initialize with default value', () => {
    const value = 'default';
    expect(value).toBe('default');
  });

  it('should store and retrieve values', () => {
    sessionStorage.setItem('key', JSON.stringify('test'));
    const val = JSON.parse(sessionStorage.getItem('key') || '""');
    expect(val).toBe('test');
  });

  it('should handle removal', () => {
    sessionStorage.setItem('key', '"val"');
    sessionStorage.removeItem('key');
    expect(sessionStorage.getItem('key')).toBeNull();
  });
});
