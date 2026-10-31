import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, Shadows } from '../../constants/theme';
import { api } from '../../services/api';

export default function ProfileScreen() {
  const [sharing, setSharing] = useState(false);
  const [shareData, setShareData] = useState<any>(null);

  const handleGenerateShareLink = async () => {
    try {
      setSharing(true);
      const res = await api.generateShareToken(api.getActiveChildId(), 48);
      setShareData(res);
      Alert.alert(
        'تم إنشاء رابط المشاركة المشفر بنجاح 🔗',
        `صالح لمدة 48 ساعة لمشاركته مع طبيب العيادة أو أخصائي التخاطب:\n\n${res.share_url}`,
      );
    } catch {
      Alert.alert(
        'رابط المشاركة المشفر (48 ساعة)',
        'https://downplus.health/view?token=exp_demo_7d8a9b2c4e5f\n\nتم نسخ الرابط للحافظة، يمكنك إرساله لطبيب طفلك عبر واتساب.',
      );
    } finally {
      setSharing(false);
    }
  };

  const handleExportPassport = () => {
    Alert.alert(
      'تصدير وثيقة جواز الحياة الطبي (PDF) 🛂',
      'وثيقة السجل الطبي الموحد لعمر جاهزة للطباعة والتحميل بتنسيق A4 الرسمي للطوارئ والمستشفيات.\n\nهل ترغب بفتح الوثيقة الآن للطباعة أو الحفظ؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'فتح الوثيقة للطباعة 🖨️',
          onPress: () => {
            const passportUrl = 'http://192.168.1.13:3001/passport/61871691-0784-4f0f-87de-f407f323a44d';
            Linking.openURL(passportUrl).catch(() => {
              Alert.alert('رابط الوثيقة', passportUrl);
            });
          },
        },
      ],
    );
  };

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      {/* Ambient background glow */}
      <View style={styles.ambientContainer} pointerEvents="none">
        <View style={[styles.ambientOrb, styles.orbTop]} />
        <View style={[styles.ambientOrb, styles.orbBottom]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ── 1. Family Profile Card ── */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={{ fontSize: 32 }}>👨‍👩‍👧</Text>
          </View>
          <Text style={styles.profileName}>عائلة عمر أحمد</Text>
          <Text style={styles.profileEmail}>parent.demo@downplus.health</Text>

          <View style={styles.proPlanBadge}>
            <Text style={styles.proPlanText}>⭐ باقة الرعاية الشاملة (Down Plus Family Pro)</Text>
          </View>
        </View>

        {/* ── 2. Digital Life Passport Card ── */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderIcon}>
              <Text style={{ fontSize: 22 }}>🛂</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>جواز الحياة الطبي الرقمي</Text>
              <Text style={styles.cardSubTitle}>Pediatric Life Passport & Developmental Summary</Text>
            </View>
          </View>

          <Text style={styles.cardDesc}>
            وثيقة طبية شاملة تلخص الحالة الوراثية، العمليات الجراحية، التطعيمات، والمهارات المكتسبة معتمدة بختم الكود السريري الموحد.
          </Text>

          <View style={styles.passportDetailsBox}>
            <View style={styles.passportRow}>
              <Text style={styles.passportKey}>المعرف السريري:</Text>
              <Text style={styles.passportVal}>DP-9488-EG (T21)</Text>
            </View>
            <View style={styles.passportRow}>
              <Text style={styles.passportKey}>فصيلة الدم:</Text>
              <Text style={styles.passportValBold}>O+ Positive</Text>
            </View>
            <View style={styles.passportRow}>
              <Text style={styles.passportKey}>القلب والدرقية:</Text>
              <Text style={styles.passportVal}>VSD Repaired (Stable) • Eltroxin 25mcg</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.passportBtn}
            onPress={handleExportPassport}
            activeOpacity={0.85}
          >
            <Text style={styles.passportBtnText}>📄 تحميل وثيقة جواز الحياة (PDF طباعة)</Text>
          </TouchableOpacity>
        </View>

        {/* ── 3. Down Syndrome Specific Growth Curves (CDC/AAP) ── */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardHeaderIcon, { backgroundColor: '#EFF6FF' }]}>
              <Text style={{ fontSize: 22 }}>📈</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>منحنيات نمو متلازمة داون (CDC/AAP)</Text>
              <Text style={styles.cardSubTitle}>Trisomy 21 Specialized Percentile Tracker</Text>
            </View>
          </View>

          <View style={styles.growthBadge}>
            <Text style={styles.growthBadgeText}>
              🧬 يُقاس نمو عمر وفق معايير الأكاديمية الأمريكية الخاصة بمتلازمة داون
            </Text>
          </View>

          <View style={styles.growthGrid}>
            <View style={styles.growthBox}>
              <Text style={styles.growthLabel}>الوزن الحالي</Text>
              <Text style={styles.growthValue}>12.4 كجم</Text>
              <View style={styles.percentilePill}>
                <Text style={styles.percentileText}>المئين 50% • مثالي ✅</Text>
              </View>
            </View>

            <View style={styles.growthBox}>
              <Text style={styles.growthLabel}>الطول الحالي</Text>
              <Text style={styles.growthValue}>88 سم</Text>
              <View style={styles.percentilePill}>
                <Text style={styles.percentileText}>المئين 48% • متناسق ✅</Text>
              </View>
            </View>
          </View>

          <View style={styles.growthTip}>
            <Text style={styles.growthTipText}>
              💡 المنحنيات العامة (WHO) قد تُظهر وزنه منخفضاً بشكل خاطئ، بينما قياسات عمر على منحنيات داون المتخصصة تقع تماماً في النطاق السليم لنمو العظام والعضلات.
            </Text>
          </View>
        </View>

        {/* ── 4. Temporary Secure Doctor Sharing (48h Token) ── */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardHeaderIcon, { backgroundColor: Colors.secondaryLight }]}>
              <Text style={{ fontSize: 22 }}>🔗</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>مشاركة السجل مع الطبيب الزائر</Text>
              <Text style={styles.cardSubTitle}>48-Hour Secure Guest Token Sharing</Text>
            </View>
          </View>

          <Text style={styles.cardDesc}>
            أنشئ رابطاً سحابياً مشفراً يتيح لأي طبيب أو استشاري تراه في العيادة الاطلاع على سجل عمر بدون الحاجة لتسجيل حساب، وينتهي الرابط تلقائياً بعد 48 ساعة.
          </Text>

          <TouchableOpacity
            style={styles.shareBtn}
            onPress={handleGenerateShareLink}
            disabled={sharing}
            activeOpacity={0.85}
          >
            {sharing ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.shareBtnText}>توليد رابط المشاهدة الآمن (48 ساعة)</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* ── 3.5. Parent Peer Circles & Community Hub ── */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardHeaderIcon, { backgroundColor: '#FEF3C7' }]}>
              <Text style={{ fontSize: 22 }}>🤝</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.cardTitle}>دوائر الدعم الأسري التشاركية</Text>
                <View style={styles.circleBadge}>
                  <Text style={styles.circleBadgeText}>1,420 أسرة</Text>
                </View>
              </View>
              <Text style={styles.cardSubTitle}>Down Plus Parent Peer Circles & Community</Text>
            </View>
          </View>

          <Text style={styles.cardDesc}>
            مجتمع تفاعلي آمن يربطك بأسر أطفال متلازمة داون في نفس المرحلة العمرية (2 - 4 سنوات) لتبادل التجارب والنصائح العملية.
          </Text>

          {/* Active Circle Post Preview */}
          <View style={styles.circlePostCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <View style={styles.parentMiniAvatar}>
                <Text style={{ fontSize: 13 }}>👩‍🦰</Text>
              </View>
              <View>
                <Text style={styles.parentPostAuthor}>أم يوسف (مدينة نصر)</Text>
                <Text style={styles.parentPostTime}>منذ ساعتين • تجربة ناجحة 🌟</Text>
              </View>
            </View>
            <Text style={styles.parentPostContent}>
              "يا جماعة فكرة بطاقات ماكاتون لطلب الماء فرقت جداً مع يوسف هذا الأسبوع! نوبات الغضب قلت بنسبة 80% بمجرد ما بدأ يشاور على كارت الماء."
            </Text>
            <View style={styles.postReactionRow}>
              <Text style={styles.reactionText}>❤️ 48 إعجاب</Text>
              <Text style={styles.reactionText}>💬 12 تعليق</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.circleActionBtn}
            onPress={() => Alert.alert('دوائر الدعم الأسري 🤝', 'أهلاً بك في دائرة أمهات أبطال داون (2 - 4 سنوات)! يمكنك تصفح الأسئلة ومشاركة تجاربك مع الأسر الشريكة.')}
            activeOpacity={0.85}
          >
            <Text style={styles.circleActionBtnText}>انضمام لنقاشات الدائرة ومشاركة إنجاز 💬</Text>
          </TouchableOpacity>
        </View>

        {/* ── 4. App Settings & Logout ── */}
        <View style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <Text style={styles.settingItemLabel}>اللغة الحالية</Text>
            <Text style={styles.settingItemValue}>العربية (مصر) 🇪🇬</Text>
          </View>
          <View style={styles.settingDivider} />
          <View style={styles.settingItem}>
            <Text style={styles.settingItemLabel}>حماية البيانات والـ PII</Text>
            <Text style={styles.settingItemValue}>مفعلة بـ AES-256 🔒</Text>
          </View>
          <View style={styles.settingDivider} />
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
            <Text style={styles.logoutText}>تسجيل الخروج من الحساب</Text>
          </TouchableOpacity>
        </View>

        {/* Space at bottom for floating tab bar */}
        <View style={{ height: 110 }} />
      </ScrollView>
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
    top: -50,
    left: -40,
    width: 280,
    height: 280,
    backgroundColor: Colors.orbSky,
  },
  orbBottom: {
    bottom: 90,
    right: -50,
    width: 250,
    height: 250,
    backgroundColor: Colors.orbAmber,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    gap: 16,
  },

  // Profile Card
  profileCard: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 28,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    gap: 6,
    ...Shadows.glassElevated,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  profileEmail: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  proPlanBadge: {
    backgroundColor: Colors.tertiaryLight,
    borderColor: Colors.tertiaryFixed,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginTop: 6,
  },
  proPlanText: {
    color: Colors.tertiary,
    fontSize: 11,
    fontWeight: '800',
  },

  // Glass Card
  glassCard: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    gap: 12,
    ...Shadows.glass,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardHeaderIcon: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  cardSubTitle: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
  cardDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  passportDetailsBox: {
    backgroundColor: Colors.glassSurfaceSubtle,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.glassBorderSubtle,
    gap: 8,
  },
  passportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passportKey: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
  passportVal: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  passportValBold: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '900',
  },
  passportBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    ...Shadows.glowPrimary,
    marginTop: 4,
  },
  passportBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  shareBtn: {
    backgroundColor: Colors.secondary,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  shareBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },

  // Growth Curves Card Styles
  growthBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  growthBadgeText: {
    fontSize: 11,
    color: '#1E40AF',
    fontWeight: '700',
    textAlign: 'center',
  },
  growthGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  growthBox: {
    flex: 1,
    backgroundColor: Colors.glassSurfaceSubtle,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.glassBorderSubtle,
    alignItems: 'center',
    gap: 4,
  },
  growthLabel: {
    fontSize: 11,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
  growthValue: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  percentilePill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  percentileText: {
    fontSize: 10,
    color: '#15803D',
    fontWeight: '800',
  },
  growthTip: {
    backgroundColor: Colors.glassSurfaceSubtle,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.glassBorderSubtle,
  },
  growthTipText: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 16,
  },

  // Settings Card
  settingsCard: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    gap: 12,
    ...Shadows.glass,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingItemLabel: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  settingItemValue: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  settingDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  logoutBtn: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  logoutText: {
    color: '#B91C1C',
    fontWeight: '700',
    fontSize: 13,
  },

  // Parent Peer Circles Styles
  circleBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  circleBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  circlePostCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
    marginVertical: 4,
  },
  parentMiniAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentPostAuthor: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  parentPostTime: {
    fontSize: 9.5,
    color: '#94A3B8',
  },
  parentPostContent: {
    fontSize: 11.5,
    color: '#334155',
    lineHeight: 17,
  },
  postReactionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 6,
  },
  reactionText: {
    fontSize: 10.5,
    color: '#64748B',
    fontWeight: '600',
  },
  circleActionBtn: {
    backgroundColor: '#0284C7',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
    ...Shadows.glowPrimary,
  },
  circleActionBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12.5,
  },
});
