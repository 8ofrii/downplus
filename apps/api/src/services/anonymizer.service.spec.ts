import { AnonymizerService } from './anonymizer.service';

describe('AnonymizerService (GDPR & AI Anonymization Boundary)', () => {
  let service: AnonymizerService;
  const mockPrisma = {} as any;

  beforeEach(() => {
    service = new AnonymizerService(mockPrisma);
  });

  describe('sanitizeUserMessage', () => {
    it('should scrub child first name and replace with "Patient"', () => {
      const input = 'عمر عنده الآن سنتين ونصف ولسه مش بيمشي';
      const output = service.sanitizeUserMessage(input, 'عمر', 'أحمد');
      expect(output).toContain('Patient');
      expect(output).not.toContain('عمر');
    });

    it('should strip phone numbers in international and local formats', () => {
      const input = 'يرجى التواصل على رقم 01012345678 أو +201199887766 للتنسيق';
      const output = service.sanitizeUserMessage(input);
      expect(output).not.toContain('01012345678');
      expect(output).not.toContain('+201199887766');
      expect(output).toContain('[PHONE REDACTED]');
    });

    it('should strip email addresses', () => {
      const input = 'تقرير الطفل موجود على parent.omar@example.com';
      const output = service.sanitizeUserMessage(input);
      expect(output).not.toContain('parent.omar@example.com');
      expect(output).toContain('[EMAIL REDACTED]');
    });

    it('should strip Egyptian 14-digit National IDs', () => {
      const input = 'الرقم القومي للطفل هو 32403150109988';
      const output = service.sanitizeUserMessage(input);
      expect(output).not.toContain('32403150109988');
      expect(output).toContain('[NATIONAL_ID REDACTED]');
    });
  });

  describe('formatSystemPromptContext', () => {
    it('should format purely clinical context with zero PII', () => {
      const context = {
        ageMonths: 30,
        gender: 'male',
        primaryDiagnosis: 'Down Syndrome',
        karyotype: 'Trisomy 21',
        gestationalAgeWeeks: 38,
        comorbidities: ['Repaired VSD', 'Hypothyroidism'],
        activeMedications: [{ drug: 'Eltroxin', dosage: '25mcg', frequency: 'OD' }],
        milestoneSummary: 'Motor: Sits independently',
        recentObservations: ['Low tone noted in ankles'],
      };

      const prompt = service.formatSystemPromptContext(context);

      expect(prompt).toContain('Age: 30 months');
      expect(prompt).toContain('Trisomy 21');
      expect(prompt).toContain('Repaired VSD');
      expect(prompt).toContain('Eltroxin (25mcg, OD)');
      expect(prompt).not.toContain('omar');
      expect(prompt).not.toContain('phone');
    });
  });
});
