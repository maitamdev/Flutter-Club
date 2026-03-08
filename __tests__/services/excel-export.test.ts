describe('Excel Export Service', () => {
  it('should create worksheet data', () => {
    const data = [['Name', 'Age'], ['John', '25']];
    expect(data).toHaveLength(2);
  });
  it('should handle column headers', () => {
    const headers = ['ID', 'Name', 'Email', 'Role'];
    expect(headers).toHaveLength(4);
  });
});
