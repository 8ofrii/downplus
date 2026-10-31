import React from 'react';
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
