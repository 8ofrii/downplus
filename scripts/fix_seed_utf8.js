const fs = require('fs');
const path = require('path');

const seedContent = `import { PrismaClient, UserRole, SkillStatus, SubscriptionTier } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Down Plus database seeding...');

  // 1. Seed Milestone Catalog (AAP Health Supervision for Children with Down Syndrome)
  console.log('Seeding AAP Down Syndrome Milestone Catalog...');

  const milestones = [
    // ── Motor Domain ──
    {
      domain: 'motor',
      ageBracketMinMonths: 0,
      ageBracketMaxMonths: 6,
      titleAr: 'التحكم في الرأس وثبات الرقبة أثناء الحمل',
      titleEn: 'Steady Head Control While Supported',
      descriptionAr: 'يستطيع الرضيع الحفاظ على ثبات رأسه دون انحناء أثناء حمله في وضع رأسي لمدة دقيقة على الأقل.',
      descriptionEn: 'Maintains steady head control without bobbing when held in an upright position for at least 1 minute.',
      isMandatoryClinicalCheck: false,
    },
    {
      domain: 'motor',
      ageBracketMinMonths: 6,
      ageBracketMaxMonths: 12,
      titleAr: 'الجلوس المستقل دون مساعدة',
      titleEn: 'Independent Sitting Without Support',
      descriptionAr: 'يجلس على الأرض بمفرده ويداه حرتان للعب لمدة دقيقتين على الأقل.',
      descriptionEn: 'Sits independently on the floor with hands free to play for at least 2 minutes.',
      isMandatoryClinicalCheck: false,
    },
    {
      domain: 'motor',
      ageBracketMinMonths: 12,
      ageBracketMaxMonths: 24,
      titleAr: 'الوقوف بالاستناد على الأثاث (Cruising)',
      titleEn: 'Pulling to Stand & Cruising Along Furniture',
      descriptionAr: 'يقف مستنداً على الطاولة أو الأريكة ويتحرك بخطوات جانبية مستنداً.',
      descriptionEn: 'Pulls up to a standing position and cruises laterally along furniture.',
      isMandatoryClinicalCheck: false,
    },
    {
      domain: 'motor',
      ageBracketMinMonths: 24,
      ageBracketMaxMonths: 36,
      titleAr: 'المشي المستقل عبر الغرفة',
      titleEn: 'Independent Walking Across Room',
      descriptionAr: 'يمشي بمفرده دون مساعدة أو مسك بالأيدي لمسافة لا تقل عن 10 خطوات.',
      descriptionEn: 'Walks independently across the room without assistance or holding hands for at least 10 steps.',
      isMandatoryClinicalCheck: false,
    },

    // ── Speech & Language Domain ──
    {
      domain: 'speech_language',
      ageBracketMinMonths: 0,
      ageBracketMaxMonths: 12,
      titleAr: 'المناغاة والاستجابة للنداء بالاسم',
      titleEn: 'Babbling & Orienting to Name',
      descriptionAr: 'يصدر أصوات مناغاة متكررة (با-با، دا-دا) ويلتفت لمصدر الصوت عند مناداته باسمه.',
      descriptionEn: 'Produces repetitive vowel-consonant babbling sounds and turns head towards voice when called by name.',
      isMandatoryClinicalCheck: false,
    },
    {
      domain: 'speech_language',
      ageBracketMinMonths: 12,
      ageBracketMaxMonths: 24,
      titleAr: 'استخدام الإشارات والكلمات المفردة (3-5 كلمات)',
      titleEn: 'Expressive Single Words or Gestures (3-5 words)',
      descriptionAr: 'يستخدم كلمات وظيفية واضحة أو إشارات ماكاتون لطلب الأشياء الأساسية (ماما، بابا، ماء، باي).',
      descriptionEn: 'Uses at least 3-5 consistent functional words or Makaton signs to request desired items.',
      isMandatoryClinicalCheck: false,
    },
    {
      domain: 'speech_language',
      ageBracketMinMonths: 24,
      ageBracketMaxMonths: 36,
      titleAr: 'تركيب جملة من كلمتين (مثل: عايز ماء)',
      titleEn: 'Two-Word Phrase Combinations',
      descriptionAr: 'يركب جملة بسيطة مكونة من كلمتين للتعبير عن احتياجاته ورغباته.',
      descriptionEn: 'Combines two words meaningfully (e.g. "want water", "more milk") to communicate.',
      isMandatoryClinicalCheck: false,
    },

    // ── Cognitive Domain ──
    {
      domain: 'cognitive',
      ageBracketMinMonths: 6,
      ageBracketMaxMonths: 18,
      titleAr: 'مفهوم بقاء الأشياء والبحث عن لعبة مخفية',
      titleEn: 'Object Permanence & Searching for Hidden Toys',
      descriptionAr: 'يبحث بنشاط عن لعبة مغطاة جزئياً أو كلياً تحت قطعة قماش.',
      descriptionEn: 'Actively searches for and uncovers a toy hidden under a small cloth or blanket.',
      isMandatoryClinicalCheck: false,
    },
    {
      domain: 'cognitive',
      ageBracketMinMonths: 18,
      ageBracketMaxMonths: 36,
      titleAr: 'مطابقة الأشكال والألوان الأساسية',
      titleEn: 'Shape Sorting & Basic Color Matching',
      descriptionAr: 'يضع الأشكال الهندسية (الدائرة والمربع) في صندوق الأشكال بنجاح.',
      descriptionEn: 'Successfully places circular and square pegs into matching holes in a shape sorter.',
      isMandatoryClinicalCheck: false,
    },

    // ── Health Supervision Checks (Mandatory AAP Guidelines) ──
    {
      domain: 'health_check',
      ageBracketMinMonths: 0,
      ageBracketMaxMonths: 2,
      titleAr: 'فحص إيكو القلب الشامل لحديثي الولادة (Echocardiogram)',
      titleEn: 'Neonatal Screening Echocardiogram for Congenital Heart Defects',
      descriptionAr: 'فحص تصويري بالموجات فوق الصوتية للقلب للكشف المبكر عن عيوب القناة الأذينية البطينية (AVSD) أو VSD.',
      descriptionEn: 'Mandatory cardiac echocardiography performed by a pediatric cardiologist to screen for AVSD/VSD.',
      isMandatoryClinicalCheck: true,
    },
    {
      domain: 'health_check',
      ageBracketMinMonths: 6,
      ageBracketMaxMonths: 12,
      titleAr: 'تحليل وظائف الغدة الدرقية السنوي (TSH & Free T4)',
      titleEn: 'Annual Thyroid Function Screening (TSH & FT4)',
      descriptionAr: 'تحليل دم للتأكد من عدم وجود قصور الغدة الدرقية المناعي أو الخلقي.',
      descriptionEn: 'Blood serum screen for primary or subclinical hypothyroidism, recommended annually.',
      isMandatoryClinicalCheck: true,
    },
    {
      domain: 'health_check',
      ageBracketMinMonths: 12,
      ageBracketMaxMonths: 18,
      titleAr: 'فحص السمع السريري وتخطيط طبلة الأذن (Audiology Screen)',
      titleEn: 'Pediatric Audiology Screen & Tympanometry',
      descriptionAr: 'فحص الأذن والسمع نظراً لارتفاع احتمالية ارتشاح خلف طبلة الأذن وضيق القنوات السمعية.',
      descriptionEn: 'Comprehensive hearing assessment to screen for chronic serous otitis media and conductive hearing loss.',
      isMandatoryClinicalCheck: true,
    },
    {
      domain: 'health_check',
      ageBracketMinMonths: 24,
      ageBracketMaxMonths: 36,
      titleAr: 'فحص قاع العين وتقييم الاستجماتيزم وضعف الإبصار',
      titleEn: 'Pediatric Ophthalmology Screen for Refractive Errors & Strabismus',
      descriptionAr: 'فحص عيون متخصص لكشف الاستجماتيزم وعيوب الإبصار أو عتامة عدسة العين الخلقي المبكر.',
      descriptionEn: 'Comprehensive eye examination by a pediatric ophthalmologist for strabismus, nystagmus, and cataracts.',
      isMandatoryClinicalCheck: true,
    },
  ];

  for (const m of milestones) {
    const existing = await prisma.milestoneCatalog.findFirst({
      where: {
        moduleDisease: 'Down Syndrome',
        domain: m.domain,
        titleEn: m.titleEn,
      },
    });

    if (!existing) {
      await prisma.milestoneCatalog.create({
        data: {
          moduleDisease: 'Down Syndrome',
          ...m,
        },
      });
    }
  }

  // 2. Seed Partner Doctors
  console.log('Seeding Partner Doctor Profiles...');

  const doctorUsers = [
    {
      email: 'dr.hany.mostafa@downplus.health',
      phone: '+201011112233',
      fullName: 'د. هاني مصطفى',
      specialty: 'استشاري تأهيل وعلاج طبيعي للأطفال',
      city: 'الجيزة',
      state: 'Giza',
      consultationFee: 400.0,
      expYears: 16,
      dsScore: 4.95,
      tags: ['hypotonia', 'early_intervention', 'balance_training', 'SMOs', 'gait_analysis'],
    },
    {
      email: 'dr.nouran.elmasry@downplus.health',
      phone: '+201022223344',
      fullName: 'د. نورهان المصري',
      specialty: 'أخصائية تخاطب وتعديل سلوك أطفال',
      city: 'القاهرة',
      state: 'Cairo',
      consultationFee: 350.0,
      expYears: 11,
      dsScore: 4.88,
      tags: ['speech_delay', 'swallowing_issues', 'oral_motor', 'apraxia', 'early_intervention', 'makaton'],
    },
    {
      email: 'dr.tarek.khalil@downplus.health',
      phone: '+201033334455',
      fullName: 'أ.د. عادل خليل',
      specialty: 'استشاري مخ وأعصاب أطفال',
      city: 'الجيزة',
      state: 'Giza',
      consultationFee: 650.0,
      expYears: 24,
      dsScore: 4.98,
      tags: ['neurology', 'hypotonia', 'atlantoaxial_instability', 'epilepsy', 'developmental_delay'],
    },
    {
      email: 'dr.sarah.elmenshawy@downplus.health',
      phone: '+201044445566',
      fullName: 'د. سارة المنشاوي',
      specialty: 'استشاري قلب أطفال - مستشفى أبو الريش',
      city: 'القاهرة',
      state: 'Cairo',
      consultationFee: 500.0,
      expYears: 18,
      dsScore: 4.99,
      tags: ['pediatric_cardiology', 'congenital_heart_defects', 'vsd_followup', 'echocardiogram'],
    },
  ];

  const defaultPasswordHash = await bcrypt.hash('DoctorPass2026!', 10);

  for (const doc of doctorUsers) {
    let user = await prisma.user.findUnique({ where: { email: doc.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: doc.email,
          phoneNumber: doc.phone,
          passwordHash: defaultPasswordHash,
          role: UserRole.doctor,
          isVerified: true,
        },
      });

      await prisma.doctorProfile.create({
        data: {
          userId: user.id,
          fullName: doc.fullName,
          medicalLicenseNumber: \`EGY-MED-\${Math.floor(10000 + Math.random() * 90000)}\`,
          specialty: doc.specialty,
          city: doc.city,
          governorateOrState: doc.state,
          consultationFee: doc.consultationFee,
          experienceYearsPediatric: doc.expYears,
          downSyndromeExperienceScore: doc.dsScore,
          tags: doc.tags,
          isActive: true,
        },
      });
    }
  }

  // 3. Seed Demo Parent User & Child with Baseline
  console.log('Seeding Demo Parent and Child Profile...');

  const parentEmail = 'parent.demo@downplus.health';
  let demoParent = await prisma.user.findUnique({ where: { email: parentEmail } });

  if (!demoParent) {
    demoParent = await prisma.user.create({
      data: {
        email: parentEmail,
        phoneNumber: '+201099998877',
        passwordHash: await bcrypt.hash('ParentPass2026!', 10),
        role: UserRole.parent,
        isVerified: true,
        subscription: {
          create: {
            tier: SubscriptionTier.premium_monthly,
            status: 'active',
          },
        },
      },
    });

    const demoChild = await prisma.child.create({
      data: {
        parentId: demoParent.id,
        firstName: 'عمر',
        lastName: 'أحمد محمود',
        dateOfBirth: new Date('2024-03-15'),
        gender: 'male',
        bloodType: 'O+',
        clinicalProfile: {
          create: {
            primaryDiagnosis: 'Down Syndrome',
            karyotypeType: 'Trisomy 21',
            gestationalAgeWeeks: 38,
            birthWeightKg: 3.1,
            comorbidities: ['Congenital Heart Defect (Repaired VSD at Abu El-Reesh)', 'Controlled Hypothyroidism'],
          },
        },
        caseBaseline: {
          create: {
            status: 'confirmed_by_doctor',
            aiGeneratedSummary: {
              extracted_conditions: ['Trisomy 21 (Free Standard)', 'Controlled Hypothyroidism', 'Repaired VSD'],
              current_medications: [
                {
                  drug: 'Eltroxin',
                  dosage: '25 mcg',
                  frequency: 'Once daily morning fasting',
                },
              ],
              identified_strengths: [
                'High social engagement, eye contact, and cheerful temperament',
                'Visual imitation and gesture responsiveness well-established',
              ],
              priority_clinical_needs: [
                'Routine annual thyroid panel (TSH/FT4)',
                'Physical therapy for trunk hypotonia and ankle stability (SMOs)',
                'Makaton functional gesture training for early speech initiation',
              ],
              growth_metrics: {
                weight_kg: 12.4,
                height_cm: 84.2,
                head_circumference_cm: 47.1,
                growth_percentile_curves: 'Zemel et al. AAP Pediatrics 2015',
              },
            },
            doctorNotes: 'تمت مراجعة خط الأساس الطبي واعتماده رسمياً. فحص الإيكو ووظائف الغدة طبيعية ومستقرة.',
          },
        },
      },
    });

    console.log(\`Created demo child: \${demoChild.firstName} (\${demoChild.id})\`);
  }

  console.log('✓ Down Plus Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

fs.writeFileSync(path.resolve(__dirname, '../apps/api/prisma/seed.ts'), seedContent, 'utf8');
console.log('Successfully updated apps/api/prisma/seed.ts with clean UTF-8 Arabic content.');
