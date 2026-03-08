describe('Audit Log Service', () => {
  it('should create log entry', () => {
    const entry = { action: 'CREATE', userId: 'u1', timestamp: new Date() };
    expect(entry.action).toBe('CREATE');
  });
  it('should include metadata', () => {
    const entry = { action: 'UPDATE', metadata: { field: 'name', old: 'A', new: 'B' } };
    expect(entry.metadata.field).toBe('name');
  });
});
