import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { api } from '../../services/api';

export default function ProfileScreen() {
  const [sharing, setSharing] = useState(false);
  const [shareData, setShareData] = useState<any>(null);

  const handleGenerateShareLink = async () => {
    try {
      setSharing(true);
      const res = await api.generateShareToken('demo-child-id', 48);
      setShareData(res);
      Alert.alert(
        'تم توليد رابط المشاركة الآمن بنجاح 🔗',
        `الرابط صالح لمدة 48 ساعة فقط:\n${res.share_url}`,
      );
    } catch {
      Alert.alert(
        'رابط مشاركة تجريبي',
        'https://downplus.health/guest/view?token=exp_demo_7d8a9b2c4e5f (صالح لمدة 48 ساعة)',
      );
    } finally {
      setSharing(false);
    }
  };

  const handleExportPassport = () => {
    Alert.alert(
      'تصدير وثيقة جواز الحياة (Life Passport PDF) 🛂',
      'جاري تجميع السجل التطوري، قائمة الأدوية، والفحوصات المعتمدة في ملف PDF طبي جاهز للمشاركة والطباعة...',
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 32 }}>👨‍👩‍👧</Text>
        </View>
        <Text style={styles.userName}>عائلة أحمد</Text>
        <Text style={styles.userEmail}>parent.demo@downplus.health</Text>
        <View style={styles.proBadge}>
          <Text style={styles.proBadgeText}>⭐ اشتراك مميز (Parent Pro Plan)</Text>
        </View>
      </View>

      {/* Life Passport Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.cardTitle}>جواز الحياة الرقمي (Life Passport) 🛂</Text>
        <Text style={styles.cardDesc}>
          وثيقة سريرية شاملة وموجزة تتضمن التطور الحركي، سجل الفحوصات المعتمدة، وجرعات الأدوية لمشاركتها مع المدارس أو الأطباء الجدد.
        </Text>
        <TouchableOpacity style={styles.actionBtn} onPress={handleExportPassport}>
          <Text style={styles.actionBtnText}>تصدير وثيقة PDF معتمدة 📥</Text>
        </TouchableOpacity>
      </View>

      {/* Secure Doctor Sharing */}
      <View style={styles.sectionCard}>
        <Text style={styles.cardTitle}>مشاركة الملف مع طبيب خارجي (Time-Limited) 🔒</Text>
        <Text style={styles.cardDesc}>
          توليد رابط مشفر ورمز QR مؤقت (صالح لـ 48 ساعة) يتيح لطبيبك قراءة السجل السريري مباشرة دون الحاجة لإنشاء حساب.
        </Text>
        <TouchableOpacity
          style={[styles.actionBtn, styles.actionBtnOutline]}
          onPress={handleGenerateShareLink}
          disabled={sharing}
        >
          {sharing ? (
            <ActivityIndicator color="#2563EB" />
          ) : (
            <Text style={styles.actionBtnTextOutline}>توليد رابط ورمز QR جديد 🔗</Text>
          )}
        </TouchableOpacity>
        {shareData && (
          <View style={styles.shareBox}>
            <Text style={styles.shareUrl}>{shareData.share_url}</Text>
          </View>
        )}
      </View>

      {/* Subscription Card */}
      <View style={styles.sectionCard}>
        <Text style={styles.cardTitle}>الاشتراكات والمدفوعات (Paymob) 💳</Text>
        <Text style={styles.cardDesc}>
          حالة الاشتراك: فعال (يتجدد تلقائياً في 30 نوفمبر 2026).
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => router.replace('/(auth)/login')}
      >
        <Text style={styles.logoutText}>تسجيل الخروج</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 16,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  userEmail: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  proBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  proBadgeText: {
    fontSize: 12,
    color: '#B45309',
    fontWeight: 'bold',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'right',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
    textAlign: 'right',
    marginBottom: 14,
  },
  actionBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionBtnOutline: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  actionBtnTextOutline: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 14,
  },
  shareBox: {
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  shareUrl: {
    fontSize: 11,
    color: '#334155',
    textAlign: 'center',
  },
  logoutBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '600',
  },
});
