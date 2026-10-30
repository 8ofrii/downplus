'use client';

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
    name: 'عمر أحمد',
    ageMonths: 31,
    primaryDiagnosis: 'Down Syndrome',
    karyotype: 'Trisomy 21',
    baselineStatus: 'draft_pending_doctor',
    lastVisit: '2026-10-28',
  },
  {
    id: 'child-2',
    name: 'سارة خالد',
    ageMonths: 14,
    primaryDiagnosis: 'Down Syndrome',
    karyotype: 'Mosaicism',
    baselineStatus: 'confirmed_by_doctor',
    lastVisit: '2026-10-15',
  },
  {
    id: 'child-3',
    name: 'ياسين محمود',
    ageMonths: 22,
    primaryDiagnosis: 'Down Syndrome',
    karyotype: 'Trisomy 21',
    baselineStatus: 'draft_pending_doctor',
    lastVisit: '2026-10-29',
  },
];

export default function DoctorDashboard() {
  const [patients] = useState<Patient[]>(DEMO_PATIENTS);

  const pendingCount = patients.filter((p) => p.baselineStatus === 'draft_pending_doctor').length;

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 24px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A' }}>لوحة تحكم الطبيب المعالج 🩺</h1>
          <p style={{ color: '#64748B', marginTop: 4 }}>
            مرحباً د. هاني مصطفى • استشاري تأهيل وعلاج طبيعي للأطفال
          </p>
        </div>
        <Link href="/" style={{ padding: '8px 16px', backgroundColor: '#F1F5F9', borderRadius: 10, color: '#475569', textDecoration: 'none', fontWeight: 600 }}>
          ← العودة للرئيسية
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0' }}>
          <div style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>إجمالي الأطفال المتابعين</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', marginTop: 8 }}>{patients.length}</div>
        </div>
        <div style={{ backgroundColor: '#FFFBEB', padding: 20, borderRadius: 16, border: '1px solid #FDE68A' }}>
          <div style={{ color: '#B45309', fontSize: 13, fontWeight: 600 }}>مسودات AI بانتظار الاعتماد ⚠️</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#B45309', marginTop: 8 }}>{pendingCount}</div>
        </div>
        <div style={{ backgroundColor: '#ECFDF5', padding: 20, borderRadius: 16, border: '1px solid #A7F3D0' }}>
          <div style={{ color: '#047857', fontSize: 13, fontWeight: 600 }}>حالات معتمدة هذا الشهر ✅</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#047857', marginTop: 8 }}>18</div>
        </div>
      </div>

      {/* Patient Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1E293B' }}>قائمة الأطفال المعتمدين والمتابعين</h2>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: 13 }}>
              <th style={{ padding: '14px 24px' }}>اسم الطفل</th>
              <th style={{ padding: '14px 24px' }}>العمر</th>
              <th style={{ padding: '14px 24px' }}>النوع الجيني (Karyotype)</th>
              <th style={{ padding: '14px 24px' }}>حالة المسودة السريرية</th>
              <th style={{ padding: '14px 24px' }}>آخر مراجعة</th>
              <th style={{ padding: '14px 24px' }}>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '16px 24px', fontWeight: 700, color: '#0F172A' }}>{p.name}</td>
                <td style={{ padding: '16px 24px', color: '#475569' }}>{p.ageMonths} شهراً</td>
                <td style={{ padding: '16px 24px', color: '#475569' }}>{p.karyotype}</td>
                <td style={{ padding: '16px 24px' }}>
                  {p.baselineStatus === 'draft_pending_doctor' ? (
                    <span style={{ backgroundColor: '#FEF3C7', color: '#B45309', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                      مسودة بانتظار الاعتماد
                    </span>
                  ) : (
                    <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                      معتمد رسمياً ✅
                    </span>
                  )}
                </td>
                <td style={{ padding: '16px 24px', color: '#64748B', fontSize: 13 }}>{p.lastVisit}</td>
                <td style={{ padding: '16px 24px' }}>
                  <Link
                    href={`/baseline/${p.id}`}
                    style={{
                      display: 'inline-block',
                      backgroundColor: p.baselineStatus === 'draft_pending_doctor' ? '#2563EB' : '#F1F5F9',
                      color: p.baselineStatus === 'draft_pending_doctor' ? '#FFFFFF' : '#334155',
                      padding: '8px 16px',
                      borderRadius: 10,
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {p.baselineStatus === 'draft_pending_doctor' ? 'مراجعة واعتماد المسودة' : 'عرض السجل'}
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
