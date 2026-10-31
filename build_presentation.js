const fs = require('fs');
const path = require('path');

const b1 = fs.readFileSync('c:/Users/z40/Downloads/Down application/assets/logos/b1.txt', 'utf8').trim();
const b2 = fs.readFileSync('c:/Users/z40/Downloads/Down application/assets/logos/b2.txt', 'utf8').trim();

// Read screens as base64 for embedding so they display seamlessly
const screenChat = fs.readFileSync('c:/Users/z40/Downloads/Down application/assets/screens/ai_medical_chat_screen.png').toString('base64');
const screenQR = fs.readFileSync('c:/Users/z40/Downloads/Down application/assets/screens/hospital_emergency_qr_screen.png').toString('base64');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Down Plus — Executive, Technical & Commercial Presentation</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Caveat:wght@400;700&display=swap" rel="stylesheet">
<style>
  :root{
    --primary:#0891B2;--primary-dark:#0E7490;--primary-deeper:#155E75;--primary-light:#22D3EE;
    --primary-glow:rgba(8,145,178,.15);--primary-glow-strong:rgba(8,145,178,.30);
    --accent:#F59E0B;--accent-light:#FCD34D;--accent-dark:#D97706;
    --white:#FFFFFF;--gray-50:#F8FAFC;--gray-100:#F1F5F9;--gray-200:#E2E8F0;
    --gray-300:#CBD5E1;--gray-400:#94A3B8;--gray-500:#64748B;--gray-600:#475569;
    --gray-700:#334155;--gray-800:#1E293B;--gray-900:#0F172A;
    --success:#10B981;--warning:#F59E0B;--error:#EF4444;
    --font:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
    --mono:'JetBrains Mono',monospace;
    --radius-md:.5rem;--radius-lg:.75rem;--radius-xl:1rem;--radius-2xl:1.5rem;--radius-full:9999px;
    --shadow-md:0 4px 6px -1px rgba(0,0,0,.07),0 2px 4px -2px rgba(0,0,0,.05);
    --shadow-lg:0 10px 15px -3px rgba(0,0,0,.08),0 4px 6px -4px rgba(0,0,0,.04);
    --shadow-xl:0 20px 25px -5px rgba(0,0,0,.08),0 8px 10px -6px rgba(0,0,0,.04);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%;font-family:var(--font);color:var(--gray-900);background:var(--gray-50)}
  body{overflow:hidden}
  .deck{position:relative;width:100vw;height:100vh;overflow:hidden}
  .slide{position:absolute;inset:0;display:flex;flex-direction:column;padding:36px 64px 80px;background:var(--white);opacity:0;pointer-events:none;transition:opacity .35s ease;overflow-y:auto;overflow-x:hidden}
  .slide.active{opacity:1;pointer-events:auto}
  .slide::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;background:radial-gradient(ellipse at 15% 0%,var(--primary-glow) 0%,transparent 45%),radial-gradient(ellipse at 90% 100%,rgba(34,211,238,.08) 0%,transparent 45%),radial-gradient(ellipse at 60% 60%,rgba(245,158,11,.04) 0%,transparent 50%)}
  .slide::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(8,145,178,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(8,145,178,.04) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse at center,black 25%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse at center,black 25%,transparent 75%)}
  .slide > *{position:relative;z-index:1}
  
  /* Brand bar & Logos */
  .brand-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--gray-200)}
  .brand-group{display:flex;align-items:center;gap:18px}
  .partner-logo{height:38px;object-fit:contain}
  .partner-logo.medexia{height:46px}
  .logo-divider{width:1px;height:24px;background:var(--gray-300)}
  .brand-badge{background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:800;letter-spacing:.04em}
  
  .slide-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px;gap:24px}
  .slide-head .meta{text-align:right;font-size:11px;color:var(--gray-500);font-weight:600;letter-spacing:.05em;text-transform:uppercase;max-width:38ch}
  h1{font-size:44px;line-height:1.08;font-weight:900;letter-spacing:-.025em;color:var(--gray-900)}
  h2{font-size:30px;line-height:1.15;font-weight:800;letter-spacing:-.02em;color:var(--gray-900)}
  h3{font-size:16.5px;line-height:1.25;font-weight:700;color:var(--gray-900)}
  .lead{font-size:14.5px;line-height:1.5;color:var(--gray-600);max-width:76ch}
  .eyebrow{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--primary-dark);margin-bottom:6px}
  .text-gradient{background:linear-gradient(135deg,var(--primary),var(--primary-light));-webkit-background-clip:text;background-clip:text;color:transparent}
  .mono{font-family:var(--mono);font-size:.92em}
  .pill{display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:var(--radius-full);background:var(--primary-glow);color:var(--primary-deeper);font-size:12px;font-weight:600}
  .pill .dot{width:7px;height:7px;border-radius:50%;background:var(--success);box-shadow:0 0 0 3px rgba(16,185,129,.18)}
  .pill-amber{background:rgba(245,158,11,.14);color:var(--accent-dark)}
  .pill-amber .dot{background:var(--accent);box-shadow:0 0 0 3px rgba(245,158,11,.2)}
  .grid{display:grid;gap:14px}
  .grid-2{grid-template-columns:repeat(2,1fr)}
  .grid-3{grid-template-columns:repeat(3,1fr)}
  .grid-4{grid-template-columns:repeat(4,1fr)}
  .card{background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:16px 18px;box-shadow:var(--shadow-md)}
  .card--accent{border-color:var(--primary-glow-strong);box-shadow:0 0 0 1px var(--primary-glow),var(--shadow-md);background:linear-gradient(180deg,#ffffff,#f9fdfe)}
  .card h3{font-size:14.5px;margin-bottom:6px;display:flex;align-items:center;gap:8px}
  .card p{font-size:12px;line-height:1.45;color:var(--gray-600)}
  .card .num{font-family:var(--mono);color:var(--primary);font-size:12px;font-weight:700}
  table{border-collapse:collapse;width:100%;font-size:12px}
  th,td{text-align:left;padding:7px 10px;border-bottom:1px solid var(--gray-200);vertical-align:top}
  thead th{background:var(--gray-50);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--gray-600);font-weight:700;border-bottom:2px solid var(--gray-200)}
  tbody tr:last-child td{border-bottom:none}
  
  /* Stats Grid */
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:12px 0}
  .stat{background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:14px;box-shadow:var(--shadow-md)}
  .stat .n{font-size:32px;font-weight:900;color:var(--gray-900);line-height:1;letter-spacing:-.02em}
  .stat .n .unit{font-size:16px;color:var(--primary);font-weight:800;margin-left:3px}
  .stat .l{font-size:10.5px;font-weight:600;color:var(--gray-500);letter-spacing:.08em;text-transform:uppercase;margin-top:5px}
  .stat .sub{font-size:10.5px;color:var(--gray-600);margin-top:3px}

  /* Roadmap Timeline */
  .roadmap{display:grid;grid-template-columns:repeat(6,1fr);gap:9px;margin-top:10px}
  .ms{position:relative;padding:14px 10px;border-radius:var(--radius-lg);background:var(--white);border:1px solid var(--gray-200);box-shadow:var(--shadow-md);min-height:165px;display:flex;flex-direction:column}
  .ms .key{font-family:var(--mono);font-size:11px;font-weight:800;color:var(--primary);letter-spacing:.04em}
  .ms .wk{font-size:10px;color:var(--gray-500);font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  .ms .weight{font-size:12.5px;font-weight:800;color:var(--primary-dark);margin:3px 0}
  .ms .egp{font-size:10px;font-weight:700;color:var(--success)}
  .ms h4{font-size:12.5px;margin-bottom:3px;line-height:1.25;font-weight:700}
  .ms p{font-size:10.5px;color:var(--gray-600);line-height:1.35;margin-top:auto}
  .ms.golive{border-color:var(--primary);background:linear-gradient(180deg,#F0FBFD,var(--white));box-shadow:0 0 0 2px var(--primary-glow-strong),var(--shadow-md)}
  .ms.golive .key{color:var(--primary-deeper)}

  /* Price Cards */
  .price-card{padding:22px;border-radius:var(--radius-2xl);background:linear-gradient(180deg,var(--white),#F8FBFD);border:2px solid var(--primary-glow);box-shadow:0 0 0 4px rgba(8,145,178,.06),var(--shadow-xl);position:relative;overflow:hidden}
  .price-card .lbl{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--primary-dark);margin-bottom:5px}
  .price-card .list{font-size:12.5px;color:var(--gray-500);font-weight:600;margin-bottom:4px}
  .price-card .price{font-size:42px;font-weight:900;color:var(--gray-900);line-height:1;letter-spacing:-.02em}
  .price-card .price .ccy{font-size:20px;font-weight:700;color:var(--primary);vertical-align:top;margin-right:4px}
  .price-card .egp-val{font-size:16px;font-weight:800;color:var(--success);margin-top:4px}
  .price-card .note{font-size:11.5px;color:var(--primary-dark);font-weight:600;margin-top:6px}
  .price-card ul{list-style:none;display:grid;gap:7px;margin-top:14px}
  .price-card ul li{font-size:12px;color:var(--gray-700);display:flex;gap:8px;align-items:flex-start}
  .price-card ul li::before{content:"✓";color:var(--success);font-weight:800;font-size:12px;flex-shrink:0}
  .price-card.optional{background:var(--white);border-color:var(--gray-200);box-shadow:var(--shadow-md);padding:20px}
  .price-card.optional .price{font-size:34px}
  .price-card.optional .price .ccy{font-size:16px;color:var(--accent-dark)}
  .price-card.optional .lbl{color:var(--accent-dark)}

  /* Bands */
  .band{background:var(--gray-50);border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:12px 16px}
  .band-title{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gray-600);margin-bottom:6px;display:flex;justify-content:space-between}
  .band-grid{display:grid;gap:10px}
  .band-4{grid-template-columns:repeat(4,1fr)}
  .band-3{grid-template-columns:repeat(3,1fr)}
  .bk{font-family:var(--mono);font-size:10.5px;font-weight:700;color:var(--primary-dark)}
  .bl{font-size:11.5px;color:var(--gray-700);line-height:1.4;margin-top:2px}

  /* Signatures */
  .sig-row{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:18px}
  .sig{padding:18px 18px;border:1.5px solid var(--gray-200);border-radius:var(--radius-xl);background:var(--white);box-shadow:var(--shadow-md);min-height:190px;display:flex;flex-direction:column}
  .sig .role{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--primary-dark);margin-bottom:8px}
  .sig h4{font-size:15px;font-weight:700;color:var(--gray-900);margin-bottom:2px}
  .sig .legal{font-size:11px;color:var(--gray-500);line-height:1.35}
  .sig .blank{flex:1;display:flex;align-items:flex-end;margin-top:16px}
  .sig .line{width:100%;border-bottom:1.5px solid var(--gray-300);padding-bottom:5px;font-size:10.5px;color:var(--gray-400);font-weight:500;letter-spacing:.08em;text-transform:uppercase}

  /* Cover Slide */
  .cover{display:flex;flex-direction:column;justify-content:center;padding:0 64px}
  .cover-grid{display:grid;grid-template-columns:1.35fr 1fr;gap:40px;align-items:center}
  .partylogo{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:18px}
  .partylogo .chip{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border:1px solid var(--gray-200);border-radius:var(--radius-full);background:var(--white);font-weight:700;color:var(--gray-900);font-size:12px;box-shadow:var(--shadow-md)}
  .partylogo .chip small{font-weight:500;color:var(--gray-500);font-size:9.5px;letter-spacing:.05em;text-transform:uppercase;display:block}

  /* Screenshot Showcase */
  .shot-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:12px}
  .shot-card{background:#fff;border:1px solid var(--gray-200);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-md);display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}
  .shot-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg)}
  .shot-thumb{height:200px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;overflow:hidden;border-bottom:1px solid var(--gray-200);position:relative}
  .shot-thumb img{width:100%;height:100%;object-fit:cover;object-position:top;cursor:pointer}
  .shot-body{padding:12px;flex:1;display:flex;flex-direction:column}
  .shot-body h4{font-size:13px;font-weight:700;margin-bottom:3px}
  .shot-body p{font-size:11px;color:var(--gray-600);line-height:1.4}
  .shot-tag{display:inline-block;font-size:9.5px;font-weight:700;color:var(--primary);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}

  /* Admin Web UI Showcase */
  .web-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:16px;margin-top:12px}
  .web-preview{background:#fff;border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:14px;box-shadow:var(--shadow-md)}
  .browser-mock{border:1px solid var(--gray-300);border-radius:10px;overflow:hidden;background:#fff}
  .browser-bar{background:#f1f5f9;padding:6px 12px;border-bottom:1px solid var(--gray-200);display:flex;align-items:center;gap:6px}
  .b-dot{width:8px;height:8px;border-radius:50%;background:#cbd5e1}
  .b-dot.r{background:#f87171}.b-dot.y{background:#fbbf24}.b-dot.g{background:#34d399}
  .b-url{background:#fff;padding:2px 10px;border-radius:4px;font-size:10px;color:var(--gray-500);font-family:var(--mono);margin-left:8px;flex:1}

  /* Navbar */
  .navbar{position:fixed;bottom:14px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;background:rgba(15,23,42,.88);backdrop-filter:blur(10px);color:#fff;padding:6px 16px;border-radius:var(--radius-full);font-size:12px;font-weight:600;box-shadow:var(--shadow-xl);z-index:999}
  .navbar button{background:rgba(255,255,255,.12);border:none;color:#fff;width:26px;height:26px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;transition:background .2s}
  .navbar button:hover{background:rgba(255,255,255,.25)}
  .navbar .hint{font-size:10.5px;color:var(--gray-400);margin-left:6px;font-weight:400}
  .progress-bar{position:fixed;top:0;left:0;height:4px;background:linear-gradient(90deg,var(--primary),var(--primary-light));transition:width .3s ease;z-index:1000}

  /* Lightbox */
  .lb{position:fixed;inset:0;background:rgba(15,23,42,.85);backdrop-filter:blur(8px);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px}
  .lb[hidden]{display:none}
  .lb-img-wrap{max-width:92vw;max-height:85vh;background:#fff;border-radius:12px;padding:12px;box-shadow:var(--shadow-xl);overflow:auto}
  .lb-img-wrap img{max-width:100%;max-height:80vh;object-fit:contain}
  .lb-x{position:absolute;top:20px;right:24px;background:#fff;border:none;border-radius:50%;width:34px;height:34px;font-size:18px;cursor:pointer;font-weight:800}

  /* Clinical Ladder */
  .ladder{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:12px 0}
  .ladder-step{border-radius:var(--radius-lg);padding:12px;background:var(--white);border:1.5px solid var(--gray-200);box-shadow:var(--shadow-md);position:relative}
  .ladder-step .snum{font-family:var(--mono);font-size:9.5px;font-weight:800;color:var(--primary);text-transform:uppercase}
  .ladder-step h4{font-size:13px;font-weight:700;margin:3px 0}
  .ladder-step .sub-en{font-size:11px;color:var(--primary-deeper);font-weight:600;margin-bottom:4px}
  .ladder-step p{font-size:11px;color:var(--gray-600);line-height:1.35}
  .ladder-step.done{border-color:var(--primary);background:linear-gradient(180deg,#F0FBFD,#fff)}

  @media print{
    .slide{position:relative;opacity:1!important;page-break-after:always;display:block;height:auto;overflow:visible;padding:20px}
    .navbar,.progress-bar{display:none!important}
  }
</style>
</head>
<body>

<div class="progress-bar" id="progress"></div>

<div class="deck">

  <!-- SLIDE 1: COVER -->
  <section class="slide cover active">
    <div class="brand-bar" style="border:none;margin-bottom:24px">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai Logo" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind Logo" />
      </div>
      <div class="brand-badge">PROPRIETARY & CONFIDENTIAL</div>
    </div>
    <div class="cover-grid">
      <div>
        <div class="eyebrow">Enterprise Healthcare Proposal • Egyptian Market</div>
        <h1>Down Plus: Pediatric Digital Health Engine</h1>
        <p class="lead" style="margin-top:12px">
          A turnkey clinical supervision engine combining American Academy of Pediatrics (AAP) protocols, developmental milestone ladders, privacy-preserving AI, and doctor collaboration.
        </p>
        <div class="partylogo">
          <div class="chip">
            <div>
              <small>Clinical Strategy & Product</small>
              Medexia.ai
            </div>
          </div>
          <div class="chip">
            <div>
              <small>AI Architecture & Engineering</small>
              AI MicroMind
            </div>
          </div>
          <div class="pill pill-amber" style="height:36px"><span class="dot"></span> Turnkey Package: $10,000 USD (570,000 EGP)</div>
        </div>
      </div>
      <div>
        <div class="card card--accent" style="padding:22px">
          <div class="eyebrow">Executive Summary</div>
          <h3 style="font-size:16px;margin-bottom:12px">Proposal Agenda & Deliverables</h3>
          <ul style="list-style:none;display:grid;gap:8px;font-size:12px;color:var(--gray-700)">
            <li style="display:flex;gap:8px"><b>01</b> <span>Market Opportunity & 18-Year Patient LTV in Egypt</span></li>
            <li style="display:flex;gap:8px"><b>02</b> <span>Decoupled Core vs Disease Modules Architecture</span></li>
            <li style="display:flex;gap:8px"><b>03</b> <span>Clinical Engine: AAP Supervision & Independence Ladder</span></li>
            <li style="display:flex;gap:8px"><b>04</b> <span>AI Anonymizer Boundary (HIPAA / GDPR Zero PII Leak)</span></li>
            <li style="display:flex;gap:8px"><b>05</b> <span>Mobile App & Doctor Web Portal UI Showcase</span></li>
            <li style="display:flex;gap:8px"><b>06</b> <span>Database Schema & Specialist Matching Algorithm</span></li>
            <li style="display:flex;gap:8px"><b>07</b> <span>Milestones Weighting Matrix & Egyptian Market Pricing</span></li>
            <li style="display:flex;gap:8px"><b>08</b> <span>Operating Cloud Costs & Mutual Authorization</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- SLIDE 2: THE PROBLEM & MARKET OPPORTUNITY -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Clinical Need & Market Validation</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Market Need & Clinical Impact</div>
        <h2>The Fragmented Care Crisis in Trisomy 21</h2>
      </div>
      <div class="meta">18+ Year Patient Lifecycle • High Retention • High LTV</div>
    </div>
    <p class="lead">
      Parents of children with Down Syndrome navigate an overwhelming labyrinth of 6+ medical and therapeutic specialties. Without digital coordination, critical preventive windows are missed.
    </p>
    <div class="stats">
      <div class="stat">
        <div class="n">1 <span class="unit">in 700</span></div>
        <div class="l">Live Births</div>
        <div class="sub">Prevalence rate across Egyptian & regional markets</div>
      </div>
      <div class="stat">
        <div class="n">50<span class="unit">%</span></div>
        <div class="l">Congenital Heart Defects</div>
        <div class="sub">Require neonatal echocardiogram within 60 days of birth</div>
      </div>
      <div class="stat">
        <div class="n">18<span class="unit">+ Yrs</span></div>
        <div class="l">Care Continuum</div>
        <div class="sub">Long-term developmental, hormonal, and physical therapy tracking</div>
      </div>
      <div class="stat">
        <div class="n">80<span class="unit">%</span></div>
        <div class="l">Missed Protocol Alerts</div>
        <div class="sub">Parents unaware of mandatory thyroid, hearing, and spinal screenings</div>
      </div>
    </div>
    <div class="grid grid-3" style="margin-top:14px">
      <div class="card">
        <h3><span class="num">01</span> Fragmented Health Records</h3>
        <p>Medical documents (echocardiograms, karyotypes, audiology scans, lab tests) are scattered across paper files and chat apps, preventing holistic clinical decisions.</p>
      </div>
      <div class="card">
        <h3><span class="num">02</span> Lack of Developmental Rubrics</h3>
        <p>Standard developmental charts fail special needs children. Therapists and parents lack a shared scale to measure intermediate milestone steps.</p>
      </div>
      <div class="card">
        <h3><span class="num">03</span> Delayed Specialist Matching</h3>
        <p>Finding pediatric speech pathologists, physical therapists, and pediatric cardiologists with dedicated Trisomy 21 experience takes months of trial-and-error.</p>
      </div>
    </div>
  </section>

  <!-- SLIDE 3: BUSINESS VALUE & ECONOMIC IMPACT -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Monetization & Egyptian Market Economics</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Business Impact & Commercial ROI</div>
        <h2>Sustainable, High-Margin Digital Health Engine</h2>
      </div>
      <div class="meta">Rate: 1 USD = 57 EGP • B2C Subscriptions + B2B Marketplace</div>
    </div>
    <p class="lead">
      Down Plus transforms an underserved, highly dedicated family community into an enduring digital health ecosystem with two complementary monetization engines.
    </p>
    <div class="grid grid-2" style="margin-top:14px">
      <div class="card card--accent">
        <div class="eyebrow">Monetization Engine 1</div>
        <h3>B2C Parent Subscription Tier (Paymob Integrated)</h3>
        <p style="margin-bottom:10px">Parents upgrade from Free to Premium for automated AI document OCR summarization, unlimited cloud storage, real-time AI triage, and emergency Life Passport QR.</p>
        <div class="band band-grid" style="background:#fff;border:1px solid var(--gray-200);gap:6px">
          <div style="display:flex;justify-content:space-between"><span>Monthly Subscription</span><b>250 EGP / mo <span style="color:var(--gray-500);font-weight:400">(~$4.40 USD)</span></b></div>
          <div style="display:flex;justify-content:space-between"><span>Annual Plan (25% Savings)</span><b>2,200 EGP / yr <span style="color:var(--gray-500);font-weight:400">(~$38.60 USD)</span></b></div>
          <div style="display:flex;justify-content:space-between;color:var(--success)"><span>Projected ARR at 10k Active Families</span><b>22,000,000+ EGP / year (~$385k USD)</b></div>
        </div>
      </div>
      <div class="card card--accent">
        <div class="eyebrow">Monetization Engine 2</div>
        <h3>B2B Clinic Marketplace & Specialist Match Commission</h3>
        <p style="margin-bottom:10px">Pediatric clinics and independent therapists pay platform referral commissions and sponsored listings to receive pre-screened, documented patient files.</p>
        <div class="band band-grid" style="background:#fff;border:1px solid var(--gray-200);gap:6px">
          <div style="display:flex;justify-content:space-between"><span>Consultation Match Commission</span><b>12% – 15% per booked session</b></div>
          <div style="display:flex;justify-content:space-between"><span>Partner Clinic Admin Seat</span><b>4,500 EGP / clinic branch / month</b></div>
          <div style="display:flex;justify-content:space-between;color:var(--primary-dark)"><span>Intake Admin Time Saved</span><b>65% reduction per patient intake</b></div>
        </div>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">Unit Economics Advantage for the Client</div>
      <div class="band-grid band-3">
        <div><div class="bk">Organic Virality</div><div class="bl">Parent support groups (WhatsApp/Facebook) drive word-of-mouth adoption, keeping Customer Acquisition Cost (CAC) under 680 EGP ($12).</div></div>
        <div><div class="bk">High Lifetime Value (LTV)</div><div class="bl">Because care spans 18+ years, lifetime revenue exceeds 45,000 EGP ($800) per family, delivering a 5.2x LTV/CAC ratio.</div></div>
        <div><div class="bk">Scalable Cloud Overhead</div><div class="bl">Serverless AWS Fargate and PostgreSQL auto-scale so cloud infrastructure costs stay under 4% of gross revenue at scale.</div></div>
      </div>
    </div>
  </section>

  <!-- SLIDE 4: END-TO-END SYSTEM TOPOLOGY -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Engineering Blueprint • C4 Level 2</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Technical Architecture • C4 Model</div>
        <h2>End-to-End Container & Subsystem Topology</h2>
      </div>
      <div class="meta">NestJS • React Native Expo • Next.js 14 • PostgreSQL 16</div>
    </div>
    <div class="grid grid-3" style="gap:14px;margin-top:10px">
      <div class="card">
        <div class="eyebrow">Client Applications</div>
        <h3>Mobile & Web Portals</h3>
        <ul style="list-style:none;display:grid;gap:6px;font-size:11.5px;color:var(--gray-600)">
          <li><b>Parent Mobile (Expo):</b> React Native 0.74, biometric auth, offline caching, QR generator, chat UI.</li>
          <li><b>Doctor Portal (Next.js 14):</b> App Router, baseline verification workbench, digital sign-off.</li>
          <li><b>Guest QR View:</b> Public authenticated micro-frontend for emergency scans without login.</li>
        </ul>
      </div>
      <div class="card card--accent">
        <div class="eyebrow">Application Layer</div>
        <h3>NestJS API Gateway</h3>
        <ul style="list-style:none;display:grid;gap:6px;font-size:11.5px;color:var(--gray-600)">
          <li><b>Authentication & RBAC:</b> JWT tokens with refresh rotation, phone validation guards.</li>
          <li><b>Anonymizer Service:</b> Pre-LLM regex/NER PII scrubber boundary.</li>
          <li><b>Matching Algorithm:</b> 4-factor weighted score for specialist recommendations.</li>
          <li><b>Paymob Integration:</b> Subscription lifecycle & secure HMAC webhook verification.</li>
        </ul>
      </div>
      <div class="card">
        <div class="eyebrow">Data & Storage Tier</div>
        <h3>Enterprise Cloud Storage</h3>
        <ul style="list-style:none;display:grid;gap:6px;font-size:11.5px;color:var(--gray-600)">
          <li><b>PostgreSQL 16:</b> Relational tables + <span class="mono">pgvector</span> semantic embeddings.</li>
          <li><b>Redis 7 + BullMQ:</b> Job queues for asynchronous multi-page PDF OCR extraction.</li>
          <li><b>AWS S3 Vault:</b> Server-side AES-256 KMS encryption with 15-min presigned URLs.</li>
        </ul>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">Data Ingestion Flow: Medical Document to Verified Clinical Baseline</div>
      <div class="band-grid band-4">
        <div><div class="bk">Step 1: Presigned S3</div><div class="bl">Mobile client uploads encrypted PDF directly to S3 bucket without overloading API memory.</div></div>
        <div><div class="bk">Step 2: BullMQ Worker</div><div class="bl">Asynchronous worker runs OCR extraction and classifies file (<span class="mono">Echo, Lab, Genetics</span>).</div></div>
        <div><div class="bk">Step 3: AI Baseline</div><div class="bl">LLM generates draft clinical baseline; PII is scrubbed before processing.</div></div>
        <div><div class="bk">Step 4: Doctor Verification</div><div class="bl">Pediatrician reviews draft, amends notes, and marks baseline as confirmed.</div></div>
      </div>
    </div>
  </section>

  <!-- SLIDE 5: MULTI-TENANT CORE VS DISEASE MODULES -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Extensible Digital Health Engine</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Platform Scalability</div>
        <h2>Multi-Tenant Digital Health Core vs. Disease Modules</h2>
      </div>
      <div class="meta">Extensible to CP, Autism, ADHD without rebuild</div>
    </div>
    <p class="lead">
      Down Plus is engineered with strict decoupling: the generic digital health core handles security, storage, billing, and communication, while disease-specific modules plug in seamlessly.
    </p>
    <div class="grid grid-2" style="margin-top:14px">
      <div class="card">
        <div class="eyebrow" style="color:var(--primary)">Layer 1: Universal Health Core</div>
        <h3>Digital Health Platform Engine</h3>
        <table style="margin-top:8px">
          <tbody>
            <tr><td class="mono">Auth & RBAC</td><td>Parent, Doctor, Clinic Admin, Super Admin roles</td></tr>
            <tr><td class="mono">Document Vault</td><td>S3 Encrypted storage + Presigned URL manager</td></tr>
            <tr><td class="mono">Anonymizer Core</td><td>PII scrubbing boundary preventing data leakage</td></tr>
            <tr><td class="mono">Billing Bus</td><td>Paymob checkout, subscriptions & recurring renewals</td></tr>
            <tr><td class="mono">Sharing & QR</td><td>Cryptographic ephemeral access tokens (24h/48h)</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card card--accent">
        <div class="eyebrow" style="color:var(--accent-dark)">Layer 2: Disease Modules</div>
        <h3>Down Plus Module (Active v1)</h3>
        <table style="margin-top:8px">
          <tbody>
            <tr><td class="mono">AAP Supervision</td><td>Automated Down Syndrome pediatric check schedule</td></tr>
            <tr><td class="mono">Independence Ladder</td><td>4-tier progression: not started &rarr; mastered outside</td></tr>
            <tr><td class="mono">Down Matcher</td><td>Trisomy 21 case experience weighting factor</td></tr>
            <tr><td class="mono">Karyotype Graph</td><td>Free Trisomy 21 (95%), Translocation, Mosaicism</td></tr>
            <tr><td class="mono">Future Modules</td><td>Pluggable: Cerebral Palsy (GMFCS), Autism, ADHD</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">Commercial Benefit of Decoupled Architecture</div>
      <p style="font-size:12px;color:var(--gray-700)">
        <b>85% Investment Reusability:</b> When the client decides to launch "Autism Plus" or "Cerebral Palsy Plus", 85% of the codebase (Auth, S3, Payments, QR engine, Database, Mobile framework) is already deployed. New conditions only require seeding a new milestone catalog and clinical rules.
      </p>
    </div>
  </section>

  <!-- SLIDE 6: CLINICAL DOMAIN - AAP SUPERVISION -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">AAP Clinical Supervision Engine</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Clinical Domain Engine</div>
        <h2>American Academy of Pediatrics (AAP) Health Supervision</h2>
      </div>
      <div class="meta">Automated Preventive Protocol Engine</div>
    </div>
    <p class="lead">
      The platform translates international clinical guidelines for Down Syndrome into automated screening triggers, eliminating diagnostic delay and clinical oversight.
    </p>
    <div class="grid grid-3" style="margin-top:12px">
      <div class="card">
        <div class="eyebrow">Birth – 2 Months</div>
        <h3>Neonatal Echocardiogram</h3>
        <p>Screening for Congenital Heart Defects (AVSD, VSD, ASD) present in approximately 50% of infants with Down Syndrome. Triggers urgent cardiology referral if positive.</p>
      </div>
      <div class="card">
        <div class="eyebrow">Birth – 6 Months</div>
        <h3>Cytogenetic Karyotype</h3>
        <p>Confirms genetic variation (Free Trisomy 21, Robertsonian Translocation, or Mosaicism) to guide familial counseling and recurrence risk assessment.</p>
      </div>
      <div class="card">
        <div class="eyebrow">6 – 12 Months</div>
        <h3>Annual Thyroid Panel</h3>
        <p>TSH + Free T4 screen to detect congenital or early autoimmune primary/subclinical hypothyroidism. Guides sodium levothyroxine (Eltroxin) dosage adjustments.</p>
      </div>
      <div class="card">
        <div class="eyebrow">12 – 18 Months</div>
        <h3>Audiology & Tympanometry</h3>
        <p>Screening for middle-ear effusion and conductive hearing loss caused by narrow auditory canals. Prevents speech and articulation developmental delays.</p>
      </div>
      <div class="card">
        <div class="eyebrow">24 – 36 Months</div>
        <h3>Pediatric Ophthalmology</h3>
        <p>Early screening for cataracts, refractive errors, strabismus, and nystagmus to ensure visual development matches motor therapy.</p>
      </div>
      <div class="card">
        <div class="eyebrow">36 – 48 Months</div>
        <h3>Cervical Spine Lateral X-Ray</h3>
        <p>Neutral, flexion, and extension radiographic evaluation for Atlantoaxial Instability (AAI) before participation in gymnastics or sports.</p>
      </div>
    </div>
  </section>

  <!-- SLIDE 7: THE INDEPENDENCE LADDER -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Pediatric Developmental Rubric</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Developmental Engine</div>
        <h2>The 4-Stage Independence Ladder</h2>
      </div>
      <div class="meta">Granular Milestone Rubric Beyond Binary Pass/Fail</div>
    </div>
    <p class="lead">
      Standard developmental assessments fail children with developmental delays. Down Plus introduces a 4-tier rubric that acknowledges partial achievements and generalizes skills.
    </p>
    <div class="ladder">
      <div class="ladder-step">
        <div class="snum">Stage 01</div>
        <h4>Not Started</h4>
        <div class="sub-en">Initial Baseline</div>
        <p>The child cannot initiate or perform the skill. Identified as an upcoming developmental target in the individualized care plan.</p>
      </div>
      <div class="ladder-step done">
        <div class="snum">Stage 02</div>
        <h4>With Assistance</h4>
        <div class="sub-en">Guided Execution</div>
        <p>The child performs the action with physical hand-over-hand guidance or assistive equipment (e.g., SMO ankle orthotics, specialized spoons).</p>
      </div>
      <div class="ladder-step done">
        <div class="snum">Stage 03</div>
        <h4>Independent</h4>
        <div class="sub-en">Home Mastery</div>
        <p>The child executes the milestone autonomously in familiar home settings without adult intervention or physical support.</p>
      </div>
      <div class="ladder-step done" style="border-color:var(--success);background:linear-gradient(180deg,#F0FDF4,#fff)">
        <div class="snum" style="color:var(--success)">Stage 04</div>
        <h4>Mastered Outside</h4>
        <div class="sub-en">Full Generalization</div>
        <p>Skill is generalized across multiple real-world environments (school, nursery, clinic, playground) with zero regression.</p>
      </div>
    </div>
    <div class="grid grid-4" style="margin-top:12px">
      <div class="card">
        <div class="eyebrow">Gross Motor</div>
        <h3 style="font-size:13.5px">Sitting, Standing, Gait</h3>
        <p style="font-size:11.5px">Tracks hypotonia compensation, trunk stability, and independent walking.</p>
      </div>
      <div class="card">
        <div class="eyebrow">Fine Motor</div>
        <h3 style="font-size:13.5px">Pincer Grasp & Writing</h3>
        <p style="font-size:11.5px">Hand-eye coordination, pencil grip, spoon feeding, and self-dressing.</p>
      </div>
      <div class="card">
        <div class="eyebrow">Speech & Language</div>
        <h3 style="font-size:13.5px">Receptive & Expressive</h3>
        <p style="font-size:11.5px">Sign language initiation, vocalizations, 2-word sentences, and articulation.</p>
      </div>
      <div class="card">
        <div class="eyebrow">Self-Care & Daily Living</div>
        <h3 style="font-size:13.5px">Home Independence</h3>
        <p style="font-size:11.5px">Toileting independence, teeth brushing, social interaction, and safety awareness.</p>
      </div>
    </div>
  </section>

  <!-- SLIDE 8: AI ANONYMIZER & PRIVACY BOUNDARY -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">HIPAA & GDPR Compliance Architecture</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Security & Regulatory Compliance</div>
        <h2>AI Clinical Assistant & Deterministic Anonymizer Boundary</h2>
      </div>
      <div class="meta">Zero PII to External LLM • Encrypted AES-256</div>
    </div>
    <p class="lead">
      Patient privacy is the foremost engineering constraint. Raw medical text and parent inquiries are sanitized inside the private VPC before being processed by LLM reasoning gateways.
    </p>
    <div class="grid grid-2" style="margin-top:14px">
      <div class="card card--accent">
        <div class="eyebrow">The Anonymization Boundary</div>
        <h3>Deterministic Regex & NER Scrubber</h3>
        <table style="margin-top:6px">
          <thead>
            <tr><th>Raw Input Detected</th><th>Scrubbed Output Before LLM Gateway</th></tr>
          </thead>
          <tbody>
            <tr><td>Patient Full Names</td><td><span class="mono" style="color:var(--primary-dark)">[PATIENT]</span> or <span class="mono">[GUARDIAN]</span></td></tr>
            <tr><td>Egyptian National ID (14 digits)</td><td><span class="mono" style="color:var(--primary-dark)">[NATIONAL_ID REDACTED]</span></td></tr>
            <tr><td>Mobile Phone Numbers</td><td><span class="mono" style="color:var(--primary-dark)">[PHONE REDACTED]</span></td></tr>
            <tr><td>Email Addresses</td><td><span class="mono" style="color:var(--primary-dark)">[EMAIL REDACTED]</span></td></tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="eyebrow">Clinical Grounding</div>
        <h3>RAG with PostgreSQL pgvector</h3>
        <p style="margin-bottom:8px">The assistant does not hallucinate medical advice; answers are anchored strictly in indexed clinical guidelines and verified pediatric literature.</p>
        <ul style="list-style:none;display:grid;gap:5px;font-size:12px;color:var(--gray-700)">
          <li>✓ High-dimensional vector embeddings stored in <span class="mono">clinical_knowledge_vectors</span></li>
          <li>✓ Cosine similarity distance matching (<span class="mono">&lt;=&gt;</span>) in PostgreSQL</li>
          <li>✓ Automatic clinical escalation: suggests specialist booking if red flags appear</li>
        </ul>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">Regulatory Guarantee for the Client</div>
      <p style="font-size:12px;color:var(--gray-700)">
        <b>HIPAA & GDPR Ready:</b> Under no circumstances does identifiable health information cross the cloud VPC boundary. S3 buckets are protected with hardware-enforced AES-256 KMS encryption and accessible only via 15-minute temporary presigned URLs.
      </p>
    </div>
  </section>

  <!-- SLIDE 9: LIFE PASSPORT & EPHEMERAL QR -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Emergency Medical Passport</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Emergency & Interoperability</div>
        <h2>The Life Passport & Ephemeral Doctor QR Engine</h2>
      </div>
      <div class="meta">Zero-Login Access for Consulting Physicians</div>
    </div>
    <div class="grid grid-2" style="margin-top:14px">
      <div class="card">
        <div class="eyebrow">Digital Health Passport</div>
        <h3>Single-Source Medical History</h3>
        <p style="margin-bottom:10px">Compiles the child's entire medical record into an executive emergency summary readable in 30 seconds by attending medical staff.</p>
        <ul style="list-style:none;display:grid;gap:6px;font-size:12px;color:var(--gray-700)">
          <li>• <b>Confirmed Diagnoses & Karyotype:</b> Free Trisomy 21 / Mosaic status</li>
          <li>• <b>Critical Comorbidities:</b> Cardiac repair history, thyroid dosage, AAI precautions</li>
          <li>• <b>Current Medications:</b> Eltroxin, vitamins, therapies with dosage</li>
          <li>• <b>Independence Level:</b> Current developmental stage across 5 domains</li>
          <li>• <b>Doctor-Verified Baselines:</b> Signed by registered medical specialists</li>
        </ul>
      </div>
      <div class="card card--accent">
        <div class="eyebrow">Zero-Friction Access</div>
        <h3>Cryptographic Ephemeral QR Engine</h3>
        <p style="margin-bottom:10px">Parents generate a time-limited QR code from their mobile screen when visiting a new clinic or hospital emergency room.</p>
        <div class="band band-grid" style="background:#fff;border:1px solid var(--gray-200);gap:6px">
          <div><b style="color:var(--primary-dark)">High-Entropy Token:</b> 128-character cryptographically signed token</div>
          <div><b style="color:var(--primary-dark)">Time-to-Live (TTL):</b> Automatically expires in 24 or 48 hours</div>
          <div><b style="color:var(--primary-dark)">Zero App Requirement:</b> Doctor scans QR and views mobile-responsive web record instantly</div>
          <div><b style="color:var(--primary-dark)">Full Audit Logging:</b> Timestamp, doctor IP, and user-agent recorded</div>
        </div>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">Clinical Impact in Emergencies</div>
      <p style="font-size:12px;color:var(--gray-700)">
        In emergency anesthesia or surgical admissions, knowing cervical spine atlantoaxial status and exact cardiac history prevents life-threatening complications. Down Plus puts that data in the physician's hands in 3 seconds.
      </p>
    </div>
  </section>

  <!-- SLIDE 10: MOBILE APP UI SHOWCASE (NEW SLIDE) -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Product UI Showcase • React Native Expo</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Mobile Experience Showcase</div>
        <h2>Parent Mobile Application (iOS & Android)</h2>
      </div>
      <div class="meta">Serene Glassmorphic Pediatric Interface</div>
    </div>
    <div class="shot-grid">
      <div class="shot-card">
        <div class="shot-thumb">
          <img src="data:image/png;base64,${screenChat}" alt="AI Medical Chatbot & Doctor Matcher Screen" onclick="openLb(this.src, 'AI Medical Chatbot & Doctor Matcher Screen')" />
        </div>
        <div class="shot-body">
          <span class="shot-tag">AI Consultation</span>
          <h4>AI Health Chat & Doctor Match</h4>
          <p>Parents ask health questions; AI triages symptoms with AAP clinical grounding and displays verified doctor cards.</p>
        </div>
      </div>
      <div class="shot-card">
        <div class="shot-thumb">
          <img src="data:image/png;base64,${screenQR}" alt="Emergency Life Passport & QR Access Screen" onclick="openLb(this.src, 'Emergency Life Passport & QR Access Screen')" />
        </div>
        <div class="shot-body">
          <span class="shot-tag">Emergency Mode</span>
          <h4>Life Passport & QR Code</h4>
          <p>Instant emergency summary and cryptographically signed QR code for zero-login doctor access.</p>
        </div>
      </div>
      <div class="shot-card">
        <div class="shot-thumb" style="background:linear-gradient(135deg,#edf7f3,#e3f2ec);padding:14px;display:flex;flex-direction:column;justify-content:center">
          <div style="background:#fff;border-radius:12px;padding:12px;border:1px solid #c0c8c4;width:100%">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="font-size:10px;font-weight:700;color:var(--primary)">LADDER PROGRESS</span>
              <span style="font-size:10px;font-weight:800;color:var(--success)">STAGE 3</span>
            </div>
            <div style="font-size:12px;font-weight:700;margin-bottom:4px">Independent Walking</div>
            <div style="height:6px;background:#e2e8f0;border-radius:99px;overflow:hidden">
              <div style="width:75%;height:100%;background:var(--primary)"></div>
            </div>
            <div style="font-size:10px;color:var(--gray-500);margin-top:6px">Home Mastery Verified</div>
          </div>
        </div>
        <div class="shot-body">
          <span class="shot-tag">Developmental</span>
          <h4>Independence Ladder</h4>
          <p>Tracks fine/gross motor and speech rubrics across 4 stages with photographic observation logs.</p>
        </div>
      </div>
      <div class="shot-card">
        <div class="shot-thumb" style="background:linear-gradient(135deg,#e9f5f8,#f4faf7);padding:14px;display:flex;flex-direction:column;justify-content:center">
          <div style="background:#fff;border-radius:12px;padding:12px;border:1px solid #c0c8c4;width:100%">
            <div style="font-size:10px;font-weight:700;color:var(--accent-dark);margin-bottom:4px">AAP SCREENING DUE</div>
            <div style="font-size:12px;font-weight:700">Annual Thyroid Panel</div>
            <div style="font-size:10.5px;color:var(--gray-600);margin-top:4px">Age: 11 Months • Check TSH + Free T4</div>
            <div style="display:inline-block;margin-top:8px;padding:3px 8px;background:rgba(245,158,11,.15);border-radius:6px;font-size:9.5px;font-weight:700;color:var(--accent-dark)">SCHEDULE VISIT</div>
          </div>
        </div>
        <div class="shot-body">
          <span class="shot-tag">Clinical Tracking</span>
          <h4>Family Command Center</h4>
          <p>Chronological screening alerts, document vault with OCR status, and child growth metrics.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SLIDE 11: DOCTOR & ADMIN WEB UI SHOWCASE (NEW SLIDE) -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Clinician & Admin Web Workbenches • Next.js 14</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Web Portal Showcase</div>
        <h2>Doctor Workbench & Administrative Governance</h2>
      </div>
      <div class="meta">Responsive Clinician Interface • App Router</div>
    </div>
    <div class="web-grid">
      <div class="browser-mock">
        <div class="browser-bar">
          <div class="b-dot r"></div><div class="b-dot y"></div><div class="b-dot g"></div>
          <div class="b-url">https://portal.downplus.health/doctor/baseline/c79f8e4a</div>
        </div>
        <div style="padding:14px;background:#f8fafc">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <div>
              <span style="font-size:10px;font-weight:700;color:var(--primary-dark)">CLINICAL VERIFICATION WORKBENCH</span>
              <h4 style="font-size:14px;font-weight:800">Case Baseline Review: Adam K. (Trisomy 21)</h4>
            </div>
            <div class="pill"><span class="dot"></span> AI Draft Ready</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px">
              <div style="font-size:10.5px;font-weight:700;color:var(--gray-500)">AI EXTRACTED MEDICAL BASELINE</div>
              <p style="font-size:11px;color:var(--gray-700);margin-top:4px">
                • <b>Diagnosis:</b> Free Trisomy 21 (confirmed via karyotype).<br>
                • <b>Cardiology:</b> Small muscular VSD, hemodynamically stable.<br>
                • <b>Endocrine:</b> TSH 4.8 mIU/L, FT4 normal (euthyroid).
              </p>
            </div>
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px">
              <div style="font-size:10.5px;font-weight:700;color:var(--gray-500)">ATTENDING PHYSICIAN NOTES</div>
              <p style="font-size:11px;color:var(--gray-700);margin-top:4px">
                Follow-up repeat thyroid panel in 6 months. Maintain physical therapy sessions twice weekly for hypotonia.
              </p>
            </div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:8px">
            <button style="background:#fff;border:1px solid #cbd5e1;padding:5px 12px;border-radius:6px;font-size:11px;font-weight:600">Amend Notes</button>
            <button style="background:var(--primary);color:#fff;border:none;padding:5px 12px;border-radius:6px;font-size:11px;font-weight:700">Sign & Confirm Baseline</button>
          </div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="card card--accent">
          <div class="eyebrow">Emergency QR Guest Portal</div>
          <h4 style="font-size:13px;font-weight:700">Zero-Login Emergency Viewer</h4>
          <p style="font-size:11.5px;color:var(--gray-600);margin-top:4px">
            Accessed via ephemeral QR scan (<span class="mono">/view?token=...</span>). Displays critical emergency vitals, karyotype, and medications on any phone browser.
          </p>
        </div>
        <div class="card">
          <div class="eyebrow">Clinic Administration Portal</div>
          <h4 style="font-size:13px;font-weight:700">Clinic Analytics & Paymob Subscriptions</h4>
          <p style="font-size:11.5px;color:var(--gray-600);margin-top:4px">
            Tracks total active patients, doctor consultation fees collected, Paymob webhook transaction settlements, and specialist schedule queues.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- SLIDE 12: COMPLETE DATABASE SCHEMA -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">PostgreSQL 16 & Prisma Data Dictionary</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Data Architecture</div>
        <h2>Enterprise Database Schema & Entity Relationships</h2>
      </div>
      <div class="meta">PostgreSQL 16 • Prisma ORM • 12 Relational Models</div>
    </div>
    <table style="margin-top:6px">
      <thead>
        <tr>
          <th>Model / Table</th>
          <th>Primary Key</th>
          <th>Core Foreign Keys & Relations</th>
          <th>Key Purpose & Fields</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b class="mono">users</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td>Children, DoctorProfile, Subscriptions</td>
          <td>Authentication, role (<span class="mono">parent, doctor, admin</span>), phone, password hash.</td>
        </tr>
        <tr>
          <td><b class="mono">children</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td><span class="mono">parent_id &rarr; users(id)</span></td>
          <td>Isolated PII: first/last name, DOB, blood type, gender, avatar.</td>
        </tr>
        <tr>
          <td><b class="mono">child_clinical_profiles</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td><span class="mono">child_id &rarr; children(id)</span> [1:1]</td>
          <td>Primary diagnosis, karyotype type, gestational age, birth weight, comorbidities JSON.</td>
        </tr>
        <tr>
          <td><b class="mono">medical_documents</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td><span class="mono">child_id &rarr; children(id)</span></td>
          <td>S3 key, file name, category (<span class="mono">Echo, Lab, Genetics</span>), OCR raw text, status.</td>
        </tr>
        <tr>
          <td><b class="mono">case_baselines</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td><span class="mono">child_id &rarr; children(id), verified_by &rarr; users(id)</span></td>
          <td>AI-generated clinical summary JSON, doctor notes, verification status enum.</td>
        </tr>
        <tr>
          <td><b class="mono">milestone_catalog</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td>ChildMilestoneProgress</td>
          <td>Disease discriminator, domain, age brackets, localized titles, mandatory check flag.</td>
        </tr>
        <tr>
          <td><b class="mono">child_milestone_progress</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td><span class="mono">child_id, milestone_id</span> [Unique]</td>
          <td>Status enum (<span class="mono">not_started &rarr; mastered_outside</span>), updated by, field notes.</td>
        </tr>
        <tr>
          <td><b class="mono">doctor_profiles</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td><span class="mono">user_id &rarr; users(id)</span> [1:1]</td>
          <td>Medical license, specialty, city, fee, pediatric years, Down experience score.</td>
        </tr>
        <tr>
          <td><b class="mono">doctor_access_tokens</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td><span class="mono">child_id, granted_by, target_doctor</span></td>
          <td>128-char crypto token, view history flag, add notes flag, expiration timestamp.</td>
        </tr>
        <tr>
          <td><b class="mono">ai_chat_sessions/messages</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td><span class="mono">child_id, session_id</span></td>
          <td>Conversational encounters, sanitized query logs, recommended doctor IDs.</td>
        </tr>
        <tr>
          <td><b class="mono">clinical_knowledge_vectors</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td>Independent Vector Store</td>
          <td>Medical literature chunks, AAP guideline vectors, pgvector embedding column.</td>
        </tr>
        <tr>
          <td><b class="mono">subscriptions</b></td>
          <td><span class="mono">id (UUID)</span></td>
          <td><span class="mono">user_id &rarr; users(id)</span> [1:1]</td>
          <td>Tier (<span class="mono">free, monthly, annual</span>), status, Paymob order ID, transaction ID.</td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- SLIDE 13: DOCTOR MATCHING ENGINE -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Specialist Referral Algorithm</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Marketplace Algorithm</div>
        <h2>Multi-Factor Specialist Matching Engine</h2>
      </div>
      <div class="meta">Automated Conversion from Chat to Clinic Booking</div>
    </div>
    <p class="lead">
      When clinical risks or therapy milestones are identified, the platform matches the family with the optimal verified clinician using a deterministic weighted scoring formula.
    </p>
    <div class="card card--accent" style="margin-top:12px;padding:18px">
      <div class="eyebrow">Scoring Formula</div>
      <h3 style="font-size:18px;font-family:var(--mono);color:var(--primary-deeper)">
        Score = (Specialty × 0.40) + (Location × 0.25) + (Down_Exp × 0.20) + (Seniority × 0.15)
      </h3>
    </div>
    <div class="grid grid-4" style="margin-top:14px">
      <div class="card">
        <div class="eyebrow">Specialty Match (40%)</div>
        <h3 style="font-size:13px">Exact Domain Alignment</h3>
        <p style="font-size:11.5px">Binary 1.0 or 0.0 direct match with recommended pediatric field (Neurology, Speech, Cardiology, Genetics).</p>
      </div>
      <div class="card">
        <div class="eyebrow">Location (25%)</div>
        <h3 style="font-size:13px">Governorate Proximity</h3>
        <p style="font-size:11.5px">1.0 for same city/governorate (Cairo, Giza, Alex), 0.5 for adjacent governorates, 0.0 otherwise.</p>
      </div>
      <div class="card">
        <div class="eyebrow">Down Experience (20%)</div>
        <h3 style="font-size:13px">Trisomy 21 Case Volume</h3>
        <p style="font-size:11.5px">Normalized rating based on verified clinical history with pediatric special needs.</p>
      </div>
      <div class="card">
        <div class="eyebrow">Seniority (15%)</div>
        <h3 style="font-size:13px">Practice Experience</h3>
        <p style="font-size:11.5px">Normalized score based on years of verified pediatric practice and syndicate licensing.</p>
      </div>
    </div>
  </section>

  <!-- SLIDE 14: MILESTONES & COMMERCIAL WEIGHTING -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Delivery Roadmap & Milestone Weights</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Delivery & Commercial Schedule</div>
        <h2>Project Milestones & Commercial Weighting Matrix</h2>
      </div>
      <div class="meta">16 Weeks • 6 Defined Milestones • 100% Weight • 57 EGP/USD</div>
    </div>
    <div class="roadmap">
      <div class="ms">
        <div class="key">M1</div>
        <div class="wk">Weeks 1 – 2</div>
        <div class="weight">15% Weight</div>
        <div class="egp">$1,500 (85.5k EGP)</div>
        <h4>Foundation & Specs</h4>
        <p>Prisma ERD, Docker dev stack, monorepo setup.</p>
      </div>
      <div class="ms">
        <div class="key">M2</div>
        <div class="wk">Weeks 3 – 5</div>
        <div class="weight">20% Weight</div>
        <div class="egp">$2,000 (114k EGP)</div>
        <h4>Core API & S3 OCR</h4>
        <p>JWT RBAC, PII isolation, BullMQ OCR worker.</p>
      </div>
      <div class="ms">
        <div class="key">M3</div>
        <div class="wk">Weeks 6 – 8</div>
        <div class="weight">20% Weight</div>
        <div class="egp">$2,000 (114k EGP)</div>
        <h4>Clinical AI Engine</h4>
        <p>AAP schedule, Independence Ladder, AI Anonymizer.</p>
      </div>
      <div class="ms">
        <div class="key">M4</div>
        <div class="wk">Weeks 9 – 11</div>
        <div class="weight">20% Weight</div>
        <div class="egp">$2,000 (114k EGP)</div>
        <h4>Mobile App (Expo)</h4>
        <p>Parent portal, QR Life Passport, chat assistant UI.</p>
      </div>
      <div class="ms golive">
        <div class="key">M5</div>
        <div class="wk">Weeks 12 – 14</div>
        <div class="weight">15% Weight</div>
        <div class="egp">$1,500 (85.5k EGP)</div>
        <h4>Doctor Web & Paymob</h4>
        <p>Doctor workbench, guest QR view, Paymob billing.</p>
      </div>
      <div class="ms golive">
        <div class="key">M6</div>
        <div class="wk">Weeks 15 – 16</div>
        <div class="weight">10% Weight</div>
        <div class="egp">$1,000 (57k EGP)</div>
        <h4>Production & Launch</h4>
        <p>AWS Terraform IaC, penetration audit, IP transfer.</p>
      </div>
    </div>
    <table style="margin-top:14px">
      <thead>
        <tr>
          <th>ID</th>
          <th>Milestone Deliverable Focus</th>
          <th>Weight</th>
          <th>Amount (USD / EGP)</th>
          <th>Payment Trigger & Acceptance Criteria</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b class="mono">M1</b></td>
          <td>Architecture Design, Monorepo Scaffolding & Container Stack</td>
          <td><b>15%</b></td>
          <td><b>$1,500</b> (85,500 EGP)</td>
          <td>Delivery of approved TDD, Prisma schema, and local Docker stack running with seeds.</td>
        </tr>
        <tr>
          <td><b class="mono">M2</b></td>
          <td>Core Backend Engine, Security & Asynchronous Medical OCR Vault</td>
          <td><b>20%</b></td>
          <td><b>$2,000</b> (114,000 EGP)</td>
          <td>Successful live demo of encrypted PDF upload, S3 presigned URLs, and OCR parsing.</td>
        </tr>
        <tr>
          <td><b class="mono">M3</b></td>
          <td>Clinical Intelligence, AAP Supervision Matrix & AI Anonymizer</td>
          <td><b>20%</b></td>
          <td><b>$2,000</b> (114,000 EGP)</td>
          <td>Automated test suite verifying 0% PII leakage to LLM and doctor matching score output.</td>
        </tr>
        <tr>
          <td><b class="mono">M4</b></td>
          <td>Parent Mobile App (iOS & Android) in React Native Expo</td>
          <td><b>20%</b></td>
          <td><b>$2,000</b> (114,000 EGP)</td>
          <td>Deliverable Expo builds on iOS TestFlight and Android APK with interactive QR Life Passport.</td>
        </tr>
        <tr>
          <td><b class="mono">M5</b></td>
          <td>Doctor Portal (Next.js 14), Emergency QR Viewer & Paymob Engine</td>
          <td><b>15%</b></td>
          <td><b>$1,500</b> (85,500 EGP)</td>
          <td>Doctor baseline verification workflow and end-to-end sandbox payment completion.</td>
        </tr>
        <tr>
          <td><b class="mono">M6</b></td>
          <td>AWS Production Deployment, Security Hardening & UAT Sign-Off</td>
          <td><b>10%</b></td>
          <td><b>$1,000</b> (57,000 EGP)</td>
          <td>Live production environment provisioned via Terraform, security audit, and IP handover.</td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- SLIDE 15: FINANCIAL INVESTMENT & CASH FLOW -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Commercial Pricing Proposal</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Financial Proposal</div>
        <h2>Investment Options Tailored for Egyptian Market</h2>
      </div>
      <div class="meta">Rate: 1 USD = 57 EGP • Transparent Deliverables</div>
    </div>
    <div class="grid grid-2" style="margin-top:12px">
      <div class="price-card">
        <div class="lbl">Primary Turnkey Package (Recommended)</div>
        <div class="list">Down Plus Production Platform (iOS, Android, Web & AWS)</div>
        <div class="price"><span class="ccy">$</span>10,000</div>
        <div class="egp-val">570,000 EGP (Fixed-Price Contract)</div>
        <div class="note">Designed specifically for Egyptian market competitive economics</div>
        <ul>
          <li>Full implementation of Milestones M1 through M6</li>
          <li>Parent Mobile App (iOS & Android Expo standalone builds)</li>
          <li>Doctor & Clinic Administration Web Portal (Next.js 14)</li>
          <li>NestJS Modular Backend API & BullMQ OCR Background Workers</li>
          <li>Complete AWS Infrastructure as Code (Terraform scripts)</li>
          <li>Paymob Subscription Billing & Webhook Gateway Integration</li>
          <li><b>Complimentary 60-Day Full Warranty Period</b></li>
        </ul>
      </div>
      <div class="price-card optional">
        <div class="lbl">Enterprise Multi-Disease License</div>
        <div class="list">Turnkey Platform + Pluggable Pediatric Expansions</div>
        <div class="price"><span class="ccy">$</span>16,500</div>
        <div class="egp-val" style="color:var(--accent-dark)">940,500 EGP (Fixed-Price Contract)</div>
        <div class="note">For Regional Clinic Networks & Healthcare Groups</div>
        <ul>
          <li>Everything in Primary Turnkey Package</li>
          <li>Cerebral Palsy (CP) Clinical Module (GMFCS Matrix)</li>
          <li>Autism Spectrum Disorder (ASD) Sensory Tracker Module</li>
          <li>Multi-Clinic Tenant Administration & Cross-Facility Reporting</li>
          <li>Extended 120-Day Full Warranty Period</li>
        </ul>
      </div>
    </div>
    <div class="band" style="margin-top:14px">
      <div class="band-title">Standard Contract Cash Flow Schedule ($10,000 USD / 570,000 EGP)</div>
      <div class="band-grid band-3">
        <div><div class="bk">M1 & M2 (35%)</div><div class="bl"><b>$3,500 USD (199,500 EGP)</b> ($1,500 at kickoff + $2,000 upon Core API & S3 OCR acceptance)</div></div>
        <div><div class="bk">M3 & M4 (40%)</div><div class="bl"><b>$4,000 USD (228,000 EGP)</b> ($2,000 upon AI clinical engine + $2,000 upon Mobile App delivery)</div></div>
        <div><div class="bk">M5 & M6 (25%)</div><div class="bl"><b>$2,500 USD (142,500 EGP)</b> ($1,500 upon Doctor Web & Paymob + $1,000 upon AWS Prod Launch)</div></div>
      </div>
    </div>
  </section>

  <!-- SLIDE 16: OPERATIONAL CLOUD COSTS -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Direct Infrastructure Costs</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Cloud Run Costs</div>
        <h2>Third-Party Infrastructure & Operating Expenses</h2>
      </div>
      <div class="meta">Direct Vendor Invoicing • No Agency Markups • 57 EGP/USD</div>
    </div>
    <p class="lead">
      All cloud infrastructure and vendor services are billed directly to the client's corporate billing accounts with zero agency markup.
    </p>
    <table style="margin-top:12px">
      <thead>
        <tr>
          <th>Service / Infrastructure Item</th>
          <th>Provider</th>
          <th>Early Stage Launch (&lt; 5k Users)</th>
          <th>Growth Scale (50k+ Users)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>AWS Cloud Hosting</b><br><span style="font-size:10.5px;color:var(--gray-500)">ECS Fargate, RDS PostgreSQL Multi-AZ, ElastiCache Redis, S3 KMS, ALB</span></td>
          <td>Amazon Web Services</td>
          <td><b>$180 – $320 / month</b><br><span style="color:var(--primary-dark);font-size:10.5px">~10,260 – 18,240 EGP/mo</span></td>
          <td><b>$650 – $1,200 / month</b><br><span style="color:var(--primary-dark);font-size:10.5px">~37,050 – 68,400 EGP/mo</span></td>
        </tr>
        <tr>
          <td><b>LLM Inference Tokens</b><br><span style="font-size:10.5px;color:var(--gray-500)">Anonymized clinical RAG, document summaries, parent chatbot</span></td>
          <td>OpenRouter / Google Gemini</td>
          <td><b>$30 – $80 / month</b><br><span style="color:var(--primary-dark);font-size:10.5px">~1,710 – 4,560 EGP/mo</span></td>
          <td><b>$250 – $600 / month</b><br><span style="color:var(--primary-dark);font-size:10.5px">~14,250 – 34,200 EGP/mo</span></td>
        </tr>
        <tr>
          <td><b>Payment Gateway Transactions</b><br><span style="font-size:10.5px;color:var(--gray-500)">Parent subscription checkouts & marketplace transactions</span></td>
          <td>Paymob</td>
          <td>2.5% – 2.75% + 3 EGP per txn</td>
          <td>Custom negotiated enterprise rate</td>
        </tr>
        <tr>
          <td><b>SMS OTP Authentication</b><br><span style="font-size:10.5px;color:var(--gray-500)">Phone verification during parent onboarding</span></td>
          <td>Twilio / Local SMS Gateway</td>
          <td><b>$20 – $50 / month</b><br><span style="color:var(--primary-dark);font-size:10.5px">~1,140 – 2,850 EGP/mo</span></td>
          <td><b>$150 – $400 / month</b><br><span style="color:var(--primary-dark);font-size:10.5px">~8,550 – 22,800 EGP/mo</span></td>
        </tr>
        <tr>
          <td><b>Apple Developer Program</b></td>
          <td>Apple Inc.</td>
          <td>$99 / year (~5,643 EGP/yr)</td>
          <td>$99 / year (~5,643 EGP/yr)</td>
        </tr>
        <tr>
          <td><b>Google Play Developer Account</b></td>
          <td>Google LLC</td>
          <td>$25 one-time fee (~1,425 EGP)</td>
          <td>$25 one-time fee (~1,425 EGP)</td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- SLIDE 17: GOVERNANCE, SLA & SIGN-OFF -->
  <section class="slide">
    <div class="brand-bar">
      <div class="brand-group">
        <img class="partner-logo medexia" src="data:image/png;base64,${b2}" alt="Medexia.ai" />
        <div class="logo-divider"></div>
        <img class="partner-logo" src="data:image/png;base64,${b1}" alt="AI MicroMind" />
      </div>
      <div class="meta">Partnership Authorization & Handover</div>
    </div>
    <div class="slide-head">
      <div>
        <div class="eyebrow">Terms & Agreement</div>
        <h2>Governance, SLA, Warranty & Mutual Authorization</h2>
      </div>
      <div class="meta">100% IP Transfer • 60-Day Full Warranty • English Standard</div>
    </div>
    <div class="grid grid-3" style="margin-top:8px">
      <div class="card">
        <div class="eyebrow">Intellectual Property</div>
        <h3>100% Client Ownership</h3>
        <p>Upon settlement of milestone payments, all source code, database schemas, UX designs, and documentation transfer exclusively to the client with zero lock-in.</p>
      </div>
      <div class="card card--accent">
        <div class="eyebrow">Complimentary Warranty</div>
        <h3>60-Day Full Support</h3>
        <p>Commencing upon production launch: zero-cost remediation of software defects, performance tuning, and security patches.</p>
      </div>
      <div class="card">
        <div class="eyebrow">Optional Post-Warranty SLA</div>
        <h3>Annual Maintenance</h3>
        <p>Available at $750/month (~42,750 EGP/mo) for 30 dedicated hours/month, continuous database optimization, and priority 8-hour SLA response.</p>
      </div>
    </div>
    <div class="sig-row">
      <div class="sig">
        <div class="role">Authorized Client Representative</div>
        <h4>Client Acceptance & Authorization</h4>
        <div class="legal">Authorized on behalf of the client for Down Plus Platform Delivery ($10,000 USD / 570,000 EGP).</div>
        <div class="blank">
          <div class="line">Signature / Date: _________________________________________</div>
        </div>
      </div>
      <div class="sig">
        <div class="role">Solution Delivery Partners</div>
        <h4>Medexia.ai & AI MicroMind</h4>
        <div class="legal">Committed to technical specification, clinical compliance, and milestone delivery.</div>
        <div class="blank">
          <div class="line">Signature / Date: _________________________________________</div>
        </div>
      </div>
    </div>
  </section>

</div>

<div class="navbar">
  <button id="prev" type="button" aria-label="Previous slide">&#8592;</button>
  <span style="padding:0 6px"><span id="cur">1</span> / <span id="tot">17</span></span>
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
    prog.style.width = ((i + 1) / slides.length * 100) + '%';
  }
  function bindNav(btn, delta){
    const handler = ev => { ev.preventDefault(); ev.stopPropagation(); go(i + delta); };
    btn.addEventListener('click', handler, {passive:false});
  }
  bindNav(prevBtn, -1);
  bindNav(nextBtn, +1);
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') go(i + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(i - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(slides.length - 1);
    else if (e.key === 'f' || e.key === 'F') { if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); }
    else if (e.key === 'p' || e.key === 'P') window.print();
    else if (e.key === 'Escape') closeLb();
  });
  function openLb(src, alt){
    document.getElementById('lbimg').src = src;
    document.getElementById('lbimg').alt = alt || '';
    document.getElementById('lb').hidden = false;
  }
  function closeLb(){
    document.getElementById('lb').hidden = true;
  }
  go(0);
</script>
</body>
</html>`;

const outPath1 = 'c:/Users/z40/Downloads/Down application/Down Plus - Executive, Technical & Commercial Presentation.html';
const outPath2 = 'C:/Users/z40/Downloads/RIIL_Meeting2_Presentation/RIIL_Meeting2_Presentation/Down Plus - Executive, Technical & Commercial Presentation.html';

fs.writeFileSync(outPath1, html, 'utf8');
fs.writeFileSync(outPath2, html, 'utf8');
console.log('Presentation successfully written to both locations! Length: ' + html.length);
