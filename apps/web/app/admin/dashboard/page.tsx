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
    city: 'الجيزة',
    fee: 400,
    expYears: 16,
    isActive: true,
  },
  {
    id: 'd2',
    name: 'د. نورهان المصري',
    license: 'EGY-MED-87112',
    specialty: 'أخصائية تخاطب وتعديل سلوك أطفال',
    city: 'القاهرة',
    fee: 350,
    expYears: 11,
    isActive: true,
  },
  {
    id: 'd3',
    name: 'أ.د. طارق خليل',
    license: 'EGY-MED-12903',
    specialty: 'استشاري مخ وأعصاب أطفال',
    city: 'الجيزة',
    fee: 650,
    expYears: 24,
    isActive: false,
  },
];

export default function AdminDashboardPage() {
  const [doctors, setDoctors] = useState<DoctorItem[]>(DEMO_DOCTORS);

  const toggleDoctor = async (id: string) => {
    const doc = doctors.find((d) => d.id === id);
    if (!doc) return;
    const newStatus = !doc.isActive;

    // Optimistic UI update
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isActive: newStatus } : d)),
    );

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
      await fetch(`${apiUrl}/admin/doctors/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: newStatus }),
      });
    } catch {
      // Graceful offline fallback
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A' }}>
            لوحة الإدارة الرئيسية (Super Admin Engine) ⚙️
          </h1>
          <p style={{ color: '#64748B', marginTop: 4 }}>
            مراقبة مقاييس النظام متعدد المستأجرين (Multi-tenant Core)، تراخيص العيادات، واشتراكات Paymob.
          </p>
        </div>
        <Link href="/" style={{ padding: '8px 16px', backgroundColor: '#F1F5F9', borderRadius: 10, color: '#475569', textDecoration: 'none', fontWeight: 600 }}>
          ← العودة للرئيسية
        </Link>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'إجمالي المستخدمين', value: '1,420', change: '+12% هذا الشهر', bg: '#EFF6FF', text: '#1E40AF' },
          { label: 'سجلات الأطفال المسجلة', value: '984', change: 'متلازمة داون (100%)', bg: '#F5F3FF', text: '#5B21B6' },
          { label: 'الأطباء المعتمدون', value: '48', change: 'في 6 محافظات', bg: '#ECFDF5', text: '#065F46' },
          { label: 'المستندات المعالجة بـ OCR', value: '3,812', change: 'معدل نجاح 98.4%', bg: '#FFFBEB', text: '#92400E' },
          { label: 'اشتراكات Pro الفعالة', value: '342', change: 'بوابة Paymob مصر', bg: '#FEF2F2', text: '#991B1B' },
        ].map((stat, idx) => (
          <div key={idx} style={{ backgroundColor: stat.bg, padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ color: stat.text, fontSize: 13, fontWeight: 700 }}>{stat.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: stat.text, marginTop: 8 }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: stat.text, opacity: 0.8, marginTop: 4 }}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Doctors Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1E293B' }}>إدارة مصفوفة الأطباء والترخيص الطبي</h2>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: 13 }}>
              <th style={{ padding: '14px 24px' }}>اسم الطبيب</th>
              <th style={{ padding: '14px 24px' }}>رقم الترخيص</th>
              <th style={{ padding: '14px 24px' }}>التخصص</th>
              <th style={{ padding: '14px 24px' }}>المدينة</th>
              <th style={{ padding: '14px 24px' }}>سنوات الخبرة</th>
              <th style={{ padding: '14px 24px' }}>سعر الكشف</th>
              <th style={{ padding: '14px 24px' }}>حالة الحساب</th>
              <th style={{ padding: '14px 24px' }}>التحكم</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '16px 24px', fontWeight: 700, color: '#0F172A' }}>{d.name}</td>
                <td style={{ padding: '16px 24px', color: '#475569', fontFamily: 'monospace' }}>{d.license}</td>
                <td style={{ padding: '16px 24px', color: '#475569' }}>{d.specialty}</td>
                <td style={{ padding: '16px 24px', color: '#475569' }}>{d.city}</td>
                <td style={{ padding: '16px 24px', color: '#475569' }}>{d.expYears} سنوات</td>
                <td style={{ padding: '16px 24px', color: '#0F172A', fontWeight: 700 }}>{d.fee} ج.م</td>
                <td style={{ padding: '16px 24px' }}>
                  {d.isActive ? (
                    <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                      نشط ومعتمد ✅
                    </span>
                  ) : (
                    <span style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                      قيد المراجعة / معطل ⏸️
                    </span>
                  )}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <button
                    onClick={() => toggleDoctor(d.id)}
                    style={{
                      backgroundColor: d.isActive ? '#FEE2E2' : '#DCFCE7',
                      color: d.isActive ? '#B91C1C' : '#15803D',
                      border: 'none',
                      borderRadius: 8,
                      padding: '6px 14px',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {d.isActive ? 'تعطيل الحساب' : 'تفعيل واعتماد'}
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
