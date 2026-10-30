import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>
        الصفحة غير موجودة (404)
      </h1>
      <p style={{ color: '#64748B', marginBottom: 24 }}>
        عذراً، الرابط الذي تحاول الوصول إليه غير متوفر.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          backgroundColor: '#2563EB',
          color: '#FFFFFF',
          padding: '10px 20px',
          borderRadius: 10,
          textDecoration: 'none',
          fontWeight: 700,
        }}
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
