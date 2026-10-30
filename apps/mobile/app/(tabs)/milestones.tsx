import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const INITIAL_SKILLS = [
  {
    id: 'm1',
    domain: 'motor',
    domainLabel: 'حركي',
    title: 'الجلوس المستقل دون مساعدة',
    desc: 'يجلس على الأرض بمفرده ويداه حرتان للعب لمدة دقيقتين على الأقل.',
    status: 'independent',
  },
  {
    id: 'm2',
    domain: 'motor',
    domainLabel: 'حركي',
    title: 'الوقوف بالاستناد على الأثاث (Cruising)',
    desc: 'يقف مستنداً على الطاولة أو الأريكة ويتحرك بخطوات جانبية مستنداً.',
    status: 'with_assistance',
  },
  {
    id: 'm3',
    domain: 'motor',
    domainLabel: 'حركي',
    title: 'المشي المستقل عبر الغرفة (10 خطوات)',
    desc: 'يمشي بمفرده دون مساعدة أو مسك بالأيدي لمسافة لا تقل عن 10 خطوات.',
    status: 'not_started',
  },
  {
    id: 's1',
    domain: 'speech',
    domainLabel: 'تخاطبي',
    title: 'استخدام الإشارات والكلمات المفردة (3-5 كلمات)',
    desc: 'يستخدم كلمات وظيفية واضحة أو إشارات لطلب الأشياء الأساسية (ماما، بابا، ماء، باي).',
    status: 'independent',
  },
  {
    id: 's2',
    domain: 'speech',
    domainLabel: 'تخاطبي',
    title: 'تركيب جملة من كلمتين (عايز ماء)',
    desc: 'يركب جملة بسيطة مكونة من كلمتين للتعبير عن احتياجاته ورغباته.',
    status: 'with_assistance',
  },
  {
    id: 'c1',
    domain: 'cognitive',
    domainLabel: 'معرفي',
    title: 'مفهوم ثبات الأشياء والبحث عن لعبة مخفية',
    desc: 'يبحث بنشاط عن لعبة مغطاة جزئياً أو كلياً تحت قطعة قماش.',
    status: 'mastered_outside',
  },
];

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  not_started: { label: 'لم تبدأ بعد', color: '#64748B', bg: '#F1F5F9' },
  with_assistance: { label: 'بمساعدة 🤝', color: '#D97706', bg: '#FEF3C7' },
  independent: { label: 'مستقل بمفرده 🌟', color: '#2563EB', bg: '#EFF6FF' },
  mastered_outside: { label: 'متقنة تماماً 🏆', color: '#16A34A', bg: '#DCFCE7' },
};

const NEXT_STATUS: Record<string, string> = {
  not_started: 'with_assistance',
  with_assistance: 'independent',
  independent: 'mastered_outside',
  mastered_outside: 'not_started',
};

export default function MilestonesScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'motor' | 'speech' | 'cognitive'>('all');
  const [skills, setSkills] = useState(INITIAL_SKILLS);

  const cycleStatus = (id: string) => {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = NEXT_STATUS[s.status] || 'not_started';
          return { ...s, status: next };
        }
        return s;
      }),
    );
  };

  const filtered = activeTab === 'all' ? skills : skills.filter((s) => s.domain === activeTab);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>سلم الاستقلالية والتطور (Milestones) 🪜</Text>
        <Text style={styles.subtitle}>
          اضغط على بطاقة المهارة لتحديث درجة الاستقلالية للطفل
        </Text>

        {/* Domain Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {[
            { key: 'all', label: 'الكل' },
            { key: 'motor', label: 'الحركي 🏃' },
            { key: 'speech', label: 'التخاطبي 🗣️' },
            { key: 'cognitive', label: 'المعرفي 🧩' },
          ].map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[styles.filterPill, activeTab === item.key && styles.filterPillActive]}
              onPress={() => setActiveTab(item.key as any)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeTab === item.key && styles.filterPillTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {filtered.map((skill) => {
          const statusInfo = STATUS_LABELS[skill.status];
          return (
            <TouchableOpacity
              key={skill.id}
              style={styles.card}
              onPress={() => cycleStatus(skill.id)}
              activeOpacity={0.7}
            >
              <View style={styles.cardTop}>
                <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                  <Text style={[styles.statusBadgeText, { color: statusInfo.color }]}>
                    {statusInfo.label}
                  </Text>
                </View>
                <View style={styles.domainTag}>
                  <Text style={styles.domainTagText}>{skill.domainLabel}</Text>
                </View>
              </View>

              <Text style={styles.skillTitle}>{skill.title}</Text>
              <Text style={styles.skillDesc}>{skill.desc}</Text>

              <View style={styles.cardFooter}>
                <Text style={styles.tapToCycleText}>اضغط لتعديل مستوى الاستقلالية ↻</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
    fontSize: 20,
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
  filterRow: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  filterPillActive: {
    backgroundColor: '#2563EB',
  },
  filterPillText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  domainTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  domainTagText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  skillTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'right',
    marginBottom: 6,
  },
  skillDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    textAlign: 'right',
    marginBottom: 12,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
    alignItems: 'flex-start',
  },
  tapToCycleText: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '600',
  },
});
