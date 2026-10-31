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
                    href={`/baseline/${patient.id}`}
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
