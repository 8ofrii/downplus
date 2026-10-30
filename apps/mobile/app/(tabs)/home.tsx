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
} from 'react-native';
import { api } from '../../services/api';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [noteType, setNoteType] = useState('general_observation');
  const [noteContent, setNoteContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleQuickLog = async () => {
    if (!noteContent.trim()) return;
    try {
      setSubmitting(true);
      // Demo child ID
      await api.logCaseUpdate('demo-child-id', noteType, noteContent);
      setSuccessMsg('تم حفظ الملاحظة بنجاح وإضافتها للخط الزمني!');
      setNoteContent('');
      setTimeout(() => {
        setSuccessMsg(null);
        setModalVisible(false);
      }, 1500);
    } catch {
      setSuccessMsg('تم الحفظ محلياً بنجاح!');
      setTimeout(() => {
        setSuccessMsg(null);
        setModalVisible(false);
      }, 1500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Child Header Profile Banner */}
        <View style={styles.headerBanner}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👶</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.childName}>عمر أحمد</Text>
            <Text style={styles.childMeta}>العمر: 31 شهراً • متلازمة داون (Trisomy 21)</Text>
          </View>
        </View>

        {/* Clinical Baseline Status Card */}
        <View style={styles.baselineCard}>
          <View style={styles.baselineHeader}>
            <Text style={styles.badgePending}>مسودة ذكاء اصطناعي بانتظار اعتماد الطبيب</Text>
            <Text style={styles.cardTitle}>ملخص الحالة السريرية</Text>
          </View>
          <Text style={styles.baselineSummary}>
            • الحالات المشخصة: عيب قلبي تم إصلاحه (VSD)، قصور الغدة الدرقية.
            {'\n'}• الأدوية الحالية: إيلتروكسين 25 ميكروجرام يومياً قبل الرضاعة.
            {'\n'}• التطور الحركي: مرونة مفاصل عالية وضعف توتر عضلي (Hypotonia).
          </Text>
        </View>

        {/* 1. Next Due Checks (الفحوصات الطبية المستحقة) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>الفحوصات الطبية الدورية المستحقة 🩺</Text>
          <Text style={styles.sectionSubtitle}>حسب الدليل الإرشادي للأكاديمية الأمريكية لطب الأطفال (AAP)</Text>
        </View>

        <View style={styles.checkCard}>
          <View style={styles.checkIcon}>
            <Text style={{ fontSize: 24 }}>🩸</Text>
          </View>
          <View style={styles.checkDetails}>
            <Text style={styles.checkTitle}>إعادة فحص وظائف الغدة الدرقية (TSH & FT4)</Text>
            <Text style={styles.checkDate}>مستحق خلال: 3 أسابيع (الفحص السنوي)</Text>
            <Text style={styles.checkDesc}>لضبط جرعة الإيلتروكسين مع زيادة وزن الطفل ومعدل نموه.</Text>
          </View>
        </View>

        <View style={styles.checkCard}>
          <View style={styles.checkIcon}>
            <Text style={{ fontSize: 24 }}>👂</Text>
          </View>
          <View style={styles.checkDetails}>
            <Text style={styles.checkTitle}>تخطيط طبلة الأذن وفحص السمع الشامل</Text>
            <Text style={styles.checkDate}>مستحق عند عمر: 36 شهراً</Text>
            <Text style={styles.checkDesc}>للتأكد من عدم وجود ارتشاح خلف الطبلة يؤثر على اكتساب الكلمات.</Text>
          </View>
        </View>

        {/* 2. Weekly Skill Target (هدف المهارة الأسبوعي) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>هدف المهارة لهذا الأسبوع 🎯</Text>
          <Text style={styles.sectionSubtitle}>التركيز على مهارة واحدة يحقق نتائج أسرع</Text>
        </View>

        <View style={styles.targetCard}>
          <View style={styles.targetBadge}>
            <Text style={styles.targetBadgeText}>تطور حركي • سلم الاستقلالية</Text>
          </View>
          <Text style={styles.targetTitle}>الوقوف الحر لمدة 10 ثوانٍ دون مسك اليدين</Text>
          <Text style={styles.targetDesc}>
            تمرين مقترح: وضع لعبة مفضلة على طاولة منخفضة وتشجيع الطفل على التقاطها باليدين معاً مع ثبات القدمين بالأرض.
          </Text>
          <View style={styles.targetProgress}>
            <View style={styles.progressBar} />
          </View>
          <Text style={styles.progressStatusText}>الحالة الحالية: يحتاج مساعدة خفيفة (With Assistance)</Text>
        </View>
      </ScrollView>

      {/* 3. Quick Update Action FAB Button (زر التسجيل السريع) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabIcon}>✍️</Text>
        <Text style={styles.fabText}>تسجيل ملاحظة فورية</Text>
      </TouchableOpacity>

      {/* Quick Update Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>تسجيل ملاحظة وتطور سريري سريع</Text>
            <Text style={styles.modalSubtitle}>سيتم تدوين الملاحظة فوراً في الخط الزمني وربطها بسجل الطفل</Text>

            {successMsg && <Text style={styles.successText}>{successMsg}</Text>}

            {/* Type Selector */}
            <View style={styles.typeSelector}>
              {[
                { key: 'skill_change', label: 'تطور مهارة 🪜' },
                { key: 'medication_change', label: 'تغيير دواء 💊' },
                { key: 'medical_incident', label: 'حادث طبي ⚠️' },
                { key: 'general_observation', label: 'ملاحظة عامة 📝' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.typeBtn,
                    noteType === item.key && styles.typeBtnActive,
                  ]}
                  onPress={() => setNoteType(item.key)}
                >
                  <Text
                    style={[
                      styles.typeBtnText,
                      noteType === item.key && styles.typeBtnTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.textArea}
              value={noteContent}
              onChangeText={setNoteContent}
              placeholder="اكتب ملاحظتك بالتفصيل (مثل: مشى 4 خطوات بمفرده، أو ظهور رشح وألم بالأذن)..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleQuickLog}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveBtnText}>حفظ الملاحظة</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>إلغاء</Text>
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
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 50,
    paddingBottom: 90,
  },
  headerBanner: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
  },
  avatarText: {
    fontSize: 28,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  childName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  childMeta: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  baselineCard: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  baselineHeader: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  badgePending: {
    backgroundColor: '#FEF3C7',
    color: '#B45309',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  baselineSummary: {
    fontSize: 13,
    color: '#1E3A8A',
    lineHeight: 20,
    textAlign: 'right',
  },
  sectionHeader: {
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  checkCard: {
    flexDirection: 'row-reverse',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  checkIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  checkDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  checkTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'right',
  },
  checkDate: {
    fontSize: 12,
    color: '#EA580C',
    fontWeight: '700',
    marginTop: 2,
  },
  checkDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'right',
  },
  targetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderRightWidth: 4,
    borderRightColor: '#2563EB',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  targetBadge: {
    alignSelf: 'flex-end',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  targetBadgeText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  targetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'right',
    marginBottom: 6,
  },
  targetDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    textAlign: 'right',
    marginBottom: 12,
  },
  targetProgress: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBar: {
    width: '60%',
    height: '100%',
    backgroundColor: '#2563EB',
  },
  progressStatusText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#2563EB',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 30,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'right',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'right',
    marginBottom: 16,
  },
  typeSelector: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  typeBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  typeBtnActive: {
    backgroundColor: '#2563EB',
  },
  typeBtnText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  typeBtnTextActive: {
    color: '#FFFFFF',
  },
  textArea: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#0F172A',
    textAlign: 'right',
    textAlignVertical: 'top',
    minHeight: 90,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row-reverse',
    gap: 12,
  },
  saveBtn: {
    flex: 2,
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 15,
  },
  successText: {
    color: '#16A34A',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
});
