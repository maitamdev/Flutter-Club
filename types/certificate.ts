export interface Certificate { id: string; userId: string; type: CertificateType; title: string; description: string; issueDate: Date; expiryDate?: Date; templateId: string; verificationCode: string; skills: string[]; status: 'active' | 'expired' | 'revoked'; }
export type CertificateType = 'completion' | 'achievement' | 'participation' | 'excellence';
