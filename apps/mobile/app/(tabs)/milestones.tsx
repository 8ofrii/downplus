import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Colors, Shadows } from '../../constants/theme';
import { api } from '../../services/api';

interface Milestone {
  id: string;
  domain: string;
  domainLabel: string;
  title: string;
  desc: string;
  status: 'independent' | 'with_assistance' | 'not_started';
  ageRange: string;
  tips: string;
}

interface MakatonSign {
  id: string;
  nameAr: string;
  nameEn: string;
  emoji: string;
  gestureDescription: string;
  soundPrompt: string;
  parentTip: string;
}

const MAKATON_SIGNS: MakatonSign[] = [
  {
    id: 'm-water',
    nameAr: 'ماء / عصير',
    nameEn: 'Water / Drink',
    emoji: '💧',
    gestureDescription: 'ضم الأصابع كأنك تمسك كوباً ورفعه بالقرب من الشفاه مع إمالة خفيفة.',
    soundPrompt: 'قول كلمة "ماااا" بنبرة واضحة وممتدة مع الإشارة.',
    parentTip: 'استخدم الإشارة دائماً قبل تقديم الماء للطفل وانتظر ثوانٍ ليعيدها.',
  },
  {
    id: 'm-eat',
    nameAr: 'أكل / طعام',
    nameEn: 'Eat / Food',
    emoji: '🥣',
    gestureDescription: 'تقريب أطراف أصابع اليد الواحدة إلى الفم مرتين متتاليتين.',
    soundPrompt: 'تكرار صوت "مممم" أو "هممم" بصوت مشجع.',
    parentTip: 'تساعد الإشارة في تقليل نوبات الغضب الناتجة عن الجوع غير المعبر عنه.',
  },
  {
    id: 'm-more',
    nameAr: 'المزيد / كمان',
    nameEn: 'More',
    emoji: '➕',
    gestureDescription: 'ضم أطراف أصابع اليدين معاً وضرب أطرافهما ببعض في المنتصف.',
    soundPrompt: 'نطق كلمة "كـ-مااان" مع فتح العينين بدهشة.',
    parentTip: 'إشارة سحرية لطلب استمرار اللعبة المفضلة أو المزيد من البسكويت.',
  },
  {
    id: 'm-help',
    nameAr: 'مساعدة / ساعدني',
    nameEn: 'Help',
    emoji: '🤲',
    gestureDescription: 'وضع اليد اليمنى بقبضة مغلقة فوق راحة اليد اليسرى المفتوحة ورفعهما معاً قليلاً.',
    soundPrompt: 'قول كلمة "ساعدني" أو "أساعدك؟".',
    parentTip: 'تمنع الإحباط عند مواجهة صعوبة في فتح علبة الألعاب أو ارتداء الحذاء.',
  },
  {
    id: 'm-sleep',
    nameAr: 'نوم / نعسان',
    nameEn: 'Sleep / Bedtime',
    emoji: '🛏️',
    gestureDescription: 'ضم كفي اليدين معاً ووضعهما على جانب الخد مع إمالة الرأس بلطف.',
    soundPrompt: 'همس هادئ "يلا ناااام".',
    parentTip: 'كررها في روتين ما قبل النوم اليومي لتهدئة الجهاز العصبي.',
  },
  {
    id: 'm-play',
    nameAr: 'لعب / لعبة',
    nameEn: 'Play',
    emoji: '🧸',
    gestureDescription: 'تحريك الكفين المفتوحين بحركة دائرية مرحة أمام الصدر.',
    soundPrompt: 'نبرة حماسية: "نلعب؟ كورة!".',
    parentTip: 'تخلق دافعاً فورياً للتواصل البصري والتفاعل التشاركي.',
  },
  {
    id: 'm-stop',
    nameAr: 'توقف / خلاص / بس',
    nameEn: 'Stop / Finished',
    emoji: '🛑',
    gestureDescription: 'مد اليد المفتوحة للأمام مع بسط الأصابع أو نفض اليدين للخارج.',
    soundPrompt: 'حزم لطيف: "خلاااص، بس".',
    parentTip: 'تعطي الطفل سلطة التعبير عن الرفض بأمان دون صراخ.',
  },
  {
    id: 'm-bye',
    nameAr: 'باي / مع السلامة',
    nameEn: 'Goodbye / Wave',
    emoji: '👋',
    gestureDescription: 'رفع اليد وفتح الأصابع وغلقها أو التلويح يميناً ويساراً.',
    soundPrompt: 'نغمة محببة: "بااااي".',
    parentTip: 'أسهل إشارة اجتماعية لبناء الثقة والتفاعل مع الأقارب والضيوف.',
  },
];

const INITIAL_SKILLS: Milestone[] = [
  {
    id: '85ff9210-2253-45cf-8d9a-23b413a7cec8',
    domain: 'motor',
    domainLabel: '🏃 حركي كبير',
    title: 'الجلوس المستقل دون مساعدة ويداه حرتان',
    desc: 'يجلس على الأرض بمفرده وتوازنه مستقر أثناء اللعب بالكرات أو المكعبات.',
    status: 'independent',
    ageRange: '6 - 12 شهراً',
    tips: 'تم الإتقان بالكامل! حافظ على ألعاب تقوية عضلات الجذع (Core stability).',
  },
  {
    id: '9013c84b-2e44-45fc-905f-095017ac7dd3',
    domain: 'motor',
    domainLabel: '🏃 حركي كبير',
    title: 'الوقوف والمشي بالاستناد على الأثاث (Cruising)',
    desc: 'يقف مستنداً على الطاولة أو الأريكة ويتحرك بخطوات جانبية واثقة.',
    status: 'with_assistance',
    ageRange: '12 - 24 شهراً',
    tips: 'ضع ألعاباً جذابة على مسافات قصيرة لتشجيعه على نقل وزنه بين القدمين.',
  },
  {
    id: 'c0f439ae-3d54-4752-a887-6c4a3f7cdf5c',
    domain: 'motor',
    domainLabel: '🏃 حركي كبير',
    title: 'المشي المستقل عبر الغرفة دون مساعدة',
    desc: 'يمشي بمفرده دون مسك الأيدي لمسافة لا تقل عن 10 خطوات متتالية بتوازن.',
    status: 'not_started',
    ageRange: '24 - 36 شهراً',
    tips: 'استخدم مشاية الدفع الموزونة (Push walker) لتدريب توازن عضلات الحوض.',
  },
  {
    id: 'b6d0bd40-0125-4203-b2f0-b353ca96a911',
    domain: 'self_care',
    domainLabel: '🥣 رعاية ذاتية',
    title: 'الشرب المستقل من كوب صغير بكلتا اليدين',
    desc: 'يرفع الكوب الصغير لفمه ويرتشف الماء دون انسكاب ويعيده للطاولة.',
    status: 'with_assistance',
    ageRange: '15 - 26 شهراً',
    tips: 'هدف الأسبوع الحالي! ابدأ بكميات صغيرة من الماء الدافئ في كوب سيليكون خفيف.',
  },
  {
    id: 'f1a17531-7b0a-488f-ade1-cc07cb5a0ea1',
    domain: 'self_care',
    domainLabel: '🥣 رعاية ذاتية',
    title: 'المشاركة في خلع الجوارب والحذاء ذي اللاصق',
    desc: 'يمسك بلاصق الحذاء ويفتحه ثم يخلع الحذاء والجوارب بمفرده عند العودة للمنزل.',
    status: 'independent',
    ageRange: '18 - 30 شهراً',
    tips: 'عزز حس الاستقلالية وامتدحه فور إتمام الخطوة بنجاح لبناء الثقة الذاتية.',
  },
  {
    id: 'f439edc9-7f4f-47f0-9180-b67339c7e946',
    domain: 'speech_language',
    domainLabel: '🗣️ تخاطب وتواصل',
    title: 'استخدام 3-5 كلمات وإشارات وظيفية للتعبير',
    desc: 'يوظف كلمات واضحة أو إشارات Makaton للطلب والتعبير (ماما، بابا، ماء، باي).',
    status: 'independent',
    ageRange: '12 - 24 شهراً',
    tips: 'كرر أسماء الأشياء بإيقاع نغمي هادئ وبطيء مع تعزيز التواصل البصري المستمر.',
  },
  {
    id: '2cb92649-617c-43df-9d6f-d99d86dcf0b8',
    domain: 'speech_language',
    domainLabel: '🗣️ تخاطب وتواصل',
    title: 'تركيب جملة من كلمتين (مثل: عايز ماء / هات كرة)',
    desc: 'يجمع بين كلمتين أو إشارة وكلمة للتعبير عن فكرة متكاملة واحتياج فوري.',
    status: 'not_started',
    ageRange: '24 - 36 شهراً',
    tips: 'شجعه بانتظار الإشارة والكلمة قبل تلبية الطلب لبناء الدافع التواصلي.',
  },
  {
    id: 'fb7dc121-1bd5-4926-9a71-219ae6730f91',
    domain: 'cognitive',
    domainLabel: '🧩 إدراكي ومعرفي',
    title: 'مفهوم ثبات الأشياء والبحث عن لعبة مخفية',
    desc: 'يبحث بنشاط عن لعبة مغطاة جزئياً أو كلياً تحت قطعة قماش أو صندوق.',
    status: 'independent',
    ageRange: '6 - 18 شهراً',
    tips: 'لعبة الاختباء وتغطية الألعاب تطور التركيز البصري والذاكرة العاملة للطفل.',
  },
  {
    id: '18586387-76fa-4a84-8501-66ffca47f619',
    domain: 'health_check',
    domainLabel: '🩺 فحص طبي AAP',
    title: 'تحليل وظائف الغدة الدرقية السنوي (TSH & Free T4)',
    desc: 'فحص دم سريري دوري للتأكد من سلامة الغدة الدرقية حسب توصيات AAP.',
    status: 'with_assistance',
    ageRange: 'سنوي (مستحق الآن)',
    tips: 'مستحق في عمر 30-36 شهراً — موعد الفحص مجدول خلال الأسبوع القادم.',
  },
];

export default function MilestonesScreen() {
  const [skills, setSkills] = useState<Milestone[]>(INITIAL_SKILLS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [celebrateModal, setCelebrateModal] = useState<Milestone | null>(null);
  const [makatonModalVisible, setMakatonModalVisible] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  useEffect(() => {
    // Sync with backend on mount
    const fetchProgress = async () => {
      try {
        const progressList = await api.getMilestones(api.getActiveChildId());
        if (Array.isArray(progressList) && progressList.length > 0) {
          setSkills((prev) =>
            prev.map((s) => {
              const found = progressList.find(
                (p: any) => p.milestoneId === s.id || p.milestone?.id === s.id,
              );
              if (found && found.status) {
                return { ...s, status: found.status };
              }
              return s;
            }),
          );
        }
      } catch {
        // Fallback to initial local state seamlessly
      }
    };
    fetchProgress();
  }, []);

  const toggleSkillStatus = async (id: string) => {
    const current = skills.find((s) => s.id === id);
    if (!current) return;

    let nextStatus: 'independent' | 'with_assistance' | 'not_started' = 'with_assistance';
    if (current.status === 'not_started') {
      nextStatus = 'with_assistance';
    } else if (current.status === 'with_assistance') {
      nextStatus = 'independent';
      setCelebrateModal(current);
    } else {
      nextStatus = 'not_started';
    }

    // Optimistic UI update
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, status: nextStatus } : s)));

    // Background backend sync
    try {
      setSyncingId(id);
      await api.updateMilestone(api.getActiveChildId(), id, nextStatus);
    } catch (e) {
      console.log('Syncing milestone update to backend:', e);
    } finally {
      setSyncingId(null);
    }
  };

  const filteredSkills =
    activeFilter === 'all' ? skills : skills.filter((s) => s.domain === activeFilter);

  const completedCount = skills.filter((s) => s.status === 'independent').length;
  const inProgressCount = skills.filter((s) => s.status === 'with_assistance').length;
  const progressPercent = Math.round((completedCount / skills.length) * 100);

  return (
    <View style={styles.container}>
      {/* Ambient background glow */}
      <View style={styles.ambientContainer} pointerEvents="none">
        <View style={[styles.ambientOrb, styles.orbTop]} />
        <View style={[styles.ambientOrb, styles.orbBottom]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ── 1. Serene Independence Progress Arc Card ── */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTopRow}>
            <View>
              <Text style={styles.summarySub}>سلم الاستقلالية النمائي • AAP Pediatric Model</Text>
              <Text style={styles.summaryTitle}>خارطة مهارات عمر (31 شهراً)</Text>
            </View>
            <View style={styles.percentBadge}>
              <Text style={styles.percentText}>{progressPercent}%</Text>
            </View>
          </View>

          {/* Progress bar with glowing end */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{completedCount}</Text>
              <Text style={styles.statDesc}>مستقل بالكامل ✅</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNum, { color: Colors.secondary }]}>{inProgressCount}</Text>
              <Text style={styles.statDesc}>قيد التدريب ⏳</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNum, { color: Colors.tertiary }]}>
                {skills.length - completedCount - inProgressCount}
              </Text>
              <Text style={styles.statDesc}>الهدف القادم 🎯</Text>
            </View>
          </View>
        </View>

        {/* ── 2. Domain Filter Pills ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {[
            { key: 'all', label: 'كافة المهارات (الكل)' },
            { key: 'motor', label: '🏃 حركي' },
            { key: 'self_care', label: '🥣 رعاية ذاتية' },
            { key: 'speech_language', label: '🗣️ تخاطب وتواصل' },
            { key: 'cognitive', label: '🧩 إدراكي ومعرفي' },
            { key: 'health_check', label: '🩺 فحوصات AAP' },
          ].map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[styles.filterPill, activeFilter === f.key && styles.filterPillActive]}
              onPress={() => setActiveFilter(f.key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === f.key && styles.filterPillTextActive,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── 2.5 Makaton Functional Sign Language Banner ── */}
        <TouchableOpacity
          style={styles.makatonBanner}
          onPress={() => setMakatonModalVisible(true)}
          activeOpacity={0.85}
        >
          <View style={styles.makatonBannerLeft}>
            <View style={styles.makatonIconBox}>
              <Text style={{ fontSize: 20 }}>🗣️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.makatonBannerTitle}>دليل إشارات ماكاتون الوظيفية (Makaton)</Text>
              <Text style={styles.makatonBannerSub}>
                8 إشارات بصرية مبكرة لتعزيز النطق وتقليل نوبات الغضب
              </Text>
            </View>
          </View>
          <Text style={styles.makatonBannerArrow}>استعراض ❯</Text>
        </TouchableOpacity>

        {/* ── 3. Milestone Ladder Cards ── */}
        <View style={styles.skillsList}>
          {filteredSkills.map((skill) => (
            <View key={skill.id} style={styles.skillCard}>
              <View style={styles.skillCardHeader}>
                <View style={styles.domainTag}>
                  <Text style={styles.domainTagText}>{skill.domainLabel}</Text>
                  <Text style={styles.ageTagText}>• {skill.ageRange}</Text>
                </View>

                {/* Status Toggle Button */}
                <TouchableOpacity
                  style={[
                    styles.statusPill,
                    skill.status === 'independent' && styles.statusIndependent,
                    skill.status === 'with_assistance' && styles.statusAssistance,
                    skill.status === 'not_started' && styles.statusNotStarted,
                  ]}
                  onPress={() => toggleSkillStatus(skill.id)}
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      styles.statusPillText,
                      skill.status === 'independent' && styles.statusTextIndependent,
                      skill.status === 'with_assistance' && styles.statusTextAssistance,
                      skill.status === 'not_started' && styles.statusTextNotStarted,
                    ]}
                  >
                    {skill.status === 'independent' && 'مستقل بالكامل ✅'}
                    {skill.status === 'with_assistance' && 'بمساعدة تدريبية ⏳'}
                    {skill.status === 'not_started' && 'لم تبدأ بعد ⭕'}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.skillTitle}>{skill.title}</Text>
              <Text style={styles.skillDesc}>{skill.desc}</Text>

              {/* Clinical Pediatric Tip */}
              <View style={styles.tipBox}>
                <Text style={styles.tipIcon}>💡</Text>
                <Text style={styles.tipText}>{skill.tips}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Space at bottom for floating tab bar */}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* ── Celebration Milestone Accomplished Modal ── */}
      <Modal visible={celebrateModal !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.celebrateCard}>
            <Text style={{ fontSize: 44, textAlign: 'center' }}>🎉</Text>
            <Text style={styles.celebrateTitle}>إنجاز رائع لعمر!</Text>
            <Text style={styles.celebrateSub}>
              تم بنجاح تسجيل مهارة: "{celebrateModal?.title}" كمهارة مستقلة بنجاح، وتمت إضافتها لجواز الحياة السريري.
            </Text>
            <TouchableOpacity
              style={styles.celebrateBtn}
              onPress={() => setCelebrateModal(null)}
            >
              <Text style={styles.celebrateBtnText}>متابعة التقدم والتأهيل 🚀</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Makaton Functional Sign Language Modal ── */}
      <Modal visible={makatonModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.makatonModalCard}>
            <View style={styles.makatonHeaderRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.makatonModalTitle}>قاموس إشارات ماكاتون الوظيفية 🗣️</Text>
                <Text style={styles.makatonModalSub}>
                  لغة التواصل البصري المعززة للنطق المبكر لمتلازمة داون
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setMakatonModalVisible(false)}
                style={styles.makatonCloseBtn}
              >
                <Text style={styles.makatonCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 460 }}>
              {MAKATON_SIGNS.map((item) => (
                <View key={item.id} style={styles.makatonCard}>
                  <View style={styles.makatonCardTop}>
                    <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
                    <View style={{ flex: 1, marginRight: 10 }}>
                      <Text style={styles.makatonCardTitle}>{item.nameAr}</Text>
                      <Text style={styles.makatonCardEn}>{item.nameEn}</Text>
                    </View>
                  </View>

                  <View style={styles.makatonStepBox}>
                    <Text style={styles.makatonStepLabel}>طريقة الحركة:</Text>
                    <Text style={styles.makatonStepText}>{item.gestureDescription}</Text>
                  </View>

                  <View style={styles.makatonSoundBox}>
                    <Text style={styles.makatonSoundLabel}>الصوت المنطوق المتزامن:</Text>
                    <Text style={styles.makatonSoundText}>{item.soundPrompt}</Text>
                  </View>

                  <Text style={styles.makatonTipText}>💡 {item.parentTip}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.makatonDoneBtn}
              onPress={() => setMakatonModalVisible(false)}
            >
              <Text style={styles.makatonDoneBtnText}>إغلاق القاموس</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.canvasBase,
  },
  ambientContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  ambientOrb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orbTop: {
    top: -40,
    left: -40,
    width: 280,
    height: 280,
    backgroundColor: Colors.orbSky,
  },
  orbBottom: {
    bottom: 120,
    right: -50,
    width: 260,
    height: 260,
    backgroundColor: Colors.orbEmerald,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    gap: 16,
  },

  // Summary Card
  summaryCard: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    gap: 14,
    ...Shadows.glassElevated,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summarySub: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  percentBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    ...Shadows.glowPrimary,
  },
  percentText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: Colors.canvasBase,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 4,
  },
  statBox: {
    alignItems: 'center',
  },
  statNum: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  statDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },

  // Filters
  filterScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  filterPill: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderColor: Colors.glassBorder,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },

  // Skill Card
  skillsList: {
    gap: 14,
  },
  skillCard: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 26,
    padding: 18,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    gap: 10,
    ...Shadows.glass,
  },
  skillCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  domainTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  domainTagText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.secondary,
  },
  ageTagText: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusIndependent: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primaryFixed,
  },
  statusAssistance: {
    backgroundColor: Colors.tertiaryLight,
    borderColor: Colors.tertiaryFixed,
  },
  statusNotStarted: {
    backgroundColor: Colors.canvasBase,
    borderColor: Colors.borderLight,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  statusTextIndependent: {
    color: Colors.primary,
  },
  statusTextAssistance: {
    color: Colors.tertiary,
  },
  statusTextNotStarted: {
    color: Colors.textTertiary,
  },
  skillTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  skillDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  tipBox: {
    backgroundColor: Colors.glassSurfaceSubtle,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.glassBorderSubtle,
  },
  tipIcon: {
    fontSize: 16,
  },
  tipText: {
    fontSize: 12,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 30, 26, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  celebrateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 28,
    alignItems: 'center',
    gap: 14,
    ...Shadows.glassElevated,
  },
  celebrateTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    textAlign: 'center',
  },
  celebrateSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  celebrateBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginTop: 6,
    ...Shadows.glowPrimary,
  },
  celebrateBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  // ── Makaton Styles ──
  makatonBanner: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  makatonBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  makatonIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  makatonBannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E40AF',
  },
  makatonBannerSub: {
    fontSize: 11,
    color: '#3B82F6',
    marginTop: 2,
  },
  makatonBannerArrow: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginLeft: 8,
  },

  // Makaton Modal
  makatonModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    width: '100%',
    maxHeight: '85%',
  },
  makatonHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
  },
  makatonModalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  makatonModalSub: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  makatonCloseBtn: {
    padding: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 999,
  },
  makatonCloseText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  makatonCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  makatonCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  makatonCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  makatonCardEn: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  makatonStepBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  makatonStepLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 2,
  },
  makatonStepText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
  },
  makatonSoundBox: {
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  makatonSoundLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 2,
  },
  makatonSoundText: {
    fontSize: 12,
    color: '#047857',
    fontWeight: '700',
  },
  makatonTipText: {
    fontSize: 11,
    color: '#64748B',
    fontStyle: 'italic',
  },
  makatonDoneBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  makatonDoneBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
});
