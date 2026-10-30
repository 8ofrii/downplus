import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import { Colors, Shadows } from '../../constants/theme';

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

const INITIAL_SKILLS: Milestone[] = [
  {
    id: 'm1',
    domain: 'gross_motor',
    domainLabel: 'حركي كبير',
    title: 'الجلوس المستقل دون مساعدة ويداه حرتان',
    desc: 'يجلس على الأرض بمفرده وتوازنه مستقر أثناء اللعب بالكرات أو المكعبات.',
    status: 'independent',
    ageRange: '9 - 14 شهراً',
    tips: 'تم الإتقان بالكامل! حافظ على ألعاب تقوية عضلات الجذع (Core stability).',
  },
  {
    id: 'm2',
    domain: 'gross_motor',
    domainLabel: 'حركي كبير',
    title: 'المشي بالاستناد على الأثاث (Cruising)',
    desc: 'يتحرك بخطوات جانبية واثقة مستنداً على الأريكة أو الطاولة المنخفضة.',
    status: 'with_assistance',
    ageRange: '15 - 24 شهراً',
    tips: 'ضع ألعاباً جذابة على مسافات قصيرة لتشجيعه على نقل وزنه بين القدمين.',
  },
  {
    id: 'm3',
    domain: 'gross_motor',
    domainLabel: 'حركي كبير',
    title: 'المشي المستقل 10 خطوات متتالية',
    desc: 'يمشي بمفرده عبر الغرفة دون مسك الأيدي بتوازن ثابت.',
    status: 'not_started',
    ageRange: '20 - 32 شهراً',
    tips: 'استخدم مشاية الدفع الموزونة (Push walker) لتدريب توازن القدمين.',
  },
  {
    id: 'f1',
    domain: 'fine_motor',
    domainLabel: 'حركي دقيق',
    title: 'الشرب المستقل من كوب صغير بكلتا اليدين',
    desc: 'يرفع الكوب الصغير لفمه ويرتشف الماء دون انسكاب ويعيده للطاولة.',
    status: 'with_assistance',
    ageRange: '18 - 28 شهراً',
    tips: 'هدف الأسبوع الحالي! ابدأ بكميات صغيرة من الماء الدافئ أو العصير الخفيف.',
  },
  {
    id: 's1',
    domain: 'speech',
    domainLabel: 'تخاطب وتواصل',
    title: 'استخدام 5 كلمات وإشارات وظيفية (ماما، ماء، باي)',
    desc: 'يوظف الكلمات أو إشارات Makaton للتعبير عن الاحتياج ورغباته اليومية.',
    status: 'independent',
    ageRange: '16 - 26 شهراً',
    tips: 'كرر أسماء الأشياء بإيقاع نغمي بطيء مع التواصل البصري المستمر.',
  },
  {
    id: 's2',
    domain: 'speech',
    domainLabel: 'تخاطب وتواصل',
    title: 'تركيب جملة من كلمتين (عايز ماء / هات كرة)',
    desc: 'يجمع بين كلمتين أو إشارة وكلمة للتعبير عن فكرة متكاملة.',
    status: 'not_started',
    ageRange: '24 - 36 شهراً',
    tips: 'شجعه بانتظار الإشارة والكلمة قبل تلبية الطلب لبناء الدافع التواصلي.',
  },
  {
    id: 'c1',
    domain: 'self_care',
    domainLabel: 'رعاية ذاتية',
    title: 'المشاركة في خلع الجوارب والحذاء ذي اللاصق',
    desc: 'يمسك بلاصق الحذاء ويفتحه ثم يخلع الحذاء بمفرده عند الوصول للمنزل.',
    status: 'independent',
    ageRange: '18 - 30 شهراً',
    tips: 'عزز حس الاستقلالية ومدحه فور إتمام الخطوة بنجاح.',
  },
];

export default function MilestonesScreen() {
  const [skills, setSkills] = useState<Milestone[]>(INITIAL_SKILLS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [celebrateModal, setCelebrateModal] = useState<Milestone | null>(null);

  const toggleSkillStatus = (id: string) => {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (s.status === 'not_started') return { ...s, status: 'with_assistance' };
        if (s.status === 'with_assistance') {
          setCelebrateModal(s);
          return { ...s, status: 'independent' };
        }
        return { ...s, status: 'not_started' };
      }),
    );
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
            { key: 'gross_motor', label: '🏃 حركي كبير' },
            { key: 'fine_motor', label: '✋ حركي دقيق' },
            { key: 'speech', label: '🗣️ تخاطب وتواصل' },
            { key: 'self_care', label: '🥣 رعاية ذاتية' },
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
});
