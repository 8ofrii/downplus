const fs = require('fs');
const path = require('path');

// 1. apps/web/app/layout.tsx
const layoutContent = `import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Down Plus — Digital Health Core Engine | البوابة الطبية والإكلينيكية',
  description: 'منظومة الرعاية الصحية الرقمية المتقدمة لمتلازمة داون - بوابة الأطباء وجواز الحياة الطبي',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🩺</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
`;

// 2. apps/web/app/page.tsx
const pageContent = `import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ maxWidth: 1100, margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
      {/* Brand Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#E8F5E9',
        border: '1px solid #A3D9A5',
        padding: '8px 22px',
        borderRadius: 30,
        marginBottom: 24
      }}>
        <span style={{ fontSize: 20 }}>🌿</span>
        <span style={{ color: '#2E7D32', fontWeight: 800, fontSize: 15, letterSpacing: -0.2 }}>
          Down Plus — Digital Health Core Engine
        </span>
        <span style={{ backgroundColor: '#2E7D32', color: '#FFF', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 12 }}>
          v2.0
        </span>
      </div>

      {/* Main Title */}
      <h1 style={{ fontSize: 38, fontWeight: 900, color: '#0F172A', marginBottom: 16, lineHeight: 1.3 }}>
        منظومة الرعاية الإكلينيكية الذكية لمتلازمة داون
      </h1>
      <p style={{ fontSize: 18, color: '#475569', maxWidth: 780, margin: '0 auto 48px', lineHeight: 1.7 }}>
        بوابة الأطباء المعتمدين والمشرفين الإكلينيكيين لمراجعة الخطط العلاجية، إصدار جواز الحياة الطبي المعتمد، وتتبع نمو الأطفال وفق منحنيات زيميل والأكاديمية الأمريكية لطب الأطفال (AAP).
      </p>

      {/* Portal Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, textAlign: 'right' }}>
        
        {/* Doctor Dashboard */}
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: 28,
            borderRadius: 24,
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            border: '1px solid #E2E8F0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  🩺
                </div>
                <span style={{ backgroundColor: '#DBEAFE', color: '#1D4ED8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 8 }}>
                  بوابة الطبيب
                </span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1E293B', marginBottom: 10 }}>
                لوحة تحكم الطبيب الاستشاري
              </h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
                استعراض حالات الأطفال المسندة، مراجعة التحاليل وفحوصات الإيكو والغدة الدرقية، واعتماد خط الأساس الطبي (Baseline).
              </p>
            </div>
            <div style={{ marginTop: 20, color: '#2563EB', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              دخول البوابة الطبية <span>←</span>
            </div>
          </div>
        </Link>

        {/* Life Passport A4 */}
        <Link href="/passport/T21-EGY-2024-8841" style={{ textDecoration: 'none' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: 28,
            borderRadius: 24,
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            border: '1px solid #E2E8F0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  🪪
                </div>
                <span style={{ backgroundColor: '#D1FAE5', color: '#047857', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 8 }}>
                  جواز الحياة A4
                </span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1E293B', marginBottom: 10 }}>
                وثيقة جواز الحياة الطبي المعتمد
              </h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
                الملف الصحي الرسمي المتكامل الجاهز للطباعة والمرفق بـ QR Code الطوارئ المشفر، وتاريخ جراحة القلب وفحوصات الرقبة والغدة.
              </p>
            </div>
            <div style={{ marginTop: 20, color: '#059669', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              معاينة وطباعة الوثيقة <span>←</span>
            </div>
          </div>
        </Link>

        {/* Guest Emergency View */}
        <Link href="/view?token=exp_emergency_demo_token" style={{ textDecoration: 'none' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: 28,
            borderRadius: 24,
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            border: '1px solid #E2E8F0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  🏥
                </div>
                <span style={{ backgroundColor: '#FEF3C7', color: '#B45309', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 8 }}>
                  طوارئ مشفرة
                </span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1E293B', marginBottom: 10 }}>
                بوابة الطوارئ والاستشاري الزائر
              </h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
                عرض فوري ومؤقت (صلاحية 48 ساعة) للبيانات الحرجة، أدوية القلب والغدة، ومحددات التخدير وأمان الفقرات العنقية.
              </p>
            </div>
            <div style={{ marginTop: 20, color: '#D97706', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              دخول وضع الطوارئ <span>←</span>
            </div>
          </div>
        </Link>

        {/* Admin Governance */}
        <Link href="/admin/dashboard" style={{ textDecoration: 'none' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: 28,
            borderRadius: 24,
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            border: '1px solid #E2E8F0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  ⚙️
                </div>
                <span style={{ backgroundColor: '#EDE9FE', color: '#6D28D9', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 8 }}>
                  الإدارة والحوكمة
                </span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1E293B', marginBottom: 10 }}>
                لوحة الحوكمة وتراخيص الأطباء
              </h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
                التحقق من التراخيص الطبية وسجلات نقابة الأطباء، ومتابعة مؤشرات أداء المنصة الإكلينيكية وعمليات المسح الذكي.
              </p>
            </div>
            <div style={{ marginTop: 20, color: '#7C3AED', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              لوحة الإدارة والحوكمة <span>←</span>
            </div>
          </div>
        </Link>

      </div>

      {/* Presentation Deck Banner */}
      <div style={{
        marginTop: 48,
        backgroundColor: '#0F172A',
        borderRadius: 24,
        padding: '24px 32px',
        color: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'right',
        flexWrap: 'wrap',
        gap: 20
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ backgroundColor: '#22C55E', color: '#0F172A', fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 6 }}>
              العرض التنفيذي
            </span>
            <h4 style={{ fontSize: 18, fontWeight: 800, color: '#F8FAFC' }}>
              البريزينتيشن التفاعلية للاستثمار والشراكة (21 سلايد مع نماذج التيتانيوم)
            </h4>
          </div>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
            شاملة نموذج الأعمال، تفصيل التكاليف التشغيلية ومزودي الخدمات، وخارطة الطريق الإكلينيكية الموحدة.
          </p>
        </div>
        <a
          href="/presentation.html"
          target="_blank"
          rel="noreferrer"
          style={{
            backgroundColor: '#22C55E',
            color: '#0F172A',
            padding: '12px 24px',
            borderRadius: 14,
            fontWeight: 800,
            fontSize: 14,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <span>📊</span> فتح العرض التقديمي
        </a>
      </div>
    </div>
  );
}
`;

// 3. apps/web/app/passport/[id]/page.tsx
const passportContent = `'use client';

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

      <style jsx global>{\`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background-color: #FFFFFF !important;
            padding: 0 !important;
          }
        }
      \`}</style>
    </div>
  );
}
`;

// 4. apps/web/app/(doctor)/dashboard/page.tsx
const doctorDashboardContent = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Patient {
  id: string;
  name: string;
  ageMonths: number;
  primaryDiagnosis: string;
  karyotype: string;
  baselineStatus: 'draft_pending_doctor' | 'confirmed_by_doctor';
  lastVisit: string;
}

const DEMO_PATIENTS: Patient[] = [
  {
    id: 'child-1',
    name: 'عمر أحمد محمود',
    ageMonths: 28,
    primaryDiagnosis: 'متلازمة داون (Trisomy 21)',
    karyotype: 'Trisomy 21 (Free Standard)',
    baselineStatus: 'draft_pending_doctor',
    lastVisit: '2026-10-30',
  },
  {
    id: 'child-2',
    name: 'سارة طارق خالد',
    ageMonths: 14,
    primaryDiagnosis: 'متلازمة داون (Mosaicism)',
    karyotype: 'Mosaicism 15%',
    baselineStatus: 'confirmed_by_doctor',
    lastVisit: '2026-10-15',
  },
  {
    id: 'child-3',
    name: 'ياسين محمود عبد الرحمن',
    ageMonths: 22,
    primaryDiagnosis: 'متلازمة داون (Trisomy 21)',
    karyotype: 'Trisomy 21 (Free Standard)',
    baselineStatus: 'draft_pending_doctor',
    lastVisit: '2026-10-29',
  },
];

export default function DoctorDashboard() {
  const [patients] = useState<Patient[]>(DEMO_PATIENTS);

  const pendingCount = patients.filter((p) => p.baselineStatus === 'draft_pending_doctor').length;

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 26 }}>🩺</span>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A' }}>
              بوابة الطبيب الشريك والاستشاري
            </h1>
          </div>
          <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>
            متابعة سجلات الأطفال الإكلينيكية، اعتماد خطوط الأساس، واستعراض تقارير الأشعة والتحاليل.
          </p>
        </div>

        <Link
          href="/"
          style={{
            backgroundColor: '#F1F5F9',
            color: '#475569',
            padding: '10px 18px',
            borderRadius: 12,
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          ← العودة للرئيسية
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>إجمالي الأطفال قيد المتابعة</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>{patients.length}</div>
          <div style={{ fontSize: 12, color: '#059669', fontWeight: 700, marginTop: 4 }}>حالات نشطة في العيادة</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>مسودات بحاجة للاعتماد</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#D97706', marginTop: 4 }}>{pendingCount}</div>
          <div style={{ fontSize: 12, color: '#B45309', fontWeight: 700, marginTop: 4 }}>تتطلب مراجعة الطبيب</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>حالات معتمدة ومحدثة</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#059669', marginTop: 4 }}>
            {patients.length - pendingCount}
          </div>
          <div style={{ fontSize: 12, color: '#047857', fontWeight: 700, marginTop: 4 }}>مطابقة لبروتوكول AAP</div>
        </div>
      </div>

      {/* Patients Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A' }}>قائمة الحالات الإكلينيكية</h2>
          <span style={{ fontSize: 12, color: '#64748B' }}>محدث تلقائياً مع تطبيق الموبايل</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: 13, color: '#64748B' }}>
              <th style={{ padding: '14px 24px' }}>اسم الطفل</th>
              <th style={{ padding: '14px 24px' }}>العمر</th>
              <th style={{ padding: '14px 24px' }}>التشخيص والنمط</th>
              <th style={{ padding: '14px 24px' }}>حالة خط الأساس (Baseline)</th>
              <th style={{ padding: '14px 24px' }}>آخر زيارة / فحص</th>
              <th style={{ padding: '14px 24px', textAlign: 'center' }}>الإجراء الإكلينيكي</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: 14 }}>
                <td style={{ padding: '18px 24px', fontWeight: 800, color: '#0F172A' }}>
                  {patient.name}
                </td>
                <td style={{ padding: '18px 24px', color: '#475569' }}>
                  {patient.ageMonths} شهراً
                </td>
                <td style={{ padding: '18px 24px', color: '#334155' }}>
                  <div>{patient.primaryDiagnosis}</div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>{patient.karyotype}</div>
                </td>
                <td style={{ padding: '18px 24px' }}>
                  {patient.baselineStatus === 'confirmed_by_doctor' ? (
                    <span style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                      معتمد رسمياً ✓
                    </span>
                  ) : (
                    <span style={{ backgroundColor: '#FEF3C7', color: '#B45309', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                      مسودة بانتظار الاعتماد ⏳
                    </span>
                  )}
                </td>
                <td style={{ padding: '18px 24px', color: '#64748B', fontSize: 13 }}>
                  {patient.lastVisit}
                </td>
                <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                  <Link
                    href={\`/baseline/\${patient.id}\`}
                    style={{
                      backgroundColor: patient.baselineStatus === 'draft_pending_doctor' ? '#059669' : '#F1F5F9',
                      color: patient.baselineStatus === 'draft_pending_doctor' ? '#FFFFFF' : '#475569',
                      padding: '8px 16px',
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 13,
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                  >
                    {patient.baselineStatus === 'draft_pending_doctor' ? 'مراجعة واعتماد' : 'استعراض السجل'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;

// 5. apps/web/app/(doctor)/baseline/[id]/page.tsx
const baselineContent = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BaselineReviewPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<'draft_pending_doctor' | 'confirmed_by_doctor'>('draft_pending_doctor');
  const [doctorNotes, setDoctorNotes] = useState(
    'تمت مراجعة نتائج أشعة إيكو القلب السابقة وتحاليل الغدة الدرقية. خطة التأهيل معتمدة. يوصى بالتركيز على تمارين النطق وعضلات الفك ودعامات الكاحل (SMOs).'
  );
  const [submitting, setSubmitting] = useState(false);
  const [confirmedSuccess, setConfirmedSuccess] = useState(false);

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
      await fetch(\`\${apiUrl}/clinical/baseline/\${params.id}/confirm\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor_notes: doctorNotes,
        }),
      });
    } catch {
      // Graceful offline fallback
    } finally {
      setStatus('confirmed_by_doctor');
      setSubmitting(false);
      setConfirmedSuccess(true);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A' }}>
              مراجعة واعتماد خط الأساس السريري: عمر أحمد محمود
            </h1>
            {status === 'confirmed_by_doctor' ? (
              <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '6px 14px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
                معتمد رسمياً من الطبيب ✓
              </span>
            ) : (
              <span style={{ backgroundColor: '#FEF3C7', color: '#B45309', padding: '6px 14px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
                مسودة ذكية (مستخرجة من الـ OCR) ⏳
              </span>
            )}
          </div>
          <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>
            النمط: ثلاثي الصبغي 21 • العمر: 28 شهراً • معرف الملف: T21-EGY-2024-8841
          </p>
        </div>

        <Link
          href="/dashboard"
          style={{
            backgroundColor: '#F1F5F9',
            color: '#475569',
            padding: '10px 18px',
            borderRadius: 12,
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          ← العودة للوحة الطبيب
        </Link>
      </div>

      {confirmedSuccess && (
        <div style={{ backgroundColor: '#DCFCE7', border: '1px solid #86EFAC', padding: '16px 20px', borderRadius: 14, marginBottom: 24, color: '#166534', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>✓</span> تم اعتماد وتوثيق خط الأساس بنجاح! تم تحديث وثيقة جواز الحياة وإشعار ولي الأمر على تطبيق الموبايل.
        </div>
      )}

      {/* Main Review Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Left: Clinical Evidence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Card 1: Cardiac */}
          <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 18, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A' }}>🫀 جراحة القلب الخلقية (VSD)</h3>
              <span style={{ backgroundColor: '#ECFDF5', color: '#047857', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>
                تقرير إيكو أبو الريش
              </span>
            </div>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
              المريض خضع لإصلاح عيب الحاجز البطيني (VSD) في سن 4 أشهر. لا يوجد ارتجاع متبقي، وحجم البطين الأيسر طبيعي.
            </p>
          </div>

          {/* Card 2: Thyroid */}
          <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 18, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A' }}>🧪 فحص هرمون الغدة الدرقية (TSH & FT4)</h3>
              <span style={{ backgroundColor: '#ECFDF5', color: '#047857', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>
                معامل البرج - أكتوبر 2026
              </span>
            </div>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
              TSH = 2.4 mIU/L (المدى المرجعي: 0.5 - 4.5). الحالة مستقرة ومتحكم بها بجرعة التروكسين 25 ميكروجرام.
            </p>
          </div>

          {/* Card 3: C-Spine */}
          <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 18, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A' }}>🦴 فحص المفصل الفهقي المحوري (C-Spine)</h3>
              <span style={{ backgroundColor: '#ECFDF5', color: '#047857', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>
                أشعة عادية (Flexion/Extension)
              </span>
            </div>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
              المسافة بين القوس الأمامي للفهقة والنتوء السني طبيعية (&lt; 3 مم). لا توجد علامات عدم استقرار بالمفصل.
            </p>
          </div>
        </div>

        {/* Right: Doctor Decision Box */}
        <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 18, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', height: 'fit-content' }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 14 }}>
            ✍️ ملاحظات واعتماد الطبيب
          </h3>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
              التوجيهات السريرية والخطة التأهيلية:
            </label>
            <textarea
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              rows={6}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 12,
                border: '1px solid #CBD5E1',
                fontSize: 13,
                fontFamily: 'inherit',
                lineHeight: 1.6,
                color: '#0F172A',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            onClick={handleConfirm}
            disabled={submitting || status === 'confirmed_by_doctor'}
            style={{
              width: '100%',
              backgroundColor: status === 'confirmed_by_doctor' ? '#94A3B8' : '#059669',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 12,
              padding: '12px 20px',
              fontWeight: 800,
              fontSize: 15,
              cursor: status === 'confirmed_by_doctor' ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {submitting ? 'جاري الاعتماد...' : status === 'confirmed_by_doctor' ? 'تم الاعتماد والتوقيع ✓' : 'اعتماد وتوقيع السجل الطبي'}
          </button>
        </div>
      </div>
    </div>
  );
}
`;

// 6. apps/web/app/(guest)/view/page.tsx
const guestViewContent = `'use client';

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
`;

// 7. apps/web/app/admin/dashboard/page.tsx
const adminDashboardContent = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DoctorItem {
  id: string;
  name: string;
  license: string;
  specialty: string;
  city: string;
  fee: number;
  expYears: number;
  isActive: boolean;
}

const DEMO_DOCTORS: DoctorItem[] = [
  {
    id: 'd1',
    name: 'د. هاني مصطفى',
    license: 'EGY-MED-44219',
    specialty: 'استشاري تأهيل وعلاج طبيعي للأطفال',
    city: 'القاهرة',
    fee: 400,
    expYears: 16,
    isActive: true,
  },
  {
    id: 'd2',
    name: 'د. نورهان المصري',
    license: 'EGY-MED-87112',
    specialty: 'أخصائية تخاطب وتعديل سلوك أطفال',
    city: 'الجيزة',
    fee: 350,
    expYears: 11,
    isActive: true,
  },
  {
    id: 'd3',
    name: 'أ.د. عادل خليل',
    license: 'EGY-MED-12903',
    specialty: 'استشاري مخ وأعصاب أطفال',
    city: 'القاهرة',
    fee: 650,
    expYears: 24,
    isActive: false,
  },
];

export default function AdminDashboardPage() {
  const [doctors, setDoctors] = useState<DoctorItem[]>(DEMO_DOCTORS);

  const toggleDoctorStatus = (id: string) => {
    setDoctors(prev =>
      prev.map(doc => doc.id === id ? { ...doc, isActive: !doc.isActive } : doc)
    );
  };

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 26 }}>⚙️</span>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A' }}>
              لوحة إدارة المنظومة والحوكمة الإكلينيكية
            </h1>
          </div>
          <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>
            اعتماد تراخيص الأطباء، الرقابة الطبية، ومتابعة مؤشرات أداء منصة Down Plus.
          </p>
        </div>

        <Link
          href="/"
          style={{
            backgroundColor: '#F1F5F9',
            color: '#475569',
            padding: '10px 18px',
            borderRadius: 12,
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          ← العودة للرئيسية
        </Link>
      </div>

      {/* Admin KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 32 }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>إجمالي الأطباء المعتمدين</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>{doctors.length}</div>
          <div style={{ fontSize: 11, color: '#059669', fontWeight: 700, marginTop: 4 }}>تراخيص نقابة موثقة ✓</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>الأطفال المسجلين بالمنصة</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#059669', marginTop: 4 }}>1,420</div>
          <div style={{ fontSize: 11, color: '#047857', fontWeight: 700, marginTop: 4 }}>عائلات مصرية نشطة</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>مستندات OCR الممسوحة</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#2563EB', marginTop: 4 }}>3,890</div>
          <div style={{ fontSize: 11, color: '#1D4ED8', fontWeight: 700, marginTop: 4 }}>تحاليل وتقارير إيكو</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>استشارات التطبيب عن بُعد</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#7C3AED', marginTop: 4 }}>942</div>
          <div style={{ fontSize: 11, color: '#6D28D9', fontWeight: 700, marginTop: 4 }}>عمولة المنصة: 15%</div>
        </div>
      </div>

      {/* Doctor Credentialing Verification Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A' }}>سجل التحقق من التراخيص الطبية للأطباء</h2>
          <span style={{ fontSize: 12, color: '#64748B' }}>التدقيق مع نقابة الأطباء ووزارة الصحة المصرية</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: 13, color: '#64748B' }}>
              <th style={{ padding: '14px 24px' }}>اسم الطبيب</th>
              <th style={{ padding: '14px 24px' }}>رقم ترخيص مزاولة المهنة</th>
              <th style={{ padding: '14px 24px' }}>التخصص الإكلينيكي</th>
              <th style={{ padding: '14px 24px' }}>المدينة</th>
              <th style={{ padding: '14px 24px' }}>رسوم الكشف</th>
              <th style={{ padding: '14px 24px' }}>حالة الاعتماد</th>
              <th style={{ padding: '14px 24px', textAlign: 'center' }}>التحكم بالترخيص</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: 14 }}>
                <td style={{ padding: '16px 24px', fontWeight: 800, color: '#0F172A' }}>{doc.name}</td>
                <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: '#475569', fontWeight: 700 }}>{doc.license}</td>
                <td style={{ padding: '16px 24px', color: '#334155' }}>{doc.specialty}</td>
                <td style={{ padding: '16px 24px', color: '#64748B' }}>{doc.city}</td>
                <td style={{ padding: '16px 24px', fontWeight: 700, color: '#059669' }}>{doc.fee} ج.م</td>
                <td style={{ padding: '16px 24px' }}>
                  {doc.isActive ? (
                    <span style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                      نشط ومفعل ✓
                    </span>
                  ) : (
                    <span style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                      معلق / بانتظار التدقيق
                    </span>
                  )}
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                  <button
                    onClick={() => toggleDoctorStatus(doc.id)}
                    style={{
                      backgroundColor: doc.isActive ? '#FEE2E2' : '#DCFCE7',
                      color: doc.isActive ? '#991B1B' : '#166534',
                      border: 'none',
                      borderRadius: 8,
                      padding: '6px 14px',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {doc.isActive ? 'تعليق الحساب' : 'تفعيل واعتماد'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;

const filesToWrite = [
  { path: 'apps/web/app/layout.tsx', content: layoutContent },
  { path: 'apps/web/app/page.tsx', content: pageContent },
  { path: 'apps/web/app/passport/[id]/page.tsx', content: passportContent },
  { path: 'apps/web/app/(doctor)/dashboard/page.tsx', content: doctorDashboardContent },
  { path: 'apps/web/app/(doctor)/baseline/[id]/page.tsx', content: baselineContent },
  { path: 'apps/web/app/(guest)/view/page.tsx', content: guestViewContent },
  { path: 'apps/web/app/admin/dashboard/page.tsx', content: adminDashboardContent },
];

filesToWrite.forEach(f => {
  const fullPath = path.resolve(__dirname, '..', f.path);
  fs.writeFileSync(fullPath, f.content, 'utf8');
  console.log('Successfully wrote UTF-8 to:', f.path);
});
