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

  // Smart Lab & Rx OCR Camera Scanner State
  const [scannerModal, setScannerModal] = useState(false);
  const [scanningState, setScanningState] = useState<'viewfinder' | 'analyzing' | 'extracted'>('viewfinder');
  const [scannedData, setScannedData] = useState<{
    title: string;
    lab: string;
    icon: string;
    category: string;
    metrics: { label: string; value: string; flag: string }[];
    clinicalNote: string;
  } | null>(null);

  const startScanSimulation = (sampleType: 'thyroid' | 'echo') => {
    setScanningState('analyzing');
    setTimeout(() => {
      if (sampleType === 'thyroid') {
        setScannedData({
          title: 'فحص وظائف الغدة الدرقية الشامل (TSH / FT4)',
          lab: 'معامل البرج - فرع المعادي (Al Borg Diagnostics)',
          icon: '🩸',
          category: 'Lab',
          metrics: [
            { label: 'TSH (Thyroid Stimulating Hormone)', value: '3.4 µIU/mL', flag: 'نطاق طبيعي (0.4 - 4.5)' },
            { label: 'Free T4 (الثيروكسين الحر)', value: '1.25 ng/dL', flag: 'طبيعي ومستقر' },
          ],
          clinicalNote: 'الجرعة اليومية الحالية من دواء إيلتروكسين (25 ميكروجرام) متوافقة تماماً مع العمر والوزن.',
        });
      } else {
        setScannedData({
          title: 'تقرير موجات صوتية وإيكو القلب (Echocardiogram)',
          lab: 'مستشفى أبوالريش التخصصي للأطفال',
          icon: '🫀',
          category: 'Echo',
          metrics: [
            { label: 'VSD Status (ثقب ما بين البطينين)', value: 'Fully Closed', flag: 'تئام جراحي كامل ✅' },
            { label: 'Ejection Fraction (كفاءة العضلة)', value: '65%', flag: 'كفاءة ممتازة' },
          ],
          clinicalNote: 'عضلة القلب سليمة تماماً ولا يوجد أي تسريب صمامات. مصرح بكافة الأنشطة الرياضية والسباحة.',
        });
      }
      setScanningState('extracted');
    }, 1400);
  };

  const handleApproveScan = () => {
    if (!scannedData) return;
    const newDoc: DocItem = {
      id: `doc-${Date.now()}`,
      fileName: `${scannedData.category.toLowerCase()}_scan_${Date.now().toString().slice(-4)}.pdf`,
      category: scannedData.category,
      categoryLabel: scannedData.title,
      status: 'ocr_completed',
      statusLabel: 'تم التحليل والاستخراج بـ AI ✅',
      date: '2026-10-31',
      summary: scannedData.clinicalNote,
      icon: scannedData.icon,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setScannerModal(false);
    setScanningState('viewfinder');
    setScannedData(null);
  };

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

          <View style={styles.headerBtnRow}>
            <TouchableOpacity
              style={styles.cameraScanBtn}
              onPress={() => {
                setScanningState('viewfinder');
                setScannerModal(true);
              }}
              activeOpacity={0.85}
            >
              <Text style={{ fontSize: 16 }}>📷</Text>
              <Text style={styles.cameraScanBtnText}>مسح ضوئي ذكي بالكاميرا (AI OCR)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => setUploadModal(true)}
              activeOpacity={0.85}
            >
              <Text style={styles.uploadBtnText}>+ رفع ملف PDF</Text>
            </TouchableOpacity>
          </View>
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

      {/* ── Smart Lab & Rx AI OCR Scanner Modal ── */}
      <Modal visible={scannerModal} transparent animationType="slide">
        <View style={styles.scannerModalOverlay}>
          <View style={styles.scannerModalCard}>
            <View style={styles.scannerHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.scannerTitle}>الماسح الذكي للتقارير والتحاليل 📷</Text>
                <Text style={styles.scannerSub}>
                  التعرف الضوئي التلقائي (Medical Vision OCR) لاستخراج المؤشرات الحيوية
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setScannerModal(false);
                  setScanningState('viewfinder');
                  setScannedData(null);
                }}
                style={styles.scannerCloseBtn}
              >
                <Text style={styles.scannerCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            {scanningState === 'viewfinder' && (
              <View style={styles.viewfinderContainer}>
                <View style={styles.cameraBox}>
                  <View style={[styles.corner, styles.cornerTL]} />
                  <View style={[styles.corner, styles.cornerTR]} />
                  <View style={[styles.corner, styles.cornerBL]} />
                  <View style={[styles.corner, styles.cornerBR]} />
                  <View style={styles.laserLine} />
                  <View style={styles.cameraCenterHint}>
                    <Text style={{ fontSize: 36, opacity: 0.8 }}>📄</Text>
                    <Text style={styles.cameraInstruction}>
                      وجّه الكاميرا نحو ورقة التحليل أو تقرير الطبيب
                    </Text>
                  </View>
                </View>

                <Text style={styles.sampleScanLabel}>اختر نموذج فحص للتجربة الحية:</Text>
                <View style={styles.sampleBtnsRow}>
                  <TouchableOpacity
                    style={styles.sampleBtn}
                    onPress={() => startScanSimulation('thyroid')}
                    activeOpacity={0.85}
                  >
                    <Text style={{ fontSize: 18 }}>🩸</Text>
                    <Text style={styles.sampleBtnText}>مسح تحليل غدة (TSH)</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sampleBtn}
                    onPress={() => startScanSimulation('echo')}
                    activeOpacity={0.85}
                  >
                    <Text style={{ fontSize: 18 }}>🫀</Text>
                    <Text style={styles.sampleBtnText}>مسح إيكو قلب (Echo)</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {scanningState === 'analyzing' && (
              <View style={styles.analyzingContainer}>
                <ActivityIndicator color={Colors.primary} size="large" />
                <Text style={styles.analyzingTitle}>جاري قراءة ومعالجة التقرير الطبي...</Text>
                <Text style={styles.analyzingDesc}>
                  تطبيق عازل الخصوصية المصري وتجريد البيانات الشخصية • استخراج المؤشرات المعملية
                </Text>
              </View>
            )}

            {scanningState === 'extracted' && scannedData && (
              <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
                <View style={styles.extractedCard}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Text style={{ fontSize: 24 }}>{scannedData.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.extractedTitle}>{scannedData.title}</Text>
                      <Text style={styles.extractedLab}>المصدر: {scannedData.lab}</Text>
                    </View>
                    <View style={styles.extractedSuccessBadge}>
                      <Text style={styles.extractedSuccessText}>تم بنجاح ✓</Text>
                    </View>
                  </View>

                  <View style={styles.metricsBox}>
                    <Text style={styles.metricsHeader}>القيم والنتائج المستخرجة عبر الذكاء الاصطناعي:</Text>
                    {scannedData.metrics.map((m, i) => (
                      <View key={i} style={styles.metricRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.metricLabel}>{m.label}</Text>
                          <Text style={styles.metricFlag}>{m.flag}</Text>
                        </View>
                        <Text style={styles.metricValue}>{m.value}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.clinicalNoteBox}>
                    <Text style={styles.clinicalNoteHeader}>💡 التوصية السريرية للمتابعة:</Text>
                    <Text style={styles.clinicalNoteBody}>{scannedData.clinicalNote}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.approveScanBtn}
                  onPress={handleApproveScan}
                  activeOpacity={0.85}
                >
                  <Text style={styles.approveScanBtnText}>
                    اعتماد وربط التقرير بالملف الطبي لعمر ✅
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
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

  // Header Button Row
  headerBtnRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  cameraScanBtn: {
    flex: 1.4,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    ...Shadows.glowPrimary,
  },
  cameraScanBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },

  // Smart Scanner Modal Styles
  scannerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'flex-end',
  },
  scannerModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 20,
    maxHeight: '85%',
  },
  scannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  scannerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0F172A',
  },
  scannerSub: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  scannerCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerCloseText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#64748B',
  },
  viewfinderContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    gap: 14,
  },
  cameraBox: {
    width: '100%',
    height: 180,
    backgroundColor: '#0F172A',
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#38BDF8',
  },
  cornerTL: {
    top: 10,
    left: 10,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTR: {
    top: 10,
    right: 10,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBL: {
    bottom: 10,
    left: 10,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBR: {
    bottom: 10,
    right: 10,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  laserLine: {
    position: 'absolute',
    left: 14,
    right: 14,
    height: 2,
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  cameraCenterHint: {
    alignItems: 'center',
    gap: 8,
  },
  cameraInstruction: {
    fontSize: 12,
    color: '#CBD5E1',
    fontWeight: '700',
  },
  sampleScanLabel: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#1E293B',
    alignSelf: 'flex-start',
  },
  sampleBtnsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  sampleBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    gap: 4,
  },
  sampleBtnText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#334155',
  },
  analyzingContainer: {
    alignItems: 'center',
    paddingVertical: 36,
    gap: 12,
  },
  analyzingTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  analyzingDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: '85%',
  },
  extractedCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  extractedTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  extractedLab: {
    fontSize: 11,
    color: '#64748B',
  },
  extractedSuccessBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  extractedSuccessText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  metricsBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    gap: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricsHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 6,
  },
  metricLabel: {
    fontSize: 11.5,
    color: '#1E293B',
    fontWeight: '700',
  },
  metricFlag: {
    fontSize: 9.5,
    color: '#059669',
    fontWeight: '700',
  },
  metricValue: {
    fontSize: 12.5,
    fontWeight: '900',
    color: Colors.primary,
  },
  clinicalNoteBox: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 12,
    padding: 10,
    gap: 2,
  },
  clinicalNoteHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E40AF',
  },
  clinicalNoteBody: {
    fontSize: 11,
    color: '#1E3A8A',
    lineHeight: 16,
  },
  approveScanBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    ...Shadows.glowPrimary,
    marginBottom: 10,
  },
  approveScanBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13.5,
  },
});
