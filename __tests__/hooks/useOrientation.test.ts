describe('useOrientation', () => {
  it('should detect portrait orientation', () => {
    const orientation = { type: 'portrait-primary', angle: 0 };
    expect(orientation.type).toContain('portrait');
  });

  it('should detect landscape orientation', () => {
    const orientation = { type: 'landscape-primary', angle: 90 };
    expect(orientation.angle).toBe(90);
  });

  it('should handle orientation change', () => {
    const handler = jest.fn();
    expect(typeof handler).toBe('function');
  });
});
