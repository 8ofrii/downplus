import { EncryptionService } from './encryption.service';
import { ConfigService } from '@nestjs/config';

describe('EncryptionService (AES-256-CBC & Secure Tokens)', () => {
  let service: EncryptionService;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(() => {
    mockConfigService = {
      get: jest.fn().mockReturnValue('test-secret-encryption-key-32-chars-long!'),
    };
    service = new EncryptionService(mockConfigService as ConfigService);
  });

  it('should encrypt and decrypt string accurately', () => {
    const plainText = 'Sensitive Child Clinical Record #49281';
    const encrypted = service.encrypt(plainText);

    expect(encrypted).not.toBe(plainText);
    expect(encrypted).toContain(':'); // IV separator

    const decrypted = service.decrypt(encrypted);
    expect(decrypted).toBe(plainText);
  });

  it('should generate secure random tokens with prefix', () => {
    const token1 = service.generateSecureToken(16);
    const token2 = service.generateSecureToken(16);

    expect(token1).toHaveLength(32); // 16 bytes = 32 hex chars
    expect(token2).toHaveLength(32);
    expect(token1).not.toBe(token2);
  });
});
