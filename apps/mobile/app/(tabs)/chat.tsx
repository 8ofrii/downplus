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
  Modal,
} from 'react-native';
import { Colors, Shadows } from '../../constants/theme';
import { api } from '../../services/api';

interface DoctorCard {
  doctor_id: string;
  name: string;
  specialty: string;
  city: string;
  fee: number;
  match_score: number;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  recommendedDoctors?: DoctorCard[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'assistant',
    text: 'أهلاً بك يا فندم في المساعد الذكي التخصصي لـ Down Plus 🩺.\nأنا هنا لدعمك في الإجابة على أي استفسارات تتعلق بتطور طفلك الحركي، التخاطبي، أو الفحوصات الطبية الدورية وفق الدليل السريري للأكاديمية الأمريكية لطب الأطفال (AAP).\n\nكيف يمكنني مساعدتك أنت وعمر اليوم؟',
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookedDoctor, setBookedDoctor] = useState<string | null>(null);

  // In-App Doctor Booking & Telehealth Consultation Flow
  const [bookingDoctor, setBookingDoctor] = useState<DoctorCard | null>(null);
  const [bookingMode, setBookingMode] = useState<'clinic' | 'telehealth'>('clinic');
  const [selectedSlot, setSelectedSlot] = useState<string>('الأربعاء 6:00 م');
  const [paymentMethod, setPaymentMethod] = useState<'vodafone_cash' | 'card'>('vodafone_cash');
  const [bookingProcessing, setBookingProcessing] = useState(false);
  const [confirmedVoucher, setConfirmedVoucher] = useState<{
    id: string;
    doctorName: string;
    slot: string;
    mode: string;
    fee: number;
  } | null>(null);

  const handleConfirmBooking = () => {
    if (!bookingDoctor) return;
    setBookingProcessing(true);
    setTimeout(() => {
      setBookingProcessing(false);
      setBookedDoctor(bookingDoctor.doctor_id);
      const voucher = {
        id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        doctorName: bookingDoctor.name,
        slot: selectedSlot,
        mode: bookingMode === 'clinic' ? 'كشف بالعيادة' : 'استشارة فيديو أونلاين',
        fee: bookingDoctor.fee,
      };
      setConfirmedVoucher(voucher);
    }, 1200);
  };

  const handleSend = async (presetText?: string) => {
    const textToSend = presetText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!presetText) setInput('');
    setLoading(true);

    try {
      const res = await api.sendChatMessage(api.getActiveChildId(), textToSend);
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: res.response_text,
        recommendedDoctors: res.recommended_doctors,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      // Offline fallback with rich clinical demo response
      setTimeout(() => {
        let fallbackReply =
          'بناءً على ملف عمر السريري (31 شهراً - Trisomy 21)، يُنصح بالتركيز على تمارين تقوية عضلات الحوض والركبتين لدعم ثبات المشي. كما نذكرك بأن فحص الغدة الدرقية (TSH & FT4) مستحق هذا الشهر لضبط جرعة الإيلتروكسين.';

        let docs: DoctorCard[] = [];
        if (textToSend.includes('تأهيل') || textToSend.includes('مشي') || textToSend.includes('طبيب')) {
          docs = [
            {
              doctor_id: 'd1',
              name: 'د. هاني مصطفى',
              specialty: 'استشاري تأهيل وعلاج طبيعي للأطفال',
              city: 'الجيزة / المهندسين',
              fee: 400,
              match_score: 98,
            },
          ];
        }

        const fallbackMsg: Message = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: fallbackReply,
          recommendedDoctors: docs.length > 0 ? docs : undefined,
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }, 700);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* Ambient background glow */}
      <View style={styles.ambientContainer} pointerEvents="none">
        <View style={[styles.ambientOrb, styles.orbTop]} />
        <View style={[styles.ambientOrb, styles.orbBottom]} />
      </View>

      {/* ── Top Clinical Header Bar ── */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarBot}>
            <Text style={{ fontSize: 20 }}>🩺</Text>
          </View>
          <View>
            <View style={styles.headerTitleRow}>
              <Text style={styles.headerTitle}>المستشار السريري الذكي</Text>
              <View style={styles.activePill}>
                <View style={styles.activeDot} />
                <Text style={styles.activeText}>متصل</Text>
              </View>
            </View>
            <Text style={styles.headerSub}>دليل AAP لمتلازمة داون • خصوصية سريرية تامة</Text>
          </View>
        </View>
      </View>

      {/* ── Message Stream ── */}
      <ScrollView contentContainerStyle={styles.messagesScroll} showsVerticalScrollIndicator={false}>
        {messages.map((m) => (
          <View
            key={m.id}
            style={[
              styles.messageRow,
              m.sender === 'user' ? styles.messageRowUser : styles.messageRowAssistant,
            ]}
          >
            {m.sender === 'assistant' && (
              <View style={styles.bubbleAvatar}>
                <Text style={{ fontSize: 16 }}>🧬</Text>
              </View>
            )}

            <View
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

              {/* Recommended Doctors Embedded Cards */}
              {m.recommendedDoctors && m.recommendedDoctors.length > 0 && (
                <View style={styles.doctorsSection}>
                  <Text style={styles.doctorsSectionTitle}>الأطباء الشركاء المقترحون للحالة 🩺:</Text>
                  {m.recommendedDoctors.map((doc) => (
                    <View key={doc.doctor_id} style={styles.docCard}>
                      <View style={styles.docCardTop}>
                        <View style={styles.docAvatar}>
                          <Text style={{ fontSize: 22 }}>👨‍⚕️</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.docName}>{doc.name}</Text>
                          <Text style={styles.docSpec}>{doc.specialty}</Text>
                          <Text style={styles.docCity}>📍 {doc.city}</Text>
                        </View>
                        <View style={styles.matchScoreBadge}>
                          <Text style={styles.matchScoreText}>{doc.match_score}% تطابق</Text>
                        </View>
                      </View>

                      <View style={styles.docCardBottom}>
                        <Text style={styles.docFee}>سعر الكشف: {doc.fee} ج.م</Text>
                        <TouchableOpacity
                          style={[
                            styles.bookDocBtn,
                            bookedDoctor === doc.doctor_id && styles.bookDocBtnDone,
                          ]}
                          onPress={() => setBookingDoctor(doc)}
                          activeOpacity={0.85}
                        >
                          <Text style={styles.bookDocBtnText}>
                            {bookedDoctor === doc.doctor_id ? 'تم الحجز ✓' : 'حجز موعد الآن'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}

        {loading && (
          <View style={styles.loadingRow}>
            <View style={styles.loadingBubble}>
              <ActivityIndicator color={Colors.primary} size="small" />
              <Text style={styles.loadingText}>جاري مراجعة البروتوكول السريري...</Text>
            </View>
          </View>
        )}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* ── Preset Prompt Suggestion Pills ── */}
      <View style={styles.presetsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.presetsScroll}>
          {[
            'تمارين تقوية عضلات الجذع والمشي 🏃',
            'فحص الغدة الدرقية السنوي (TSH) 🩸',
            'كيف نطور الكلمات الأولى والإشارات؟ 🗣️',
          ].map((prompt, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.presetPill}
              onPress={() => handleSend(prompt)}
              activeOpacity={0.8}
            >
              <Text style={styles.presetPillText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ── Floating Glass Input Bar ── */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.inputField}
          placeholder="اسأل المستشار الطبي عن تطور عمر أو الفحوصات..."
          placeholderTextColor={Colors.textTertiary}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => handleSend()}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => handleSend()}
          activeOpacity={0.85}
          disabled={!input.trim()}
        >
          <Text style={styles.sendButtonText}>إرسال</Text>
        </TouchableOpacity>
      </View>

      {/* ── Interactive Doctor Booking Modal ── */}
      <Modal visible={!!bookingDoctor} transparent animationType="slide">
        <View style={styles.bookingModalOverlay}>
          <View style={styles.bookingModalCard}>
            {confirmedVoucher ? (
              // Booking Confirmed Voucher View
              <View style={styles.voucherContainer}>
                <View style={styles.voucherCheckCircle}>
                  <Text style={{ fontSize: 32 }}>🎉</Text>
                </View>
                <Text style={styles.voucherTitle}>تم تأكيد الحجز بنجاح!</Text>
                <Text style={styles.voucherSub}>
                  تم تسجيل الموعد وإرسال تأكيد الحجز والفاتورة عبر واتساب
                </Text>

                <View style={styles.voucherDetailsCard}>
                  <View style={styles.voucherRow}>
                    <Text style={styles.voucherLabel}>رقم الحجز المرجعي:</Text>
                    <Text style={styles.voucherValueHighlight}>{confirmedVoucher.id}</Text>
                  </View>
                  <View style={styles.voucherRow}>
                    <Text style={styles.voucherLabel}>الطبيب المعالج:</Text>
                    <Text style={styles.voucherValue}>{confirmedVoucher.doctorName}</Text>
                  </View>
                  <View style={styles.voucherRow}>
                    <Text style={styles.voucherLabel}>الموعد المحدد:</Text>
                    <Text style={styles.voucherValue}>{confirmedVoucher.slot}</Text>
                  </View>
                  <View style={styles.voucherRow}>
                    <Text style={styles.voucherLabel}>نوع الاستشارة:</Text>
                    <Text style={styles.voucherValue}>{confirmedVoucher.mode}</Text>
                  </View>
                  <View style={styles.voucherRow}>
                    <Text style={styles.voucherLabel}>المبلغ المدفوع:</Text>
                    <Text style={[styles.voucherValue, { color: Colors.primary, fontWeight: '800' }]}>
                      {confirmedVoucher.fee} ج.م
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeVoucherBtn}
                  onPress={() => {
                    setConfirmedVoucher(null);
                    setBookingDoctor(null);
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={styles.closeVoucherText}>إغلاق والعودة للمحادثة</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // Booking Options View
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.bookingHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.bookingTitle}>حجز موعد استشارة طبية 🩺</Text>
                    <Text style={styles.bookingSub}>
                      {bookingDoctor?.name} • {bookingDoctor?.specialty}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setBookingDoctor(null)}
                    style={styles.bookingCloseBtn}
                  >
                    <Text style={styles.bookingCloseText}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* Consultation Mode Switcher */}
                <Text style={styles.fieldSectionLabel}>اختر نوع الاستشارة:</Text>
                <View style={styles.modeSwitcher}>
                  <TouchableOpacity
                    style={[styles.modeBtn, bookingMode === 'clinic' && styles.modeBtnActive]}
                    onPress={() => setBookingMode('clinic')}
                    activeOpacity={0.85}
                  >
                    <Text style={{ fontSize: 18 }}>🏥</Text>
                    <Text style={[styles.modeBtnText, bookingMode === 'clinic' && styles.modeBtnTextActive]}>
                      كشف بالعيادة
                    </Text>
                    <Text style={styles.modeSubText}>({bookingDoctor?.city})</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modeBtn, bookingMode === 'telehealth' && styles.modeBtnActive]}
                    onPress={() => setBookingMode('telehealth')}
                    activeOpacity={0.85}
                  >
                    <Text style={{ fontSize: 18 }}>📹</Text>
                    <Text style={[styles.modeBtnText, bookingMode === 'telehealth' && styles.modeBtnTextActive]}>
                      استشارة فيديو
                    </Text>
                    <Text style={styles.modeSubText}>(أونلاين مشفرة)</Text>
                  </TouchableOpacity>
                </View>

                {/* Slot Selection */}
                <Text style={styles.fieldSectionLabel}>اختر الموعد المتاح:</Text>
                <View style={styles.slotsGrid}>
                  {['اليوم 6:00 م', 'غداً 4:30 م', 'الخميس 7:00 م', 'السبت 5:00 م'].map((slot) => (
                    <TouchableOpacity
                      key={slot}
                      style={[styles.slotChip, selectedSlot === slot && styles.slotChipActive]}
                      onPress={() => setSelectedSlot(slot)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.slotChipText, selectedSlot === slot && styles.slotChipTextActive]}>
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Payment Selection */}
                <Text style={styles.fieldSectionLabel}>طريقة السداد:</Text>
                <View style={styles.paymentMethods}>
                  <TouchableOpacity
                    style={[styles.paymentCard, paymentMethod === 'vodafone_cash' && styles.paymentCardActive]}
                    onPress={() => setPaymentMethod('vodafone_cash')}
                    activeOpacity={0.85}
                  >
                    <Text style={{ fontSize: 20 }}>📱</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.paymentTitle}>محفظة إلكترونية (فودافون / أورنج كاش)</Text>
                      <Text style={styles.paymentSub}>تحويل فوري بدون رسوم إضافية</Text>
                    </View>
                    <View style={[styles.radioCircle, paymentMethod === 'vodafone_cash' && styles.radioCircleActive]} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.paymentCard, paymentMethod === 'card' && styles.paymentCardActive]}
                    onPress={() => setPaymentMethod('card')}
                    activeOpacity={0.85}
                  >
                    <Text style={{ fontSize: 20 }}>💳</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.paymentTitle}>بطاقة بنكية (ميزة / فيزا / ماستركارد)</Text>
                      <Text style={styles.paymentSub}>دفع إلكتروني آمن عبر Paymob</Text>
                    </View>
                    <View style={[styles.radioCircle, paymentMethod === 'card' && styles.radioCircleActive]} />
                  </TouchableOpacity>
                </View>

                {/* Fee Breakdown */}
                <View style={styles.feeBreakdownCard}>
                  <View style={styles.feeRow}>
                    <Text style={styles.feeLabel}>قيمة الكشف:</Text>
                    <Text style={styles.feeValue}>{bookingDoctor?.fee} ج.م</Text>
                  </View>
                  <View style={styles.feeRow}>
                    <Text style={styles.feeLabel}>رسوم المنصة والمراجعة الإكلينيكية (15%):</Text>
                    <Text style={[styles.feeValue, { color: '#059669' }]}>شاملة مجاناً</Text>
                  </View>
                  <View style={[styles.feeRow, { borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 6 }]}>
                    <Text style={[styles.feeLabel, { fontWeight: '800', color: '#0F172A' }]}>الإجمالي للدفع:</Text>
                    <Text style={[styles.feeValue, { fontWeight: '900', color: Colors.primary, fontSize: 16 }]}>
                      {bookingDoctor?.fee} ج.م
                    </Text>
                  </View>
                </View>

                {/* Confirm Action Button */}
                <TouchableOpacity
                  style={styles.confirmBookingBtn}
                  onPress={handleConfirmBooking}
                  disabled={bookingProcessing}
                  activeOpacity={0.85}
                >
                  {bookingProcessing ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.confirmBookingBtnText}>تأكيد الحجز والدفع الآن 💳</Text>
                  )}
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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

  // Header Bar
  headerBar: {
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: Colors.glassSurfaceElevated,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.glassBorder,
    ...Shadows.glass,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarBot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  activeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
  headerSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  // Messages
  messagesScroll: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 14,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowAssistant: {
    justifyContent: 'flex-start',
  },
  bubbleAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.5,
    ...Shadows.glass,
  },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderBottomRightRadius: 6,
  },
  bubbleAssistant: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderColor: Colors.glassBorder,
    borderBottomLeftRadius: 6,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 22,
  },
  bubbleTextUser: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bubbleTextAssistant: {
    color: Colors.textPrimary,
  },

  // Doctors Inside Chat
  doctorsSection: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    gap: 10,
  },
  doctorsSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  docCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 10,
  },
  docCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  docAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.canvasBase,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  docSpec: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  docCity: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
  matchScoreBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  matchScoreText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
  },
  docCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: Colors.canvasBase,
  },
  docFee: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  bookDocBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
  },
  bookDocBtnDone: {
    backgroundColor: '#059669',
  },
  bookDocBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  // Loading
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingBubble: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderColor: Colors.glassBorder,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...Shadows.glass,
  },
  loadingText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // Presets
  presetsContainer: {
    paddingVertical: 6,
    backgroundColor: 'transparent',
  },
  presetsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  presetPill: {
    backgroundColor: Colors.glassSurfaceElevated,
    borderColor: Colors.glassBorder,
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    ...Shadows.glass,
  },
  presetPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },

  // Input Bar
  inputBar: {
    marginBottom: Platform.OS === 'ios' ? 90 : 80,
    marginHorizontal: 14,
    backgroundColor: Colors.glassSurfaceElevated,
    borderRadius: 28,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    ...Shadows.glassElevated,
  },
  inputField: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 10,
    ...Shadows.glowPrimary,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },

  // Booking Modal Styles
  bookingModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  bookingModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    maxHeight: '85%',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bookingTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0F172A',
  },
  bookingSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  bookingCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingCloseText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#64748B',
  },
  fieldSectionLabel: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
    marginTop: 6,
  },
  modeSwitcher: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  modeBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    gap: 4,
  },
  modeBtnActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  modeBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#475569',
  },
  modeBtnTextActive: {
    color: '#047857',
  },
  modeSubText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  slotChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  slotChipActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  slotChipText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
  },
  slotChipTextActive: {
    color: '#047857',
    fontWeight: '800',
  },
  paymentMethods: {
    gap: 8,
    marginBottom: 14,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  paymentCardActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  paymentTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  paymentSub: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 1,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#CBD5E1',
  },
  radioCircleActive: {
    borderColor: '#10B981',
    backgroundColor: '#10B981',
  },
  feeBreakdownCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    gap: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  feeValue: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  confirmBookingBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...Shadows.glowPrimary,
  },
  confirmBookingBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  // Voucher View
  voucherContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  voucherCheckCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#6EE7B7',
  },
  voucherTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#065F46',
  },
  voucherSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: '85%',
  },
  voucherDetailsCard: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginVertical: 8,
  },
  voucherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voucherLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  voucherValue: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  voucherValueHighlight: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0284C7',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  closeVoucherBtn: {
    width: '100%',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginTop: 6,
  },
  closeVoucherText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#334155',
  },
});
