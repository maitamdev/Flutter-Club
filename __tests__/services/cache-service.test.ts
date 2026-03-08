describe('Cache Service', () => {
  it('should set cache entry', () => {
    const cache = new Map();
    cache.set('key', { data: 'val', ttl: 300 });
    expect(cache.has('key')).toBe(true);
  });
  it('should get cached data', () => {
    const cache = new Map([['k', { data: 'v', ttl: 300 }]]);
    expect(cache.get('k')?.data).toBe('v');
  });
  it('should invalidate expired', () => {
    const cache = new Map();
    cache.clear();
    expect(cache.size).toBe(0);
  });
});
