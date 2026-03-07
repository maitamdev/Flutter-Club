interface CertificateData { recipientName: string; title: string; description: string; date: Date; skills: string[]; verificationCode: string; }
class CertificateGeneratorService {
  generateVerificationCode(): string { return `CERT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`; }
  async generateHTML(data: CertificateData): Promise<string> {
    return `<div style="border:3px solid gold;padding:40px;text-align:center;font-family:Georgia">
      <h1 style="color:#1e3a8a">CHá»¨NG NHáº¬N</h1><h2>${data.title}</h2>
      <p>Cáº¥p cho: <strong>${data.recipientName}</strong></p><p>${data.description}</p>
      <p>Ká»¹ nÄƒng: ${data.skills.join(', ')}</p>
      <p>NgÃ y cáº¥p: ${data.date.toLocaleDateString('vi-VN')}</p>
      <p style="font-size:10px">MÃ£ xÃ¡c thá»±c: ${data.verificationCode}</p></div>`;
  }
  verify(code: string): boolean { return /^CERT-[A-Z0-9]+-[A-Z0-9]+$/.test(code); }
}
export const certificateGenerator = new CertificateGeneratorService();
