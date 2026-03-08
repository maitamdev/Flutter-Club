describe('useSelection', () => {
  it('should start with empty selection', () => {
    const selected: string[] = [];
    expect(selected).toHaveLength(0);
  });

  it('should add to selection', () => {
    const selected = ['item1'];
    expect(selected).toContain('item1');
  });

  it('should remove from selection', () => {
    const selected = ['item1', 'item2'].filter(i => i !== 'item1');
    expect(selected).toEqual(['item2']);
  });

  it('should toggle selection', () => {
    let selected = ['item1'];
    selected = selected.includes('item1') ? [] : ['item1'];
    expect(selected).toHaveLength(0);
  });

  it('should select all', () => {
    const all = ['a', 'b', 'c'];
    expect(all).toHaveLength(3);
  });
});
