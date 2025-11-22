import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFontSize } from '../../contexts/FontSizeContext';
import axios from 'axios';

const EXPO_PUBLIC_BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function Dashboard() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { fontScale } = useFontSize();
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    rainfall: 45,
    groundwaterDepth: 12.5,
    tankLevel: 75,
    litersSaved: 1250,
    carbonSaved: 3.2,
    efficiency: 85,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      console.log('Loading dashboard data...');
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 20,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    greeting: {
      fontSize: 14 * fontScale,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    appName: {
      fontSize: 28 * fontScale,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.5,
    },
    notificationButton: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
    },
    alertCard: {
      flexDirection: 'row',
      backgroundColor: colors.warning + '15',
      marginHorizontal: 20,
      marginTop: 16,
      padding: 16,
      borderRadius: 8,
      borderLeftWidth: 3,
      borderLeftColor: colors.warning,
    },
    alertContent: {
      marginLeft: 12,
      flex: 1,
    },
    alertTitle: {
      fontSize: 16 * fontScale,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    alertText: {
      fontSize: 14 * fontScale,
      color: colors.textSecondary,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 20,
      marginTop: 24,
      gap: 12,
    },
    statCard: {
      width: '48%',
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statValue: {
      fontSize: 24 * fontScale,
      fontWeight: '700',
      color: colors.text,
      marginTop: 8,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12 * fontScale,
      color: colors.textSecondary,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    section: {
      marginTop: 32,
      paddingHorizontal: 20,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18 * fontScale,
      fontWeight: '700',
      color: colors.text,
    },
    seeAll: {
      fontSize: 14 * fontScale,
      fontWeight: '600',
      color: colors.primary,
    },
    dataCard: {
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dataRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dataLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    dataLabel: {
      fontSize: 14 * fontScale,
      color: colors.textSecondary,
      marginLeft: 12,
    },
    dataValue: {
      fontSize: 18 * fontScale,
      fontWeight: '700',
      color: colors.text,
    },
    progressBar: {
      width: '100%',
      height: 6,
      backgroundColor: colors.border,
      borderRadius: 3,
      marginTop: 12,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 3,
    },
    actionGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    actionButton: {
      width: '48%',
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    actionText: {
      marginTop: 12,
      fontSize: 14 * fontScale,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
    },
    impactCard: {
      backgroundColor: colors.primary + '15',
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primary + '30',
    },
    impactValue: {
      fontSize: 28 * fontScale,
      fontWeight: '700',
      color: colors.primary,
      marginTop: 12,
    },
    impactText: {
      fontSize: 14 * fontScale,
      color: colors.text,
      marginTop: 8,
      textAlign: 'center',
    },
    impactSubtext: {
      fontSize: 12 * fontScale,
      color: colors.textSecondary,
      marginTop: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.appName}>VARUN</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      >
        {/* Alert */}
        <View style={styles.alertCard}>
          <MaterialCommunityIcons name="alert-circle" size={24} color={colors.warning} />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Rain Alert</Text>
            <Text style={styles.alertText}>Expected tomorrow. Clean filters today.</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="water" size={24} color={colors.primary} />
            <Text style={styles.statValue}>{dashboardData.litersSaved}L</Text>
            <Text style={styles.statLabel}>{t('waterSaved')}</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons name="leaf" size={24} color={colors.success} />
            <Text style={styles.statValue}>{dashboardData.carbonSaved}kg</Text>
            <Text style={styles.statLabel}>{t('carbonSaved')}</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons name="gauge" size={24} color={colors.primary} />
            <Text style={styles.statValue}>{dashboardData.efficiency}%</Text>
            <Text style={styles.statLabel}>{t('efficiency')}</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons name="water-well" size={24} color={colors.textSecondary} />
            <Text style={styles.statValue}>{dashboardData.groundwaterDepth}m</Text>
            <Text style={styles.statLabel}>GW Depth</Text>
          </View>
        </View>

        {/* Real-time Data */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Real-Time Data</Text>
          </View>

          <View style={styles.dataCard}>
            <View style={styles.dataRow}>
              <View style={styles.dataLeft}>
                <MaterialCommunityIcons name="weather-pouring" size={20} color={colors.primary} />
                <Text style={styles.dataLabel}>Rainfall Today</Text>
              </View>
              <Text style={styles.dataValue}>{dashboardData.rainfall} mm</Text>
            </View>
          </View>

          <View style={styles.dataCard}>
            <View style={styles.dataRow}>
              <View style={styles.dataLeft}>
                <MaterialCommunityIcons name="water-opacity" size={20} color={colors.primary} />
                <Text style={styles.dataLabel}>Tank Level</Text>
              </View>
              <Text style={styles.dataValue}>{dashboardData.tankLevel}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${dashboardData.tankLevel}%` }]} />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/(tabs)/assess')}>
              <MaterialCommunityIcons name="water-check" size={32} color={colors.primary} />
              <Text style={styles.actionText}>New Assessment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/(tabs)/expert')}>
              <MaterialCommunityIcons name="account-tie" size={32} color={colors.primary} />
              <Text style={styles.actionText}>Book Expert</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="robot" size={32} color={colors.primary} />
              <Text style={styles.actionText}>Varun AI</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="radar" size={32} color={colors.primary} />
              <Text style={styles.actionText}>IoT Sensors</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Impact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Monthly Impact</Text>
          </View>
          <View style={styles.impactCard}>
            <MaterialCommunityIcons name="water-plus" size={40} color={colors.primary} />
            <Text style={styles.impactValue}>1,200 Liters</Text>
            <Text style={styles.impactText}>Recharged this month</Text>
            <Text style={styles.impactSubtext}>≈ 2 tanker lorries avoided</Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
