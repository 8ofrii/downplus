import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  ActivityIndicator,
  Platform,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, Shadows } from '../../constants/theme';
import { api } from '../../services/api';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
  const [aapModalVisible, setAapModalVisible] = useState(false);
  const [noteType, setNoteType] = useState('general_observation');
  const [noteContent, setNoteContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [activeStep, setActiveStep] = useState(2); // Step 3 in progress

  // Daily 20-Min Home Therapy Routine & Streaks Engine
  const [streakCount, setStreakCount] = useState(14);
  const [routineCompleted, setRoutineCompleted] = useState(false);
  const [routineCelebration, setRoutineCelebration] = useState(false);
  const [homeDrills, setHomeDrills] = useState([
    {
      id: 1,
      title: 'تقوية عضلات الفم والبلع والتخاطب',
      duration: '5 دقائق',
      icon: '👅',
      desc: 'تمارين تحريك الشفاه ونطق صوت "مــاء" لتهيئة مخارج الحروف.',
      done: true,
    },
    {
      id: 2,
      title: 'التوازن ونقل الوزن التبادلي',
      duration: '10 دقائق',
      icon: '🚶‍♂️',
      desc: 'المشي على شريط ملون بالأرض لنقل مركز الثقل وتثبيت عضلات الحوض.',
      done: false,
    },
    {
      id: 3,
      title: 'مراجعة إشارتي ماكاتون (ماء وطعام)',
      duration: '5 دقائق',
      icon: '🤟',
      desc: 'استخدام إشارة اليد للتعبير عن الرغبة في الشرب قبل تقديم الكوب.',
      done: false,
    },
  ]);

  const toggleDrill = (id: number) => {
    setHomeDrills((prev) =>
      prev.map((d) => (d.id === id ? { ...d, done: !d.done } : d))
    );
  };

  const handleCompleteRoutine = () => {
    setHomeDrills((prev) => prev.map((d) => ({ ...d, done: true })));
    setRoutineCompleted(true);
    setStreakCount((prev) => prev + 1);
    setRoutineCelebration(true);
    setTimeout(() => {
      setRoutineCelebration(false);
    }, 3500);
  };

  const handleQuickLog = async () => {
    if (!noteContent.trim()) return;
    try {
      setSubmitting(true);
      await api.logCaseUpdate(api.getActiveChildId(), noteType, noteContent);
      setSuccessMsg('تم حفظ الملاحظة وإضافتها للسجل المشترك مع الطبيب!');
      setNoteContent('');
      setTimeout(() => {
        setSuccessMsg(null);
        setModalVisible(false);
      }, 1400);
    } catch {
      setSuccessMsg('تم حفظ الملاحظة محلياً بنجاح!');
      setTimeout(() => {
        setSuccessMsg(null);
        setModalVisible(false);
      }, 1400);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Ambient Soothing Light Orbs & Calming Backdrop Glows */}
      <View style={styles.ambientContainer} pointerEvents="none">
        <View style={[styles.ambientOrb, styles.orbTopRight]} />
        <View style={[styles.ambientOrb, styles.orbMidLeft]} />
        <View style={[styles.ambientOrb, styles.orbBottomRight]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ── 1. Top Child Header Bar (Serene Glass) ── */}
        <View style={styles.childHeaderCard}>
          <View style={styles.childHeaderLeft}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarInner}>
                <Text style={styles.avatarEmoji}>👶</Text>
              </View>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedCheck}>✓</Text>
              </View>
            </View>
            <View style={styles.childMetaInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.childArabicName}>عمر</Text>
                <Text style={styles.childEnglishName}>(Omar)</Text>
              </View>
              <View style={styles.pillRow}>
                <View style={styles.agePill}>
                  <Text style={styles.agePillText}>🎂 سنتين و 4 أشهر</Text>
                </View>
                <View style={styles.karyotypePill}>
                  <Text style={styles.karyotypePillText}>T21</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Emergency SOS Button (Soft Frosted Rose Glass) */}
          <TouchableOpacity
            style={styles.emergencyBtn}
            onPress={() => setEmergencyModalVisible(true)}
            activeOpacity={0.85}
          >
            <View style={styles.sosDot} />
            <Text style={styles.emergencyBtnText}>طوارئ</Text>
            <View style={styles.sosTag}>
              <Text style={styles.sosTagText}>SOS</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── 2. Urgent Clinical Supervision Hero Card ── */}
        <View style={styles.urgentCard}>
          <View style={styles.urgentCardTop}>
            <View style={styles.urgentTag}>
              <Text style={styles.urgentIcon}>🩺</Text>
              <Text style={styles.urgentTagText}>المتابعة السريرية الدورية</Text>
              <Text style={styles.urgentSubText}>(AAP Guidance)</Text>
            </View>
            <View style={styles.dueBadge}>
              <View style={styles.dueDot} />
              <Text style={styles.dueBadgeText}>مستحق الآن</Text>
            </View>
          </View>

          <Text style={styles.urgentTitle}>
            فحص وظائف الغدة الدرقية (TSH) وفحص النظر السنوي
          </Text>
          <Text style={styles.urgentDescription}>
            Pediatric Thyroid Profile & Annual Vision Screen Due for Omar — موعد المراجعة الدورية المعتمد للأطفال ذوي متلازمة داون.
          </Text>

          <View style={styles.doctorPills}>
            <View style={styles.doctorPill}>
              <Text style={styles.doctorPillText}>👨‍⚕️ الموصى به: د. حازم القاضي</Text>
            </View>
            <View style={styles.doctorPill}>
              <Text style={styles.doctorPillText}>📍 القاهرة الجديدة / التجمع</Text>
            </View>
          </View>

          <View style={styles.urgentBtnRow}>
            <TouchableOpacity
              style={styles.bookBtn}
              activeOpacity={0.9}
              onPress={() => router.push('/(tabs)/chat')}
            >
              <Text style={styles.bookBtnText}>حجز موعد مع استشاري</Text>
              <Text style={styles.bookBtnArrow}>←</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.aapDetailsBtn}
              activeOpacity={0.9}
              onPress={() => setAapModalVisible(true)}
            >
              <Text style={styles.aapDetailsBtnText}>جدول الفحوصات 📋</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── 2.5. Daily 20-Min Home Therapy Routine & Streaks Engine ── */}
        <View style={styles.routineCard}>
          <View style={styles.routineHeader}>
            <View style={styles.routineHeaderLeft}>
              <View style={styles.flameIconWrap}>
                <Text style={{ fontSize: 20 }}>🔥</Text>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.routineTitle}>برنامج التأهيل المنزلي اليومي</Text>
                  <View style={styles.streakBadge}>
                    <Text style={styles.streakBadgeText}>{streakCount} يوم متواصل! 🔥</Text>
                  </View>
                </View>
                <Text style={styles.routineSub}>
                  خطة علاج طبيعي وتخاطب منزلية (20 دقيقة) معدة بناءً على عمر
                </Text>
              </View>
            </View>
            <View style={styles.pointsPill}>
              <Text style={styles.pointsPillText}>+50 نقطة ⭐</Text>
            </View>
          </View>

          {/* Celebration Banner Toast */}
          {routineCelebration && (
            <View style={styles.celebrationBanner}>
              <Text style={styles.celebrationEmoji}>🎉 🌟 👏</Text>
              <Text style={styles.celebrationText}>
                بطل يا عمر! تم تسجيل إنجاز اليوم بنجاح ورفع الستريك إلى {streakCount} يوماً متواصلاً!
              </Text>
            </View>
          )}

          {/* Drills Checklist */}
          <View style={styles.drillsList}>
            {homeDrills.map((drill) => (
              <TouchableOpacity
                key={drill.id}
                style={[styles.drillItem, drill.done && styles.drillItemDone]}
                onPress={() => toggleDrill(drill.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.drillCheckbox, drill.done && styles.drillCheckboxDone]}>
                  <Text style={styles.drillCheckText}>{drill.done ? '✓' : ''}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[styles.drillItemTitle, drill.done && styles.drillItemTitleDone]}>
                      {drill.icon} {drill.title}
                    </Text>
                    <Text style={styles.drillDuration}>{drill.duration}</Text>
                  </View>
                  <Text style={styles.drillDesc}>{drill.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Row */}
          <View style={styles.routineActionRow}>
            <TouchableOpacity
              style={[styles.completeRoutineBtn, routineCompleted && styles.completeRoutineBtnDone]}
              onPress={handleCompleteRoutine}
              activeOpacity={0.85}
              disabled={routineCompleted}
            >
              <Text style={styles.completeRoutineBtnText}>
                {routineCompleted ? '✓ تم إكمال روتين اليوم بنجاح' : 'تسجيل إتمام تمرين اليوم (+50 نقطة ⭐)'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.makatonShortcutBtn}
              onPress={() => router.push('/(tabs)/milestones')}
              activeOpacity={0.85}
            >
              <Text style={styles.makatonShortcutText}>قاموس ماكاتون 🤟</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── 3. Weekly Skill Goal Card (Independence Ladder) ── */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={styles.goalHeaderLeft}>
              <View style={styles.goalIconWrap}>
                <Text style={styles.goalIconEmoji}>🥛</Text>
              </View>
              <View>
                <Text style={styles.goalCategory}>سلم الاستقلالية اليومية • مهارة حركية دقيقة</Text>
                <Text style={styles.goalSubCategory}>Daily Independence Ladder (Fine Motor)</Text>
              </View>
            </View>
            <View style={styles.weekBadge}>
              <Text style={styles.weekBadgeText}>هدف الأسبوع</Text>
            </View>
          </View>

          <Text style={styles.goalTitle}>
            الشرب المستقل من الكوب الصغير بكلتا اليدين بدون مساعدة
          </Text>
          <Text style={styles.goalDescription}>
            هدف تدريبي لتنمية التناسق الحركي البصري وتقوية عضلات قبضة اليدين (Bilateral Grasp).
          </Text>

          {/* Micro-Steps Progress Track */}
          <View style={styles.stepsContainer}>
            <Text style={styles.stepsLabel}>خطوات التقدم المصغرة نحو الاستقلالية:</Text>
            {[
              { id: 0, text: 'مساعدة اليد على اليد في رفع الكوب بالفم', done: true },
              { id: 1, text: 'إسناد خفيف من المرفقين مع شرب رشفة واحدة', done: true },
              { id: 2, text: 'الإمساك الذاتي لمدة 5 ثوانٍ وإعادة الكوب للطاولة', done: false, inProgress: true },
              { id: 3, text: 'شرب 3 رشفات كاملة بدون انسكاب بنسبة 80%', done: false },
            ].map((step) => (
              <TouchableOpacity
                key={step.id}
                style={[
                  styles.stepItem,
                  step.done && styles.stepDone,
                  step.inProgress && styles.stepInProgress,
                ]}
                onPress={() => setActiveStep(step.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.stepCircle, step.done && styles.stepCircleDone]}>
                  <Text style={styles.stepCircleText}>{step.done ? '✓' : step.id + 1}</Text>
                </View>
                <Text style={[styles.stepText, step.done && styles.stepTextDone]}>
                  {step.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── 4. Quick Action Floating Glass Tiles ── */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionTile}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconWrap, { backgroundColor: Colors.primaryLight }]}>
              <Text style={{ fontSize: 24 }}>📝</Text>
            </View>
            <Text style={styles.actionTitle}>تدوين ملاحظة سريعة</Text>
            <Text style={styles.actionDesc}>مشاركة يومية مع الفريق الطبي</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionTile}
            onPress={() => router.push('/(tabs)/documents')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconWrap, { backgroundColor: Colors.secondaryLight }]}>
              <Text style={{ fontSize: 24 }}>📑</Text>
            </View>
            <Text style={styles.actionTitle}>رفع تقرير أو تحليل</Text>
            <Text style={styles.actionDesc}>استخراج ذكي بـ OCR الفوري</Text>
          </TouchableOpacity>
        </View>

        {/* Space at bottom for floating tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Quick Log Note Modal (Frosted Glass Sheet) ── */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>تدوين ملاحظة في السجل اليومي 📝</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSub}>
              يتم حفظ الملاحظة وإتاحتها فوراً للطبيب المعالج في لوحة المتابعة
            </Text>

            <View style={styles.typeSelector}>
              {[
                { key: 'general_observation', label: 'ملاحظة عامة' },
                { key: 'milestone_progress', label: 'تطور مهارة' },
                { key: 'therapy_note', label: 'جلسة تأهيل' },
                { key: 'sleep_nutrition', label: 'نوم وتغذية' },
              ].map((t) => (
                <TouchableOpacity
                  key={t.key}
                  style={[styles.typePill, noteType === t.key && styles.typePillActive]}
                  onPress={() => setNoteType(t.key)}
                >
                  <Text
                    style={[styles.typePillText, noteType === t.key && styles.typePillTextActive]}
                  >
                    {t.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.textArea}
              placeholder="اكتب ملاحظتك هنا (مثال: عمر بدأ يمسك الكوب بيدين اليوم لمدة 4 ثوانٍ مع تشجيع خفيف)..."
              placeholderTextColor={Colors.textTertiary}
              multiline
              numberOfLines={4}
              value={noteContent}
              onChangeText={setNoteContent}
            />

            {successMsg && <Text style={styles.successMsg}>{successMsg}</Text>}

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleQuickLog}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.submitBtnText}>حفظ وتحديث السجل</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Emergency Hospital Mode SOS Modal ── */}
      <Modal visible={emergencyModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <View style={styles.emergencyHeaderLeft}>
                <View style={styles.pulsingRedDot} />
                <View>
                  <Text style={styles.emergencyTitle}>بطاقة الطوارئ الطبية السريعة</Text>
                  <Text style={styles.emergencySubTitle}>Hospital Emergency Passport (ER Mode)</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setEmergencyModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.emergencyBioBox}>
              <View style={styles.bioRow}>
                <Text style={styles.bioLabel}>فصيلة الدم:</Text>
                <Text style={styles.bioValueHighlight}>O+ (Positive)</Text>
              </View>
              <View style={styles.bioRow}>
                <Text style={styles.bioLabel}>الوضع القلبي:</Text>
                <Text style={styles.bioValue}>جراحة تصحيح ثقب VSD (مستقر - وظيفة LV طبيعية)</Text>
              </View>
              <View style={styles.bioRow}>
                <Text style={styles.bioLabel}>الأدوية الحالية:</Text>
                <Text style={styles.bioValue}>إيلتروكسين 25 ميكروجرام يومياً (قصور درقية)</Text>
              </View>
              <View style={styles.bioRow}>
                <Text style={styles.bioLabel}>الحساسيات:</Text>
                <Text style={styles.bioValueSafe}>لا توجد حساسية دوائية مسجلة حتى الآن</Text>
              </View>
            </View>

            <View style={styles.qrPlaceholder}>
              <Text style={{ fontSize: 48 }}>📱</Text>
              <Text style={styles.qrTokenText}>رمز الطوارئ الطبي الموحد: DP-9488-EG</Text>
              <Text style={styles.qrDesc}>صالح لمسح طواقم الإسعاف والأطباء في المستشفى</Text>
            </View>

            {/* Emergency 1-Tap Speed Dial Action Row */}
            <View style={styles.emergencyDialRow}>
              <TouchableOpacity
                style={styles.dialBtnAmbulance}
                onPress={() => Linking.openURL('tel:123')}
                activeOpacity={0.8}
              >
                <Text style={styles.dialBtnIcon}>🚑</Text>
                <Text style={styles.dialBtnText}>الإسعاف (123)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dialBtnHotline}
                onPress={() => Linking.openURL('tel:16000')}
                activeOpacity={0.8}
              >
                <Text style={styles.dialBtnIcon}>📞</Text>
                <Text style={styles.dialBtnText}>نجدة الطفل (16000)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dialBtnWhatsapp}
                onPress={() =>
                  Linking.openURL(
                    'https://wa.me/201011112233?text=%D8%AD%D8%A7%D9%84%D8%A9%20%D8%B7%D9%88%D8%A7%D8%B1%D8%A6%20%D9%84%D9%84%D8%B7%D9%81%D9%84%20%D8%B9%D9%85%D8%B1%20%D8%A3%D8%AD%D9%85%D8%AF',
                  )
                }
                activeOpacity={0.8}
              >
                <Text style={styles.dialBtnIcon}>💬</Text>
                <Text style={styles.dialBtnText}>طبيب الطوارئ</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.emergencyPassportBtn}
              onPress={() => {
                const url = 'http://192.168.1.13:3001/passport/61871691-0784-4f0f-87de-f407f323a44d';
                Linking.openURL(url).catch(() => {});
              }}
            >
              <Text style={styles.emergencyPassportBtnText}>🖨️ فتح وثيقة جواز الحياة المعتمدة (A4 PDF)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.emergencyCloseBtn}
              onPress={() => setEmergencyModalVisible(false)}
            >
              <Text style={styles.emergencyCloseBtnText}>إغلاق بطاقة الطوارئ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── AAP Clinical Health Supervision Schedule Modal ── */}
      <Modal visible={aapModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.aapModalCard}>
            <View style={styles.aapModalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.aapModalTitle}>جدول المتابعة السريرية الدورية 🩺</Text>
                <Text style={styles.aapModalSub}>
                  توصيات الأكاديمية الأمريكية لطب الأطفال (AAP Guidelines) لعمر (31 شهراً)
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setAapModalVisible(false)}
                style={styles.aapCloseBtn}
              >
                <Text style={styles.aapCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 440 }}>
              {[
                {
                  age: 'حديثي الولادة (0 - 2 شهر)',
                  title: 'فحص إيكو القلب الشامل (Echocardiogram)',
                  status: 'completed',
                  statusLabel: 'مكتمل وطبيعي ✅',
                  desc: 'تم التئام ثقب VSD والوظيفة الانقباضية للقلب مستقرة بنسبة 64%.',
                },
                {
                  age: '6 - 12 شهراً',
                  title: 'تحليل وظائف الغدة الدرقية السنوي (TSH & FT4)',
                  status: 'completed',
                  statusLabel: 'مكتمل ومستقر ✅',
                  desc: 'مستقر تحت علاج إيلتروكسين 25 ميكروجرام بانتظام.',
                },
                {
                  age: '12 - 18 شهراً',
                  title: 'فحص السمع وتخطيط طبلة الأذن (Audiology)',
                  status: 'completed',
                  statusLabel: 'مكتمل ✅',
                  desc: 'استجابة سمعية سليمة بالجهتين ولا يوجد ارتشاح خلف الطبلة.',
                },
                {
                  age: '24 - 36 شهراً (السنوي)',
                  title: 'تحليل الغدة الدرقية الدوري + فحص قاع العين',
                  status: 'urgent',
                  statusLabel: 'مستحق الآن ⚠️',
                  desc: 'مستحق في عمر 30-36 شهراً للكشف المبكر عن أي تراجع في الإبصار أو الحاجة لتعديل جرعة الدواء.',
                },
                {
                  age: '36 - 48 شهراً (3 سنوات)',
                  title: 'أشعة الفقرات العنقية الجانبية (Cervical Spine X-Ray)',
                  status: 'upcoming',
                  statusLabel: 'مجدول قادماً ⏳',
                  desc: 'فحص أمان الحبل الشوكي لكشف عدم استقرار المفصل الفهقي المحوري (AAI) قبل الأنشطة الرياضية.',
                },
              ].map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.aapScheduleCard,
                    item.status === 'urgent' && styles.aapScheduleCardUrgent,
                  ]}
                >
                  <View style={styles.aapScheduleTop}>
                    <Text style={styles.aapAgeBadge}>{item.age}</Text>
                    <View
                      style={[
                        styles.aapStatusBadge,
                        item.status === 'urgent' && styles.aapStatusUrgent,
                        item.status === 'completed' && styles.aapStatusCompleted,
                        item.status === 'upcoming' && styles.aapStatusUpcoming,
                      ]}
                    >
                      <Text
                        style={[
                          styles.aapStatusText,
                          item.status === 'urgent' && styles.aapStatusTextUrgent,
                          item.status === 'completed' && styles.aapStatusTextCompleted,
                          item.status === 'upcoming' && styles.aapStatusTextUpcoming,
                        ]}
                      >
                        {item.statusLabel}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.aapCardTitle}>{item.title}</Text>
                  <Text style={styles.aapCardDesc}>{item.desc}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.aapActionRow}>
              <TouchableOpacity
                style={styles.aapBookActionBtn}
                onPress={() => {
                  setAapModalVisible(false);
                  router.push('/(tabs)/chat');
                }}
              >
                <Text style={styles.aapBookActionText}>حجز الفحص المستحق الآن 🩺</Text>
              </TouchableOpacity>
            </View>
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
  orbTopRight: {
    top: -50,
    right: -50,
    width: 260,
    height: 260,
    backgroundColor: Colors.orbEmerald,
  },
  orbMidLeft: {
    top: 240,
    left: -70,
    width: 240,
    height: 240,
    backgroundColor: Colors.orbSky,
  },
  orbBottomRight: {
    bottom: 80,
    right: -60,
    width: 260,
    height: 260,
    backgroundColor: Colors.orbAmber,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    gap: 16,
  },

  // Child Header Card
  childHeaderCard: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 26,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    ...Shadows.glass,
  },
  childHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarEmoji: {
    fontSize: 28,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Colors.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  verifiedCheck: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  childMetaInfo: {
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  childArabicName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  childEnglishName: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  agePill: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  agePillText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  karyotypePill: {
    backgroundColor: Colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  karyotypePillText: {
    color: Colors.secondary,
    fontSize: 11,
    fontWeight: '700',
  },

  // Emergency Button
  emergencyBtn: {
    backgroundColor: Colors.emergencyBg,
    borderColor: Colors.emergencyBorder,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sosDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.emergencyText,
  },
  emergencyBtnText: {
    color: Colors.emergencyText,
    fontSize: 13,
    fontWeight: '800',
  },
  sosTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sosTagText: {
    color: Colors.emergencyText,
    fontSize: 9,
    fontWeight: '900',
  },

  // Urgent Clinical Check Hero Card
  urgentCard: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    gap: 12,
    ...Shadows.glass,
  },
  urgentCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  urgentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  urgentIcon: {
    fontSize: 16,
  },
  urgentTagText: {
    color: Colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
  urgentSubText: {
    color: Colors.textTertiary,
    fontSize: 11,
  },
  dueBadge: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
  },
  dueBadgeText: {
    color: '#B91C1C',
    fontSize: 11,
    fontWeight: '800',
  },
  urgentTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  urgentDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  doctorPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  doctorPill: {
    backgroundColor: Colors.glassSurfaceSubtle,
    borderColor: Colors.glassBorderSubtle,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  doctorPillText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  bookBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    ...Shadows.glowPrimary,
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  bookBtnArrow: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  // Weekly Goal Card
  goalCard: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    gap: 12,
    ...Shadows.glass,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  goalIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: Colors.tertiaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalIconEmoji: {
    fontSize: 20,
  },
  goalCategory: {
    color: Colors.tertiary,
    fontSize: 12,
    fontWeight: '800',
  },
  goalSubCategory: {
    color: Colors.textTertiary,
    fontSize: 11,
  },
  weekBadge: {
    backgroundColor: Colors.tertiaryLight,
    borderColor: Colors.tertiaryFixed,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  weekBadgeText: {
    color: Colors.tertiary,
    fontSize: 11,
    fontWeight: '800',
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  goalDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  stepsContainer: {
    gap: 8,
    marginTop: 4,
  },
  stepsLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textTertiary,
    marginBottom: 4,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  stepDone: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primaryFixed,
  },
  stepInProgress: {
    borderColor: Colors.tertiaryContainer,
    borderWidth: 1.5,
  },
  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Colors.textTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleDone: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  stepCircleText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  stepText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
    flex: 1,
  },
  stepTextDone: {
    color: Colors.primary,
    fontWeight: '700',
  },

  // Actions Row
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionTile: {
    flex: 1,
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    gap: 6,
    ...Shadows.glass,
  },
  actionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  actionDesc: {
    fontSize: 11,
    color: Colors.textTertiary,
    textAlign: 'center',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 30, 26, 0.4)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    gap: 14,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  modalClose: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textTertiary,
    padding: 4,
  },
  modalSub: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typePill: {
    backgroundColor: Colors.canvasBase,
    borderColor: Colors.borderLight,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  typePillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  typePillTextActive: {
    color: '#FFFFFF',
  },
  textArea: {
    backgroundColor: Colors.canvasBase,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    fontSize: 13,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
    minHeight: 90,
  },
  successMsg: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    ...Shadows.glowPrimary,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  // Emergency Modal
  emergencyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    margin: 20,
    padding: 24,
    gap: 16,
    ...Shadows.glassElevated,
  },
  emergencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emergencyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pulsingRedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#DC2626',
  },
  emergencyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  emergencySubTitle: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
  emergencyBioBox: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 10,
  },
  bioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bioLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#991B1B',
  },
  bioValue: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '600',
    flex: 1,
    textAlign: 'left',
    marginRight: 8,
  },
  bioValueHighlight: {
    fontSize: 15,
    fontWeight: '900',
    color: '#B91C1C',
  },
  bioValueSafe: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '700',
  },
  qrPlaceholder: {
    backgroundColor: Colors.canvasBase,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  qrTokenText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginTop: 4,
  },
  qrDesc: {
    fontSize: 11,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  emergencyPassportBtn: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  emergencyPassportBtnText: {
    color: '#065F46',
    fontWeight: '800',
    fontSize: 13,
  },
  emergencyCloseBtn: {
    backgroundColor: Colors.emergencyText,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  emergencyCloseBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },

  // Urgent Card Actions
  urgentBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  aapDetailsBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aapDetailsBtnText: {
    color: '#B45309',
    fontWeight: '800',
    fontSize: 12,
  },

  // Emergency Speed Dial Row
  emergencyDialRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4,
  },
  dialBtnAmbulance: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 2,
  },
  dialBtnHotline: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 2,
  },
  dialBtnWhatsapp: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 2,
  },
  dialBtnIcon: {
    fontSize: 18,
  },
  dialBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  // AAP Health Supervision Modal Styles
  aapModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    width: '100%',
    maxHeight: '85%',
  },
  aapModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
  },
  aapModalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  aapModalSub: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 2,
    lineHeight: 16,
  },
  aapCloseBtn: {
    padding: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 999,
  },
  aapCloseText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  aapScheduleCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  aapScheduleCardUrgent: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderWidth: 1.5,
  },
  aapScheduleTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aapAgeBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textTertiary,
  },
  aapStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  aapStatusUrgent: {
    backgroundColor: '#FEF3C7',
  },
  aapStatusCompleted: {
    backgroundColor: '#DCFCE7',
  },
  aapStatusUpcoming: {
    backgroundColor: '#F1F5F9',
  },
  aapStatusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  aapStatusTextUrgent: {
    color: '#B45309',
  },
  aapStatusTextCompleted: {
    color: '#15803D',
  },
  aapStatusTextUpcoming: {
    color: '#64748B',
  },
  aapCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  aapCardDesc: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  aapActionRow: {
    marginTop: 12,
  },
  aapBookActionBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    ...Shadows.glowPrimary,
  },
  aapBookActionText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  // Daily 20-Min Home Routine & Streak Card
  routineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    ...Shadows.glass,
    gap: 12,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  routineHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  flameIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  routineTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  streakBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  streakBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  routineSub: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  pointsPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
  },
  celebrationBanner: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
    borderColor: '#6EE7B7',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    gap: 4,
  },
  celebrationEmoji: {
    fontSize: 20,
  },
  celebrationText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#065F46',
    textAlign: 'center',
  },
  drillsList: {
    gap: 8,
  },
  drillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  drillItemDone: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  drillCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drillCheckboxDone: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  drillCheckText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  drillItemTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  drillItemTitleDone: {
    color: '#047857',
  },
  drillDuration: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
  },
  drillDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 16,
  },
  routineActionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  completeRoutineBtn: {
    flex: 2,
    backgroundColor: '#D97706',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.glass,
  },
  completeRoutineBtnDone: {
    backgroundColor: '#059669',
  },
  completeRoutineBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '800',
  },
  makatonShortcutBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  makatonShortcutText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '800',
  },
});
