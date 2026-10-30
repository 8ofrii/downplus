'use client';

import React from 'react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: '#EF4444', marginBottom: 12 }}>
        حدث خطأ غير متوقع
      </h1>
      <p style={{ color: '#64748B', marginBottom: 24 }}>
        نعتذر عن هذا الخطأ، يمكنك إعادة المحاولة.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: 10,
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          إعادة المحاولة ↻
        </button>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            backgroundColor: '#F1F5F9',
            color: '#334155',
            padding: '10px 20px',
            borderRadius: 10,
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          الرئيسية
        </Link>
      </div>
    </div>
  );
}
