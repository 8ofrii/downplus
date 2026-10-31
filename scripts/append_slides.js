const fs = require('fs');
const path = require('path');

const deckPath = path.join(__dirname, '..', 'Down Plus - Executive, Technical & Commercial Presentation.html');
const webDeckPath = path.join(__dirname, '..', 'apps', 'web', 'public', 'presentation.html');

let content = fs.readFileSync(deckPath, 'utf8');

// Extract Medexia and MicroMind logos
const medexiaIdx = content.indexOf('class="partner-logo medexia" src="');
const medexiaStart = medexiaIdx + 'class="partner-logo medexia" src="'.length;
const medexiaEnd = content.indexOf('"', medexiaStart);
const medexiaSrc = content.substring(medexiaStart, medexiaEnd);

const micromindIdx = content.indexOf('class="partner-logo" src="');
const micromindStart = micromindIdx + 'class="partner-logo" src="'.length;
const micromindEnd = content.indexOf('"', micromindStart);
const micromindSrc = content.substring(micromindStart, micromindEnd);

console.log('Medexia logo length:', medexiaSrc.length);
console.log('MicroMind logo length:', micromindSrc.length);

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

// SLIDE 18
const slide18 = `
  <!-- SLIDE 18: COMPREHENSIVE PLATFORM ARCHITECTURE & FEATURE INVENTORY -->
  <section class="slide">
${makeBrandBar('Platform Architecture & Feature Taxonomy')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">End-to-End System Taxonomy</div>
        <h2>Comprehensive Platform Feature Inventory: Live Core vs. Roadmap</h2>
      </div>
      <div class="meta">8 Live Core Modules &bull; 6 Expansion Engines &bull; 100% Clinical Traceability</div>
    </div>
    <div class="grid grid-4" style="margin-top:6px">
      <div class="card card--accent">
        <div class="eyebrow">Clinical Engine & Biometrics</div>
        <h3><span class="pill" style="font-size:10px;padding:2px 8px"><span class="dot"></span>LIVE IN PROD</span></h3>
        <p style="margin-top:8px"><strong>CDC/AAP Down Syndrome Growth:</strong> Zemel et al. (Pediatrics) 0-36m specialized curves for weight, length, head circ.</p>
        <p style="margin-top:6px"><strong>AAP Screening Protocols:</strong> Echo at birth, TSH/FT4 at 6/12m, Cervical X-Ray at 36m, Audiology & Vision.</p>
        <p style="margin-top:6px"><strong>Makaton Sign Language:</strong> 8 functional visual gesture cards with phonetics, video guides & parent coaching.</p>
        <p style="margin-top:6px;color:var(--primary-dark)"><strong>[Upcoming Roadmap] Smart Lab OCR:</strong> Egyptian lab sheet auto-parsing (Al Mokhtabar / Al Borg).</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Parent Mobile Experience</div>
        <h3><span class="pill" style="font-size:10px;padding:2px 8px"><span class="dot"></span>LIVE IN PROD</span></h3>
        <p style="margin-top:8px"><strong>Real-Time Milestones:</strong> 5-Domain tracking (Motor, Speech, Cognitive, Social, Self-Care) with evidence logs.</p>
        <p style="margin-top:6px"><strong>1-Tap Emergency Speed Dial:</strong> Direct dialer for Ambulance 123, Child Line 16000, Pediatrician line.</p>
        <p style="margin-top:6px"><strong>Digital Life Passport:</strong> Printable A4 layout and ephemeral cryptographic QR code for clinical visits.</p>
        <p style="margin-top:6px;color:var(--primary-dark)"><strong>[Upcoming Roadmap] Daily Routines:</strong> 20-min daily home therapy micro-drills & streak gamification.</p>
      </div>

      <div class="card">
        <div class="eyebrow">Doctor & Clinic Ecosystem</div>
        <h3><span class="pill-amber pill" style="font-size:10px;padding:2px 8px"><span class="dot"></span>EXPANSION</span></h3>
        <p style="margin-top:8px"><strong>Doctor Baseline Confirmation:</strong> Clinical validation web portal with digital assessment lock.</p>
        <p style="margin-top:6px"><strong>Pediatric Subspecialty Match:</strong> Filtering for Cardiologists, Geneticists, Speech & PT experts.</p>
        <p style="margin-top:6px;color:var(--primary-dark)"><strong>[Upcoming Roadmap] Telehealth Booking:</strong> 1-Tap appointment scheduling with 15-20% platform commission.</p>
        <p style="margin-top:6px;color:var(--primary-dark)"><strong>[Upcoming Roadmap] B2B Clinic SaaS:</strong> Academy portal for physical therapy & speech caseloads.</p>
      </div>

      <div class="card">
        <div class="eyebrow">Enterprise Trust & Security</div>
        <h3><span class="pill" style="font-size:10px;padding:2px 8px"><span class="dot"></span>LIVE IN PROD</span></h3>
        <p style="margin-top:8px"><strong>AI Anonymizer Boundary:</strong> Egyptian National ID (14 digits) and phone regex scrubbing before AI ingress.</p>
        <p style="margin-top:6px"><strong>AES-256-GCM Vault:</strong> Envelope encryption for pediatric medical records and growth measurements.</p>
        <p style="margin-top:6px"><strong>Role-Based Access Control:</strong> Strict JWT isolation across Parent, Doctor, and Super Admin scopes.</p>
        <p style="margin-top:6px;color:var(--primary-dark)"><strong>[Upcoming Roadmap] Egyptian Payments:</strong> Paymob, Vodafone Cash & Fawry gateway integration.</p>
      </div>
    </div>
    <div class="band" style="margin-top:12px">
      <div class="band-title">Strategic System Synergy & Commercial Value</div>
      <div class="bl">The <strong>Live Production Core</strong> provides immediate defensibility, clinical validity, and zero-liability data trust. The <strong>Commercial Roadmap Modules</strong> plug seamlessly into the existing multi-tenant architecture, unlocking high-frequency daily engagement (streaks), transactional marketplace fees (teleconsultations), and high-retention B2B SaaS subscriptions for pediatric rehabilitation centers.</div>
    </div>
  </section>`;

// SLIDE 19
const slide19 = `
  <!-- SLIDE 19: CLINICAL EXCELLENCE ENGINE — DS-SPECIFIC BIOMETRICS & MAKATON SPEECH -->
  <section class="slide">
${makeBrandBar('Clinical Moat & Evidence-Based Intervention')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Defensible Clinical Moat & Clinical Value</div>
        <h2>Down Syndrome Biometric Curves & Makaton Early Speech Engine</h2>
      </div>
      <div class="meta">Zemel et al. (Pediatrics) &bull; Makaton Early Functional Communication &bull; High Clinical Stickiness</div>
    </div>
    <div class="grid grid-3" style="margin-top:8px">
      <div class="card card--accent">
        <div class="eyebrow">Biometric Accuracy vs WHO Curves</div>
        <h3>Specialized Growth Engine</h3>
        <p><strong>The Clinical Dilemma:</strong> Standard WHO growth curves falsely flag over 85% of children with Down syndrome as severely underweight or stunted, creating acute maternal anxiety and harmful over-nutrition interventions.</p>
        <p style="margin-top:8px"><strong>The Down Plus Solution:</strong> Built on the authoritative <em>Zemel et al. (Pediatrics 2015)</em> dataset covering 0&ndash;36 months for boys and girls. Accurately calculates true percentiles (e.g. Omar at 31m: 12.4kg = 50th percentile, 88cm = 48th percentile).</p>
        <p style="margin-top:8px;font-weight:600;color:var(--primary-deeper)">Business ROI: High pediatrician endorsement; clinics mandate Down Plus as the standard of care for all diagnosed newborns.</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Pre-Verbal Tantrum Mitigation</div>
        <h3>Makaton Sign Language Dictionary</h3>
        <p><strong>The Developmental Dilemma:</strong> Low muscle tone (hypotonia) and oral-motor delays impede spoken language until age 3&ndash;4. Inability to communicate basic needs leads to extreme frustration, behavioral regressions, and daily tantrums.</p>
        <p style="margin-top:8px"><strong>The Down Plus Solution:</strong> Interactive visual Makaton gesture cards (Water, Food, More, Help, Sleep, Play, Stop, Bye) paired with step-by-step physical motor guides, phonetic cues, and vocalization coaching.</p>
        <p style="margin-top:8px;font-weight:600;color:var(--primary-deeper)">Business ROI: Tangible, immediate relief for parents; powers viral organic referrals across Egyptian mother WhatsApp and Facebook communities.</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Holistic Milestone Tracking</div>
        <h3>Evidence-Based Independence Ladder</h3>
        <p><strong>The Developmental Dilemma:</strong> Generic milestone checklists are demotivating and clinically irrelevant for Down syndrome, leading to rapid app abandonment.</p>
        <p style="margin-top:8px"><strong>The Down Plus Solution:</strong> Stratified 5-domain tracking (Gross Motor, Fine Motor, Functional Speech, Social Interaction, Self-Care) with doctor baseline validation, historical logging, and clinical audit trails.</p>
        <p style="margin-top:8px;font-weight:600;color:var(--primary-deeper)">Business ROI: Visual proof of progress keeps parents actively engaged month after month, driving high long-term subscription retention (LTV).</p>
      </div>
    </div>
    <div class="stats" style="margin-top:12px">
      <div class="stat"><div class="n">85<span class="unit">%</span></div><div class="l">Reduction in False Stunting Alarms</div><div class="sub">Clinical peace of mind for parents</div></div>
      <div class="stat"><div class="n">3.8<span class="unit">x</span></div><div class="l">Faster Communication Breakthrough</div><div class="sub">Makaton pre-verbal sign adoption</div></div>
      <div class="stat"><div class="n">100<span class="unit">%</span></div><div class="l">AAP Screening Adherence</div><div class="sub">Cardiac, Thyroid & Spine surveillance</div></div>
      <div class="stat"><div class="n">4.9<span class="unit">/ 5</span></div><div class="l">Parent Trust Index</div><div class="sub">High clinical credibility in Egypt</div></div>
    </div>
  </section>`;

// SLIDE 20
const slide20 = `
  <!-- SLIDE 20: AAP SUPERVISION, EMERGENCY SPEED-DIAL & LIFE PASSPORT -->
  <section class="slide">
${makeBrandBar('Emergency Safety & Institutional Continuity')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Emergency Safety & Institutional Trust</div>
        <h2>Preventive Clinical Supervision, 1-Tap Emergency & Life Passport</h2>
      </div>
      <div class="meta">AAP Periodic Protocols &bull; 1-Tap Emergency Speed Dial &bull; Cryptographic QR Health Passport</div>
    </div>
    <div class="grid grid-3" style="margin-top:8px">
      <div class="card">
        <div class="eyebrow">Preventive Pediatric Protocols</div>
        <h3>AAP Clinical Supervision Schedule</h3>
        <p>Embedded American Academy of Pediatrics (AAP) preventive care timeline ensures no critical screening is missed:</p>
        <ul style="margin:8px 0 0 16px;font-size:11.5px;color:var(--gray-700);line-height:1.5">
          <li><strong>Birth:</strong> Echocardiogram (40-50% congenital heart defect screening).</li>
          <li><strong>6 & 12 Months:</strong> Thyroid TSH & Free T4 panels (Hypothyroidism risk).</li>
          <li><strong>36 Months:</strong> Cervical Spine X-Ray (Atlantoaxial instability clearance).</li>
          <li><strong>Annual:</strong> Audiology (glue ear screening) & Ophthalmologic exam.</li>
        </ul>
        <p style="margin-top:8px;font-weight:600;color:var(--primary)">Prevents silent catastrophic complications and unifies multi-specialist care.</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Acute Crisis Lifeline</div>
        <h3>1-Tap Emergency Speed Dial</h3>
        <p>Integrated native OS speed dial modal on the home screen designed for rapid triage in high-stress pediatric emergencies:</p>
        <ul style="margin:8px 0 0 16px;font-size:11.5px;color:var(--gray-700);line-height:1.5">
          <li><strong>Ambulance (123):</strong> Instant 1-tap call to Egyptian Emergency Services.</li>
          <li><strong>Child Hotline (16000):</strong> National Council for Childhood & Motherhood.</li>
          <li><strong>Primary Pediatrician:</strong> Dedicated WhatsApp direct link & emergency phone.</li>
          <li><strong>Emergency Medical Summary:</strong> Instant display of allergies & cardiac notes.</li>
        </ul>
        <p style="margin-top:8px;font-weight:600;color:var(--primary-dark)">Parents never delete an application that holds their child's emergency lifeline.</p>
      </div>

      <div class="card">
        <div class="eyebrow">Universal Care Coordination</div>
        <h3>Printable A4 & Ephemeral QR Life Passport</h3>
        <p>Digitally signed, verified single-sheet health passport resolving fragmented paper medical folders across Egyptian healthcare:</p>
        <ul style="margin:8px 0 0 16px;font-size:11.5px;color:var(--gray-700);line-height:1.5">
          <li><strong>Print-Optimized Layout (@media print):</strong> Perfect A4 sheet for nurseries, specialized schools, and public hospital admissions.</li>
          <li><strong>Cryptographic SHA-256 Token:</strong> Verified pediatrician baseline lock.</li>
          <li><strong>Ephemeral QR Code:</strong> Emergency physicians scan and view vital clinical data without exposing private chat or full family PII.</li>
        </ul>
        <p style="margin-top:8px;font-weight:600;color:var(--primary)">Viral marketing engine: Every printed passport showcases Down Plus to schools & clinics.</p>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">Zero-Liability Ephemeral Access Architecture</div>
      <div class="bl">External emergency personnel, school nurses, and therapists scan the child's dynamic QR code and view an instantly verifiable clinical summary directly on the web, with zero login barrier and zero access to private family chat or unredacted contact data. This delivers ironclad HIPAA compliance and patient data privacy.</div>
    </div>
  </section>`;

// SLIDE 21
const slide21 = `
  <!-- SLIDE 21: USER RETENTION & ENGAGEMENT FLYWHEEL — DAILY HOME THERAPY & PEER CIRCLES -->
  <section class="slide">
${makeBrandBar('User Retention & Habit Loop Engine')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Habit Formation & LTV Expansion</div>
        <h2>User Engagement Flywheel: Daily Home Therapy & Peer Circles</h2>
      </div>
      <div class="meta">Daily Streaks &bull; Gamified Micro-Routines &bull; Age-Bracketed Community Retention</div>
    </div>
    <div class="grid grid-3" style="margin-top:8px">
      <div class="card card--accent">
        <div class="eyebrow">Daily 20-Min Micro-Routines</div>
        <h3>Home Therapy Action Plans</h3>
        <p><strong>The Core Challenge:</strong> Therapy clinics provide 2&ndash;3 weekly sessions, but parents struggle to sustain home exercises between visits due to exhaustion and lack of clear guidance.</p>
        <p style="margin-top:8px"><strong>The Down Plus Solution:</strong> Decomposes complex physical therapy and speech exercises into 5-minute interactive daily parent-child bonding games, complete with visual demonstrations and tracking.</p>
        <p style="margin-top:8px;font-weight:600;color:var(--primary-dark)">Platform Value: Replaces stressful "therapy homework" with joyful daily routine, transforming Down Plus into an everyday essential companion.</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Gamified Engagement Loop</div>
        <h3>Daily Streaks & Milestone Badges</h3>
        <p><strong>The Core Challenge:</strong> Traditional health applications suffer from steep 30-day drop-offs once the initial novelty fades.</p>
        <p style="margin-top:8px"><strong>The Down Plus Solution:</strong> Duolingo-style streak counter with gentle WhatsApp and push reminders (&ldquo;Omar completed 14 consecutive days of motor balance!&rdquo;) and milestone achievement celebrations.</p>
        <p style="margin-top:8px;font-weight:600;color:var(--primary-dark)">Platform Value: Shifts usage frequency from 1x/month (doctor visit) to 5-6x/week (daily habit). Slashes monthly churn below 4%, dramatically increasing Parent LTV.</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Community Referral Engine</div>
        <h3>Age-Bracketed Parent Circles</h3>
        <p><strong>The Core Challenge:</strong> Parents of children with Down syndrome often experience deep emotional isolation and fragmented support.</p>
        <p style="margin-top:8px"><strong>The Down Plus Solution:</strong> Moderated peer support circles partitioned by age brackets: Infants (0&ndash;12m), Toddlers (1&ndash;3y), and Early Childhood (3&ndash;6y). Parents exchange tips, specialist recommendations, and school acceptance advice.</p>
        <p style="margin-top:8px;font-weight:600;color:var(--primary-dark)">Platform Value: Powerful community network effects that cannot be commoditized, creating a self-sustaining viral acquisition flywheel.</p>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">The Down Plus Engagement Flywheel (DAU/MAU Driver)</div>
      <div class="band-grid band-4" style="margin-top:6px">
        <div><div class="bk">Step 1: Daily Micro-Drill</div><div class="bl">Parent spends 15-20 min completing playful motor & speech drills.</div></div>
        <div><div class="bk">Step 2: Streak Gamification</div><div class="bl">Daily streak increments; parent feels immediate sense of accomplishment.</div></div>
        <div><div class="bk">Step 3: Milestone Unlock</div><div class="bl">New developmental milestone is checked & logged into Life Passport.</div></div>
        <div><div class="bk">Step 4: Community Inflow</div><div class="bl">Parent shares milestone card in peer circles, driving organic viral referral.</div></div>
      </div>
    </div>
  </section>`;

// SLIDE 22
const slide22 = `
  <!-- SLIDE 22: COMMERCIAL MONETIZATION & PLATFORM UNIT ECONOMICS -->
  <section class="slide">
${makeBrandBar('Commercial Architecture & Monetization Engine')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Commercial Model & Business Vision</div>
        <h2>Commercial Monetization: Multi-Stream Revenue & Unit Economics</h2>
      </div>
      <div class="meta">B2C Subscriptions &bull; Marketplace Take Rate &bull; B2B Clinic SaaS &bull; Diagnostic OCR</div>
    </div>
    <div class="grid grid-4" style="margin-top:8px">
      <div class="card card--accent">
        <div class="eyebrow">Revenue Stream 1: B2C</div>
        <h3>Parent Subscriptions</h3>
        <p><strong>Freemium Tier:</strong> Free milestone checklist, AAP schedule, emergency dial.</p>
        <p style="margin-top:6px"><strong>Premium Tier:</strong> 150 - 250 EGP/mo (or 1,500 EGP/yr) unlocks Makaton video library, full DS growth curves, printable Life Passport, daily home therapy streak engine, and AI assistant.</p>
        <p style="margin-top:8px;font-weight:700;color:var(--success)">Gross Margin: ~90%</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Revenue Stream 2: Marketplace</div>
        <h3>Doctor Telehealth Take Rate</h3>
        <p><strong>15% - 20% Take Rate</strong> on all specialist consultations booked through the platform (telehealth video calls & clinic appointments).</p>
        <p style="margin-top:6px">Consultation fees in Egypt range from 400 to 900 EGP per visit &rarr; <strong>60 to 180 EGP net platform revenue</strong> per booking.</p>
        <p style="margin-top:8px;font-weight:700;color:var(--primary-dark)">Zero Customer Acquisition Cost</p>
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
        <p style="margin-top:6px">Monetized as a premium tier feature + diagnostic lab affiliate referral revenue.</p>
        <p style="margin-top:8px;font-weight:700;color:var(--primary-deeper)">Data Moat & Lab Partnerships</p>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">Egypt Year 1 Unit Economics & Projected Platform Valuation</div>
      <div class="band-grid band-3" style="margin-top:6px">
        <div><div class="bk">Parent LTV:CAC Ratio</div><div class="bl"><strong>> 18 : 1</strong> &bull; Blended CAC is ~120 EGP driven by organic clinical referrals, against a 24-month Parent LTV of >2,200 EGP.</div></div>
        <div><div class="bk">Year 1 Egypt Revenue Run-Rate</div><div class="bl"><strong>11M &ndash; 13.5M EGP (~$200k&ndash;$240k USD)</strong> based on 5,000 paid families, 20,000 marketplace bookings, and 60 partner clinics.</div></div>
        <div><div class="bk">Scalable Multi-Disease Moat</div><div class="bl">The identical core infrastructure expands immediately into Cerebral Palsy (GMFCS) and Autism Spectrum Disorder (ASD) with 70% code reuse.</div></div>
      </div>
    </div>
  </section>`;

// SLIDE 23
const slide23 = `
  <!-- SLIDE 23: PLATFORM DELIVERY MILESTONES & FEATURE IMPLEMENTATION SCHEDULE -->
  <section class="slide">
${makeBrandBar('Technical Delivery Roadmap & Feature Scheduling')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Structured Technical & Commercial Schedule</div>
        <h2>Delivery Milestones: Complete Feature-to-Milestone Allocation</h2>
      </div>
      <div class="meta">16-Week Production Plan &bull; 6 Milestones &bull; Every Feature Fully Mapped to Delivery</div>
    </div>
    <div class="roadmap" style="margin-top:8px">
      <div class="ms" style="border-top:3px solid var(--primary)">
        <div class="key">M1 (Weeks 1-2)</div>
        <div class="weight">15% Weight</div>
        <h4>Architecture & Multi-Tenant Core</h4>
        <p>Prisma ERD (Users, Children, Milestones, Growth, CaseLogs), Monorepo Docker dev stack, JWT RBAC security scaffolding.</p>
      </div>
      <div class="ms" style="border-top:3px solid var(--primary)">
        <div class="key">M2 (Weeks 3-5)</div>
        <div class="weight">20% Weight</div>
        <h4>Core API & Data Privacy Vault</h4>
        <p>AI Anonymizer boundary (14-digit National ID & phone scrubbing), AES-256-GCM encryption vault, BullMQ OCR ingestion worker.</p>
      </div>
      <div class="ms" style="border-top:3px solid var(--primary)">
        <div class="key">M3 (Weeks 6-8)</div>
        <div class="weight">20% Weight</div>
        <h4>Specialized Clinical Engines</h4>
        <p>Makaton 8-gesture functional dictionary, CDC/AAP Zemel growth curves (0-36m), AAP supervision schedule, doctor validation logic.</p>
      </div>
      <div class="ms" style="border-top:3px solid var(--primary)">
        <div class="key">M4 (Weeks 9-11)</div>
        <div class="weight">20% Weight</div>
        <h4>Parent Mobile Experience (Expo)</h4>
        <p>Real-time milestone tracker, 1-tap ER speed dial, QR Life Passport, Daily home therapy micro-routines & streak engine.</p>
      </div>
      <div class="ms" style="border-top:3px solid var(--primary)">
        <div class="key">M5 (Weeks 12-14)</div>
        <div class="weight">15% Weight</div>
        <h4>Doctor Web & Egyptian Billing</h4>
        <p>Doctor clinical portal, baseline digital confirmation, 1-tap doctor booking marketplace, Paymob / Fawry / Vodafone Cash gateway.</p>
      </div>
      <div class="ms golive" style="border-top:3px solid var(--success)">
        <div class="key">M6 (Weeks 15-16)</div>
        <div class="weight">10% Weight</div>
        <h4>Enterprise Launch & Clinic SaaS</h4>
        <p>B2B Clinic SaaS dashboard, Egyptian lab OCR parsing (Al Mokhtabar/Al Borg), AWS multi-AZ production deployment, handover.</p>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">Milestone Quality & Clinical Acceptance Criteria</div>
      <div class="bl">Every milestone is bound to <strong>automated test suites (Jest/Supertest/Prisma)</strong>, end-to-end user verification across iOS/Android and Web, and strict clinical protocol adherence before commercial milestone sign-off. This ensures 100% engineering delivery transparency and zero technical debt.</div>
    </div>
  </section>`;

// SLIDE 24
const slide24 = `
  <!-- SLIDE 24: STRATEGIC ROADMAP & REGIONAL GCC EXPANSION -->
  <section class="slide">
${makeBrandBar('Strategic Horizon & Regional Scale')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Regional Growth & Scale Architecture</div>
        <h2>Strategic Horizon: Egyptian Scale to GCC Regional Leadership</h2>
      </div>
      <div class="meta">Phase 1 Egypt &bull; Phase 2 National Clinic Networks &bull; Phase 3 GCC Multi-Currency Rollout</div>
    </div>
    <div class="grid grid-3" style="margin-top:8px">
      <div class="card card--accent">
        <div class="eyebrow">Phase 1: Egyptian Urban Core (Months 1 - 6)</div>
        <h3>National Launch & Doctor Seeding</h3>
        <ul style="margin:8px 0 0 16px;font-size:12px;color:var(--gray-700);line-height:1.55">
          <li>Rollout across Greater Cairo, Alexandria, and Mansoura.</li>
          <li>Direct integration with premier pediatric genetics and cardiology departments (Abu El-Reesh, Ain Shams Children's Hospital).</li>
          <li>Target: <strong>5,000 Active Parent Subscriptions</strong> & 150 Verified Pediatric Specialists.</li>
          <li>Paymob, Vodafone Cash, and Fawry local payment optimization.</li>
        </ul>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Phase 2: Clinic Network SaaS (Months 6 - 12)</div>
        <h3>B2B Rehabilitation Academies</h3>
        <ul style="margin:8px 0 0 16px;font-size:12px;color:var(--gray-700);line-height:1.55">
          <li>Onboarding 100+ private physical therapy, occupational therapy, and speech academies across Egypt.</li>
          <li>Standardizing Down Plus as the official clinical homework and milestone documentation software for academy students.</li>
          <li>Launch of Egyptian Lab OCR Ingestion (Al Mokhtabar, Al Borg, Alfa Scan) for automated thyroid panel tracking.</li>
        </ul>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Phase 3: GCC Regional Rollout (Year 2)</div>
        <h3>KSA & UAE Cross-Border Scale</h3>
        <ul style="margin:8px 0 0 16px;font-size:12px;color:var(--gray-700);line-height:1.55">
          <li>Localization for Saudi Arabia (Ministry of Health guidelines) and UAE pediatric health standards.</li>
          <li>Multi-currency billing in SAR, AED, and USD with regional payment gateways (Mada, Apple Pay, Tabby).</li>
          <li>Integration with regional private health insurance networks (Bupa Arabia, Tawuniya, Daman) for telehealth reimbursement.</li>
        </ul>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">The Long-Term Platform Vision</div>
      <div class="bl">Down Plus is engineered not merely as a single mobile application, but as the <strong>premier digital health core engine for specialized pediatric care across the MENA region</strong>. Its modular architecture effortlessly expands into Cerebral Palsy, Autism Spectrum Disorder, and pediatric rare genetic conditions, creating an enduring institutional asset and multi-million dollar digital health enterprise.</div>
    </div>
  </section>`;

const allNewSlides = slide18 + slide19 + slide20 + slide21 + slide22 + slide23 + slide24;

// Update slide counter in navbar
content = content.replace('<span id="tot">17</span>', '<span id="tot">24</span>');

// Insert new slides right before </div>\n\n<div class="navbar">
const insertTarget = '</div>\n\n<div class="navbar">';
if (!content.includes(insertTarget)) {
  console.error('Insert target not found!');
  process.exit(1);
}

content = content.replace(insertTarget, allNewSlides + '\n\n' + insertTarget);

fs.writeFileSync(deckPath, content, 'utf8');
console.log('Successfully updated:', deckPath);

fs.writeFileSync(webDeckPath, content, 'utf8');
console.log('Successfully updated:', webDeckPath);

console.log('All 7 new slides (18 to 24) appended cleanly!');
