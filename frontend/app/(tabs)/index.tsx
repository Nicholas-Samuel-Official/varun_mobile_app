import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';

const EXPO_PUBLIC_BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function Dashboard() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    rainfall: 45,
    groundwaterDepth: 12.5,
    tankLevel: 75,
    litersSaved: 1250,
    carbonSaved: 3.2,
    rechargeEfficiency: 85,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock API call for now
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.appName}>Varun 💧</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#2196F3" />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2196F3']} />
        }
      >
        {/* Alert Card */}
        <View style={styles.alertCard}>
          <MaterialCommunityIcons name="weather-rainy" size={24} color="#FF9800" />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Rain Alert!</Text>
            <Text style={styles.alertText}>Rain expected tomorrow. Clean your filters today.</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
            <MaterialCommunityIcons name="water" size={32} color="#2196F3" />
            <Text style={styles.statValue}>{dashboardData.litersSaved}L</Text>
            <Text style={styles.statLabel}>Water Saved</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
            <MaterialCommunityIcons name="leaf" size={32} color="#4CAF50" />
            <Text style={styles.statValue}>{dashboardData.carbonSaved}kg</Text>
            <Text style={styles.statLabel}>Carbon Saved</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
            <MaterialCommunityIcons name="gauge" size={32} color="#FF9800" />
            <Text style={styles.statValue}>{dashboardData.rechargeEfficiency}%</Text>
            <Text style={styles.statLabel}>Efficiency</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#F3E5F5' }]}>
            <MaterialCommunityIcons name="water-well" size={32} color="#9C27B0" />
            <Text style={styles.statValue}>{dashboardData.groundwaterDepth}m</Text>
            <Text style={styles.statLabel}>GW Depth</Text>
          </View>
        </View>

        {/* Real-time Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real-Time Insights</Text>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <MaterialCommunityIcons name="weather-pouring" size={24} color="#2196F3" />
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>Today's Rainfall</Text>
                <Text style={styles.cardValue}>{dashboardData.rainfall} mm</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <MaterialCommunityIcons name="water-opacity" size={24} color="#03A9F4" />
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>Tank Water Level</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${dashboardData.tankLevel}%` }]} />
                </View>
                <Text style={styles.cardValue}>{dashboardData.tankLevel}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/(tabs)/assess')}>
              <MaterialCommunityIcons name="water-check" size={28} color="#2196F3" />
              <Text style={styles.actionText}>New Assessment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/(tabs)/expert')}>
              <MaterialCommunityIcons name="account-tie" size={28} color="#FF9800" />
              <Text style={styles.actionText}>Book Expert</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="chat" size={28} color="#4CAF50" />
              <Text style={styles.actionText}>Varun AI</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="radar" size={28} color="#9C27B0" />
              <Text style={styles.actionText}>IoT Sensors</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Impact This Month */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Impact This Month</Text>
          <View style={styles.impactCard}>
            <MaterialCommunityIcons name="water-plus" size={48} color="#2196F3" />
            <Text style={styles.impactValue}>1,200 Liters Recharged</Text>
            <Text style={styles.impactText}>Keep saving water with Varun!</Text>
            <Text style={styles.impactSubtext}>≈ 2 tanker lorries avoided</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  greeting: {
    fontSize: 14,
    color: '#757575',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  notificationButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F44336',
  },
  content: {
    flex: 1,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  alertContent: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    color: '#F57C00',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    marginLeft: 12,
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#03A9F4',
    borderRadius: 4,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#424242',
    textAlign: 'center',
  },
  impactCard: {
    backgroundColor: '#E3F2FD',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  impactValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
    marginTop: 12,
  },
  impactText: {
    fontSize: 14,
    color: '#424242',
    marginTop: 8,
  },
  impactSubtext: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
});
