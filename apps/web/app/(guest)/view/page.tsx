'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function GuestViewContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || 'exp_demo_token';

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      {/* Banner */}
      <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '16px 20px', borderRadius: 16, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 800, color: '#1E40AF', fontSize: 16 }}>
            🪪 جواز الحياة الطبي المعتمد — بوابة الاستشاري الزائر والطوارئ (Down Plus)
          </div>
          <div style={{ color: '#1E3A8A', fontSize: 13, marginTop: 4 }}>
            تمت مشاركة هذا السجل بواسطة ولي الأمر عبر رابط وصول مشفر مؤقت (صالح لمدة 48 ساعة).
          </div>
        </div>
        <div style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
          رابط سارٍ ونشط ✓
        </div>
      </div>

      {/* Main Patient Passport Card */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 32, border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #E2E8F0', paddingBottom: 24, marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A' }}>عمر أحمد محمود</h1>
            <div style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>
              تاريخ الميلاد: 15 مارس 2024 (العمر: 28 شهراً) • فصيلة الدم: O+
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
              <div style={{ fontSize: 13, color: '#059669', fontWeight: 600, marginTop: 4 }}>دواء: Eltroxin 25 mcg يومياً</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>آخر تحليل TSH سليم ومستقر (2.4 mIU/L).</div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: 16, borderRadius: 14, border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 14 }}>جراحة القلب الخلقية (Post-op VSD)</div>
              <div style={{ fontSize: 13, color: '#059669', fontWeight: 600, marginTop: 4 }}>حالة الشفاء: تام ومستقر</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>تم الإغلاق الجراحي في عمر 4 أشهر، كفاءة العضلة 68%.</div>
            </div>
          </div>
        </div>

        {/* Section 2: Critical Emergency & Anesthesia Precautions */}
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 16, padding: 20, marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#B91C1C', fontWeight: 800, fontSize: 15, marginBottom: 8 }}>
            <span>⚠️</span> تنبيهات التخدير والطوارئ الحرجة (Critical Precautions)
          </div>
          <ul style={{ margin: 0, paddingRight: 20, fontSize: 13, color: '#991B1B', lineHeight: 1.8 }}>
            <li><strong>الفقرات العنقية:</strong> لا توجد علامات عدم استقرار بالمفصل، ولكن يُرجى الحذر أثناء التنبيب الرغامي (Intubation) وتجنب فرط البسط أو الثني.</li>
            <li><strong>الحساسية الدوائية:</strong> لا توجد حساسية معروفة للبنسلين أو المضادات الحيوية.</li>
            <li><strong>مجرى الهواء:</strong> يُراعى استخدام أنبوب تنفسي أصغر بمقاس نصف درجة نظراً لطبيعة مجرى الهواء لدى مصابي متلازمة داون.</li>
          </ul>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: 20 }}>
          <div style={{ fontSize: 12, color: '#64748B' }}>
            رقم توثيق الجلسة: <span style={{ fontFamily: 'monospace' }}>{token.slice(0, 16)}...</span>
          </div>
          <Link
            href="/"
            style={{
              backgroundColor: '#F1F5F9',
              color: '#475569',
              padding: '8px 16px',
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: 13,
            }}
          >
            ← العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function GuestViewPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: 40 }}>جاري تحميل الملف الطبي...</div>}>
      <GuestViewContent />
    </Suspense>
  );
}
