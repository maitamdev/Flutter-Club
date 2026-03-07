import { passwordSchema, changePasswordSchema } from '@/lib/validations/password';

describe('Password Validation', () => {
  it('should validate strong password', () => {
    const result = passwordSchema.safeParse('MyStr0ng!Pass');
    expect(result.success).toBe(true);
  });

  it('should reject weak password', () => {
    const result = passwordSchema.safeParse('123');
    expect(result.success).toBe(false);
  });

  it('should validate change password form', () => {
    const data = {
      currentPassword: 'OldPass123!',
      newPassword: 'NewPass456!',
      confirmPassword: 'NewPass456!',
    };
    const result = changePasswordSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});
