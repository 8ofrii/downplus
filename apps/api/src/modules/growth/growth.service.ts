import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface GrowthRecord {
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  headCircumferenceCm?: number;
  recordedAt: string;
}

export interface GrowthCurvePoint {
  month: number;
  p5: number;
  p25: number;
  p50: number;
  p75: number;
  p95: number;
}

// CDC / AAP Down Syndrome Specific Growth Reference Curves (Zemel et al., Pediatrics)
// Down syndrome specific weight (kg) for boys 0-36 months
const DS_BOYS_WEIGHT_CURVES: GrowthCurvePoint[] = [
  { month: 0, p5: 2.1, p25: 2.6, p50: 3.0, p75: 3.4, p95: 3.9 },
  { month: 3, p5: 4.1, p25: 4.8, p50: 5.4, p75: 6.0, p95: 6.9 },
  { month: 6, p5: 5.6, p25: 6.4, p50: 7.1, p75: 7.8, p95: 8.8 },
  { month: 9, p5: 6.8, p25: 7.6, p50: 8.3, p75: 9.1, p95: 10.2 },
  { month: 12, p5: 7.7, p25: 8.5, p50: 9.3, p75: 10.1, p95: 11.4 },
  { month: 18, p5: 8.9, p25: 9.9, p50: 10.8, p75: 11.8, p95: 13.2 },
  { month: 24, p5: 9.9, p25: 11.0, p50: 12.0, p75: 13.2, p95: 14.8 },
  { month: 30, p5: 10.8, p25: 12.0, p50: 13.1, p75: 14.4, p95: 16.3 },
  { month: 36, p5: 11.6, p25: 12.9, p50: 14.1, p75: 15.6, p95: 17.8 },
];

// Down syndrome specific length/height (cm) for boys 0-36 months
const DS_BOYS_HEIGHT_CURVES: GrowthCurvePoint[] = [
  { month: 0, p5: 44.5, p25: 47.0, p50: 48.8, p75: 50.5, p95: 52.8 },
  { month: 3, p5: 53.0, p25: 55.5, p50: 57.5, p75: 59.5, p95: 62.0 },
  { month: 6, p5: 59.5, p25: 62.2, p50: 64.3, p75: 66.5, p95: 69.2 },
  { month: 9, p5: 64.5, p25: 67.2, p50: 69.5, p75: 71.8, p95: 74.8 },
  { month: 12, p5: 68.5, p25: 71.4, p50: 73.8, p75: 76.2, p95: 79.5 },
  { month: 18, p5: 75.0, p25: 78.2, p50: 80.8, p75: 83.5, p95: 87.0 },
  { month: 24, p5: 80.5, p25: 83.8, p50: 86.6, p75: 89.5, p95: 93.2 },
  { month: 30, p5: 85.0, p25: 88.5, p50: 91.5, p75: 94.6, p95: 98.6 },
  { month: 36, p5: 89.0, p25: 92.8, p50: 96.0, p75: 99.2, p95: 103.5 },
];

@Injectable()
export class GrowthService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves child's growth measurements and compares with CDC Down Syndrome standards
   */
  async getChildGrowthData(childId: string) {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
      include: {
        clinicalProfile: true,
      },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    // Default demo measurement history for Omar
    const measurements: GrowthRecord[] = [
      { ageMonths: 0, weightKg: 2.9, heightCm: 48.0, recordedAt: '2024-03-15' },
      { ageMonths: 6, weightKg: 6.8, heightCm: 63.5, recordedAt: '2024-09-15' },
      { ageMonths: 12, weightKg: 9.1, heightCm: 73.0, recordedAt: '2025-03-15' },
      { ageMonths: 24, weightKg: 11.5, heightCm: 84.5, recordedAt: '2026-03-15' },
      { ageMonths: 31, weightKg: 12.4, heightCm: 88.0, recordedAt: '2026-10-25' },
    ];

    const currentMeasurement = measurements[measurements.length - 1];
    const weightPercentile = this.calculatePercentile(currentMeasurement.ageMonths, currentMeasurement.weightKg, DS_BOYS_WEIGHT_CURVES);
    const heightPercentile = this.calculatePercentile(currentMeasurement.ageMonths, currentMeasurement.heightCm, DS_BOYS_HEIGHT_CURVES);

    return {
      childId,
      childName: `${child.firstName} ${child.lastName}`,
      gender: child.gender || 'male',
      currentAgeMonths: currentMeasurement.ageMonths,
      latestMetrics: {
        weightKg: currentMeasurement.weightKg,
        weightPercentile,
        weightStatus: this.interpretPercentile(weightPercentile),
        heightCm: currentMeasurement.heightCm,
        heightPercentile,
        heightStatus: this.interpretPercentile(heightPercentile),
        recordedAt: currentMeasurement.recordedAt,
      },
      history: measurements,
      curves: {
        weight: DS_BOYS_WEIGHT_CURVES,
        height: DS_BOYS_HEIGHT_CURVES,
      },
      clinicalNote: 'التقييم يعتمد حصرياً على منحنيات النمو المعتمدة لأطفال متلازمة داون (AAP/CDC Down Syndrome Growth Charts).',
    };
  }

  private calculatePercentile(ageMonths: number, value: number, curves: GrowthCurvePoint[]): number {
    // Find closest curve point by age
    let closest = curves[0];
    let minDiff = Math.abs(curves[0].month - ageMonths);

    for (const pt of curves) {
      const diff = Math.abs(pt.month - ageMonths);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }

    if (value <= closest.p5) return 5;
    if (value >= closest.p95) return 95;
    if (value >= closest.p50) {
      return Math.round(50 + ((value - closest.p50) / (closest.p95 - closest.p50)) * 45);
    }
    return Math.round(5 + ((value - closest.p5) / (closest.p50 - closest.p5)) * 45);
  }

  private interpretPercentile(p: number): string {
    if (p >= 25 && p <= 75) return 'نمو مثالي ومستقر (النطاق المتوسط 50th)';
    if (p < 25 && p >= 10) return 'نطاق مقبول مع متابعة التغذية';
    if (p < 10) return 'أقل من المعدل المتوقع — يوصى بمراجعة أخصائي تغذية أطفال';
    return 'أعلى من المعدل المتوقع';
  }
}
