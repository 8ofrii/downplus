import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import { Colors, Shadows } from '../../constants/theme';

interface DocItem {
  id: string;
  fileName: string;
  category: string;
  categoryLabel: string;
  status: 'ocr_completed' | 'processing_ocr';
  statusLabel: string;
  date: string;
  summary: string;
  icon: string;
}

const DEMO_DOCS: DocItem[] = [
  {
    id: 'doc-1',
    fileName: 'echocardiogram_post_vsd_report.pdf',
    category: 'Echo',
    categoryLabel: 'إيكو القلب وسونار الأوعية',
    status: 'ocr_completed',
    statusLabel: 'تم التحليل والاستخراج بـ AI ✅',
    date: '2024-04-10',
    summary: 'تم فحص جراحة VSD السابقة، كفاءة عضلة القلب طبيعية (EF 64%) ولا يوجد تسريب متبقٍ.',
    icon: '🫀',
  },
  {
    id: 'doc-2',
    fileName: 'thyroid_tsh_ft4_panel_2024.pdf',
    category: 'Lab',
    categoryLabel: 'فحوصات الغدة الدرقية',
    status: 'ocr_completed',
    statusLabel: 'تم التحليل والاستخراج بـ AI ✅',
    date: '2024-09-18',
    summary: 'TSH: 4.8 mIU/L, FT4: 1.1 ng/dL. الجرعة الحالية (25 ميكروجرام) متوافقة ومستقرة.',
    icon: '🩸',
  },
  {
    id: 'doc-3',
    fileName: 'speech_therapy_early_intervention.pdf',
    category: 'Therapy_Report',
    categoryLabel: 'تقرير جلسة التخاطب والتواصل',
    status: 'processing_ocr',
    statusLabel: 'جاري استخراج الخطة بواسطة OCR ⏳',
    date: '2026-10-28',
    summary: 'جاري استخراج المهارات الشفهية وخطة التدخل المبكر بواسطة نموذج الرؤية الطبية المعتمد...',
    icon: '🗣️',
  },
];

export default function DocumentsScreen() {
  const [documents, setDocuments] = useState<DocItem[]>(DEMO_DOCS);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const simulateUpload = (category: string, categoryLabel: string, icon: string, name: string) => {
    setUploadModal(false);
    setUploading(true);

    setTimeout(() => {
      const newDoc: DocItem = {
        id: `doc-${Date.now()}`,
        fileName: name,
        category,
        categoryLabel,
        status: 'ocr_completed',
        statusLabel: 'تم التحليل والاستخراج بـ AI ✅',
        date: '2026-10-30',
        summary: 'تم ربط المستند المشفر بنجاح بملف عمر السريري وتحديث خطة المتابعة تلقائياً.',
        icon,
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setUploading(false);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Ambient background glow */}
      <View style={styles.ambientContainer} pointerEvents="none">
        <View style={[styles.ambientOrb, styles.orbTop]} />
        <View style={[styles.ambientOrb, styles.orbBottom]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ── 1. Top Vault Summary Card ── */}
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerSub}>سجل الفحوصات والتقارير الطبية المشفرة</Text>
              <Text style={styles.headerTitle}>خزينة ملفات عمر الطبية 📂</Text>
            </View>
            <View style={styles.shieldBadge}>
              <Text style={{ fontSize: 18 }}>🔒</Text>
            </View>
          </View>

          <Text style={styles.headerDesc}>
            يتم تشفير كافة التقارير بتقنية AES-256، ومعالجتها بنموذج OCR الطبي لاستخراج التشخيصات الحركية والقلبية والغدة تلقائياً.
          </Text>

          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => setUploadModal(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.uploadBtnText}>+ إضافة تقرير أو فحص مخبري جديد</Text>
          </TouchableOpacity>
        </View>

        {uploading && (
          <View style={styles.uploadingNotice}>
            <ActivityIndicator color={Colors.primary} size="small" />
            <Text style={styles.uploadingNoticeText}>
              جاري الرفع المشفر وتحليل المستند عبر الذكاء الاصطناعي...
            </Text>
          </View>
        )}

        {/* ── 2. Documents List ── */}
        <View style={styles.docList}>
          {documents.map((doc) => (
            <View key={doc.id} style={styles.docCard}>
              <View style={styles.docCardHeader}>
                <View style={styles.docIconWrap}>
                  <Text style={{ fontSize: 24 }}>{doc.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.docCategory}>{doc.categoryLabel}</Text>
                  <Text style={styles.docFileName} numberOfLines={1}>
                    {doc.fileName}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    doc.status === 'ocr_completed'
                      ? styles.statusCompleted
                      : styles.statusProcessing,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      doc.status === 'ocr_completed'
                        ? styles.statusTextCompleted
                        : styles.statusTextProcessing,
                    ]}
                  >
                    {doc.statusLabel}
                  </Text>
                </View>
              </View>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryLabel}>ملخص المستخرج السريري (Clinical Extract):</Text>
                <Text style={styles.summaryText}>{doc.summary}</Text>
              </View>

              <View style={styles.docCardFooter}>
                <Text style={styles.docDate}>تاريخ التقرير: {doc.date}</Text>
                <TouchableOpacity style={styles.viewDocBtn} activeOpacity={0.8}>
                  <Text style={styles.viewDocBtnText}>عرض المستند الكامل ←</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Space at bottom for floating tab bar */}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* ── Category Selection Modal ── */}
      <Modal visible={uploadModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>اختر نوع التقرير الطبي 📄</Text>
              <TouchableOpacity onPress={() => setUploadModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSub}>
              يساعد تحديد النوع على توجيه نموذج الذكاء الاصطناعي لاستخراج القيم الدقيقة
            </Text>

            <View style={styles.categoryGrid}>
              {[
                {
                  cat: 'Echo',
                  label: 'إيكو القلب وسونار الأوعية',
                  icon: '🫀',
                  name: 'echo_followup_scan.pdf',
                },
                {
                  cat: 'Lab',
                  label: 'تحليل دم وغدة درقية (TSH)',
                  icon: '🩸',
                  name: 'tsh_blood_test.pdf',
                },
                {
                  cat: 'Hearing',
                  label: 'فحص السمع وضغط الأذن',
                  icon: '👂',
                  name: 'tympanometry_audiology.pdf',
                },
                {
                  cat: 'Therapy',
                  label: 'تقرير جلسة علاج طبيعي أو تخاطب',
                  icon: '🏃',
                  name: 'physio_assessment_report.pdf',
                },
              ].map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.categoryItem}
                  onPress={() => simulateUpload(item.cat, item.label, item.icon, item.name)}
                  activeOpacity={0.85}
                >
                  <Text style={{ fontSize: 28 }}>{item.icon}</Text>
                  <Text style={styles.categoryItemLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
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
  orbTop: {
    top: -50,
    right: -40,
    width: 270,
    height: 270,
    backgroundColor: Colors.orbEmerald,
  },
  orbBottom: {
    bottom: 90,
    left: -50,
    width: 250,
    height: 250,
    backgroundColor: Colors.orbSky,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    gap: 16,
  },

  // Header Card
  headerCard: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    gap: 12,
    ...Shadows.glassElevated,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSub: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  shieldBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  uploadBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    ...Shadows.glowPrimary,
    marginTop: 4,
  },
  uploadBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },

  uploadingNotice: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderColor: Colors.glassBorder,
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Shadows.glass,
  },
  uploadingNoticeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },

  // Document Card
  docList: {
    gap: 14,
  },
  docCard: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 26,
    padding: 18,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    gap: 12,
    ...Shadows.glass,
  },
  docCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  docIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: Colors.canvasBase,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docCategory: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  docFileName: {
    fontSize: 11,
    color: Colors.textTertiary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusCompleted: {
    backgroundColor: Colors.primaryLight,
  },
  statusProcessing: {
    backgroundColor: Colors.tertiaryLight,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  statusTextCompleted: {
    color: Colors.primary,
  },
  statusTextProcessing: {
    color: Colors.tertiary,
  },
  summaryBox: {
    backgroundColor: Colors.glassSurfaceSubtle,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.glassBorderSubtle,
    gap: 4,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
  },
  summaryText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  docCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  docDate: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
  viewDocBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewDocBtnText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '800',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 30, 26, 0.45)',
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
    lineHeight: 18,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 6,
  },
  categoryItem: {
    width: '48%',
    backgroundColor: Colors.canvasBase,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  categoryItemLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});
