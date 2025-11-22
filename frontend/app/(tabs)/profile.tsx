import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFontSize } from '../../contexts/FontSizeContext';
import { useState, useEffect } from 'react';

const menuItems = [
  {
    id: 'chatbot',
    title: 'Varun AI',
    icon: 'robot',
    color: '#0055FF',
  },
  {
    id: 'carbon',
    title: 'Carbon Tracker',
    icon: 'leaf',
    color: '#00C853',
  },
  {
    id: 'iot',
    title: 'IoT Sensors',
    icon: 'radar',
    color: '#9C27B0',
  },
  {
    id: 'about',
    title: 'About Varun',
    icon: 'information',
    color: '#607D8B',
  },
];

export default function Profile() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { fontScale } = useFontSize();
  const [userName, setUserName] = useState('Water Saver');
  const [userEmail, setUserEmail] = useState('user@example.com');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      if (name) setUserName(name);
      if (email) setUserEmail(email);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('isLoggedIn');
            router.replace('/auth/login');
          },
        },
      ]
    );
  };

  const handleMenuPress = (id: string) => {
    Alert.alert('Coming Soon', `${id} feature will be available soon!`);
  };

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
    },
    content: {
      flex: 1,
    },
    userCard: {
      backgroundColor: colors.card,
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 8,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    userName: {
      fontSize: 20 * fontScale,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14 * fontScale,
      color: colors.textSecondary,
    },
    userStats: {
      flexDirection: 'row',
      marginTop: 20,
      width: '100%',
      justifyContent: 'space-around',
    },
    userStatItem: {
      alignItems: 'center',
    },
    userStatValue: {
      fontSize: 18 * fontScale,
      fontWeight: '700',
      color: colors.primary,
    },
    userStatLabel: {
      fontSize: 12 * fontScale,
      color: colors.textSecondary,
      marginTop: 4,
      fontWeight: '600',
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
      backgroundColor: colors.primary,
      gap: 6,
    },
    editButtonText: {
      fontSize: 14 * fontScale,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    section: {
      marginTop: 24,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 14 * fontScale,
      fontWeight: '700',
      color: colors.textSecondary,
      marginBottom: 12,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    menuIcon: {
      width: 40,
      height: 40,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuContent: {
      flex: 1,
      marginLeft: 12,
    },
    menuTitle: {
      fontSize: 16 * fontScale,
      fontWeight: '600',
      color: colors.text,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.error + '15',
      marginHorizontal: 20,
      marginTop: 32,
      paddingVertical: 16,
      borderRadius: 8,
      gap: 8,
    },
    logoutText: {
      fontSize: 16 * fontScale,
      fontWeight: '700',
      color: colors.error,
    },
    version: {
      textAlign: 'center',
      fontSize: 12 * fontScale,
      color: colors.textSecondary,
      marginTop: 24,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('profile')}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={40} color={colors.primary} />
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          
          <View style={styles.userStats}>
            <View style={styles.userStatItem}>
              <Text style={styles.userStatValue}>3,650L</Text>
              <Text style={styles.userStatLabel}>SAVED</Text>
            </View>
            <View style={styles.userStatItem}>
              <Text style={styles.userStatValue}>45d</Text>
              <Text style={styles.userStatLabel}>STREAK</Text>
            </View>
            <View style={styles.userStatItem}>
              <Text style={styles.userStatValue}>8</Text>
              <Text style={styles.userStatLabel}>BADGES</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={() => router.push('/edit-profile')}>
            <MaterialCommunityIcons name="pencil" size={16} color="#FFFFFF" />
            <Text style={styles.editButtonText}>{t('editProfile')}</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.id)}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                <MaterialCommunityIcons name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings')}</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings')}>
            <View style={[styles.menuIcon, { backgroundColor: colors.primary + '20' }]}>
              <MaterialCommunityIcons name="cog" size={20} color={colors.primary} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{t('settings')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color={colors.error} />
          <Text style={styles.logoutText}>{t('logout')}</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
