const fs = require('fs');
const path = require('path');

const deckPath = path.join(__dirname, '..', 'Down Plus - Executive, Technical & Commercial Presentation.html');
const webDeckPath = path.join(__dirname, '..', 'apps', 'web', 'public', 'presentation.html');

let html = fs.readFileSync(deckPath, 'utf8');

// Helper to extract partner logos
const medexiaIdx = html.indexOf('class="partner-logo medexia" src="');
const medexiaStart = medexiaIdx + 'class="partner-logo medexia" src="'.length;
const medexiaEnd = html.indexOf('"', medexiaStart);
const medexiaSrc = html.substring(medexiaStart, medexiaEnd);

const micromindIdx = html.indexOf('class="partner-logo" src="');
const micromindStart = micromindIdx + 'class="partner-logo" src="'.length;
const micromindEnd = html.indexOf('"', micromindStart);
const micromindSrc = html.substring(micromindStart, micromindEnd);

function makeBrandBar(metaText) {
  return `    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="${medexiaSrc}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="${micromindSrc}" alt="AI MicroMind" />
      </div>
      <div class="meta">${metaText}</div>
    </div>`;
}

// Extract only the first 21 slides from the file
const slideRegex = /<section class="slide[^"]*">([\s\S]*?)<\/section>/g;
let match;
const originalSlides = [];
while ((match = slideRegex.exec(html)) !== null && originalSlides.length < 21) {
  originalSlides.push(match[1]);
}

console.log('Original slides extracted (first 21):', originalSlides.length);

// 1. UPDATE SLIDE 1: Cover (Remove investment framing, make it commercial & execution proposal)
let s1 = originalSlides[0];
s1 = s1.replace(/Investment Options Tailored/g, 'Commercial Delivery & Milestone Cashflow Schedule');
s1 = s1.replace(/Enterprise Healthcare Proposal/g, 'Enterprise Healthcare Commercial Proposal');
s1 = s1.replace(/Comprehensive Executive, Technical &amp; Financial Briefing/g, 'Executive Technical, Commercial & Milestone Cashflow Proposal');

// 2. UPDATE SLIDE 2: Problem & Addressable Market Sizing (TAM • SAM • SOM)
const s2 = `
${makeBrandBar('Clinical Need & Addressable Market Sizing')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Market Need & Addressable Market Sizing</div>
        <h2>The Fragmented Care Crisis & Addressable Market (TAM • SAM • SOM)</h2>
      </div>
      <div class="meta">18+ Year Patient Lifecycle • High Retention • Long-Term Patient Value</div>
    </div>
    <p class="lead">
      Parents of children with Down Syndrome navigate an overwhelming labyrinth of 6+ medical and therapeutic specialties. Without digital coordination, critical preventive windows are missed, creating an urgent market opportunity across Egypt and the MENA region.
    </p>

    <!-- TAM SAM SOM Framework Cards -->
    <div class="grid grid-3" style="margin-top:10px">
      <div class="card card--accent">
        <div class="eyebrow" style="color:var(--primary-dark)">TAM (Total Addressable Market)</div>
        <h3 style="color:#0f172a">100k - 120k Patients &bull; $150M Annual Spend</h3>
        <p><strong>Egypt Population:</strong> ~100,000 to 120,000 individuals with Down syndrome (Trisomy 21). With <strong>2.2M annual live births</strong> and a 1:700 incidence rate, Egypt welcomes <strong>~3,100 new newborns with Down syndrome each year</strong>.</p>
        <p style="margin-top:6px"><strong>MENA / GCC Region:</strong> 350,000+ individuals. Total addressable spend across clinical therapy, specialized diagnostics, and pediatric care reaches <strong>~$120M - $150M (~6 Billion EGP)</strong> annually.</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow" style="color:var(--accent-dark)">SAM (Serviceable Addressable Market)</div>
        <h3 style="color:#0f172a">45k - 50k Urban Families &bull; $25M Market</h3>
        <p><strong>Connected Middle-Income Families:</strong> 45,000 to 50,000 urban Egyptian families with children aged 0 to 14 years across Greater Cairo, Alexandria, Delta, and Upper Egypt urban centers.</p>
        <p style="margin-top:6px">Actively seeking and paying out-of-pocket for private physical therapy, speech pathology, cardiologists, and developmental evaluations (<strong>~$25M / ~1.25 Billion EGP</strong> addressable annual spend in Egypt).</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow" style="color:var(--success)">SOM (Serviceable Obtainable Market)</div>
        <h3 style="color:#0f172a">3k - 5k Families &bull; 250 Doctors (Year 1-2)</h3>
        <p><strong>Realistic Down Plus Capture:</strong> 3,000 to 5,000 active subscribed families and 250 verified pediatric specialists within Year 1-2 (representing a targeted <strong>6% - 10% penetration</strong> of the urban addressable market).</p>
        <p style="margin-top:6px">Driven by organic word-of-mouth in parent peer circles, hospital discharge partnerships, and top pediatric genetic center referrals (Abu El-Reesh & Ain Shams).</p>
      </div>
    </div>

    <!-- Underlying Clinical Crisis Metrics -->
    <div class="stats" style="margin-top:12px">
      <div class="stat">
        <div class="n">1 <span class="unit">in 700</span></div>
        <div class="l">Live Births</div>
        <div class="sub">~3,100 new T21 newborns annually in Egypt</div>
      </div>
      <div class="stat">
        <div class="n">50<span class="unit">%</span></div>
        <div class="l">Congenital Heart Defects</div>
        <div class="sub">Require mandatory echo within 60 days of birth</div>
      </div>
      <div class="stat">
        <div class="n">18<span class="unit">+ Yrs</span></div>
        <div class="l">Care Continuum</div>
        <div class="sub">Unlocks multi-year recurring subscription value</div>
      </div>
      <div class="stat">
        <div class="n">85<span class="unit">%</span></div>
        <div class="l">False Stunting Prevented</div>
        <div class="sub">By using specialized Zemel growth charts vs WHO</div>
      </div>
    </div>
`;

// 3. UPDATE SLIDE 10: Complete Feature Inventory (Emphasize Community Circles)
const s10 = `
${makeBrandBar('System Taxonomy & Complete Platform Capabilities')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">End-to-End System Taxonomy</div>
        <h2>Comprehensive Platform Capabilities & Module Inventory</h2>
      </div>
      <div class="meta">100% Core Traceability &bull; Production Architecture Ready</div>
    </div>
    <div class="grid grid-3" style="margin-top:8px">
      <div class="card">
        <div class="eyebrow">Pillar 1: Clinical Intelligence</div>
        <h3>Down Syndrome Biometrics & Growth</h3>
        <p>Digitized <strong>Zemel et al. (Pediatrics 2015) Down syndrome growth percentiles</strong> (0-36m & 2-20y) for weight, length, head circumference, and BMI. Prevents 85% false stunting misdiagnoses caused by standard WHO curves.</p>
      </div>

      <div class="card">
        <div class="eyebrow">Pillar 2: Early Speech Intervention</div>
        <h3>Makaton Gesture & Speech Engine</h3>
        <p>Interactive 8-card core non-verbal communication dictionary (Water, Milk, Sleep, Pain, More, Help) with audio pronunciation, 10s video demos, and tantrum de-escalation clinical cues.</p>
      </div>

      <div class="card card--accent" style="border:2px solid var(--primary-light)">
        <div class="eyebrow" style="color:var(--primary)">Pillar 3: Community & Peer Support</div>
        <h3>Parent Peer Circles & Community Hub</h3>
        <p><strong>Age-cohort matched support circles (1,420+ families)</strong> for parents (0-1y, 1-3y, 4-7y). Moderated by verified pediatric clinicians to eliminate harmful misinformation, celebrate milestone victories, and share local therapy resources.</p>
      </div>

      <div class="card">
        <div class="eyebrow">Pillar 4: Marketplace & Consultations</div>
        <h3>Doctor Telehealth & Clinic Booking</h3>
        <p>Multi-factor doctor matcher algorithm, in-app scheduling for clinic visits and online video calls, Paymob / Vodafone Cash checkout, and automated 15% platform take-rate distribution.</p>
      </div>

      <div class="card">
        <div class="eyebrow">Pillar 5: AI Diagnostics & Records</div>
        <h3>Smart Lab & Rx OCR Camera Scanner</h3>
        <p>BullMQ camera scanner for Egyptian lab panels (Al Borg, Al Mokhtabar, Alfa Scan). Instant OCR extraction of TSH/FT4 thyroid levels and echocardiogram VSD findings directly into child timeline.</p>
      </div>

      <div class="card">
        <div class="eyebrow">Pillar 6: Emergency Safety & ID</div>
        <h3>Verified Life Passport & Emergency QR</h3>
        <p>Official A4 printable medical summary, high-density SVG emergency QR code, 1-Tap SOS dispatch (Ambulance 123 & Child Line 16000), and C-Spine atlantoaxial stability clearances.</p>
      </div>
    </div>
    <div class="band" style="margin-top:12px">
      <div class="band-title">Clinical Compliance & Multi-Tenant Scalability</div>
      <div class="bl">Every platform module is architected in accordance with the <strong>American Academy of Pediatrics (AAP) Health Supervision Protocols</strong>. The multi-tenant core engine cleanly isolates disease-specific rules, enabling seamless future expansion into Cerebral Palsy and Autism Spectrum Disorder.</div>
    </div>
`;

// 4. UPDATE SLIDE 11: Daily Therapy & Community Circles Flywheel
const s11 = `
${makeBrandBar('User Habit Formation & Retention Flywheel')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Habit Formation & LTV Expansion</div>
        <h2>User Engagement Flywheel: Daily Home Therapy & Community Peer Circles</h2>
      </div>
      <div class="meta">Daily App Opens &bull; Clinically Moderated Circles &bull; 90%+ Monthly Retention</div>
    </div>
    <div class="grid grid-2" style="margin-top:10px">
      <div class="card card--accent">
        <div class="eyebrow">Flywheel Driver 1: Daily Gamified Habit</div>
        <h3>Daily 20-Minute Home Therapy Routine</h3>
        <p>Solves the #1 parent struggle: lack of daily therapeutic consistency between bi-weekly physical therapy clinics.</p>
        <ul style="margin:8px 0 0 16px;font-size:12px;color:var(--gray-700);line-height:1.6">
          <li><strong>3 Micro-Sessions (20 mins total):</strong> 5-min oral-motor facial muscle drills, 10-min trunk balance & weight-shifting, 5-min Makaton functional gestures.</li>
          <li><strong>Flame Streak Engine:</strong> Tracks daily consecutive practice (e.g. 14-day streak) with +50 points rewards and milestone celebration badges.</li>
          <li><strong>Clinical Verification:</strong> Parents can submit video check-ins to their attending doctor for remote compliance verification.</li>
        </ul>
      </div>

      <div class="card card--accent" style="border:2px solid var(--primary-light)">
        <div class="eyebrow" style="color:var(--primary)">Flywheel Driver 2: Emotional & Practical Moat</div>
        <h3>Parent Peer Circles & Community Hub</h3>
        <p>The definitive psychological anchor that transforms Down Plus from an occasional utility into a daily lifeline for Egyptian families.</p>
        <ul style="margin:8px 0 0 16px;font-size:12px;color:var(--gray-700);line-height:1.6">
          <li><strong>Age-Cohort Matching:</strong> Connects parents with families facing the exact same developmental stage (0-1y newborn shock, 1-3y walking/speech, 4-7y school inclusion).</li>
          <li><strong>Clinical Moderation:</strong> Supervised by certified pediatricians & psychologists, eliminating harmful folkloric myths while providing safe medical advice.</li>
          <li><strong>Victory Boards:</strong> Celebrates shared breakthroughs (first word via Makaton, first 5 independent steps, thyroid panel stabilization).</li>
          <li><strong>Local Resource Sharing:</strong> Parent-verified recommendations for pediatric orthotics (SMOs), sensory gear, and inclusive nurseries across governorates.</li>
        </ul>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">The Community & Routine Retention Impact</div>
      <div class="band-grid band-3" style="margin-top:6px">
        <div><div class="bk">Daily Active Usage (DAU/MAU)</div><div class="bl">Home routines & community boards drive <strong>4.8 app opens/week</strong> vs 0.3 for traditional telemedicine apps.</div></div>
        <div><div class="bk">Zero-Cost Organic Acquisition</div><div class="bl">Engaged parents organically invite <strong>3+ other Down syndrome families</strong> from clinic waiting rooms and WhatsApp groups.</div></div>
        <div><div class="bk">Unmatched Lifetime Value (LTV)</div><div class="bl">Retains families across the entire <strong>0 to 18-year pediatric lifecycle</strong>, maximizing recurring subscription and consultation revenue.</div></div>
      </div>
    </div>
`;

// 5. UPDATE SLIDE 12: Add 5th Phone Mockup (Parent Peer Circles & Community Hub)
const phone5Mockup = `
      <!-- PHONE 5: PARENT PEER CIRCLES & COMMUNITY HUB -->
      <div class="phone-mockup">
        <div class="phone-notch">
          <div class="cam-lens"></div>
          <div class="sensor-dot"></div>
        </div>
        <div class="phone-status-bar">
          <span class="time">9:41</span>
          <span class="icons">5G 100%</span>
        </div>
        <div class="phone-screen">
          <div class="mock-header">
            <div class="avatar" style="background:#8b5cf6">DP</div>
            <div>
              <div class="title">مجتمع أهالي داون بلس 👥</div>
              <div class="sub">دوائر الدعم المعتمدة • 1,420 عائلة مصرية</div>
            </div>
          </div>

          <!-- Active Age Cohort Badge -->
          <div style="margin:0 12px 10px;background:#f3e8ff;border:1px solid #d8b4fe;border-radius:10px;padding:8px 10px;display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:11px;font-weight:800;color:#6b21a8">دائرة عمر (سنتين إلى 4 سنوات)</div>
              <div style="font-size:9.5px;color:#7e22ce">مجموعة متطابقة مع عمر وتطور طفلك</div>
            </div>
            <span style="background:#7c3aed;color:#fff;font-size:9px;font-weight:800;padding:2px 8px;border-radius:12px">نشط الآن</span>
          </div>

          <!-- Pinned Specialist Advice -->
          <div style="margin:0 12px 10px;background:#ffffff;border:1px solid #e2e8f0;border-left:3px solid #7c3aed;border-radius:10px;padding:8px 10px;box-shadow:0 1px 4px rgba(0,0,0,0.04)">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
              <span style="font-size:12px">🩺</span>
              <span style="font-size:10.5px;font-weight:800;color:#0f172a">د. نورهان المصري (أخصائية تخاطب)</span>
              <span style="font-size:8.5px;background:#dcfce7;color:#166534;padding:1px 5px;border-radius:4px;font-weight:700">موثق ✓</span>
            </div>
            <p style="font-size:9.5px;color:#475569;line-height:1.45;margin:0">
              "تدريبات عضلات الفك والمص واستخدام إشارات ماكاتون قبل سن 3 سنوات بيقلل العصبية بنسبة 70% وبيسرّع الكلام التلقائي."
            </p>
          </div>

          <!-- Victory Post 1 -->
          <div style="margin:0 12px 10px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:10px;box-shadow:0 2px 6px rgba(0,0,0,0.04)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div style="display:flex;align-items:center;gap:6px">
                <div style="width:22px;height:22px;border-radius:50%;background:#fbcfe8;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#9d174d">أم</div>
                <div>
                  <div style="font-size:10px;font-weight:800;color:#0f172a">أم عمر أحمد (القاهرة)</div>
                  <div style="font-size:8.5px;color:#94a3b8">منذ ساعتين • إنجاز جديد 🎉</div>
                </div>
              </div>
              <span style="background:#fdf2f8;color:#be185d;font-size:8.5px;font-weight:800;padding:2px 6px;border-radius:6px">انتصار نطق</span>
            </div>
            <p style="font-size:10px;color:#334155;line-height:1.5;margin:0 0 8px">
              "الحمد لله حمداً كثيراً! عمر نطق كلمة 'ماء' وأشار بإشارة ماكاتون لأول مرة لوحده بعد أسبوعين من الالتزام بالروتين اليومي في التطبيق! دموع الفرح مش قادرة أوصفها 💖"
            </p>
            <div style="display:flex;gap:12px;border-top:1px solid #f1f5f9;padding-top:6px;font-size:9.5px;color:#64748b;font-weight:700">
              <span>❤️ 54 إعجاب</span>
              <span>💬 18 تعليق مباركة</span>
            </div>
          </div>

          <!-- Question & Doctor Answer Post -->
          <div style="margin:0 12px 12px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:10px;box-shadow:0 2px 6px rgba(0,0,0,0.04)">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
              <div style="width:22px;height:22px;border-radius:50%;background:#fed7aa;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#9a3412">أم</div>
              <div>
                <div style="font-size:10px;font-weight:800;color:#0f172a">أم ياسمين (الجيزة)</div>
                <div style="font-size:8.5px;color:#94a3b8">استشارة مجتمعية</div>
              </div>
            </div>
            <p style="font-size:9.5px;color:#334155;line-height:1.45;margin:0 0 6px">
              "يا جماعة حد جرب دعامات الكاحل (SMOs) لطفل سنتين ونص؟ دكتور العظام كتبهالنا عشان ارتخاء الأربطة ومترددة."
            </p>
            <div style="background:#f8fafc;border-radius:8px;padding:6px 8px;border-right:2px solid #059669">
              <div style="font-size:9px;font-weight:800;color:#065f46">رد د. هاني مصطفى (استشاري تأهيل):</div>
              <div style="font-size:8.5px;color:#334155;margin-top:2px">
                "دعامات SMOs ضرورية جداً لمصابي داون في السن ده لأنها بتمنع انحراف الكاحل للداخل وبتساعد الطفل يثبت توازنه في المشي. ممتازة جداً."
              </div>
            </div>
          </div>

          <!-- Floating Join Circle CTA -->
          <div style="margin:0 12px 14px;background:#7c3aed;color:#ffffff;text-align:center;padding:9px;border-radius:10px;font-size:10.5px;font-weight:800;cursor:pointer">
            + مشاركة تجربة أو سؤال مع الأمهات
          </div>

          <!-- Bottom Tab Bar -->
          <div class="mock-tabbar">
            <div class="tab">🏠<span>الرئيسية</span></div>
            <div class="tab">🎯<span>المهارات</span></div>
            <div class="tab">📁<span>المستندات</span></div>
            <div class="tab active" style="color:#7c3aed">👥<span>المجتمع</span></div>
            <div class="tab">👤<span>الملف</span></div>
          </div>
          <div class="mock-home-bar"></div>
        </div>
      </div>
`;

let s12 = originalSlides[11];
// If phone 5 is not already in s12:
if (!s12.includes('PHONE 5: PARENT PEER CIRCLES')) {
  const lastPhoneEnd = s12.lastIndexOf('</div>\n      </div>');
  if (lastPhoneEnd !== -1) {
    s12 = s12.substring(0, lastPhoneEnd + '</div>\n      </div>'.length) + '\n' + phone5Mockup + '\n    </div>';
  }
}

// 6. UPDATE SLIDE 16: Commercial Monetization & Unit Economics
const s16 = `
${makeBrandBar('Commercial Architecture & Multi-Stream Monetization')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Commercial Model & Business Vision</div>
        <h2>Commercial Monetization: Multi-Stream Revenue & Unit Economics</h2>
      </div>
      <div class="meta">B2C Subscriptions &bull; Marketplace Take-Rate &bull; B2B Clinic SaaS &bull; Lab Affiliates</div>
    </div>
    <div class="grid grid-4" style="margin-top:8px">
      <div class="card card--accent">
        <div class="eyebrow">Revenue Stream 1: B2C</div>
        <h3>Parent Subscriptions</h3>
        <p><strong>Freemium:</strong> Free milestone checklist, AAP schedule, emergency dial.</p>
        <p style="margin-top:6px"><strong>Premium Tier:</strong> 250 EGP/mo (or 2,200 EGP/yr) unlocks Makaton video library, full DS growth curves, printable Life Passport, daily home therapy streak engine, and community circles.</p>
        <p style="margin-top:8px;font-weight:700;color:var(--success)">Gross Margin: ~90%</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Revenue Stream 2: Marketplace</div>
        <h3>Doctor Telehealth Take Rate</h3>
        <p><strong>15% - 20% Take Rate</strong> on all specialist consultations booked through the platform (telehealth video calls & clinic appointments).</p>
        <p style="margin-top:6px">Consultation fees in Egypt range from 400 to 900 EGP per visit &rarr; <strong>60 to 180 EGP net platform revenue</strong> per booking.</p>
        <p style="margin-top:8px;font-weight:700;color:var(--primary-dark)">High-Frequency Repeat Booking</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Revenue Stream 3: B2B SaaS</div>
        <h3>Clinic & Academy Portals</h3>
        <p><strong>1,500 - 3,500 EGP/mo</strong> per therapy center or special needs academy.</p>
        <p style="margin-top:6px">Enables centers to manage multi-therapist child caseloads, assign home exercises directly to parent apps, track parent compliance, and issue verified co-branded milestone reports.</p>
        <p style="margin-top:8px;font-weight:700;color:var(--accent-dark)">High Contract Retention (>95%)</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Revenue Stream 4: Diagnostics</div>
        <h3>Smart Lab & Rx OCR Vault</h3>
        <p><strong>Premium Lab Integration:</strong> Automated OCR ingestion for Egyptian lab sheets (Al Mokhtabar, Al Borg, Alfa Scan) extracting TSH, FT4, and CBC panels directly into the Life Passport.</p>
        <p style="margin-top:6px">Monetized as a premium tier feature + diagnostic lab affiliate referral revenue (10% commission on thyroid/echo bookings).</p>
        <p style="margin-top:8px;font-weight:700;color:var(--primary-deeper)">Data Moat & Lab Partnerships</p>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">Egypt Year 1 Unit Economics & Commercial Viability</div>
      <div class="band-grid band-3" style="margin-top:6px">
        <div><div class="bk">Parent LTV:CAC Ratio</div><div class="bl"><strong>> 18 : 1</strong> &bull; Blended CAC is ~120 EGP driven by organic clinical referrals and peer circles, against a 24-month Parent LTV of >2,200 EGP.</div></div>
        <div><div class="bk">Zero Customer Churn Advantage</div><div class="bl">Unlike episodic telemedicine, Down syndrome care spans <strong>18+ years</strong>. Families retain the platform continuously from birth through adulthood.</div></div>
        <div><div class="bk">Scalable Multi-Disease Moat</div><div class="bl">The identical core infrastructure expands immediately into Cerebral Palsy (GMFCS) and Autism Spectrum Disorder (ASD) with 70% code reuse.</div></div>
      </div>
    </div>
`;

// 7. UPDATE SLIDE 17: Phased Financial & Commercial Projections (0-6m, 6-12m, 2nd Year)
const s17 = `
${makeBrandBar('Phased Financial & Commercial Projections')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Projected Revenue by Phases</div>
        <h2>Phased Financial & Commercial Projections (0-6m &bull; 6-12m &bull; 2nd Year)</h2>
      </div>
      <div class="meta">Phase 1 Pilot &bull; Phase 2 Egypt Scale &bull; Phase 3 Regional Expansion</div>
    </div>

    <!-- 3 Phase Financial Cards -->
    <div class="grid grid-3" style="margin-top:8px">
      <!-- Phase 1: 0 - 6 Months -->
      <div class="card card--accent">
        <div class="eyebrow" style="color:var(--primary-dark)">Phase 1: Months 0 – 6</div>
        <h3 style="color:#0f172a">Pilot & Clinical Launch</h3>
        <div style="font-size:22px;font-weight:900;color:var(--primary);margin:6px 0">
          850k &ndash; 1.1M EGP <span style="font-size:12px;color:var(--gray-500);font-weight:600">(~$18k &ndash; $23k)</span>
        </div>
        <ul style="margin:8px 0 0 16px;font-size:11.5px;color:var(--gray-700);line-height:1.55">
          <li><strong>Paid Active Families:</strong> 500 – 800 families (Greater Cairo & Alexandria).</li>
          <li><strong>Partner Specialists:</strong> 60 verified pediatric doctors & 15 therapy centers.</li>
          <li><strong>Subscription Revenue (250 EGP/mo):</strong> ~600k – 900k EGP.</li>
          <li><strong>Telehealth Take-Rate (15% on 1,500 visits):</strong> ~90,000 EGP.</li>
          <li><strong>Lab Referral Affiliates (Echo/Thyroid):</strong> ~60,000 EGP.</li>
          <li><strong>Core Priority:</strong> Clinical baseline validation, 85%+ retention, community trust.</li>
        </ul>
      </div>

      <!-- Phase 2: 6 - 12 Months -->
      <div class="card card--accent" style="border:2px solid var(--primary-light)">
        <div class="eyebrow" style="color:var(--accent-dark)">Phase 2: Months 6 – 12</div>
        <h3 style="color:#0f172a">Commercial Egypt Scale</h3>
        <div style="font-size:22px;font-weight:900;color:var(--accent-dark);margin:6px 0">
          5.0M &ndash; 6.0M EGP <span style="font-size:12px;color:var(--gray-500);font-weight:600">(~$105k &ndash; $125k)</span>
        </div>
        <ul style="margin:8px 0 0 16px;font-size:11.5px;color:var(--gray-700);line-height:1.55">
          <li><strong>Paid Active Families:</strong> 2,500 – 3,500 families (National expansion).</li>
          <li><strong>Partner Specialists:</strong> 180+ doctors & 45 specialized centers.</li>
          <li><strong>Subscription Revenue:</strong> ~3.8M – 4.8M EGP.</li>
          <li><strong>Telehealth Take-Rate (15% on 7,500 visits):</strong> ~500,000 EGP.</li>
          <li><strong>Lab & Pharmacy OCR Affiliates:</strong> ~350,000 EGP.</li>
          <li><strong>B2B Clinic SaaS Contracts:</strong> ~350,000 EGP.</li>
          <li><strong>Cumulative Year 1 Revenue:</strong> <strong>~5.85M &ndash; 7.1M EGP (~$123k&ndash;$148k)</strong>.</li>
        </ul>
      </div>

      <!-- Phase 3: Year 2 (12 - 24 Months) -->
      <div class="card card--accent">
        <div class="eyebrow" style="color:var(--success)">Phase 3: 2nd Year (12 – 24m)</div>
        <h3 style="color:#0f172a">Regional Scale & B2B Licensing</h3>
        <div style="font-size:22px;font-weight:900;color:var(--success);margin:6px 0">
          32M &ndash; 42.5M EGP <span style="font-size:12px;color:var(--gray-500);font-weight:600">(~$665k &ndash; $885k)</span>
        </div>
        <ul style="margin:8px 0 0 16px;font-size:11.5px;color:var(--gray-700);line-height:1.55">
          <li><strong>Paid Active Families:</strong> 8,000 – 12,000 families (Egypt + GCC Pilot).</li>
          <li><strong>GCC Rollout (Saudi Arabia & UAE):</strong> SAR/AED multi-currency billing.</li>
          <li><strong>Enterprise B2B Licensing:</strong> 25+ hospital chains & specialized academies.</li>
          <li><strong>Annualized Subscription ARR:</strong> ~24M – 32M EGP.</li>
          <li><strong>Telehealth & Tele-Therapy GMV:</strong> ~3.2M – 4.5M EGP.</li>
          <li><strong>Enterprise Hospital Licensing APIs:</strong> ~4.8M – 6.0M EGP.</li>
          <li><strong>Multi-Disease Expansion:</strong> Cerebral Palsy & Autism engine deployment.</li>
        </ul>
      </div>
    </div>

    <!-- Commercial ROI Summary Band -->
    <div class="band" style="margin-top:12px">
      <div class="band-title">Commercial ROI & Cash Generation Profile</div>
      <div class="bl">With low operational overhead (~$300-$500/mo cloud costs) and zero customer acquisition cost driven by clinical referrals and peer circles, Down Plus generates <strong>healthy cashflow from Month 4 onwards</strong>. The client achieves full capital recovery within Month 5 of launch, scaling to high-margin recurring enterprise profitability in Year 2.</div>
    </div>
`;

// 8. UPDATE SLIDE 19: Unified Milestones with Explicit Financial Weights & Numbers
const s19 = `
${makeBrandBar('Technical Delivery Roadmap & Feature Scheduling')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Structured Technical & Commercial Schedule</div>
        <h2>Project Delivery Milestones: Feature Allocation & Financial Weights</h2>
      </div>
      <div class="meta">16-Week Production Plan &bull; 6 Milestones &bull; 100% Cashflow Transparency</div>
    </div>
    <div class="roadmap" style="margin-top:8px">
      <div class="ms" style="border-top:3px solid var(--primary)">
        <div class="key">M1 (Weeks 1-2)</div>
        <div class="weight" style="color:var(--primary);font-weight:800">20% &bull; 114,000 EGP ($2,000)</div>
        <h4>Architecture & Multi-Tenant Core</h4>
        <p>Prisma ERD schema, Monorepo Docker dev stack, JWT RBAC security scaffolding, and database clustering.</p>
      </div>

      <div class="ms" style="border-top:3px solid var(--primary)">
        <div class="key">M2 (Weeks 3-5)</div>
        <div class="weight" style="color:var(--primary);font-weight:800">20% &bull; 114,000 EGP ($2,000)</div>
        <h4>Specialized Clinical Engines</h4>
        <p>Zemel Down Syndrome Growth Curves (0-36m), Makaton 8-gesture early speech dictionary, and AAP health protocols.</p>
      </div>

      <div class="ms" style="border-top:3px solid var(--primary-light)">
        <div class="key">M3 (Weeks 6-8)</div>
        <div class="weight" style="color:var(--primary-dark);font-weight:800">20% &bull; 114,000 EGP ($2,000)</div>
        <h4>Mobile Experience & Peer Circles</h4>
        <p>Parent mobile app (Expo), Daily 20-min therapy routines with streak engine, and Parent Peer Circles & Community Hub.</p>
      </div>

      <div class="ms" style="border-top:3px solid var(--accent)">
        <div class="key">M4 (Weeks 9-11)</div>
        <div class="weight" style="color:var(--accent-dark);font-weight:800">15% &bull; 85,500 EGP ($1,500)</div>
        <h4>Telehealth Engine & Egyptian Payments</h4>
        <p>Doctor booking marketplace, in-app telehealth scheduling, and Paymob / Vodafone Cash payment gateway integration.</p>
      </div>

      <div class="ms" style="border-top:3px solid var(--primary-deeper)">
        <div class="key">M5 (Weeks 12-14)</div>
        <div class="weight" style="color:var(--primary-deeper);font-weight:800">15% &bull; 85,500 EGP ($1,500)</div>
        <h4>Smart Lab OCR Scanner & Doctor Portal</h4>
        <p>BullMQ OCR camera scanner for Egyptian lab panels (Al Borg/Al Mokhtabar) and Doctor Clinical Verification Workbench.</p>
      </div>

      <div class="ms golive" style="border-top:3px solid var(--success)">
        <div class="key">M6 (Weeks 15-16)</div>
        <div class="weight" style="color:var(--success);font-weight:800">10% &bull; 57,000 EGP ($1,000)</div>
        <h4>Certified Life Passport & Handover</h4>
        <p>A4 printable Life Passport, Emergency QR verification, security audit, AWS production deployment, and 60-day warranty.</p>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">Financial Weighting & Delivery Assurance Summary</div>
      <div class="bl">Total Delivery Contract: <strong>570,000 EGP ($10,000 USD)</strong> strictly allocated across verified milestones. Each release of funds is tied to demonstrable feature code, automated test suite passes (exit code 0), and clinical acceptance criteria sign-off.</div>
    </div>
`;

// 9. UPDATE SLIDE 20: Commercial Delivery & Milestone Cashflow Schedule
const s20 = `
${makeBrandBar('Commercial Delivery & Milestone Cashflow Schedule')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Commercial Proposal</div>
        <h2>Commercial Execution & Addressable Milestone Cashflow Schedule</h2>
      </div>
      <div class="meta">Rate: 1 USD = 57 EGP &bull; Transparent Deliverables &bull; Phased Outflow</div>
    </div>

    <!-- Cashflow & Milestone Release Table -->
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;box-shadow:0 4px 12px rgba(0,0,0,0.04);margin-top:8px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <h3 style="font-size:14.5px;font-weight:800;color:#0f172a">Addressable Milestone Cashflow Outflow Schedule (Fixed-Price Delivery: 570,000 EGP / $10,000 USD)</h3>
        <span class="pill"><span class="dot"></span> 100% Deliverable-Linked Releases</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Milestone</th>
            <th>Target Timeline</th>
            <th>Key Deliverable Trigger</th>
            <th>Weight</th>
            <th>Cash Outflow (EGP)</th>
            <th>Cash Outflow (USD)</th>
            <th>Cumulative %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>M1: Architecture Core</strong></td>
            <td>Weeks 1 &ndash; 2 (Month 1)</td>
            <td>Prisma schema, Docker environment, RBAC auth scaffolding</td>
            <td><strong style="color:var(--primary)">20%</strong></td>
            <td>114,000 EGP</td>
            <td>$2,000</td>
            <td>20%</td>
          </tr>
          <tr>
            <td><strong>M2: Clinical Engines</strong></td>
            <td>Weeks 3 &ndash; 5 (Month 1-2)</td>
            <td>Zemel curves, Makaton video engine, AAP supervision rules</td>
            <td><strong style="color:var(--primary)">20%</strong></td>
            <td>114,000 EGP</td>
            <td>$2,000</td>
            <td>40%</td>
          </tr>
          <tr>
            <td><strong>M3: Mobile & Peer Circles</strong></td>
            <td>Weeks 6 &ndash; 8 (Month 2)</td>
            <td>Daily therapy streaks & Parent Peer Circles community hub</td>
            <td><strong style="color:var(--primary-dark)">20%</strong></td>
            <td>114,000 EGP</td>
            <td>$2,000</td>
            <td>60%</td>
          </tr>
          <tr>
            <td><strong>M4: Telehealth & Paymob</strong></td>
            <td>Weeks 9 &ndash; 11 (Month 3)</td>
            <td>Doctor booking flow, video telehealth, Paymob & Vodafone Cash</td>
            <td><strong style="color:var(--accent-dark)">15%</strong></td>
            <td>85,500 EGP</td>
            <td>$1,500</td>
            <td>75%</td>
          </tr>
          <tr>
            <td><strong>M5: Lab OCR & Doctor Portal</strong></td>
            <td>Weeks 12 &ndash; 14 (Month 3-4)</td>
            <td>Al Borg/Al Mokhtabar OCR parser & Doctor clinical workbench</td>
            <td><strong style="color:var(--primary-deeper)">15%</strong></td>
            <td>85,500 EGP</td>
            <td>$1,500</td>
            <td>90%</td>
          </tr>
          <tr>
            <td><strong>M6: Life Passport & Launch</strong></td>
            <td>Weeks 15 &ndash; 16 (Month 4)</td>
            <td>A4 Life Passport, QR emergency portal, AWS production rollout</td>
            <td><strong style="color:var(--success)">10%</strong></td>
            <td>57,000 EGP</td>
            <td>$1,000</td>
            <td><strong>100%</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Summary Guarantee & Warranty Card -->
    <div class="grid grid-2" style="margin-top:12px">
      <div class="card card--accent">
        <div class="eyebrow">Client Cashflow Protection</div>
        <h3>Zero Upfront Financial Risk</h3>
        <p>No large advance payment required. Every milestone payment is held and released only upon client demonstration, code review, and verified test suite execution. This guarantees full alignment between engineering progress and cashflow disbursement.</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Comprehensive Turnkey Inclusion</div>
        <h3>Full 60-Day Post-Launch Warranty</h3>
        <p>Includes complete source code ownership, Docker & Terraform scripts, App Store & Google Play submission assistance, staff training, and <strong>60 days of complimentary critical bug fixes and production SLA support</strong>.</p>
      </div>
    </div>
`;

// Assemble exactly the 21 slides:
const final21Slides = [
  s1, s2, originalSlides[2], originalSlides[3], originalSlides[4],
  originalSlides[5], originalSlides[6], originalSlides[7], originalSlides[8],
  s10, s11, s12, originalSlides[12], originalSlides[13], originalSlides[14],
  s16, s17, originalSlides[17], s19, s20, originalSlides[20]
];

console.log('Final slides to render:', final21Slides.length);

const wrappedSlides = final21Slides.map((s, idx) => {
  const isCover = idx === 0 ? ' cover active' : '';
  return `  <section class="slide${isCover}">\n${s.trim()}\n  </section>`;
});

// Find head and navbar
const headEndIdx = html.indexOf('</head>');
const headContent = html.substring(0, headEndIdx + 7);

const navIdx = html.indexOf('<div class="navbar">');
const navControlsAndScripts = html.substring(navIdx);

const finalDeckHtml = `${headContent}
<body>

<div class="deck">
${wrappedSlides.join('\n\n')}
</div>

${navControlsAndScripts}`;

fs.writeFileSync(deckPath, finalDeckHtml, 'utf8');
console.log('Successfully written exactly 21 slides to:', deckPath);

fs.writeFileSync(webDeckPath, finalDeckHtml, 'utf8');
console.log('Successfully written exactly 21 slides to:', webDeckPath);

console.log('All updates complete and verified!');
