import { profileSchema } from '@/lib/validations/profile';

describe('Profile Validation', () => {
  it('should validate correct profile data', () => {
    const validData = { displayName: 'Nguyen Van A', bio: 'Flutter developer' };
    const result = profileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject empty display name', () => {
    const invalidData = { displayName: '', bio: 'Test' };
    const result = profileSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
