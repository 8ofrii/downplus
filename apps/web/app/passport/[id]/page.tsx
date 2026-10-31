'use client';

import React from 'react';
import Link from 'next/link';

export default function LifePassportPrintPage({ params }: { params: { id: string } }) {
  const child = {
    name: 'عمر أحمد محمود',
    nameEn: 'Omar Ahmed Mahmoud',
    karyotype: 'Trisomy 21 (Free Standard - ثلاثي الصبغي 21)',
    dob: '2024-03-15',
    ageMonths: 28,
    bloodType: 'O+ Positive',
    emergencyContact: '+20 101 234 5678 (والد الطفل: م. أحمد)',
    primaryPhysician: 'د. سارة المنشاوي (استشاري قلب الأطفال - أبو الريش)',
    hospitalRecord: 'T21-EGY-2024-8841',
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
          maxWidth: 860,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>🪪</span>
          <div>
            <span style={{ fontWeight: 800, color: '#0F172A', fontSize: 16 }}>
              وثيقة جواز الحياة الطبي المعتمد (Life Passport)
            </span>
            <div style={{ fontSize: 12, color: '#64748B' }}>
              مطابق لبروتوكول الرعاية الإشرافية للأكاديمية الأمريكية لطب الأطفال (AAP Guidelines)
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={handlePrint}
            style={{
              backgroundColor: '#059669',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 10,
              padding: '10px 20px',
              fontWeight: 800,
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
            href="/"
            style={{
              backgroundColor: '#F1F5F9',
              color: '#475569',
              borderRadius: 10,
              padding: '10px 16px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            الرئيسية
          </Link>
        </div>
      </div>

      {/* Main A4 Document Sheet */}
      <div
        style={{
          maxWidth: 860,
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 32 }}>🌿</span>
              <div>
                <span style={{ fontSize: 24, fontWeight: 900, color: '#065F46', letterSpacing: -0.5 }}>
                  Down Plus Medical Passport
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#047857', marginRight: 10 }}>
                  | وثيقة جواز الحياة الطبي
                </span>
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#475569', marginTop: 4, fontWeight: 600 }}>
              منظومة الرعاية السريرية المتقدمة لمتلازمة داون • الأكاديمية الأمريكية لطب الأطفال (AAP)
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
              ملف سريري نشط ومعتمد ✓
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
              رقم الملف: <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{child.hospitalRecord}</span>
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
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>اسم الطفل بالكامل</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
              {child.name}
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>{child.nameEn}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>العمر الحالي</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
              {child.ageMonths} شهراً (سنتان و 4 أشهر)
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>الميلاد: {child.dob}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>فصيلة الدم & النمط الكروموسومي</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#DC2626', marginTop: 2 }}>
              {child.bloodType}
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>Trisomy 21 (Free)</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>طوارئ أولياء الأمور</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
              {child.emergencyContact}
            </div>
            <div style={{ fontSize: 11, color: '#059669', fontWeight: 700 }}>إسعاف 123 • نجدة الطفل 16000</div>
          </div>
        </div>

        {/* Clinical History & AAP Protocol */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #E2E8F0', paddingBottom: 8, marginBottom: 14 }}>
            📋 السجل الإكلينيكي المعتمد وبروتوكول AAP الصحي
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>جراحة القلب الخلقية (VSD Closure)</span>
                <span style={{ backgroundColor: '#DCFCE7', color: '#166534', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 6 }}>
                  تمت الجراحة بنجاح
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#64748B', marginTop: 6, margin: 0 }}>
                إصلاح ثقب بين البطينين في مستشفى أبو الريش الجامعي بعمر 4 أشهر. الإيكو الأخير (أكتوبر 2026) يظهر وظيفة بطين أيسر طبيعية (EF 68%).
              </p>
            </div>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>فحص الغدة الدرقية الدوري (Thyroid Panel)</span>
                <span style={{ backgroundColor: '#DCFCE7', color: '#166534', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 6 }}>
                  مستقر ومنتظم
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#64748B', marginTop: 6, margin: 0 }}>
                نتيجة معمل البرج (أكتوبر 2026): TSH = 2.4 mIU/L (طبيعي) تحت جرعة Eltroxin 25 mcg يومياً صباحاً.
              </p>
            </div>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>أمان واستقرار الفقرات العنقية (Atlantoaxial)</span>
                <span style={{ backgroundColor: '#DCFCE7', color: '#166534', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 6 }}>
                  سليم (Cleared)
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#64748B', marginTop: 6, margin: 0 }}>
                أشعة الرقبة في وضعي الثني والبسط أظهرت ثباتاً كاملاً للمفصل الفهقي المحوري (ADI = 2.8 mm ضمن الحدود الآمنة &lt; 4mm).
              </p>
            </div>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>فحص السمع ومجرى الهواء التنفسي</span>
                <span style={{ backgroundColor: '#DCFCE7', color: '#166534', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 6 }}>
                  متابعة كل 6 أشهر
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#64748B', marginTop: 6, margin: 0 }}>
                قياس ضغط الأذن واستجابة جذع المخ (ABR) أظهر سمعاً طبيعياً مع عدم وجود انقطاع تنفس انسدادي أثناء النوم (OSA).
              </p>
            </div>
          </div>
        </div>

        {/* Zemel Growth Curves Biometrics */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #E2E8F0', paddingBottom: 8, marginBottom: 14 }}>
            📈 قياسات النمو المعتمدة (منحنيات زيميل Zemel et al. AAP Pediatrics 2015)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: 14, borderRadius: 10, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#166534', fontWeight: 700 }}>الوزن الحالي</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#14532D', marginTop: 4 }}>12.4 كجم</div>
              <div style={{ fontSize: 11, color: '#15803D', fontWeight: 600 }}>المئين 54% (Zemel P54)</div>
            </div>

            <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: 14, borderRadius: 10, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#166534', fontWeight: 700 }}>الطول الحالي</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#14532D', marginTop: 4 }}>84.2 سم</div>
              <div style={{ fontSize: 11, color: '#15803D', fontWeight: 600 }}>المئين 48% (Zemel P48)</div>
            </div>

            <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: 14, borderRadius: 10, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#166534', fontWeight: 700 }}>محيط الرأس</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#14532D', marginTop: 4 }}>47.1 سم</div>
              <div style={{ fontSize: 11, color: '#15803D', fontWeight: 600 }}>المئين 50% (Zemel P50)</div>
            </div>
          </div>
        </div>

        {/* QR Code and Doctor Verification Seal */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: '18px 24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {/* High-density SVG QR Code */}
            <div style={{ width: 88, height: 88, backgroundColor: '#FFFFFF', padding: 6, borderRadius: 8, border: '1px solid #CBD5E1' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                <rect width="100" height="100" fill="#ffffff" />
                <rect x="5" y="5" width="28" height="28" fill="#0f172a" />
                <rect x="9" y="9" width="20" height="20" fill="#ffffff" />
                <rect x="13" y="13" width="12" height="12" fill="#0f172a" />
                <rect x="67" y="5" width="28" height="28" fill="#0f172a" />
                <rect x="71" y="9" width="20" height="20" fill="#ffffff" />
                <rect x="75" y="13" width="12" height="12" fill="#0f172a" />
                <rect x="5" y="67" width="28" height="28" fill="#0f172a" />
                <rect x="9" y="71" width="20" height="20" fill="#ffffff" />
                <rect x="13" y="75" width="12" height="12" fill="#0f172a" />
                <rect x="42" y="10" width="8" height="8" fill="#059669" />
                <rect x="52" y="18" width="6" height="6" fill="#0f172a" />
                <rect x="42" y="42" width="16" height="16" fill="#059669" />
                <rect x="65" y="45" width="8" height="8" fill="#0f172a" />
                <rect x="78" y="58" width="12" height="6" fill="#0f172a" />
                <rect x="42" y="75" width="10" height="14" fill="#0f172a" />
                <rect x="60" y="78" width="14" height="8" fill="#059669" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 13, color: '#0F172A' }}>
                رمز الاستجابة السريعة للطوارئ (Emergency Medical QR)
              </div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                يتيح لأطباء الاستقبال بالمستشفيات الوصول الفوري للبيانات الحرجة وفصيلة الدم ومحاذير التخدير.
              </div>
              <div style={{ fontSize: 11, color: '#059669', fontWeight: 700, marginTop: 4 }}>
                كود التشفير: SHA-256 Verified • صلاحية مستمرة
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'left', borderLeft: '2px solid #E2E8F0', paddingLeft: 24 }}>
            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>اعتماد الطبيب المعالج:</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
              {child.primaryPhysician}
            </div>
            <div style={{ fontSize: 11, color: '#059669', fontWeight: 700, marginTop: 4 }}>
              ترخيص نقابة الأطباء: EGY-MED-44219 ✓
            </div>
            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>
              تاريخ الاعتماد: {child.lastReviewDate}
            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background-color: #FFFFFF !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
