'use client';

import React from 'react';
import Link from 'next/link';

export default function LifePassportPrintPage({ params }: { params: { id: string } }) {
  const child = {
    name: 'عمر أحمد',
    nameEn: 'Omar Ahmed',
    karyotype: 'Trisomy 21 (Free Standard)',
    dob: '2024-03-15',
    ageMonths: 31,
    bloodType: 'O+ Positive',
    emergencyContact: '+20 101 234 5678 (والد الطفل)',
    primaryPhysician: 'د. هاني مصطفى (استشاري تأهيل أطفال)',
    hospitalRecord: 'DP-EG-2026-8812',
    lastReviewDate: '2026-10-30',
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: '32px 16px' }}>
      {/* Action Toolbar (Hidden during print) */}
      <div
        className="no-print"
        style={{
          maxWidth: 820,
          margin: '0 auto 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          padding: '14px 24px',
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid #E2E8F0',
        }}
      >
        <div>
          <span style={{ fontWeight: 800, color: '#0F172A', fontSize: 16 }}>
            🛂 وثيقة جواز الحياة الطبي الموحد (Life Passport)
          </span>
          <span style={{ fontSize: 12, color: '#64748B', marginRight: 8 }}>
            • نموذج الطوارئ والمستشفيات
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={handlePrint}
            style={{
              backgroundColor: '#059669',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 10,
              padding: '8px 18px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
            }}
          >
            <span>🖨️</span> طباعة أو حفظ PDF
          </button>
          <Link
            href="/dashboard"
            style={{
              backgroundColor: '#F1F5F9',
              color: '#475569',
              borderRadius: 10,
              padding: '8px 16px',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: 14,
            }}
          >
            ← العودة للوحة التحكم
          </Link>
        </div>
      </div>

      {/* Main A4 Document Sheet */}
      <div
        style={{
          maxWidth: 820,
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          padding: '40px 48px',
          border: '1px solid #E2E8F0',
          position: 'relative',
        }}
      >
        {/* Document Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #059669',
            paddingBottom: 20,
            marginBottom: 24,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 28 }}>🧬</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: '#065F46', letterSpacing: -0.5 }}>
                Down Plus Medical Passport
              </span>
            </div>
            <div style={{ fontSize: 13, color: '#475569', marginTop: 4, fontWeight: 600 }}>
              منظومة الرعاية السريرية لمتلازمة داون • الأكاديمية الأمريكية لطب الأطفال (AAP)
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                backgroundColor: '#ECFDF5',
                color: '#047857',
                padding: '4px 12px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 800,
                display: 'inline-block',
                border: '1px solid #A7F3D0',
              }}
            >
              ملف سريري نشط ومعتمد ✅
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
              رقم السجل: <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{child.hospitalRecord}</span>
            </div>
          </div>
        </div>

        {/* Child Primary Vitals Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            backgroundColor: '#F8FAFC',
            padding: 20,
            borderRadius: 12,
            border: '1px solid #E2E8F0',
            marginBottom: 24,
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>اسم الطفل الكامل</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
              {child.name}
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>{child.nameEn}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>العمر الحالي</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
              {child.ageMonths} شهراً
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>الميلاد: {child.dob}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>النمط الوراثي (Karyotype)</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#047857', marginTop: 2 }}>
              {child.karyotype}
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>فصيلة الدم: {child.bloodType}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>طوارئ الوالدين</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
              {child.emergencyContact}
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>طبيب المتابعة: د. هاني مصطفى</div>
          </div>
        </div>

        {/* Emergency Alert Protocol Banner */}
        <div
          style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: 12,
            padding: '16px 20px',
            marginBottom: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#B45309', fontWeight: 800, fontSize: 14 }}>
            <span>⚠️</span> تنبيه طبي لفرق التخدير والطوارئ (AAP Emergency Protocol)
          </div>
          <div style={{ fontSize: 13, color: '#78350F', marginTop: 6, lineHeight: 1.6 }}>
            • <strong>فحص الحبل الشوكي الرقبي (Atlantoaxial Instability):</strong> يرجى الحذر الشديد عند بسط الرقبة أثناء التنبيب الرغامي (Endotracheal intubation).
            <br />
            • <strong>التاريخ القلبي:</strong> ثقب بطيني (VSD) تم التئامه مع وظيفة قلبية مستقرة (Ejection Fraction 64%).
          </div>
        </div>

        {/* Section 1: Active Medications */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', marginBottom: 12, borderRight: '4px solid #059669', paddingRight: 8 }}>
            1. خطة الأدوية الحالية المستمرة (Active Medications)
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: '#F1F5F9', color: '#475569', borderBottom: '1px solid #CBD5E1' }}>
                <th style={{ padding: '10px 14px' }}>الدواء</th>
                <th style={{ padding: '10px 14px' }}>الجرعة اليومية</th>
                <th style={{ padding: '10px 14px' }}>التوقيت</th>
                <th style={{ padding: '10px 14px' }}>الغرض الطبي</th>
                <th style={{ padding: '10px 14px' }}>تاريخ البدء</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>Eltroxin (إيلتروكسين)</td>
                <td style={{ padding: '12px 14px', color: '#334155' }}>25 mcg</td>
                <td style={{ padding: '12px 14px', color: '#334155' }}>صباحاً على معدة فارغة</td>
                <td style={{ padding: '12px 14px', color: '#334155' }}>قصور الغدة الدرقية المناعي</td>
                <td style={{ padding: '12px 14px', color: '#64748B' }}>2024-09-01</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>Vitamin D3 (قطرات)</td>
                <td style={{ padding: '12px 14px', color: '#334155' }}>600 IU (4 قطرات)</td>
                <td style={{ padding: '12px 14px', color: '#334155' }}>مرة واحدة يومياً مع وجبة</td>
                <td style={{ padding: '12px 14px', color: '#334155' }}>دعم كثافة العظام والنمو</td>
                <td style={{ padding: '12px 14px', color: '#64748B' }}>مستمر</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 2: AAP Clinical Health Supervision Status */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', marginBottom: 12, borderRight: '4px solid #059669', paddingRight: 8 }}>
            2. جدول الفحوصات الدورية المعتمدة (AAP Down Syndrome Guidelines)
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: '#F1F5F9', color: '#475569', borderBottom: '1px solid #CBD5E1' }}>
                <th style={{ padding: '10px 14px' }}>الفحص الإلزامي</th>
                <th style={{ padding: '10px 14px' }}>المعيار السريري</th>
                <th style={{ padding: '10px 14px' }}>آخر نتيجة</th>
                <th style={{ padding: '10px 14px' }}>الحالة والموعد القادم</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700 }}>سماع إيكو القلب (Echocardiogram)</td>
                <td style={{ padding: '12px 14px' }}>حديثي الولادة + عند الحاجة</td>
                <td style={{ padding: '12px 14px', color: '#047857', fontWeight: 600 }}>التئام VSD وتدفق شرياني سليم</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                    مكتمل وطبيعي ✅
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700 }}>تحليل الغدة الدرقية (TSH / FT4)</td>
                <td style={{ padding: '12px 14px' }}>سنوياً (AAP Core)</td>
                <td style={{ padding: '12px 14px', color: '#334155' }}>TSH: 4.8 mIU/L (مستقر تحت العلاج)</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ backgroundColor: '#FEF3C7', color: '#B45309', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                    مستحق الآن (نوفمبر 2026) ⚠️
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700 }}>فحص السمع وتخطيط الطبلة (Audiology)</td>
                <td style={{ padding: '12px 14px' }}>كل 6 أشهر حتى عمر 3 سنوات</td>
                <td style={{ padding: '12px 14px', color: '#047857' }}>استجابة سمعية سليمة بالجهتين</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                    محدث (فبراير 2027) ✅
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700 }}>فحص قاع العين وضعف الإبصار (Vision)</td>
                <td style={{ padding: '12px 14px' }}>سنوياً لكشف الاستجماتيزم</td>
                <td style={{ padding: '12px 14px', color: '#334155' }}>لا يوجد حول أو إعتام عدسة</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                    محدث ✅
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Developmental Milestones & Independence Status */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', marginBottom: 12, borderRight: '4px solid #059669', paddingRight: 8 }}>
            3. خارطة الاستقلالية والمهارات الحالية (Independence Ladder)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, fontSize: 13 }}>
            <div style={{ backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>• التطور الحركي:</span> الجلوس المستقل (متقن ✅) • المشي بالاستناد على الأثاث (Cruising) (قيد التدريب ⏳).
            </div>
            <div style={{ backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>• التخاطب والتواصل:</span> 3-5 كلمات وإشارات Makaton وظيفية (متقن ✅) • تركيب جملة من كلمتين (الهدف القادم 🎯).
            </div>
            <div style={{ backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>• الرعاية الذاتية:</span> خلع الجوارب والحذاء (متقن ✅) • الشرب المستقل من كوب (بمساعدة خفيفة ⏳).
            </div>
            <div style={{ backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>• الدعم الحركي الموصى به:</span> استخدام دعامات الكاحل المنخفضة (SMOs) أثناء تمارين التوازن والمشي.
            </div>
          </div>
        </div>

        {/* Verification Footer & Medical Seal */}
        <div
          style={{
            borderTop: '2px solid #E2E8F0',
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: '#64748B' }}>
              تم توثيق واعتماد البيانات بواسطة استشاري التأهيل الطبي:
            </div>
            <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 14, marginTop: 4 }}>
              د. هاني مصطفى • نقابة أطباء مصر (ترخيص 49201)
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
              تاريخ الطباعة: {new Date().toLocaleDateString('ar-EG')} • نظام Down Plus السريري
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 90,
                height: 90,
                border: '2px dashed #059669',
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ECFDF5',
              }}
            >
              <span style={{ fontSize: 24 }}>📱</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#047857', marginTop: 2 }}>
                كود طوارئ 48h
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Print Specific CSS */}
      <style jsx global>{`
        @media print {
          body {
            background-color: #ffffff !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
