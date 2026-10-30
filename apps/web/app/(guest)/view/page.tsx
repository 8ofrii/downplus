'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function GuestViewContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || 'exp_demo_token';

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      {/* Banner */}
      <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '16px 20px', borderRadius: 16, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 800, color: '#1E40AF', fontSize: 16 }}>
            🛂 جواز الحياة الرقمي — بوابة الطبيب الزائر (Down Plus Life Passport)
          </div>
          <div style={{ color: '#1E3A8A', fontSize: 13, marginTop: 4 }}>
            تمت مشاركة هذا السجل بواسطة ولي الأمر عبر رابط وصول مشفر مؤقت (صالح لـ 48 ساعة).
          </div>
        </div>
        <div style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
          رابط سارٍ حتى 2026-11-01
        </div>
      </div>

      {/* Main Patient Passport Card */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 32, border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #E2E8F0', paddingBottom: 24, marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A' }}>عمر أحمد</h1>
            <div style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>
              تاريخ الميلاد: 15 مارس 2024 (العمر: 31 شهراً) • فصيلة الدم: +A
            </div>
          </div>
          <div style={{ textAlign: 'left' }}>
            <span style={{ backgroundColor: '#F1F5F9', color: '#334155', padding: '6px 14px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
              متلازمة داون (Trisomy 21)
            </span>
          </div>
        </div>

        {/* Section 1: Clinical Diagnoses & Medications */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>
            الحالات السريرية المشخصة والأدوية الحالية 🩺
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            <div style={{ backgroundColor: '#F8FAFC', padding: 16, borderRadius: 14, border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 14 }}>قصور الغدة الدرقية (Hypothyroidism)</div>
              <div style={{ color: '#475569', fontSize: 13, marginTop: 4 }}>
                العلاج: إيلتروكسين (Eltroxin) 25 ميكروجرام يومياً.
              </div>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', padding: 16, borderRadius: 14, border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 14 }}>عيب قلبي تم التئامه (Repaired VSD)</div>
              <div style={{ color: '#475569', fontSize: 13, marginTop: 4 }}>
                متابع بإيكو دوري، الوظيفة الانقباضية للبطينين طبيعية.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Milestones & Independence Status */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>
            سلم المهارات الحركية والتخاطبية (Independence Ladder) 🪜
          </h2>
          <div style={{ border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
            {[
              { skill: 'الجلوس المستقل دون مساعدة', domain: 'حركي', status: 'مستقل بمفرده 🌟', color: '#2563EB' },
              { skill: 'الوقوف بالاستناد على الأثاث (Cruising)', domain: 'حركي', status: 'بمساعدة 🤝', color: '#D97706' },
              { skill: 'المشي المستقل 10 خطوات', domain: 'حركي', status: 'قيد التدريب ⏳', color: '#64748B' },
              { skill: 'نطق كلمات مفردة (ماما، بابا، ماء)', domain: 'تخاطبي', status: 'مستقل بمفرده 🌟', color: '#2563EB' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 18px',
                  borderBottom: idx < 3 ? '1px solid #F1F5F9' : 'none',
                  backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, color: '#1E293B', fontSize: 14 }}>{item.skill}</span>
                  <span style={{ fontSize: 11, color: '#94A3B8', marginRight: 8 }}>({item.domain})</span>
                </div>
                <span style={{ color: item.color, fontWeight: 700, fontSize: 13 }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Verified Doctor Notes */}
        <div>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>
            ملاحظات الطبيب المشرف المعتمد 👨‍⚕️
          </h2>
          <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: 18, borderRadius: 14 }}>
            <div style={{ fontWeight: 700, color: '#166534', fontSize: 14 }}>
              د. هاني مصطفى • استشاري تأهيل وعلاج طبيعي للأطفال (معتمد في 2026-10-30)
            </div>
            <div style={{ color: '#14532D', fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
              "تم فحص الطفل، عضلات الجذع في تحسن ملحوظ، ينصح باستعمال دعامات الكاحل القصيرة (SMOs) لتسريع مرحلة المشي المستقل والحفاظ على استقامة مفصل القدم."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GuestViewPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>جاري تحميل السجل السريري...</div>}>
      <GuestViewContent />
    </Suspense>
  );
}
