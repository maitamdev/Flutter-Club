import { uniqueBy, groupBy, chunk, flatten, sortByKey, intersection } from '@/lib/utils/array';

describe('Array Utils', () => {
  describe('chunk', () => {
    it('should split array into chunks', () => {
      const result = chunk([1, 2, 3, 4, 5], 2);
      expect(result).toEqual([[1, 2], [3, 4], [5]]);
    });
    it('should handle empty array', () => {
      expect(chunk([], 2)).toEqual([]);
    });
  });

  describe('uniqueBy', () => {
    it('should remove duplicates by key', () => {
      const items = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 1, name: 'C' }];
      const result = uniqueBy(items, 'id');
      expect(result).toHaveLength(2);
    });
  });

  describe('groupBy', () => {
    it('should group items by key', () => {
      const items = [{ type: 'a', val: 1 }, { type: 'b', val: 2 }, { type: 'a', val: 3 }];
      const result = groupBy(items, 'type');
      expect(Object.keys(result)).toHaveLength(2);
      expect(result['a']).toHaveLength(2);
    });
  });
});
