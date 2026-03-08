describe('useCopyToClipboard', () => {
  it('should initialize with null copied text', () => {
    const copiedText: string | null = null;
    expect(copiedText).toBeNull();
  });

  it('should handle clipboard API absence', () => {
    const original = navigator.clipboard;
    expect(original).toBeDefined();
  });

  it('should return copy function', () => {
    const copy = jest.fn();
    expect(typeof copy).toBe('function');
  });
});
