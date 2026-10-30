import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const DEMO_DOCS = [
  {
    id: 'doc-1',
    fileName: 'echocardiogram_neonatal_report.pdf',
    category: 'Echo',
    categoryLabel: 'إيكو القلب',
    status: 'ocr_completed',
    statusLabel: 'مكتمل المعالجة بالذكاء الاصطناعي ✅',
    date: '2024-04-10',
    summary: 'تم فحص ثقب القلب البطيني (VSD)، الحجم صغير مع إغلاق تلقائي جزئي بدون قصور حركي.',
  },
  {
    id: 'doc-2',
    fileName: 'thyroid_tsh_ft4_panel.pdf',
    category: 'Lab',
    categoryLabel: 'تحاليل مخبرية',
    status: 'ocr_completed',
    statusLabel: 'مكتمل المعالجة بالذكاء الاصطناعي ✅',
    date: '2024-09-18',
    summary: 'TSH: 4.8 mIU/L, FT4: 1.1 ng/dL. الجرعة الحالية (25 ميكروجرام) ملائمة مع الوزن الحالي.',
  },
  {
    id: 'doc-3',
    fileName: 'speech_therapy_evaluation.pdf',
    category: 'Therapy_Report',
    categoryLabel: 'تقرير تخاطب',
    status: 'processing_ocr',
    statusLabel: 'قيد الاستخراج والتحليل الذكي ⏳',
    date: '2026-10-28',
    summary: 'جاري استخراج المهارات الشفهية وخطة التدخل المبكر بواسطة نموذج الرؤية الطبية...',
  },
];

export default function DocumentsScreen() {
  const [documents, setDocuments] = useState(DEMO_DOCS);
  const [uploading, setUploading] = useState(false);

  const handleUploadNew = () => {
    Alert.alert(
      'رفع وثيقة أو تقرير طبي',
      'اختر تصنيف الوثيقة لرفعها وتوليد رابط سحابي مشفر ذو تدمير ذاتي (15 دقيقة)',
      [
        {
          text: 'إيكو أو سونار قلب 🫀',
          onPress: () => simulateUpload('Echo', 'new_echo_scan.pdf'),
        },
        {
          text: 'تحليل دم / غدة درقية 🩸',
          onPress: () => simulateUpload('Lab', 'new_lab_results.pdf'),
        },
        {
          text: 'تقرير تخاطب أو علاج طبيعي 📋',
          onPress: () => simulateUpload('Therapy_Report', 'therapy_eval.pdf'),
        },
        { text: 'إلغاء', style: 'cancel' },
      ],
    );
  };

  const simulateUpload = (category: string, fileName: string) => {
    setUploading(true);
    setTimeout(() => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        fileName,
        category,
        categoryLabel: category === 'Echo' ? 'إيكو قلب' : 'تحاليل',
        status: 'ocr_completed',
        statusLabel: 'مكتمل المعالجة بالذكاء الاصطناعي ✅',
        date: new Date().toISOString().split('T')[0],
        summary: 'تم استخراج البيانات وربطها بمسودة الحالة السريرية بنجاح.',
      };
      setDocuments([newDoc, ...documents]);
      setUploading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>المستندات والتقارير الطبية (OCR Pipeline) 📄</Text>
        <Text style={styles.subtitle}>
          يتم استخراج البيانات الطبية تلقائياً وتلخيصها لعرضها على الطبيب
        </Text>

        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={handleUploadNew}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.uploadBtnText}>+ رفع تقرير أو تحليل جديد</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.docCard}>
            <View style={styles.docTop}>
              <View
                style={[
                  styles.statusBadge,
                  doc.status === 'ocr_completed'
                    ? styles.statusBadgeSuccess
                    : styles.statusBadgePending,
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    doc.status === 'ocr_completed'
                      ? styles.statusSuccessText
                      : styles.statusPendingText,
                  ]}
                >
                  {doc.statusLabel}
                </Text>
              </View>
              <Text style={styles.categoryTag}>{doc.categoryLabel}</Text>
            </View>

            <Text style={styles.fileName}>{doc.fileName}</Text>
            <Text style={styles.docDate}>تاريخ الإضافة: {doc.date}</Text>

            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>الملخص الطبي المستخرج:</Text>
              <Text style={styles.summaryText}>{doc.summary}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'right',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'right',
    marginBottom: 14,
  },
  uploadBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  uploadBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  docCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  docTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeSuccess: {
    backgroundColor: '#DCFCE7',
  },
  statusBadgePending: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusSuccessText: {
    color: '#15803D',
  },
  statusPendingText: {
    color: '#B45309',
  },
  categoryTag: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  fileName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'right',
    marginBottom: 4,
  },
  docDate: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'right',
    marginBottom: 10,
  },
  summaryBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderRightWidth: 3,
    borderRightColor: '#2563EB',
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'right',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'right',
    lineHeight: 18,
  },
});
