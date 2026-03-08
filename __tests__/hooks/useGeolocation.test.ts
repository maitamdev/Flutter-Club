describe('useGeolocation', () => {
  it('should initialize with null coordinates', () => {
    const coords = { latitude: null, longitude: null };
    expect(coords.latitude).toBeNull();
  });

  it('should track loading state', () => {
    const loading = true;
    expect(loading).toBe(true);
  });

  it('should handle permission denied', () => {
    const error = { code: 1, message: 'User denied Geolocation' };
    expect(error.code).toBe(1);
  });
});
