import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFontSize } from '../../contexts/FontSizeContext';

const experts = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    specialization: 'Rainwater Harvesting Expert',
    experience: '15+ years',
    rating: 4.8,
    reviews: 124,
    availability: 'Available',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    specialization: 'Civil Engineer',
    experience: '10+ years',
    rating: 4.9,
    reviews: 89,
    availability: 'Available',
  },
  {
    id: 3,
    name: 'Arun Menon',
    specialization: 'Groundwater Specialist',
    experience: '12+ years',
    rating: 4.7,
    reviews: 156,
    availability: 'Busy',
  },
];

export default function Expert() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { fontScale } = useFontSize();
  const [selectedTab, setSelectedTab] = useState<'book' | 'appointments'>('book');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 24 * fontScale,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14 * fontScale,
      color: colors.textSecondary,
    },
    tabs: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      paddingVertical: 14,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: 14 * fontScale,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    activeTabText: {
      color: colors.primary,
    },
    content: {
      flex: 1,
    },
    banner: {
      backgroundColor: colors.success + '15',
      marginHorizontal: 20,
      marginTop: 20,
      padding: 16,
      borderRadius: 8,
      borderLeftWidth: 3,
      borderLeftColor: colors.success,
    },
    bannerTitle: {
      fontSize: 16 * fontScale,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    bannerText: {
      fontSize: 14 * fontScale,
      color: colors.textSecondary,
    },
    expertCard: {
      backgroundColor: colors.card,
      marginHorizontal: 20,
      marginTop: 16,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    expertHeader: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 8,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
    alignItems: 'center',
    },
    expertInfo: {
      flex: 1,
      marginLeft: 12,
    },
    expertName: {
      fontSize: 16 * fontScale,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    expertSpec: {
      fontSize: 14 * fontScale,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    expertMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    expertMetaText: {
      fontSize: 12 * fontScale,
      color: colors.textSecondary,
    },
    availabilityBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    availableBadge: {
      backgroundColor: colors.success + '20',
    },
    busyBadge: {
      backgroundColor: colors.error + '20',
    },
    availabilityText: {
      fontSize: 12 * fontScale,
      fontWeight: '600',
    },
    availableText: {
      color: colors.success,
    },
    busyText: {
      color: colors.error,
    },
    expertFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    ratingText: {
      fontSize: 14 * fontScale,
      fontWeight: '700',
      color: colors.text,
    },
    reviewsText: {
      fontSize: 12 * fontScale,
      color: colors.textSecondary,
    },
    bookButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 10,
      borderRadius: 6,
    },
    bookButtonText: {
      fontSize: 14 * fontScale,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: 80,
      paddingHorizontal: 40,
    },
    emptyTitle: {
      fontSize: 20 * fontScale,
      fontWeight: '700',
      color: colors.text,
      marginTop: 16,
    },
    emptyText: {
      fontSize: 14 * fontScale,
      color: colors.textSecondary,
      marginTop: 8,
      textAlign: 'center',
    },
    primaryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 32,
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 24,
    },
    primaryButtonText: {
      fontSize: 14 * fontScale,
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expert Consultation</Text>
        <Text style={styles.headerSubtitle}>Book certified water experts</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'book' && styles.activeTab]}
          onPress={() => setSelectedTab('book')}
        >
          <Text style={[styles.tabText, selectedTab === 'book' && styles.activeTabText]}>
            Book Expert
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'appointments' && styles.activeTab]}
          onPress={() => setSelectedTab('appointments')}
        >
          <Text
            style={[styles.tabText, selectedTab === 'appointments' && styles.activeTabText]}
          >
            My Appointments
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === 'book' ? (
          <>
            {/* Banner */}
            <View style={styles.banner}>
              <Text style={styles.bannerTitle}>Free Consultation</Text>
              <Text style={styles.bannerText}>First 3 visits are completely free</Text>
            </View>

            {/* Experts */}
            {experts.map((expert) => (
              <View key={expert.id} style={styles.expertCard}>
                <View style={styles.expertHeader}>
                  <View style={styles.avatar}>
                    <FontAwesome5 name="user-tie" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.expertInfo}>
                    <Text style={styles.expertName}>{expert.name}</Text>
                    <Text style={styles.expertSpec}>{expert.specialization}</Text>
                    <View style={styles.expertMeta}>
                      <MaterialCommunityIcons name="briefcase" size={12} color={colors.textSecondary} />
                      <Text style={styles.expertMetaText}>{expert.experience}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.availabilityBadge,
                      expert.availability === 'Available'
                        ? styles.availableBadge
                        : styles.busyBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.availabilityText,
                        expert.availability === 'Available'
                          ? styles.availableText
                          : styles.busyText,
                      ]}
                    >
                      {expert.availability}
                    </Text>
                  </View>
                </View>

                <View style={styles.expertFooter}>
                  <View style={styles.rating}>
                    <MaterialCommunityIcons name="star" size={14} color={colors.warning} />
                    <Text style={styles.ratingText}>{expert.rating}</Text>
                    <Text style={styles.reviewsText}>({expert.reviews})</Text>
                  </View>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="calendar-blank" size={64} color={colors.border} />
            <Text style={styles.emptyTitle}>No Appointments</Text>
            <Text style={styles.emptyText}>Book your first expert consultation</Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setSelectedTab('book')}
            >
              <Text style={styles.primaryButtonText}>Book Expert</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
