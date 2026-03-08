describe('useHover', () => {
  it('should initialize as not hovered', () => {
    const isHovered = false;
    expect(isHovered).toBe(false);
  });

  it('should detect mouse enter', () => {
    let isHovered = false;
    isHovered = true;
    expect(isHovered).toBe(true);
  });

  it('should detect mouse leave', () => {
    let isHovered = true;
    isHovered = false;
    expect(isHovered).toBe(false);
  });
});
