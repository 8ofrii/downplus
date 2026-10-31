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

// Slice out styles
const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>');
let styles = content.substring(styleStart, styleEnd);

// Polish the phones container CSS
const polishedCss = `
  /* Interactive Scrollable Smartphone Mockups */
  .phones-container {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 8px;
    height: 525px;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 8px;
  }
  .phone-mockup {
    position: relative;
    width: 260px;
    height: 510px;
    background: #0f172a;
    border-radius: 38px;
    padding: 9px;
    box-shadow: 0 20px 35px -10px rgba(15, 23, 42, 0.35), 0 0 0 2px #334155, 0 0 0 4px #0f172a;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex-shrink: 0;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .phone-mockup:hover {
    transform: translateY(-3px);
    box-shadow: 0 25px 45px -10px rgba(8, 145, 178, 0.3), 0 0 0 2px var(--primary-light), 0 0 0 4px #0f172a;
  }
  .phone-notch {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 82px;
    height: 18px;
    background: #000;
    border-radius: 20px;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .phone-notch .cam {
    width: 7px;
    height: 7px;
    background: #1e293b;
    border-radius: 50%;
  }
  .phone-screen {
    flex: 1;
    background: #f8fafc;
    border-radius: 30px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--primary) transparent;
  }
  .phone-screen::-webkit-scrollbar {
    width: 4px;
  }
  .phone-screen::-webkit-scrollbar-thumb {
    background: var(--primary-light);
    border-radius: 4px;
  }
  .phone-status-bar {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    height: 34px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 14px 4px;
    font-size: 9.5px;
    font-weight: 700;
    color: var(--gray-800);
    z-index: 20;
    border-bottom: 1px solid var(--gray-200);
  }
  .phone-scroll-pill {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.85);
    color: #fff;
    font-size: 8.5px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 10px;
    pointer-events: none;
    z-index: 25;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Interactive Scrollable Browser Mockup */
  .browser-mockup-frame {
    background: #ffffff;
    border: 1.5px solid var(--gray-300);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 515px;
    margin-top: 8px;
  }
  .browser-mockup-bar {
    background: var(--gray-100);
    padding: 8px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid var(--gray-200);
    flex-shrink: 0;
  }
  .browser-mockup-dots {
    display: flex;
    gap: 5px;
  }
  .browser-mockup-dots div {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
  .browser-mockup-dots .r { background: #ef4444; }
  .browser-mockup-dots .y { background: #f59e0b; }
  .browser-mockup-dots .g { background: #10b981; }
  .browser-mockup-url {
    flex: 1;
    background: #ffffff;
    border: 1px solid var(--gray-300);
    border-radius: 5px;
    padding: 3px 10px;
    font-size: 10.5px;
    font-family: var(--mono);
    color: var(--gray-700);
  }
  .browser-mockup-viewport {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background: var(--gray-50);
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--primary) transparent;
  }
  .browser-mockup-viewport::-webkit-scrollbar {
    width: 6px;
  }
  .browser-mockup-viewport::-webkit-scrollbar-thumb {
    background: var(--primary-light);
    border-radius: 4px;
  }
`;

// Extract all slides
const rawSlides = content.split('<!-- SLIDE');
console.log('Extracting from raw slides:', rawSlides.length);

// We will construct the slides according to the optimized narrative:

// SLIDE 1: Cover
const slide1 = `  <!-- SLIDE 1: COVER -->` + rawSlides[1].substring(rawSlides[1].indexOf('\n'));

// SLIDE 2: Problem & Opportunity
const slide2 = `  <!-- SLIDE 2: THE PROBLEM & MARKET OPPORTUNITY -->` + rawSlides[2].substring(rawSlides[2].indexOf('\n'));

// SLIDE 3: Business Value & Economic Impact
const slide3 = `  <!-- SLIDE 3: BUSINESS VALUE & ECONOMIC IMPACT -->` + rawSlides[3].substring(rawSlides[3].indexOf('\n'));

// SLIDE 4 (Was Slide 6): Clinical Breakthrough — Down Syndrome Biometrics & Makaton Speech
const slide4 = `  <!-- SLIDE 4: CLINICAL EXCELLENCE ENGINE — DS BIOMETRICS & MAKATON SPEECH -->
  <section class="slide">
${makeBrandBar('Clinical Moat & Evidence-Based Intervention')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Defensible Clinical Moat & Core Medical Value</div>
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

// SLIDE 5 (Was Slide 7): Preventive AAP Protocols, Emergency Speed-Dial & Life Passport
const slide5 = `  <!-- SLIDE 5: AAP SUPERVISION, EMERGENCY SPEED-DIAL & LIFE PASSPORT -->
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

// SLIDE 6 (Was Slide 8): The Independence Ladder
const slide6 = `  <!-- SLIDE 6: THE INDEPENDENCE LADDER -->` + rawSlides[8].substring(rawSlides[8].indexOf('\n'));

// SLIDE 7 (Was Slide 4): End-to-End System Topology
const slide7 = `  <!-- SLIDE 7: END-TO-END SYSTEM TOPOLOGY -->` + rawSlides[4].substring(rawSlides[4].indexOf('\n'));

// SLIDE 8 (Was Slide 5): Multi-Tenant Core vs Disease Modules
const slide8 = `  <!-- SLIDE 8: MULTI-TENANT CORE VS DISEASE MODULES -->` + rawSlides[5].substring(rawSlides[5].indexOf('\n'));

// SLIDE 9 (Was Slide 9): AI Anonymizer & Privacy Boundary
const slide9 = `  <!-- SLIDE 9: AI ANONYMIZER & PRIVACY BOUNDARY -->` + rawSlides[9].substring(rawSlides[9].indexOf('\n'));

// SLIDE 10: Comprehensive Platform Feature Inventory (Cleaned of any Live/Roadmap tags)
const slide10 = `  <!-- SLIDE 10: COMPREHENSIVE PLATFORM ARCHITECTURE & FEATURE INVENTORY -->
  <section class="slide">
${makeBrandBar('Platform Architecture & Feature Taxonomy')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">End-to-End System Taxonomy</div>
        <h2>Comprehensive Platform Capabilities & Module Inventory</h2>
      </div>
      <div class="meta">Integrated Pediatric Health Stack &bull; Multi-Tenant Core &bull; 100% Clinical Traceability</div>
    </div>
    <div class="grid grid-4" style="margin-top:6px">
      <div class="card card--accent">
        <div class="eyebrow">Clinical Engine & Biometrics</div>
        <h3><span class="pill" style="font-size:10px;padding:2px 8px"><span class="dot"></span>CLINICAL SUITE</span></h3>
        <p style="margin-top:8px"><strong>CDC/AAP Down Syndrome Growth:</strong> Zemel et al. (Pediatrics) 0-36m specialized curves for weight, length, head circ.</p>
        <p style="margin-top:6px"><strong>AAP Screening Protocols:</strong> Echo at birth, TSH/FT4 at 6/12m, Cervical X-Ray at 36m, Audiology & Vision.</p>
        <p style="margin-top:6px"><strong>Makaton Sign Language:</strong> 8 functional visual gesture cards with phonetics, video guides & parent coaching.</p>
        <p style="margin-top:6px"><strong>Smart Lab OCR:</strong> Egyptian lab sheet auto-parsing (Al Mokhtabar / Al Borg) extracting thyroid and blood metrics.</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Parent Mobile Experience</div>
        <h3><span class="pill" style="font-size:10px;padding:2px 8px"><span class="dot"></span>MOBILE PORTAL</span></h3>
        <p style="margin-top:8px"><strong>Real-Time Milestones:</strong> 5-Domain tracking (Motor, Speech, Cognitive, Social, Self-Care) with evidence logs.</p>
        <p style="margin-top:6px"><strong>1-Tap Emergency Speed Dial:</strong> Direct dialer for Ambulance 123, Child Line 16000, Pediatrician line.</p>
        <p style="margin-top:6px"><strong>Digital Life Passport:</strong> Printable A4 layout and ephemeral cryptographic QR code for clinical visits.</p>
        <p style="margin-top:6px"><strong>Daily Home Therapy:</strong> 20-min daily micro-drills & streak gamification to drive everyday parent adherence.</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Doctor & Clinic Ecosystem</div>
        <h3><span class="pill" style="font-size:10px;padding:2px 8px"><span class="dot"></span>CLINICIAN SUITE</span></h3>
        <p style="margin-top:8px"><strong>Doctor Baseline Confirmation:</strong> Clinical validation web portal with digital assessment lock.</p>
        <p style="margin-top:6px"><strong>Pediatric Subspecialty Match:</strong> Filtering for Cardiologists, Geneticists, Speech & PT experts.</p>
        <p style="margin-top:6px"><strong>Telehealth & Clinic Booking:</strong> 1-Tap appointment scheduling with 15-20% platform marketplace commission.</p>
        <p style="margin-top:6px"><strong>B2B Clinic SaaS Platform:</strong> Academy management portal for physical therapy & speech caseloads.</p>
      </div>

      <div class="card card--accent">
        <div class="eyebrow">Enterprise Trust & Security</div>
        <h3><span class="pill" style="font-size:10px;padding:2px 8px"><span class="dot"></span>SECURITY SUITE</span></h3>
        <p style="margin-top:8px"><strong>AI Anonymizer Boundary:</strong> Egyptian National ID (14 digits) and phone regex scrubbing before AI ingress.</p>
        <p style="margin-top:6px"><strong>AES-256-GCM Vault:</strong> Envelope encryption for pediatric medical records and growth measurements.</p>
        <p style="margin-top:6px"><strong>Role-Based Access Control:</strong> Strict JWT isolation across Parent, Doctor, and Super Admin scopes.</p>
        <p style="margin-top:6px"><strong>Egyptian Payments:</strong> Paymob, Vodafone Cash & Fawry gateway integration for automated billing.</p>
      </div>
    </div>
    <div class="band" style="margin-top:12px">
      <div class="band-title">Unified System Architecture & Commercial Synergies</div>
      <div class="bl">All modules are unified under a single multi-tenant digital health engine. The clinical foundations guarantee diagnostic accuracy and physician trust, while the daily home micro-routines, telehealth marketplace, and B2B clinic SaaS deliver multi-channel recurring revenue and high parent lifetime value.</div>
    </div>
  </section>`;

// SLIDE 11: User Retention & Engagement Flywheel
const slide11 = `  <!-- SLIDE 11: USER RETENTION & ENGAGEMENT FLYWHEEL — DAILY HOME THERAPY & PEER CIRCLES -->
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

// SLIDE 12: Interactive Scrollable Smartphone Showcase
const slide12 = `  <!-- SLIDE 12: MOBILE APP INTERACTIVE UI SHOWCASE (SCROLLABLE MOCKUPS) -->
  <section class="slide">
${makeBrandBar('Native Parent Experience • iOS & Android Expo')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Interactive Mobile App Showcase</div>
        <h2>Parent Experience: Scrollable Realistic Smartphone Mockups</h2>
      </div>
      <div class="meta">Touch & Scroll to Explore • Native Mobile Flow</div>
    </div>
    <div class="phones-container">

      <!-- PHONE 1: COMMAND CENTER & EMERGENCY SPEED DIAL -->
      <div class="phone-mockup">
        <div class="phone-notch"><div class="cam"></div></div>
        <div class="phone-status-bar"><span>9:41</span><span>5G 100%</span></div>
        <div class="phone-screen">
          <div style="padding:10px 12px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-size:12px;font-weight:800;color:var(--primary-dark)">Down Plus 🌟</span>
              <span style="font-size:9px;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:10px;font-weight:700">Omar (31m)</span>
            </div>

            <!-- Emergency Card -->
            <div style="background:linear-gradient(135deg,#fee2e2,#fef2f2);border:1px solid #fca5a5;border-radius:12px;padding:10px;margin-bottom:10px">
              <div style="font-size:10px;font-weight:800;color:#b91c1c;margin-bottom:6px">🚨 1-TAP EMERGENCY SPEED DIAL</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                <a href="tel:123" style="background:#ef4444;color:#fff;text-align:center;padding:6px;border-radius:8px;font-size:9.5px;font-weight:700;text-decoration:none">🚑 Ambulance 123</a>
                <a href="tel:16000" style="background:#f97316;color:#fff;text-align:center;padding:6px;border-radius:8px;font-size:9.5px;font-weight:700;text-decoration:none">📞 Child Line 16000</a>
              </div>
              <div style="margin-top:6px;background:#fff;border-radius:6px;padding:6px;display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:9px;font-weight:700;color:#334155">Dr. Yasser (Pediatrician)</span>
                <span style="font-size:8.5px;color:var(--success);font-weight:800">WhatsApp &bull; Call</span>
              </div>
            </div>

            <!-- AAP Schedule Widget -->
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:10px;margin-bottom:10px">
              <div style="font-size:10px;font-weight:800;color:var(--primary);margin-bottom:6px">📅 AAP CLINICAL SUPERVISION</div>
              <div style="font-size:9px;margin-bottom:4px;color:#1e293b"><b>• Echo at Birth:</b> <span style="color:var(--success)">Done (VSD Stable)</span></div>
              <div style="font-size:9px;margin-bottom:4px;color:#1e293b"><b>• Thyroid TSH/FT4:</b> <span style="color:#d97706">Due at 36m (Schedule)</span></div>
              <div style="font-size:9px;margin-bottom:4px;color:#1e293b"><b>• Cervical Spine X-Ray:</b> <span style="color:#64748b">At 36m (Clearance)</span></div>
              <div style="font-size:9px;color:#1e293b"><b>• Audiology & Vision:</b> <span style="color:var(--success)">Annual Clear</span></div>
            </div>

            <!-- Daily Home Routine & Streak -->
            <div style="background:linear-gradient(135deg,#fef3c7,#fffbeb);border:1px solid #fde68a;border-radius:12px;padding:10px;margin-bottom:10px">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:10px;font-weight:800;color:#b45309">🔥 14-DAY STREAK!</span>
                <span style="font-size:8.5px;background:#f59e0b;color:#fff;padding:1px 5px;border-radius:4px;font-weight:700">Today's Routine</span>
              </div>
              <div style="font-size:9px;color:#78350f;margin-top:4px">20-Min Home Physical & Speech Drills:</div>
              <div style="font-size:8.5px;color:#92400e;margin-top:2px">• Tongue placement game (5 min)<br>• Balance stepping stones (10 min)<br>• 2 Makaton signs review (5 min)</div>
              <button style="width:100%;background:#d97706;color:#fff;border:none;padding:5px;border-radius:6px;font-size:9px;font-weight:700;margin-top:6px">Mark Complete (+50 pts)</button>
            </div>

            <!-- Life Passport Shortcut -->
            <div style="background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:8px;text-align:center">
              <span style="font-size:9.5px;font-weight:700;color:var(--primary-dark)">🪪 View Life Passport & QR Code</span>
            </div>
            <div style="height:30px"></div>
          </div>
        </div>
        <div class="phone-scroll-pill"><span>↕ Scroll Home</span></div>
      </div>

      <!-- PHONE 2: MAKATON SIGN LANGUAGE DICTIONARY -->
      <div class="phone-mockup">
        <div class="phone-notch"><div class="cam"></div></div>
        <div class="phone-status-bar"><span>9:41</span><span>5G 100%</span></div>
        <div class="phone-screen">
          <div style="padding:10px 12px">
            <div style="font-size:12px;font-weight:800;color:var(--primary-dark);margin-bottom:4px">Makaton Sign Library 🤟</div>
            <div style="font-size:8.5px;color:#64748b;margin-bottom:8px">8 Early Functional Signs for Speech Development</div>

            <!-- Makaton Cards -->
            <div style="display:flex;flex-direction:column;gap:6px">
              <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:10px;font-weight:800;color:#0891b2">💧 Water (ماء)</span>
                  <span style="font-size:8px;background:#e0f2fe;color:#0369a1;padding:1px 5px;border-radius:4px;font-weight:700">Phonetic: "Maa"</span>
                </div>
                <p style="font-size:8.5px;color:#475569;margin-top:3px">Form W-handshape near mouth, tap lips twice while vocalizing.</p>
              </div>

              <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:10px;font-weight:800;color:#0891b2">🍎 Food (أكل)</span>
                  <span style="font-size:8px;background:#e0f2fe;color:#0369a1;padding:1px 5px;border-radius:4px;font-weight:700">Phonetic: "Akl"</span>
                </div>
                <p style="font-size:8.5px;color:#475569;margin-top:3px">Fingertips to thumb, tap lips repeatedly to express hunger.</p>
              </div>

              <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:10px;font-weight:800;color:#0891b2">🔄 More (كمان)</span>
                  <span style="font-size:8px;background:#e0f2fe;color:#0369a1;padding:1px 5px;border-radius:4px;font-weight:700">Phonetic: "Kaman"</span>
                </div>
                <p style="font-size:8.5px;color:#475569;margin-top:3px">Flat hands tap fingertips together in front of chest.</p>
              </div>

              <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:10px;font-weight:800;color:#0891b2">🤝 Help (مساعدة)</span>
                  <span style="font-size:8px;background:#e0f2fe;color:#0369a1;padding:1px 5px;border-radius:4px;font-weight:700">Gestural Sign</span>
                </div>
                <p style="font-size:8.5px;color:#475569;margin-top:3px">Closed fist resting on flat palm, lift both upward together.</p>
              </div>

              <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:10px;font-weight:800;color:#0891b2">😴 Sleep (نوم)</span>
                  <span style="font-size:8px;background:#e0f2fe;color:#0369a1;padding:1px 5px;border-radius:4px;font-weight:700">Phonetic: "Noom"</span>
                </div>
                <p style="font-size:8.5px;color:#475569;margin-top:3px">Open hand over face, slowly draw fingers closed downward.</p>
              </div>

              <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:10px;font-weight:800;color:#0891b2">🧸 Play (لعب)</span>
                  <span style="font-size:8px;background:#e0f2fe;color:#0369a1;padding:1px 5px;border-radius:4px;font-weight:700">Phonetic: "Le'b"</span>
                </div>
                <p style="font-size:8.5px;color:#475569;margin-top:3px">Both Y-hands shake playfully with smile and eye contact.</p>
              </div>

              <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:10px;font-weight:800;color:#0891b2">✋ Stop (بس / كفاية)</span>
                  <span style="font-size:8px;background:#e0f2fe;color:#0369a1;padding:1px 5px;border-radius:4px;font-weight:700">Phonetic: "Bass"</span>
                </div>
                <p style="font-size:8.5px;color:#475569;margin-top:3px">Firm flat hand chops down on palm, signaling boundary.</p>
              </div>

              <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:10px;font-weight:800;color:#0891b2">👋 Bye (مع السلامة)</span>
                  <span style="font-size:8px;background:#e0f2fe;color:#0369a1;padding:1px 5px;border-radius:4px;font-weight:700">Social Sign</span>
                </div>
                <p style="font-size:8.5px;color:#475569;margin-top:3px">Open palm waves side to side with pleasant vocalization.</p>
              </div>
            </div>
            <div style="height:30px"></div>
          </div>
        </div>
        <div class="phone-scroll-pill"><span>↕ Scroll Makaton</span></div>
      </div>

      <!-- PHONE 3: SPECIALIZED DOWN SYNDROME GROWTH ENGINE -->
      <div class="phone-mockup">
        <div class="phone-notch"><div class="cam"></div></div>
        <div class="phone-status-bar"><span>9:41</span><span>5G 100%</span></div>
        <div class="phone-screen">
          <div style="padding:10px 12px">
            <div style="font-size:12px;font-weight:800;color:var(--primary-dark);margin-bottom:2px">DS Growth Engine 📈</div>
            <div style="font-size:8px;background:#fef3c7;color:#92400e;padding:2px 5px;border-radius:4px;font-weight:700;display:inline-block;margin-bottom:8px">CDC/AAP Zemel (Pediatrics)</div>

            <!-- Biometric Cards -->
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px;margin-bottom:6px">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:9.5px;font-weight:700;color:#334155">Weight for Age (31m)</span>
                <span style="font-size:10.5px;font-weight:800;color:var(--success)">50th %ile</span>
              </div>
              <div style="font-size:14px;font-weight:900;color:#0f172a;margin-top:2px">12.4 kg</div>
              <div style="font-size:8px;color:#059669;margin-top:2px">✓ Ideal for Down Syndrome</div>
              <div style="font-size:7.5px;color:#94a3b8;margin-top:1px">*(Falsely 5th %ile on WHO curve!)*</div>
            </div>

            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px;margin-bottom:6px">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:9.5px;font-weight:700;color:#334155">Length / Height (31m)</span>
                <span style="font-size:10.5px;font-weight:800;color:var(--primary)">48th %ile</span>
              </div>
              <div style="font-size:14px;font-weight:900;color:#0f172a;margin-top:2px">88.0 cm</div>
              <div style="font-size:8px;color:#059669;margin-top:2px">✓ Steady linear trajectory</div>
            </div>

            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px;margin-bottom:8px">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:9.5px;font-weight:700;color:#334155">Head Circumference</span>
                <span style="font-size:10.5px;font-weight:800;color:var(--primary)">52nd %ile</span>
              </div>
              <div style="font-size:14px;font-weight:900;color:#0f172a;margin-top:2px">47.2 cm</div>
              <div style="font-size:8px;color:#059669;margin-top:2px">✓ Symmetrical cranial growth</div>
            </div>

            <!-- Historical Log Table -->
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px">
              <div style="font-size:9px;font-weight:700;color:var(--gray-600);margin-bottom:4px">MEASUREMENT HISTORY</div>
              <table style="width:100%;font-size:8px;text-align:left">
                <tr style="color:#64748b;border-bottom:1px solid #e2e8f0"><th>Age</th><th>Weight</th><th>Percentile</th></tr>
                <tr><td>12m</td><td>8.8 kg</td><td>49th</td></tr>
                <tr><td>18m</td><td>10.1 kg</td><td>51st</td></tr>
                <tr><td>24m</td><td>11.2 kg</td><td>50th</td></tr>
                <tr><td>31m</td><td>12.4 kg</td><td>50th</td></tr>
              </table>
              <div style="margin-top:6px;font-size:7.5px;color:#10b981;font-weight:700">Verified by Dr. Mostafa Radwan</div>
            </div>
            <div style="height:30px"></div>
          </div>
        </div>
        <div class="phone-scroll-pill"><span>↕ Scroll Growth</span></div>
      </div>

      <!-- PHONE 4: DIGITAL LIFE PASSPORT & EPHEMERAL QR -->
      <div class="phone-mockup">
        <div class="phone-notch"><div class="cam"></div></div>
        <div class="phone-status-bar"><span>9:41</span><span>5G 100%</span></div>
        <div class="phone-screen">
          <div style="padding:10px 12px">
            <div style="text-align:center;margin-bottom:8px">
              <div style="font-size:8px;font-weight:800;color:#0369a1;letter-spacing:.08em">REPUBLIC OF EGYPT</div>
              <div style="font-size:11px;font-weight:900;color:#0f172a">DIGITAL LIFE PASSPORT</div>
              <div style="font-size:7.5px;color:#64748b">Verified Pediatric Clinical Dossier</div>
            </div>

            <!-- QR Code Card -->
            <div style="background:#fff;border:1.5px solid #0891b2;border-radius:12px;padding:10px;text-align:center;margin-bottom:8px">
              <div style="width:100px;height:100px;background:#f1f5f9;margin:0 auto 6px;border:1px dashed #94a3b8;display:flex;align-items:center;justify-content:center;border-radius:8px">
                <span style="font-size:28px">📱</span>
              </div>
              <div style="font-size:8.5px;font-weight:800;color:#0f172a">SCAN FOR ZERO-LOGIN ER VIEW</div>
              <div style="font-size:7.5px;color:#64748b;margin-top:2px">Cryptographically Signed &bull; SHA-256</div>
            </div>

            <!-- Patient Vitals Summary -->
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:8px;margin-bottom:6px">
              <div style="font-size:8.5px;font-weight:700;color:var(--gray-500)">PATIENT IDENTIFICATION</div>
              <div style="font-size:9.5px;font-weight:800;color:#0f172a;margin-top:2px">Omar Kareem Abdel-Rahman</div>
              <div style="font-size:8.5px;color:#475569">National ID: 32403150109988 &bull; Blood: O+</div>
              <div style="font-size:8.5px;color:#0284c7;font-weight:700">Diagnosis: Trisomy 21 (Free Trisomy)</div>
            </div>

            <!-- Medical Alerts -->
            <div style="background:#fff;border:1px solid #fecaca;border-radius:10px;padding:8px;margin-bottom:8px">
              <div style="font-size:8.5px;font-weight:800;color:#dc2626">⚠️ CRITICAL CLINICAL ALERTS</div>
              <div style="font-size:8px;color:#b91c1c;margin-top:2px">• <b>Cardiology:</b> Small muscular VSD (stable)</div>
              <div style="font-size:8px;color:#b91c1c">• <b>Allergies:</b> Penicillin Allergy (Severe)</div>
              <div style="font-size:8px;color:#b91c1c">• <b>Endocrine:</b> Euthyroid (TSH normal at 12m)</div>
            </div>

            <button style="width:100%;background:var(--primary);color:#fff;border:none;padding:6px;border-radius:6px;font-size:9px;font-weight:700">🖨 Print Official A4 Passport</button>
            <div style="height:30px"></div>
          </div>
        </div>
        <div class="phone-scroll-pill"><span>↕ Scroll Passport</span></div>
      </div>

    </div>
  </section>`;

// SLIDE 13: Interactive Scrollable Browser Showcase
const slide13 = `  <!-- SLIDE 13: DOCTOR & ADMIN WEB UI SHOWCASE (SCROLLABLE BROWSER) -->
  <section class="slide">
${makeBrandBar('Clinician & Admin Web Workbenches • Next.js 14')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Web Portal Showcase</div>
        <h2>Doctor Workbench & Clinic Administration Interface</h2>
      </div>
      <div class="meta">Interactive Scrollable Browser Mockup &bull; Real Clinician Flow</div>
    </div>
    <div class="browser-mockup-frame">
      <div class="browser-mockup-bar">
        <div class="browser-mockup-dots"><div class="r"></div><div class="y"></div><div class="g"></div></div>
        <div class="browser-mockup-url">https://portal.downplus.health/doctor/baseline/c79f8e4a</div>
      </div>
      <div class="browser-mockup-viewport">
        <div style="padding:16px 20px">
          <!-- Doctor Header -->
          <div style="display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:12px;margin-bottom:14px">
            <div>
              <span style="font-size:10px;font-weight:700;color:var(--primary-dark)">CLINICAL VERIFICATION WORKBENCH</span>
              <h3 style="font-size:16px;font-weight:800;color:#0f172a">Case Baseline Review: Omar Kareem (Trisomy 21 &bull; 31 Months)</h3>
            </div>
            <div class="pill"><span class="dot"></span> AI Draft Verified & Ready for Sign-off</div>
          </div>

          <!-- 2-Column Clinical Grid -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:12px">
              <div style="font-size:11px;font-weight:700;color:var(--gray-500);margin-bottom:6px">AI-EXTRACTED LAB & CLINICAL BASELINE</div>
              <ul style="font-size:11.5px;color:#334155;line-height:1.6;margin-left:14px">
                <li><b>Diagnosis:</b> Free Trisomy 21 (confirmed via G-banding karyotype 47,XY,+21).</li>
                <li><b>Cardiology:</b> Small muscular VSD, non-cyanotic, hemodynamically stable.</li>
                <li><b>Endocrinology:</b> TSH 4.2 mIU/L, FT4 14.1 pmol/L (euthyroid status).</li>
                <li><b>Audiology:</b> Bilateral tympanometry normal, no serous otitis media.</li>
              </ul>
            </div>
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:12px">
              <div style="font-size:11px;font-weight:700;color:var(--gray-500);margin-bottom:6px">ATTENDING SPECIALIST ORDERS</div>
              <p style="font-size:11.5px;color:#334155;line-height:1.6">
                1. Continue physical therapy twice weekly with focus on axial hypotonia.<br>
                2. Maintain Makaton functional gesture routine for daily communication.<br>
                3. Schedule repeat thyroid panel and cervical spine X-ray at 36 months.<br>
                4. Clearance granted for nursery enrollment with certified Life Passport.
              </p>
            </div>
          </div>

          <!-- B2B Clinic Management Panel -->
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:12px;margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-size:11px;font-weight:700;color:var(--primary)">CLINIC NETWORK CASELOAD (48 ACTIVE PATIENTS)</span>
              <span style="font-size:11px;color:var(--success);font-weight:700">88% Home Routine Compliance Rate</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
              <div style="background:#f8fafc;padding:8px;border-radius:6px;text-align:center"><div style="font-size:16px;font-weight:900;color:#0891b2">48</div><div style="font-size:10px;color:#64748b">Active Children</div></div>
              <div style="background:#f8fafc;padding:8px;border-radius:6px;text-align:center"><div style="font-size:16px;font-weight:900;color:#059669">94%</div><div style="font-size:10px;color:#64748b">Attendance Rate</div></div>
              <div style="background:#f8fafc;padding:8px;border-radius:6px;text-align:center"><div style="font-size:16px;font-weight:900;color:#d97706">14</div><div style="font-size:10px;color:#64748b">Avg Day Streak</div></div>
              <div style="background:#f8fafc;padding:8px;border-radius:6px;text-align:center"><div style="font-size:16px;font-weight:900;color:#7c3aed">3,200 ج</div><div style="font-size:10px;color:#64748b">Monthly SaaS Fee</div></div>
            </div>
          </div>

          <!-- Action Bar -->
          <div style="display:flex;justify-content:flex-end;gap:10px;padding:8px 0">
            <button style="background:#fff;border:1px solid #cbd5e1;padding:6px 16px;border-radius:6px;font-size:11px;font-weight:600;color:#475569">Amend Clinical Notes</button>
            <button style="background:var(--primary);color:#fff;border:none;padding:6px 18px;border-radius:6px;font-size:11.5px;font-weight:700">Sign & Seal Baseline (Immutable Medical Lock)</button>
          </div>
          <div style="height:20px"></div>
        </div>
      </div>
    </div>
  </section>`;

// SLIDE 14: Complete Database Schema
const slide14 = `  <!-- SLIDE 14: COMPLETE DATABASE SCHEMA -->` + rawSlides[14].substring(rawSlides[14].indexOf('\n'));

// SLIDE 15: Doctor Matching Engine
const slide15 = `  <!-- SLIDE 15: DOCTOR MATCHING ENGINE -->` + rawSlides[15].substring(rawSlides[15].indexOf('\n'));

// SLIDE 16: Commercial Monetization & Platform Unit Economics
const slide16 = `  <!-- SLIDE 16: COMMERCIAL MONETIZATION & PLATFORM UNIT ECONOMICS -->
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

// SLIDE 17: Strategic Roadmap & Regional GCC Expansion
const slide17 = `  <!-- SLIDE 17: STRATEGIC ROADMAP & REGIONAL GCC EXPANSION -->
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

// SLIDE 18: OPERATIONAL CLOUD & 3RD-PARTY COSTS (Client's Own Budget Shown FIRST!)
const slide18 = `  <!-- SLIDE 18: OPERATIONAL CLOUD COSTS -->` + rawSlides[18].substring(rawSlides[18].indexOf('\n'));

// SLIDE 19: UNIFIED PROJECT DELIVERY MILESTONES (Complete Feature Allocation)
const slide19 = `  <!-- SLIDE 19: PROJECT DELIVERY MILESTONES & FEATURE ALLOCATION -->
  <section class="slide">
${makeBrandBar('Technical Delivery Roadmap & Feature Scheduling')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">Structured Technical & Commercial Schedule</div>
        <h2>Project Delivery Milestones: Comprehensive Feature Implementation Schedule</h2>
      </div>
      <div class="meta">16-Week Production Plan &bull; 6 Milestones &bull; 100% Feature Traceability</div>
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

// SLIDE 20: Financial Investment & Cash Flow Schedule
const slide20 = `  <!-- SLIDE 20: FINANCIAL INVESTMENT & CASH FLOW -->` + rawSlides[20].substring(rawSlides[20].indexOf('\n'));

// SLIDE 21: Governance, SLA, Warranty & Sign-off
const slide21 = `  <!-- SLIDE 21: GOVERNANCE, SLA & SIGN-OFF -->` + rawSlides[21].substring(rawSlides[21].indexOf('\n'));

// Assemble all 21 slides in the optimized narrative order
const allSlidesCombined = [
  slide1, slide2, slide3, slide4, slide5,
  slide6, slide7, slide8, slide9, slide10,
  slide11, slide12, slide13, slide14, slide15,
  slide16, slide17, slide18, slide19, slide20,
  slide21
].join('\n\n');

// Build final document with properly closed </style> and </head>
const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Down Plus &bull; Executive, Technical & Commercial Proposal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
${styles}
${polishedCss}
</style>
</head>
<body>

<div class="deck" id="deck">

${allSlidesCombined}

</div>

<div class="navbar">
  <button id="prev" type="button" aria-label="Previous slide">&#8592;</button>
  <span style="padding:0 6px"><span id="cur">1</span> / <span id="tot">21</span></span>
  <button id="next" type="button" aria-label="Next slide">&#8594;</button>
  <span class="hint">&#8592; &#8594; arrows &bull; F = fullscreen &bull; P = print</span>
</div>

<div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="Enlarged view">
  <button class="lb-x" id="lbx" type="button" aria-label="Close" onclick="closeLb()">&times;</button>
  <div class="lb-img-wrap" id="lbwrap">
    <img id="lbimg" src="" alt="Zoomed preview" />
  </div>
</div>

<script>
  const all = [...document.querySelectorAll('.slide')];
  const slides = all;
  const cur = document.getElementById('cur'), tot = document.getElementById('tot'), prog = document.getElementById('progress');
  const prevBtn = document.getElementById('prev'), nextBtn = document.getElementById('next');
  tot.textContent = slides.length;
  let i = 0;
  function go(n){
    i = Math.max(0, Math.min(slides.length - 1, n));
    all.forEach(s => s.classList.toggle('active', s === slides[i]));
    cur.textContent = i + 1;
    tot.textContent = slides.length;
    if (prog) prog.style.width = ((i + 1) / slides.length * 100) + '%';
  }
  prevBtn.onclick = () => go(i - 1);
  nextBtn.onclick = () => go(i + 1);
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft'  || e.key === 'PageUp')   { e.preventDefault(); go(i - 1); }
    if (e.key === 'Home') { e.preventDefault(); go(0); }
    if (e.key === 'End')  { e.preventDefault(); go(slides.length - 1); }
    if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
      else document.exitFullscreen().catch(() => {});
    }
    if (e.key === 'p' || e.key === 'P') window.print();
  });

  // Lightbox
  const lb = document.getElementById('lb'), lbimg = document.getElementById('lbimg');
  function openLb(src, alt){
    lbimg.src = src; lbimg.alt = alt || '';
    lb.hidden = false;
  }
  function closeLb(){
    lb.hidden = true; lbimg.src = '';
  }
  lb.addEventListener('click', e => { if (e.target === lb || e.target.id === 'lbwrap') closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) closeLb(); });

  go(0);
</script>

</body>
</html>
`;

fs.writeFileSync(deckPath, finalHtml, 'utf8');
console.log('Successfully written:', deckPath);

fs.writeFileSync(webDeckPath, finalHtml, 'utf8');
console.log('Successfully written:', webDeckPath);

console.log('Optimization complete! Total slides: 21');
