const fs = require('fs');
const path = require('path');

const deckPath = path.join(__dirname, '..', 'Down Plus - Executive, Technical & Commercial Presentation.html');
const webDeckPath = path.join(__dirname, '..', 'apps', 'web', 'public', 'presentation.html');
const optScriptPath = path.join(__dirname, 'optimize_narrative.js');

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

// CSS for the ultra-catchy flagship smartphone mockups
const catchyPhoneCss = `
  /* Ultra-Catchy Flagship Smartphone Mockups (iPhone 16 Pro Titanium Style) */
  .phones-showcase-wrapper {
    width: 100%;
    margin-top: 8px;
  }
  .phones-container {
    display: flex;
    justify-content: center;
    gap: 18px;
    height: 545px;
    width: 100%;
    overflow-x: auto;
    padding: 6px 10px 14px;
    scroll-behavior: smooth;
  }
  .phone-mockup {
    position: relative;
    width: 272px;
    height: 525px;
    background: linear-gradient(145deg, #1e293b, #090d16);
    border-radius: 46px;
    padding: 10px;
    box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex-shrink: 0;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .phone-mockup:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 35px 65px -15px rgba(8, 145, 178, 0.35), 0 0 0 2px var(--primary-light), inset 0 1px 2px rgba(255, 255, 255, 0.4);
  }
  
  /* Physical Side Buttons */
  .phone-mockup::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 90px;
    width: 3px;
    height: 28px;
    background: #475569;
    border-radius: 3px 0 0 3px;
    box-shadow: 0 42px 0 #475569, 0 84px 0 #475569;
  }
  .phone-mockup::after {
    content: '';
    position: absolute;
    right: -2px;
    top: 110px;
    width: 3px;
    height: 48px;
    background: #475569;
    border-radius: 0 3px 3px 0;
  }

  /* Dynamic Island */
  .phone-notch {
    position: absolute;
    top: 13px;
    left: 50%;
    transform: translateX(-50%);
    width: 88px;
    height: 22px;
    background: #000000;
    border-radius: 20px;
    z-index: 35;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  }
  .phone-notch .cam-lens {
    width: 8px;
    height: 8px;
    background: radial-gradient(circle at 35% 35%, #2a3447, #0b0f19);
    border-radius: 50%;
    border: 1px solid #1e293b;
    box-shadow: inset 0 0 2px #38bdf8;
  }
  .phone-notch .sensor-dot {
    width: 4px;
    height: 4px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 4px #10b981;
  }

  /* Screen Surface */
  .phone-screen {
    flex: 1;
    background: #f8fafc;
    border-radius: 36px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: rgba(8, 145, 178, 0.4) transparent;
    display: flex;
    flex-direction: column;
  }
  .phone-screen::-webkit-scrollbar {
    width: 3.5px;
  }
  .phone-screen::-webkit-scrollbar-thumb {
    background: rgba(8, 145, 178, 0.4);
    border-radius: 10px;
  }

  /* Status Bar */
  .phone-status-bar {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    height: 38px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 16px 5px;
    font-size: 10px;
    font-weight: 800;
    color: #0f172a;
    z-index: 25;
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  }
  .phone-status-bar .status-icons {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Scroll Badge */
  .phone-scroll-pill {
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.88);
    backdrop-filter: blur(6px);
    color: #ffffff;
    font-size: 8.5px;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 12px;
    pointer-events: none;
    z-index: 30;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 4px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.2);
  }

  /* Bottom Floating Dock Bar */
  .phone-tab-bar {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    height: 44px;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid rgba(226, 232, 240, 0.9);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 6px 2px;
    z-index: 20;
    margin-top: auto;
  }
  .phone-tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    font-size: 8px;
    font-weight: 700;
    color: #64748b;
  }
  .phone-tab-item.active {
    color: var(--primary-dark);
  }
  .phone-tab-item .tab-icon {
    font-size: 14px;
    line-height: 1;
  }
  .phone-home-indicator {
    width: 90px;
    height: 3.5px;
    background: #0f172a;
    border-radius: 4px;
    opacity: 0.35;
    margin: 3px auto 1px;
  }

  /* Micro Glass Cards inside Screen */
  .screen-content {
    padding: 10px 11px;
    flex: 1;
  }
  .screen-glass-card {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.95);
    border-radius: 14px;
    padding: 10px;
    margin-bottom: 9px;
    box-shadow: 0 4px 14px -2px rgba(40, 80, 65, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
  }
`;

// Full Slide 12 markup with ultra-catchy, interactive flagship smartphone mockups
const catchySlide12 = `  <!-- SLIDE 12: MOBILE APP INTERACTIVE UI SHOWCASE (SCROLLABLE MOCKUPS) -->
  <section class="slide">
${makeBrandBar('Native Mobile Clinical Ecosystem • iOS & Android')}
    <div class="slide-head">
      <div>
        <div class="eyebrow">End-User Experience & Flagship Mobile UI</div>
        <h2>Native Mobile App: Interactive Patient Experience & Clinical Workflows</h2>
      </div>
      <div class="meta">Touch & Scroll to Explore • Pixel-Perfect Native Flow • 100% Production Fidelity</div>
    </div>
    
    <div class="phones-container">

      <!-- PHONE 1: COMMAND CENTER & EMERGENCY SPEED DIAL -->
      <div class="phone-mockup">
        <div class="phone-notch">
          <div class="cam-lens"></div>
          <div class="sensor-dot"></div>
        </div>
        <div class="phone-status-bar">
          <span>9:41</span>
          <div class="status-icons">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="#0f172a"><path d="M1 8h2v2H1V8zm3-2h2v4H4V6zm3-3h2v7H7V3zm3-3h2v10h-2V0z"/></svg>
            <span style="font-size:8.5px;margin-left:1px">5G</span>
            <svg width="16" height="8" viewBox="0 0 22 11" fill="none" style="margin-left:2px"><rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="#0f172a"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#10b981"/><path d="M20 3.5v4" stroke="#0f172a" stroke-linecap="round"/></svg>
          </div>
        </div>
        <div class="phone-screen" style="background: linear-gradient(180deg, #ecfdf5 0%, #f0fdf4 35%, #ffffff 100%);">
          <div class="screen-content">
            
            <!-- Child Profile Header -->
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;padding:4px 0">
              <div style="display:flex;align-items:center;gap:8px">
                <div style="position:relative">
                  <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#0d9488,#0284c7);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;box-shadow:0 2px 6px rgba(13,148,136,0.3)">عمر</div>
                  <span style="position:absolute;bottom:-1px;right:-1px;width:10px;height:10px;background:#10b981;border:2px solid #fff;border-radius:50%"></span>
                </div>
                <div>
                  <div style="display:flex;align-items:center;gap:4px">
                    <span style="font-size:12px;font-weight:800;color:#0f172a">عمر (Omar)</span>
                    <span style="font-size:8px;background:#0d9488;color:#fff;padding:1px 5px;border-radius:6px;font-weight:700">T21</span>
                  </div>
                  <span style="font-size:9.5px;color:#64748b;font-weight:600">2y 4m • د. سارة (متابعة)</span>
                </div>
              </div>
              <div style="width:28px;height:28px;border-radius:50%;background:#ffffff;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;font-size:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">🔔</div>
            </div>

            <!-- Urgent 1-Tap Emergency Hospital Card -->
            <div style="background:linear-gradient(135deg,#fff1f2 0%,#fee2e2 100%);border:1.5px solid #fca5a5;border-radius:14px;padding:10px;margin-bottom:10px;box-shadow:0 4px 12px rgba(239,68,68,0.12)">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                <span style="font-size:10px;font-weight:900;color:#b91c1c;display:flex;align-items:center;gap:4px">
                  <span style="width:7px;height:7px;border-radius:50%;background:#ef4444;box-shadow:0 0 0 2px rgba(239,68,68,0.3)"></span>
                  طوارئ طبية سريعة 1-Tap SOS
                </span>
                <span style="font-size:8px;background:#ef4444;color:#fff;padding:1px 5px;border-radius:4px;font-weight:800">حرج</span>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px">
                <div style="background:#dc2626;color:#fff;text-align:center;padding:7px 4px;border-radius:8px;font-size:9.5px;font-weight:800;box-shadow:0 2px 5px rgba(220,38,38,0.3)">🚑 إسعاف 123</div>
                <div style="background:#ea580c;color:#fff;text-align:center;padding:7px 4px;border-radius:8px;font-size:9.5px;font-weight:800;box-shadow:0 2px 5px rgba(234,88,12,0.3)">📞 نجدة طفل 16000</div>
              </div>
              <div style="font-size:8.5px;color:#991b1b;line-height:1.3;background:rgba(255,255,255,0.7);padding:5px 7px;border-radius:6px;border:1px dashed #fca5a5">
                ⚡ <b>بث تلقائي:</b> إحداثيات GPS، فصيلة الدم O+، وجراحة القلب (VSD) تُرسل فوراً لطوارئ المستشفى.
              </div>
            </div>

            <!-- AAP Clinical Health Protocol Card -->
            <div class="screen-glass-card">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                <span style="font-size:10px;font-weight:800;color:#0f766e">📅 بروتوكول الأكاديمية الأمريكية (AAP)</span>
                <span style="font-size:8px;background:#ccfbf1;color:#0f766e;padding:1px 5px;border-radius:4px;font-weight:700">محدث</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:5px;font-size:9px">
                <div style="display:flex;align-items:center;justify-content:space-between;padding:4px 6px;background:#f8fafc;border-radius:6px">
                  <span>🫀 <b>إيكو القلب (Echo at Birth):</b></span>
                  <span style="color:#059669;font-weight:800;font-size:8.5px">✓ معتمد ومستقر</span>
                </div>
                <div style="display:flex;align-items:center;justify-content:space-between;padding:4px 6px;background:#fffbeb;border-radius:6px;border:1px solid #fef3c7">
                  <span>🧪 <b>فحص الغدة (TSH/FT4):</b></span>
                  <span style="color:#d97706;font-weight:800;font-size:8.5px">⏳ بعد 14 يوماً</span>
                </div>
                <div style="display:flex;align-items:center;justify-content:space-between;padding:4px 6px;background:#f8fafc;border-radius:6px">
                  <span>🦴 <b>أشعة الفقرات العنقية:</b></span>
                  <span style="color:#64748b;font-weight:700;font-size:8.5px">عند 36 شهراً</span>
                </div>
              </div>
            </div>

            <!-- Daily Home Routine & 14-Day Streak -->
            <div style="background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 100%);border:1px solid #fde68a;border-radius:14px;padding:10px;margin-bottom:10px;box-shadow:0 3px 8px rgba(245,158,11,0.08)">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:10px;font-weight:900;color:#92400e;display:flex;align-items:center;gap:3px">🔥 ستريك 14 يوماً متواصلاً!</span>
                <span style="font-size:8px;background:#f59e0b;color:#fff;padding:1px 6px;border-radius:10px;font-weight:800">+50 pt</span>
              </div>
              <div style="font-size:8.5px;color:#78350f;margin-bottom:6px">تمارين اليوم (20 دقيقة): تقوية اللسان • التوازن • إشارات ماكاتون</div>
              <div style="background:#b45309;color:#fff;text-align:center;padding:5px;border-radius:7px;font-size:9px;font-weight:800;cursor:pointer">
                ✓ تم إكمال جلسة اليوم المنزلية
              </div>
            </div>

            <!-- Specialist Consultation Lock -->
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:7px 9px;display:flex;align-items:center;gap:8px">
              <div style="width:26px;height:26px;border-radius:50%;background:#e0f2fe;display:flex;align-items:center;justify-content:center;font-size:11px">🩺</div>
              <div style="flex:1">
                <div style="font-size:9px;font-weight:800;color:#0f172a">د. سارة عادل (استشاري قلب)</div>
                <div style="font-size:8px;color:#64748b">مصرح بالسباحة والعلاج الطبيعي • معتمد 🔒</div>
              </div>
            </div>

            <div style="height:12px"></div>
          </div>

          <!-- Bottom Tab Bar -->
          <div class="phone-tab-bar">
            <div class="phone-tab-item active"><span class="tab-icon">🏠</span><span>الرئيسية</span></div>
            <div class="phone-tab-item"><span class="tab-icon">📈</span><span>النمو</span></div>
            <div class="phone-tab-item"><span class="tab-icon">🤟</span><span>ماكاتون</span></div>
            <div class="phone-tab-item"><span class="tab-icon">🪪</span><span>الجواز</span></div>
          </div>
          <div class="phone-home-indicator"></div>
        </div>
        <div class="phone-scroll-pill"><span>↕ تمرير الشاشة</span></div>
      </div>

      <!-- PHONE 2: MAKATON SIGN LANGUAGE DICTIONARY -->
      <div class="phone-mockup">
        <div class="phone-notch">
          <div class="cam-lens"></div>
          <div class="sensor-dot"></div>
        </div>
        <div class="phone-status-bar">
          <span>9:41</span>
          <div class="status-icons">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="#0f172a"><path d="M1 8h2v2H1V8zm3-2h2v4H4V6zm3-3h2v7H7V3zm3-3h2v10h-2V0z"/></svg>
            <span style="font-size:8.5px;margin-left:1px">5G</span>
            <svg width="16" height="8" viewBox="0 0 22 11" fill="none" style="margin-left:2px"><rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="#0f172a"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#10b981"/><path d="M20 3.5v4" stroke="#0f172a" stroke-linecap="round"/></svg>
          </div>
        </div>
        <div class="phone-screen" style="background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 30%, #ffffff 100%);">
          <div class="screen-content">
            
            <!-- Header -->
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div>
                <span style="font-size:12px;font-weight:900;color:#0369a1">قاموس ماكاتون التفاعلي 🤟</span>
                <div style="font-size:8.5px;color:#64748b">8 بطاقات وظيفية للتواصل قبل النطق</div>
              </div>
              <span style="font-size:8px;background:#bae6fd;color:#0284c7;padding:2px 6px;border-radius:8px;font-weight:800">مستوى 1</span>
            </div>

            <!-- Featured Interactive Gesture Card (WATER - ماء) -->
            <div style="background:linear-gradient(135deg,#0284c7 0%,#0369a1 100%);color:#fff;border-radius:14px;padding:10px;margin-bottom:10px;box-shadow:0 4px 14px rgba(2,132,199,0.25)">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <span style="font-size:11px;font-weight:900">💧 مـــاء (Water)</span>
                <span style="font-size:8px;background:rgba(255,255,255,0.2);padding:1px 6px;border-radius:4px;font-weight:700">صوتي + بصري</span>
              </div>
              <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:6px;display:flex;align-items:center;gap:8px;margin-bottom:6px">
                <div style="font-size:20px">🤲</div>
                <div style="font-size:8.5px;line-height:1.3;flex:1">
                  ضم الأصابع ولمس الشفة السفلية مع إخراج صوت "مــاء".
                </div>
              </div>
              <div style="display:flex;gap:6px">
                <button style="flex:1;background:#ffffff;color:#0284c7;border:none;border-radius:6px;padding:5px;font-size:8.5px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:3px">
                  🔊 استمع للنطق
                </button>
                <button style="flex:1;background:rgba(255,255,255,0.2);color:#ffffff;border:1px solid rgba(255,255,255,0.4);border-radius:6px;padding:5px;font-size:8.5px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:3px">
                  🎬 فيديو الإشارة
                </button>
              </div>
            </div>

            <!-- Clinical Tantrum Prevention Banner -->
            <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;padding:6px 8px;margin-bottom:9px;font-size:8px;color:#065f46;line-height:1.35">
              💡 <b>الأثر السريري:</b> يخفض 90% من نوبات الغضب والبكاء الصباحي لتمكين الطفل من التعبير عن احتياجاته فورياً.
            </div>

            <!-- 8-Card Functional Grid -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px">
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:7px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
                <div style="font-size:14px;margin-bottom:2px">🍎</div>
                <div style="font-size:9.5px;font-weight:800;color:#0f172a">طعام (Eat)</div>
                <div style="font-size:8px;color:#64748b">أنا جائع • أكل</div>
              </div>
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:7px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
                <div style="font-size:14px;margin-bottom:2px">🛏️</div>
                <div style="font-size:9.5px;font-weight:800;color:#0f172a">نوم (Sleep)</div>
                <div style="font-size:8px;color:#64748b">أنا متعب • سرير</div>
              </div>
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:7px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
                <div style="font-size:14px;margin-bottom:2px">🚽</div>
                <div style="font-size:9.5px;font-weight:800;color:#0f172a">حمام (Toilet)</div>
                <div style="font-size:8px;color:#64748b">احتياج الحمام</div>
              </div>
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:7px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
                <div style="font-size:14px;margin-bottom:2px">🆘</div>
                <div style="font-size:9.5px;font-weight:800;color:#0f172a">مساعدة (Help)</div>
                <div style="font-size:8px;color:#64748b">ساعدني يا ماما</div>
              </div>
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:7px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
                <div style="font-size:14px;margin-bottom:2px">👍</div>
                <div style="font-size:9.5px;font-weight:800;color:#0f172a">نعم / حاضر</div>
                <div style="font-size:8px;color:#64748b">موافق • تأكيد</div>
              </div>
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:7px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
                <div style="font-size:14px;margin-bottom:2px">✋</div>
                <div style="font-size:9.5px;font-weight:800;color:#0f172a">لا / كفاية</div>
                <div style="font-size:8px;color:#64748b">توقف • لا أريد</div>
              </div>
            </div>

            <div style="height:12px"></div>
          </div>

          <!-- Bottom Tab Bar -->
          <div class="phone-tab-bar">
            <div class="phone-tab-item"><span class="tab-icon">🏠</span><span>الرئيسية</span></div>
            <div class="phone-tab-item"><span class="tab-icon">📈</span><span>النمو</span></div>
            <div class="phone-tab-item active"><span class="tab-icon">🤟</span><span>ماكاتون</span></div>
            <div class="phone-tab-item"><span class="tab-icon">🪪</span><span>الجواز</span></div>
          </div>
          <div class="phone-home-indicator"></div>
        </div>
        <div class="phone-scroll-pill"><span>↕ تمرير ماكاتون</span></div>
      </div>

      <!-- PHONE 3: DOWN SYNDROME SPECIALIZED GROWTH ENGINE -->
      <div class="phone-mockup">
        <div class="phone-notch">
          <div class="cam-lens"></div>
          <div class="sensor-dot"></div>
        </div>
        <div class="phone-status-bar">
          <span>9:41</span>
          <div class="status-icons">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="#0f172a"><path d="M1 8h2v2H1V8zm3-2h2v4H4V6zm3-3h2v7H7V3zm3-3h2v10h-2V0z"/></svg>
            <span style="font-size:8.5px;margin-left:1px">5G</span>
            <svg width="16" height="8" viewBox="0 0 22 11" fill="none" style="margin-left:2px"><rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="#0f172a"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#10b981"/><path d="M20 3.5v4" stroke="#0f172a" stroke-linecap="round"/></svg>
          </div>
        </div>
        <div class="phone-screen" style="background: linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 30%, #ffffff 100%);">
          <div class="screen-content">
            
            <!-- Header -->
            <div style="margin-bottom:8px">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:12px;font-weight:900;color:#065f46">محرك نمو داون (Zemel) 📈</span>
                <span style="font-size:8px;background:#d1fae5;color:#047857;padding:1px 5px;border-radius:4px;font-weight:800">Pediatrics 2015</span>
              </div>
              <div style="font-size:8px;color:#047857;margin-top:1px">معتمد من الأكاديمية الأمريكية لطب الأطفال (AAP)</div>
            </div>

            <!-- Accuracy Alert Badge -->
            <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:6px 8px;margin-bottom:9px;font-size:8px;color:#92400e;line-height:1.35">
              🛡️ <b>دقة طبية:</b> يمنع تشخيص 85% من الأطفال خطأً بالتقزم الحاد مقارنة بمنحنيات WHO العامة.
            </div>

            <!-- 3 Biometric KPI Tiles -->
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin-bottom:10px">
              <div style="background:#ffffff;border:1.5px solid #10b981;border-radius:10px;padding:6px;text-align:center;box-shadow:0 2px 5px rgba(16,185,129,0.08)">
                <div style="font-size:8px;color:#64748b;font-weight:700">الوزن الحالي</div>
                <div style="font-size:13px;font-weight:900;color:#0f172a;line-height:1.15">12.4<small style="font-size:8px">kg</small></div>
                <span style="font-size:7.5px;background:#d1fae5;color:#065f46;padding:1px 4px;border-radius:3px;font-weight:800">المئوي 54%</span>
              </div>
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:6px;text-align:center">
                <div style="font-size:8px;color:#64748b;font-weight:700">الطول</div>
                <div style="font-size:13px;font-weight:900;color:#0f172a;line-height:1.15">84.2<small style="font-size:8px">cm</small></div>
                <span style="font-size:7.5px;background:#f1f5f9;color:#475569;padding:1px 4px;border-radius:3px;font-weight:700">المئوي 48%</span>
              </div>
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:6px;text-align:center">
                <div style="font-size:8px;color:#64748b;font-weight:700">محيط الرأس</div>
                <div style="font-size:13px;font-weight:900;color:#0f172a;line-height:1.15">47.1<small style="font-size:8px">cm</small></div>
                <span style="font-size:7.5px;background:#f1f5f9;color:#475569;padding:1px 4px;border-radius:3px;font-weight:700">المئوي 50%</span>
              </div>
            </div>

            <!-- Interactive SVG Growth Percentile Chart -->
            <div class="screen-glass-card" style="padding:8px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <span style="font-size:9.5px;font-weight:800;color:#0f172a">منحنى الوزن حسب العمر (0 - 36 شهراً)</span>
                <span style="font-size:8px;color:#059669;font-weight:800">نطاق مثالي ✓</span>
              </div>
              
              <svg viewBox="0 0 220 95" style="width:100%;height:85px;overflow:visible">
                <!-- Grid Lines -->
                <line x1="20" y1="10" x2="210" y2="10" stroke="#e2e8f0" stroke-width="0.8" stroke-dasharray="2,2"/>
                <line x1="20" y1="35" x2="210" y2="35" stroke="#e2e8f0" stroke-width="0.8" stroke-dasharray="2,2"/>
                <line x1="20" y1="60" x2="210" y2="60" stroke="#e2e8f0" stroke-width="0.8" stroke-dasharray="2,2"/>
                <line x1="20" y1="85" x2="210" y2="85" stroke="#cbd5e1" stroke-width="1"/>
                
                <!-- Shaded Healthy DS Band (P10 to P90) -->
                <path d="M 20 80 Q 80 65 140 45 T 210 20 L 210 65 Q 140 75 80 82 T 20 85 Z" fill="#d1fae5" opacity="0.6"/>
                
                <!-- 97th Percentile Curve -->
                <path d="M 20 72 Q 80 50 140 32 T 210 12" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="2,2"/>
                <text x="212" y="14" font-size="6" fill="#94a3b8">P97</text>
                
                <!-- 50th Percentile Curve (Zemel Median) -->
                <path d="M 20 80 Q 80 58 140 40 T 210 24" fill="none" stroke="#059669" stroke-width="2"/>
                <text x="212" y="26" font-size="6" font-weight="bold" fill="#059669">P50</text>
                
                <!-- 3rd Percentile Curve -->
                <path d="M 20 85 Q 80 72 140 55 T 210 40" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="2,2"/>
                <text x="212" y="42" font-size="6" fill="#94a3b8">P3</text>
                
                <!-- Omar's Actual Measurement Node (At 28 months) -->
                <circle cx="155" cy="37" r="4.5" fill="#10b981" stroke="#ffffff" stroke-width="1.5"/>
                <circle cx="155" cy="37" r="8" fill="none" stroke="#10b981" stroke-width="1" opacity="0.5"/>
                <text x="135" y="27" font-size="7" font-weight="bold" fill="#065f46">عمر (12.4 كجم)</text>
              </svg>

              <div style="display:flex;justify-content:space-between;font-size:7.5px;color:#64748b;margin-top:2px;padding:0 4px">
                <span>الولادة</span><span>6 أشهر</span><span>12 شهراً</span><span>24 شهراً</span><span>36 شهراً</span>
              </div>
            </div>

            <!-- Velocity & Nutrition Alert -->
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:7px 9px;margin-bottom:8px">
              <div style="font-size:9px;font-weight:800;color:#0f172a">معدل الزيادة الشهرية: +280 جرام/شهر (مثالي)</div>
              <div style="font-size:8px;color:#64748b;margin-top:2px">توصية التغذية: تدعيم فيتامين د وجرعة كالسيوم معتمدة.</div>
            </div>

            <button style="width:100%;background:#059669;color:#fff;border:none;border-radius:8px;padding:6px;font-size:9px;font-weight:800;box-shadow:0 2px 6px rgba(5,150,105,0.25)">
              ➕ تسجيل قياس شهري جديد
            </button>

            <div style="height:12px"></div>
          </div>

          <!-- Bottom Tab Bar -->
          <div class="phone-tab-bar">
            <div class="phone-tab-item"><span class="tab-icon">🏠</span><span>الرئيسية</span></div>
            <div class="phone-tab-item active"><span class="tab-icon">📈</span><span>النمو</span></div>
            <div class="phone-tab-item"><span class="tab-icon">🤟</span><span>ماكاتون</span></div>
            <div class="phone-tab-item"><span class="tab-icon">🪪</span><span>الجواز</span></div>
          </div>
          <div class="phone-home-indicator"></div>
        </div>
        <div class="phone-scroll-pill"><span>↕ تمرير منحنيات النمو</span></div>
      </div>

      <!-- PHONE 4: VERIFIED LIFE PASSPORT & INDEPENDENCE LADDER -->
      <div class="phone-mockup">
        <div class="phone-notch">
          <div class="cam-lens"></div>
          <div class="sensor-dot"></div>
        </div>
        <div class="phone-status-bar">
          <span>9:41</span>
          <div class="status-icons">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="#0f172a"><path d="M1 8h2v2H1V8zm3-2h2v4H4V6zm3-3h2v7H7V3zm3-3h2v10h-2V0z"/></svg>
            <span style="font-size:8.5px;margin-left:1px">5G</span>
            <svg width="16" height="8" viewBox="0 0 22 11" fill="none" style="margin-left:2px"><rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="#0f172a"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#10b981"/><path d="M20 3.5v4" stroke="#0f172a" stroke-linecap="round"/></svg>
          </div>
        </div>
        <div class="phone-screen" style="background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 35%, #ffffff 100%);">
          <div class="screen-content">
            
            <!-- Header -->
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div>
                <span style="font-size:12px;font-weight:900;color:#0f172a">جواز الحياة الطبي الموثق 🪪</span>
                <div style="font-size:8.5px;color:#64748b">Verified Medical Life Passport</div>
              </div>
              <span style="font-size:8px;background:#dbeafe;color:#1e40af;padding:2px 6px;border-radius:6px;font-weight:800">🔒 موثق سريرياً</span>
            </div>

            <!-- Official Medical Passport ID Card -->
            <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);color:#fff;border-radius:14px;padding:10px;margin-bottom:9px;box-shadow:0 4px 14px rgba(15,23,42,0.3)">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
                <div>
                  <div style="font-size:8px;color:#94a3b8;letter-spacing:0.05em">REPUBLIC OF EGYPT • MEDICAL PASSPORT</div>
                  <div style="font-size:11px;font-weight:900;color:#38bdf8">عمر هاني منصور (Omar)</div>
                </div>
                <span style="font-size:8px;background:#0369a1;color:#fff;padding:1px 5px;border-radius:4px;font-weight:800">T21-EGY</span>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:8.5px;color:#cbd5e1;margin-bottom:6px">
                <div>فصيلة الدم: <b style="color:#fff">O+ Positive</b></div>
                <div>القلب: <b style="color:#34d399">VSD Repaired ✓</b></div>
                <div>الحساسية: <b style="color:#fff">لا توجد حساسية</b></div>
                <div>الفقرات العنقية: <b style="color:#34d399">مستقرة وسليمة ✓</b></div>
              </div>
              <div style="border-top:1px dashed #334155;padding-top:5px;font-size:7.5px;color:#94a3b8;display:flex;justify-content:space-between">
                <span>كود: T21-2024-8841</span>
                <span>اعتماد: د. هاني منصور (استشاري جينات)</span>
              </div>
            </div>

            <!-- Scannable Medical QR Code Card -->
            <div class="screen-glass-card" style="text-align:center;padding:9px">
              <div style="font-size:9.5px;font-weight:800;color:#0f172a;margin-bottom:4px">رمز QR الطبي للطوارئ والمستشفيات</div>
              <div style="display:inline-block;background:#ffffff;padding:6px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.06);border:1px solid #e2e8f0">
                <svg width="70" height="70" viewBox="0 0 100 100" fill="#0f172a">
                  <path d="M0,0 h30 v30 h-30 z M5,5 v20 h20 v-20 z M10,10 h10 v10 h-10 z"/>
                  <path d="M70,0 h30 v30 h-30 z M75,5 v20 h20 v-20 z M80,10 h10 v10 h-10 z"/>
                  <path d="M0,70 h30 v30 h-30 z M5,75 v20 h20 v-20 z M10,80 h10 v10 h-10 z"/>
                  <rect x="40" y="10" width="8" height="8"/><rect x="55" y="10" width="8" height="8"/>
                  <rect x="40" y="25" width="8" height="8"/><rect x="55" y="25" width="8" height="8"/>
                  <rect x="10" y="40" width="8" height="8"/><rect x="25" y="40" width="8" height="8"/>
                  <rect x="40" y="40" width="20" height="20" rx="4" fill="#0284c7"/>
                  <rect x="70" y="40" width="8" height="8"/><rect x="85" y="40" width="8" height="8"/>
                  <rect x="40" y="70" width="8" height="8"/><rect x="55" y="70" width="8" height="8"/>
                  <rect x="70" y="70" width="8" height="8"/><rect x="85" y="85" width="8" height="8"/>
                </svg>
              </div>
              <div style="font-size:8px;color:#64748b;margin-top:4px">امسح الكود عبر أي هاتف للوصول الفوري للملف الطبي المعتمد في ثانية واحدة</div>
            </div>

            <!-- The Independence Ladder Matrix -->
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:8px 9px;margin-bottom:8px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
                <span style="font-size:9.5px;font-weight:800;color:#0f172a">سلم الاستقلالية (780 نقطة)</span>
                <span style="font-size:8px;background:#fef3c7;color:#b45309;padding:1px 5px;border-radius:4px;font-weight:800">مستوى 4: الخطوات</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;font-size:8px">
                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:1px"><span>المهارات الحركية الكبرى:</span><b>85%</b></div>
                  <div style="background:#f1f5f9;height:4px;border-radius:2px;overflow:hidden"><div style="background:#0d9488;width:85%;height:100%"></div></div>
                </div>
                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:1px"><span>التواصل والتخاطب وماكاتون:</span><b>70%</b></div>
                  <div style="background:#f1f5f9;height:4px;border-radius:2px;overflow:hidden"><div style="background:#0284c7;width:70%;height:100%"></div></div>
                </div>
                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:1px"><span>العناية الذاتية والتغذية:</span><b>62%</b></div>
                  <div style="background:#f1f5f9;height:4px;border-radius:2px;overflow:hidden"><div style="background:#f59e0b;width:62%;height:100%"></div></div>
                </div>
              </div>
            </div>

            <button style="width:100%;background:#0284c7;color:#fff;border:none;border-radius:8px;padding:6px;font-size:9px;font-weight:800;box-shadow:0 2px 6px rgba(2,132,199,0.25)">
              📄 تصدير وثيقة A4 الرسمية للمدرسة
            </button>

            <div style="height:12px"></div>
          </div>

          <!-- Bottom Tab Bar -->
          <div class="phone-tab-bar">
            <div class="phone-tab-item"><span class="tab-icon">🏠</span><span>الرئيسية</span></div>
            <div class="phone-tab-item"><span class="tab-icon">📈</span><span>النمو</span></div>
            <div class="phone-tab-item"><span class="tab-icon">🤟</span><span>ماكاتون</span></div>
            <div class="phone-tab-item active"><span class="tab-icon">🪪</span><span>الجواز</span></div>
          </div>
          <div class="phone-home-indicator"></div>
        </div>
        <div class="phone-scroll-pill"><span>↕ تمرير جواز الحياة</span></div>
      </div>

    </div>
  </section>`;

// Replace Slide 12 in the main HTML content
const slide12StartMarker = '<!-- SLIDE 12: MOBILE APP INTERACTIVE UI SHOWCASE';
const slide12EndMarker = '<!-- SLIDE 13: DOCTOR & ADMIN WEB UI SHOWCASE';

const idxStart = content.indexOf(slide12StartMarker);
const idxEnd = content.indexOf(slide12EndMarker);

if (idxStart === -1 || idxEnd === -1) {
  console.error('Could not locate Slide 12 markers!', { idxStart, idxEnd });
  process.exit(1);
}

// Also update CSS in <style>
const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>');
let styles = content.substring(styleStart + 7, styleEnd);

// Replace existing phone CSS with new catchyPhoneCss
const phoneCssTarget = '/* Interactive Scrollable Smartphone Mockups */';
const phoneCssIdx = styles.indexOf(phoneCssTarget);
if (phoneCssIdx !== -1) {
  const nextSectionIdx = styles.indexOf('/* Interactive Scrollable Browser Mockup */', phoneCssIdx);
  if (nextSectionIdx !== -1) {
    styles = styles.substring(0, phoneCssIdx) + catchyPhoneCss + '\n  ' + styles.substring(nextSectionIdx);
  }
}

// Assemble final HTML
const beforeSlide12 = content.substring(0, idxStart);
const afterSlide12 = content.substring(idxEnd);
let updatedContent = beforeSlide12 + catchySlide12 + '\n\n  ' + afterSlide12;

// Replace style block
const updatedStyleStart = updatedContent.indexOf('<style>');
const updatedStyleEnd = updatedContent.indexOf('</style>');
updatedContent = updatedContent.substring(0, updatedStyleStart + 7) + styles + updatedContent.substring(updatedStyleEnd);

// Write to files
fs.writeFileSync(deckPath, updatedContent, 'utf8');
console.log('Successfully updated:', deckPath);

fs.writeFileSync(webDeckPath, updatedContent, 'utf8');
console.log('Successfully updated:', webDeckPath);

console.log('Done upgrading Slide 12 mockups!');
