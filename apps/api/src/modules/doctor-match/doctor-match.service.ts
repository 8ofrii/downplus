import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface DoctorMatchCriteria {
  specialtyQuery?: string;
  city?: string;
  governorate?: string;
  tags?: string[];
  limit?: number;
}

export interface MatchedDoctorResult {
  doctor_id: string;
  name: string;
  specialty: string;
  city: string;
  governorate: string;
  consultation_fee: number;
  experience_years: number;
  match_score: number;
  tags: string[];
}

@Injectable()
export class DoctorMatchService {
  constructor(private prisma: PrismaService) {}

  /**
   * Matches doctors using the specified formula:
   * Score = (Specialty Match * 0.4) + (Location Proximity * 0.25) + (Down Syndrome Experience * 0.2) + (Rating * 0.15)
   */
  async findMatches(criteria: DoctorMatchCriteria): Promise<MatchedDoctorResult[]> {
    const doctors = await this.prisma.doctorProfile.findMany({
      where: {
        isActive: true,
      },
    });

    const scored = doctors.map((doc) => {
      // 1. Specialty Match (0.4 weight)
      let specialtyMatch = 0.5; // baseline
      if (criteria.specialtyQuery) {
        const queryLower = criteria.specialtyQuery.toLowerCase();
        const specialtyLower = doc.specialty.toLowerCase();
        if (specialtyLower.includes(queryLower) || queryLower.includes(specialtyLower)) {
          specialtyMatch = 1.0;
        } else if (doc.tags.some((t) => t.toLowerCase().includes(queryLower))) {
          specialtyMatch = 0.8;
        }
      }

      // 2. Location Proximity (0.25 weight)
      let locationProximity = 0.4;
      if (criteria.city && doc.city.toLowerCase() === criteria.city.toLowerCase()) {
        locationProximity = 1.0;
      } else if (
        criteria.governorate &&
        doc.governorateOrState.toLowerCase() === criteria.governorate.toLowerCase()
      ) {
        locationProximity = 0.8;
      }

      // 3. Down Syndrome Experience (0.2 weight, max 5.0 scaled to 0..1)
      const dsExpRaw = Number(doc.downSyndromeExperienceScore) || 5.0;
      const dsExperience = Math.min(1.0, dsExpRaw / 5.0);

      // 4. Rating / Seniority (0.15 weight, 10+ years pediatric = 1.0)
      const rating = Math.min(1.0, (doc.experienceYearsPediatric || 5) / 10);

      const totalScore =
        specialtyMatch * 0.4 +
        locationProximity * 0.25 +
        dsExperience * 0.2 +
        rating * 0.15;

      return {
        doctor_id: doc.id,
        name: doc.fullName,
        specialty: doc.specialty,
        city: doc.city,
        governorate: doc.governorateOrState,
        consultation_fee: Number(doc.consultationFee),
        experience_years: doc.experienceYearsPediatric,
        match_score: Math.round(totalScore * 100) / 100,
        tags: doc.tags,
      };
    });

    // Sort descending by score
    scored.sort((a, b) => b.match_score - a.match_score);

    return scored.slice(0, criteria.limit || 5);
  }
}
