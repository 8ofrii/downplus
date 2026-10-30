import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { api } from '../../services/api';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  recommendedDoctors?: Array<{
    doctor_id: string;
    name: string;
    specialty: string;
    city: string;
    match_score: number;
  }>;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'assistant',
    text: 'أهلاً بك يا فندم في المساعد الذكي لـ Down Plus. أنا هنا لمساعدتك في فهم أي تطور حركي، تخاطبي، أو فحوصات طبية خاصة بطفلك بناءً على أحدث إرشادات طب الأطفال (AAP). كيف يمكنني دعمك اليوم؟',
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (presetText?: string) => {
    const textToSend = presetText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.sendChatMessage('demo-child-id', textToSend);
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: res.response_text,
        recommendedDoctors: res.recommended_doctors,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      // Offline fallback with doctor recommendation for demo
      setTimeout(() => {
        const fallbackMsg: Message = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: 'في متلازمة داون، يبلغ متوسط المشي المستقل عادة بين عمر سنتين إلى 3 سنوات بسبب مرونة المفاصل وضعف التوتر العضلي (Hypotonia). الخطوة السليمة حالياً تتضمن تقييم ثبات الحوض وعضلات الجذع عبر أخصائي علاج طبيعي للأطفال لتحديد الحاجة لدعامات كاحل خفيفة (SMOs) وتمارين التوازن.',
          recommendedDoctors: [
            {
              doctor_id: 'doc-1',
              name: 'د. هاني مصطفى',
              specialty: 'استشاري تأهيل وعلاج طبيعي للأطفال',
              city: 'الجيزة',
              match_score: 0.94,
            },
          ],
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.securityBadge}>
          <Text style={styles.securityBadgeText}>🔒 مشفر وخالٍ تماماً من بيانات الهوية (GDPR Safe)</Text>
        </View>
        <Text style={styles.title}>المساعد السريري الذكي (AI Copilot) 🤖</Text>
      </View>

      <ScrollView contentContainerStyle={styles.messagesList}>
        {messages.map((m) => (
          <View
            key={m.id}
            style={[
              styles.bubble,
              m.sender === 'user' ? styles.bubbleUser : styles.bubbleAssistant,
            ]}
          >
            <Text
              style={[
                styles.bubbleText,
                m.sender === 'user' ? styles.bubbleTextUser : styles.bubbleTextAssistant,
              ]}
            >
              {m.text}
            </Text>

            {/* Embedded Doctor Match Cards */}
            {m.recommendedDoctors && m.recommendedDoctors.length > 0 && (
              <View style={styles.doctorCardsContainer}>
                <Text style={styles.doctorSectionHeader}>الأطباء المطابقون للحالة (Matrix Match):</Text>
                {m.recommendedDoctors.map((doc) => (
                  <View key={doc.doctor_id} style={styles.doctorCard}>
                    <View style={styles.docAvatar}>
                      <Text style={{ fontSize: 20 }}>👨‍⚕️</Text>
                    </View>
                    <View style={styles.docInfo}>
                      <Text style={styles.docName}>{doc.name}</Text>
                      <Text style={styles.docSpec}>{doc.specialty}</Text>
                      <Text style={styles.docCity}>📍 {doc.city}</Text>
                    </View>
                    <View style={styles.matchScoreBadge}>
                      <Text style={styles.matchScoreText}>{Math.round(doc.match_score * 100)}% تطابق</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {loading && (
          <View style={[styles.bubble, styles.bubbleAssistant]}>
            <ActivityIndicator color="#2563EB" size="small" />
            <Text style={styles.thinkingText}>جاري مراجعة السياق السريري والإرشادات الطبية...</Text>
          </View>
        )}
      </ScrollView>

      {/* Suggested Quick Prompts */}
      <View style={styles.promptBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.presetChip}
            onPress={() =>
              handleSend('عمر عنده سنتين ونصف ولسه مش بيمشي وبيقع كتير، إيه الخطوة ومين دكتور في الجيزة؟')
            }
          >
            <Text style={styles.presetChipText}>👶 لسه مش بيمشي ومين دكتور بالجيزة؟</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.presetChip}
            onPress={() => handleSend('متى يجب تكرار تحليل الغدة الدرقية؟')}
          >
            <Text style={styles.presetChipText}>🩸 موعد تحليل الغدة الدرقية القادم</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.inputBar}>
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => handleSend()}
          disabled={loading}
        >
          <Text style={styles.sendBtnText}>إرسال</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.chatInput}
          value={input}
          onChangeText={setInput}
          placeholder="اسأل المساعد عن أي تطور أو استشارة..."
          placeholderTextColor="#94A3B8"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
  },
  securityBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 6,
  },
  securityBadgeText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  messagesList: {
    padding: 16,
    paddingBottom: 20,
  },
  bubble: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  bubbleUser: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    borderBottomLeftRadius: 4,
  },
  bubbleAssistant: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 22,
  },
  bubbleTextUser: {
    color: '#FFFFFF',
    textAlign: 'right',
  },
  bubbleTextAssistant: {
    color: '#1E293B',
    textAlign: 'right',
  },
  thinkingText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 6,
    textAlign: 'center',
  },
  doctorCardsContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  doctorSectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563EB',
    textAlign: 'right',
    marginBottom: 8,
  },
  doctorCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 6,
  },
  docAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  docInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  docName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  docSpec: {
    fontSize: 11,
    color: '#475569',
  },
  docCity: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  matchScoreBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  matchScoreText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#15803D',
  },
  promptBar: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  presetChip: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  presetChipText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
  inputBar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    textAlign: 'right',
  },
  sendBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  sendBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
