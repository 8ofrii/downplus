import { DoctorMatchService } from './doctor-match.service';

describe('DoctorMatchService (Matrix Matching Engine)', () => {
  let service: DoctorMatchService;

  const mockDoctors = [
    {
      id: 'doc-1',
      fullName: 'د. هاني مصطفى',
      specialty: 'Pediatric Physiotherapy',
      city: 'Giza',
      governorateOrState: 'Giza',
      consultationFee: 400,
      experienceYearsPediatric: 10, // rating = 1.0
      downSyndromeExperienceScore: 5.0, // dsExperience = 1.0
      tags: ['hypotonia', 'early_intervention'],
      isActive: true,
    },
    {
      id: 'doc-2',
      fullName: 'د. نورهان المصري',
      specialty: 'Speech Therapist',
      city: 'Cairo',
      governorateOrState: 'Cairo',
      consultationFee: 350,
      experienceYearsPediatric: 5, // rating = 0.5
      downSyndromeExperienceScore: 4.0, // dsExperience = 0.8
      tags: ['speech_delay'],
      isActive: true,
    },
  ];

  const mockPrisma = {
    doctorProfile: {
      findMany: jest.fn().mockResolvedValue(mockDoctors),
    },
  } as any;

  beforeEach(() => {
    service = new DoctorMatchService(mockPrisma);
  });

  it('should rank doctor higher when specialty and city both match perfectly', async () => {
    const results = await service.findMatches({
      specialtyQuery: 'Physiotherapy',
      city: 'Giza',
      limit: 2,
    });

    expect(results.length).toBe(2);
    // Doctor 1:
    // Specialty: 1.0 * 0.4 = 0.4
    // Location: 1.0 * 0.25 = 0.25
    // DS Exp: (5/5) * 0.2 = 0.2
    // Rating: (10/10) * 0.15 = 0.15
    // Total = 0.4 + 0.25 + 0.2 + 0.15 = 1.0
    expect(results[0].doctor_id).toBe('doc-1');
    expect(results[0].match_score).toBe(1);
    expect(results[0].match_score).toBeGreaterThan(results[1].match_score);
  });
});
