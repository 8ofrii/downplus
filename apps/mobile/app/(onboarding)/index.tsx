import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { api } from '../../services/api';

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Child Info
  const [firstName, setFirstName] = useState('عمر');
  const [lastName, setLastName] = useState('أحمد');
  const [dob, setDob] = useState('2024-03-15');
  const [gender, setGender] = useState('male');

  // 5 Core Screening Questions (from Task 1.2 spec)
  const [hasHeartDefect, setHasHeartDefect] = useState<boolean | null>(true);
  const [takesThyroidMed, setTakesThyroidMed] = useState<boolean | null>(true);
  const [walksIndependently, setWalksIndependently] = useState<boolean | null>(false);
  const [speaksSingleWords, setSpeaksSingleWords] = useState<boolean | null>(true);
  const [currentCenter, setCurrentCenter] = useState('مركز الأمل للتدخل المبكر - الجيزة');

  const handleFinish = async () => {
    try {
      setLoading(true);

      const comorbidities: string[] = [];
      if (hasHeartDefect) comorbidities.push('Congenital Heart Defect');
      if (takesThyroidMed) comorbidities.push('Hypothyroidism');

      await api.createChild({
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dob,
        gender,
        karyotype_type: 'Trisomy 21',
        comorbidities,
      });

      router.replace('/(tabs)/home');
    } catch (err) {
      // If unauthenticated, go to tabs anyway in demo mode
      router.replace('/(tabs)/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.stepIndicator}>الخطوة {step} من 2</Text>
        <Text style={styles.title}>
          {step === 1 ? 'بيانات الطفل الأساسية' : 'استبيان الفرز والتقييم الأولي'}
        </Text>
        <Text style={styles.subtitle}>
          {step === 1
            ? 'سجل بيانات طفلك للبدء في تنظيم السجل الطبي المخصص لمتلازمة داون'
            : '5 أسئلة جوهرية لبناء خطة التدخل الصحي والتطوري الفوري'}
        </Text>
      </View>

      {step === 1 ? (
        <View style={styles.formCard}>
          <Text style={styles.label}>اسم الطفل الأول</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="مثال: عمر"
          />

          <Text style={styles.label}>اسم العائلة</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="مثال: أحمد"
          />

          <Text style={styles.label}>تاريخ الميلاد (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={setDob}
            placeholder="2024-03-15"
          />

          <Text style={styles.label}>الجنس</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.pill, gender === 'male' && styles.pillActive]}
              onPress={() => setGender('male')}
            >
              <Text style={[styles.pillText, gender === 'male' && styles.pillTextActive]}>
                ولد 👦
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pill, gender === 'female' && styles.pillActive]}
              onPress={() => setGender('female')}
            >
              <Text style={[styles.pillText, gender === 'female' && styles.pillTextActive]}>
                بنت 👧
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
            <Text style={styles.buttonText}>المتابعة للاستبيان الأولي ←</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formCard}>
          {/* Question 1: Cardiac */}
          <Text style={styles.questionText}>1. هل يعاني الطفل من أي عيوب خلقية بالقلب؟</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.choiceBtn, hasHeartDefect === true && styles.choiceBtnActive]}
              onPress={() => setHasHeartDefect(true)}
            >
              <Text style={[styles.choiceText, hasHeartDefect === true && styles.choiceTextActive]}>
                نعم (متابع/تم إجراء إيكو)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.choiceBtn, hasHeartDefect === false && styles.choiceBtnActive]}
              onPress={() => setHasHeartDefect(false)}
            >
              <Text style={[styles.choiceText, hasHeartDefect === false && styles.choiceTextActive]}>
                لا / القلب سليم
              </Text>
            </TouchableOpacity>
          </View>

          {/* Question 2: Thyroid */}
          <Text style={styles.questionText}>2. هل يتناول الطفل علاجاً للغدة الدرقية (مثل إيلتروكسين)؟</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.choiceBtn, takesThyroidMed === true && styles.choiceBtnActive]}
              onPress={() => setTakesThyroidMed(true)}
            >
              <Text style={[styles.choiceText, takesThyroidMed === true && styles.choiceTextActive]}>
                نعم يتناول علاج
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.choiceBtn, takesThyroidMed === false && styles.choiceBtnActive]}
              onPress={() => setTakesThyroidMed(false)}
            >
              <Text style={[styles.choiceText, takesThyroidMed === false && styles.choiceTextActive]}>
                لا
              </Text>
            </TouchableOpacity>
          </View>

          {/* Question 3: Walking */}
          <Text style={styles.questionText}>3. هل يمشي الطفل بمفرده دون مساعدة؟</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.choiceBtn, walksIndependently === true && styles.choiceBtnActive]}
              onPress={() => setWalksIndependently(true)}
            >
              <Text style={[styles.choiceText, walksIndependently === true && styles.choiceTextActive]}>
                نعم يمشي باستقلالية
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.choiceBtn, walksIndependently === false && styles.choiceBtnActive]}
              onPress={() => setWalksIndependently(false)}
            >
              <Text style={[styles.choiceText, walksIndependently === false && styles.choiceTextActive]}>
                لسه / يحتاج مساعدة
              </Text>
            </TouchableOpacity>
          </View>

          {/* Question 4: Speech */}
          <Text style={styles.questionText}>4. هل ينطق الطفل كلمات مفردة واضحة ومفهومة؟</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.choiceBtn, speaksSingleWords === true && styles.choiceBtnActive]}
              onPress={() => setSpeaksSingleWords(true)}
            >
              <Text style={[styles.choiceText, speaksSingleWords === true && styles.choiceTextActive]}>
                نعم (ينطق كلمات)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.choiceBtn, speaksSingleWords === false && styles.choiceBtnActive]}
              onPress={() => setSpeaksSingleWords(false)}
            >
              <Text style={[styles.choiceText, speaksSingleWords === false && styles.choiceTextActive]}>
                أصوات وإشارات فقط
              </Text>
            </TouchableOpacity>
          </View>

          {/* Question 5: Current Follow-up */}
          <Text style={styles.questionText}>5. ما المركز أو الطبيب الذي يتابعه حالياً؟</Text>
          <TextInput
            style={styles.input}
            value={currentCenter}
            onChangeText={setCurrentCenter}
            placeholder="اسم العيادة أو المركز"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleFinish}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>حفظ ودخول مركز القيادة الأسري 🎉</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 24,
    alignItems: 'flex-end',
  },
  stepIndicator: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '700',
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'right',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'right',
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    textAlign: 'right',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 14,
    marginBottom: 10,
    textAlign: 'right',
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 14,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row-reverse',
    gap: 10,
    marginBottom: 12,
  },
  pill: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  pillActive: {
    backgroundColor: '#2563EB',
  },
  pillText: {
    color: '#475569',
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  choiceBtn: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  choiceBtnActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  choiceText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
    textAlign: 'center',
  },
  choiceTextActive: {
    color: '#2563EB',
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
