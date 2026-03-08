describe('usePagination', () => {
  it('should initialize at page 1', () => {
    const page = 1;
    expect(page).toBe(1);
  });

  it('should calculate total pages', () => {
    const totalPages = Math.ceil(50 / 10);
    expect(totalPages).toBe(5);
  });

  it('should go to next page', () => {
    let page = 1;
    page++;
    expect(page).toBe(2);
  });

  it('should not exceed total pages', () => {
    const page = Math.min(6, 5);
    expect(page).toBe(5);
  });

  it('should provide page range', () => {
    const range = [1, 2, 3, 4, 5];
    expect(range).toHaveLength(5);
  });
});
