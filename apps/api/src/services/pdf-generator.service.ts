import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface LifePassportData {
  childId: string;
  childName: string;
  dob: string;
  gender: string;
  bloodType: string;
  diagnosis: string;
  karyotype: string;
  confirmedConditions: string[];
  medications: Array<{ drug: string; dosage: string; frequency: string }>;
  verifiedDoctorName?: string;
  doctorNotes?: string;
  milestonesSummary: Array<{ title: string; domain: string; status: string }>;
  shareUrl: string;
}

@Injectable()
export class PdfGeneratorService {
  private readonly logger = new Logger(PdfGeneratorService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Generates a printable HTML/CSS template of the Down Plus Life Passport
   * Suitable for headless Chrome / Puppeteer PDF rendering or direct web view
   */
  async generateLifePassportHtml(childId: string, shareToken?: string): Promise<string> {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
      include: {
        clinicalProfile: true,
        caseBaseline: {
          include: {
            verifiedByDoctor: {
              include: { doctorProfile: true },
            },
          },
        },
        milestoneProgress: {
          include: { milestone: true },
          where: { status: { in: ['independent', 'mastered_outside'] } },
        },
      },
    });

    if (!child) {
      throw new Error(`Child with ID ${childId} not found`);
    }

    const baselineSummary = (child.caseBaseline?.aiGeneratedSummary as any) || {};
    const conditions: string[] = baselineSummary.extracted_conditions || [];
    const medications = baselineSummary.current_medications || [];

    const doctorProfile = child.caseBaseline?.verifiedByDoctor?.doctorProfile;
    const verifiedDoctorName = doctorProfile ? doctorProfile.fullName : undefined;
    const doctorNotes = child.caseBaseline?.doctorNotes || undefined;

    const milestones = child.milestoneProgress.map((mp) => ({
      title: mp.milestone.titleAr,
      domain: mp.milestone.domain,
      status: mp.status === 'independent' ? 'مستقل بمفرده' : 'متقن تماماً',
    }));

    const shareUrl = shareToken
      ? `https://downplus.health/guest/view?token=${shareToken}`
      : 'https://downplus.health';

    return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>Down Plus Life Passport — ${child.firstName} ${child.lastName}</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body { font-family: 'Cairo', system-ui, -apple-system, sans-serif; color: #0F172A; line-height: 1.5; margin: 0; padding: 24px; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2563EB; padding-bottom: 16px; margin-bottom: 24px; }
    .title-badge { background: #EFF6FF; color: #2563EB; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 13px; display: inline-block; }
    h1 { margin: 8px 0 4px 0; font-size: 26px; color: #1E293B; }
    .meta-sub { color: #64748B; font-size: 14px; }
    .section { margin-bottom: 24px; }
    .section-title { font-size: 16px; font-weight: bold; color: #1E40AF; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 12px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; }
    .card-label { font-size: 12px; color: #64748B; font-weight: bold; }
    .card-value { font-size: 14px; font-weight: bold; color: #0F172A; margin-top: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th, td { text-align: right; padding: 10px; border-bottom: 1px solid #E2E8F0; font-size: 13px; }
    th { background: #F1F5F9; color: #475569; }
    .verified-box { background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; padding: 14px; color: #065F46; }
    .footer { text-align: center; margin-top: 40px; border-top: 1px solid #E2E8F0; padding-top: 16px; font-size: 12px; color: #94A3B8; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title-badge">🛂 وثيقة جواز الحياة السريرية (Life Passport)</div>
      <h1>${child.firstName} ${child.lastName}</h1>
      <div class="meta-sub">تاريخ الميلاد: ${new Date(child.dateOfBirth).toISOString().split('T')[0]} • متلازمة داون (${child.clinicalProfile?.karyotypeType || 'Trisomy 21'})</div>
    </div>
    <div style="text-align: left;">
      <div style="font-weight: bold; color: #2563EB; font-size: 18px;">Down Plus</div>
      <div style="font-size: 11px; color: #64748B;">Digital Health Engine</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">1. البيانات الحيوية والتشخيصية الأساسية</div>
    <div class="grid">
      <div class="card">
        <div class="card-label">فصيلة الدم</div>
        <div class="card-value">${child.bloodType || 'غير مسجلة'}</div>
      </div>
      <div class="card">
        <div class="card-label">عمر الحمل عند الولادة</div>
        <div class="card-value">${child.clinicalProfile?.gestationalAgeWeeks ? `${child.clinicalProfile.gestationalAgeWeeks} أسبوعاً` : 'مكتمل'}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">2. الحالات المرضية المشخصة والأدوية المستمرة</div>
    <table>
      <thead>
        <tr>
          <th>الحالة / العَرَض المشخص</th>
          <th>الدواء الموصوف</th>
          <th>الجرعة والتكرار</th>
        </tr>
      </thead>
      <tbody>
        ${
          medications.length > 0
            ? medications
                .map(
                  (m: any) => `
          <tr>
            <td>قصور الغدة الدرقية</td>
            <td><strong>${m.drug}</strong></td>
            <td>${m.dosage} (${m.frequency})</td>
          </tr>`,
                )
                .join('')
            : `<tr><td colspan="3" style="text-align:center; color:#94A3B8;">لا توجد أدوية دورية مسجلة حالياً</td></tr>`
        }
      </tbody>
    </table>
  </div>

  <div class="section">
    <div class="section-title">3. المهارات المنجزة على سلم الاستقلالية (Independence Ladder)</div>
    <table>
      <thead>
        <tr>
          <th>المهارة التطورية</th>
          <th>المجال</th>
          <th>درجة الإتقان</th>
        </tr>
      </thead>
      <tbody>
        ${
          milestones.length > 0
            ? milestones
                .map(
                  (ms) => `
          <tr>
            <td>${ms.title}</td>
            <td>${ms.domain}</td>
            <td style="color:#15803D; font-weight:bold;">${ms.status}</td>
          </tr>`,
                )
                .join('')
            : `<tr><td colspan="3" style="text-align:center; color:#94A3B8;">جاري تسجيل المهارات</td></tr>`
        }
      </tbody>
    </table>
  </div>

  ${
    verifiedDoctorName
      ? `
  <div class="section">
    <div class="section-title">4. اعتماد الطبيب المشرف وتوصياته السريرية</div>
    <div class="verified-box">
      <strong>تم الاعتماد رسمياً بواسطة: ${verifiedDoctorName}</strong>
      <p style="margin: 8px 0 0 0; font-size: 13px;">"${doctorNotes || 'الخطة معتمدة وفق المعايير السريرية.'}"</p>
    </div>
  </div>`
      : ''
  }

  <div class="footer">
    تم استخراج هذه الوثيقة آلياً من منصة Down Plus • رابط التحقق السحابي: ${shareUrl}
  </div>
</body>
</html>
`.trim();
  }
}
