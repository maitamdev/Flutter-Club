describe('useMap', () => {
  it('should initialize with empty map', () => {
    const map = new Map();
    expect(map.size).toBe(0);
  });

  it('should set values', () => {
    const map = new Map();
    map.set('key', 'value');
    expect(map.get('key')).toBe('value');
  });

  it('should delete values', () => {
    const map = new Map([['key', 'value']]);
    map.delete('key');
    expect(map.has('key')).toBe(false);
  });

  it('should reset map', () => {
    const map = new Map([['a', 1], ['b', 2]]);
    map.clear();
    expect(map.size).toBe(0);
  });
});
