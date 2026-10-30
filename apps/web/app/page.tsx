import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ maxWidth: 1000, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', backgroundColor: '#EFF6FF', padding: '10px 20px', borderRadius: 30, marginBottom: 20 }}>
        <span style={{ color: '#2563EB', fontWeight: 'bold', fontSize: 16 }}>🧬 Down Plus — Digital Health Core Engine</span>
      </div>
      <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
        منظومة الرعاية السريرية المتقدمة لمتلازمة داون
      </h1>
      <p style={{ fontSize: 18, color: '#64748B', maxWidth: 700, margin: '0 auto 40px', lineHeight: 1.6 }}>
        بوابة الأطباء المعتمدين والمشرفين السريريين لمراجعة مسودات الذكاء الاصطناعي، اعتماد الخطط العلاجية، وتتبع تطور الأطفال.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, textAlign: 'right' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: 28, borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>🩺</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>بوابة الطبيب الشريك</h3>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
              استعراض قائمة الأطفال، اعتماد مسودات الحالة السريرية، وإضافة الملاحظات التخصصية.
            </p>
          </div>
        </Link>

        <Link href="/passport/61871691-0784-4f0f-87de-f407f323a44d" style={{ textDecoration: 'none' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: 28, borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>🛂</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>وثيقة جواز الحياة السريرية (A4)</h3>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
              وثيقة طبية رسمية موحدة للطوارئ والمستشفيات تتضمن الفحوصات وتاريخ VSD وجاهزة للطباعة.
            </p>
          </div>
        </Link>

        <Link href="/guest/view?token=exp_demo_sample_token" style={{ textDecoration: 'none' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: 28, borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>🔒</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>بوابة الطبيب الخارجي (Guest)</h3>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
              عرض مشفر ومؤقت عبر رمز الوصول المشفر دون الحاجة لتسجيل حساب.
            </p>
          </div>
        </Link>

        <Link href="/admin/dashboard" style={{ textDecoration: 'none' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: 28, borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>⚙️</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>لوحة تحكم الإدارة (Admin)</h3>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
              إدارة مصفوفة الأطباء، الاشتراكات ومؤشرات الأداء للنواة السريرية.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
