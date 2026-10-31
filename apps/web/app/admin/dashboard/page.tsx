'use client';

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
