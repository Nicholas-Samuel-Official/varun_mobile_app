import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useTheme } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Terms() {
  const router = useRouter();
  const { colors } = useTheme();
  const [locationPermission, setLocationPermission] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
      } else {
        Alert.alert('Permission Denied', 'Location access is important for accurate data.');
      }
    } catch (error) {
      console.error('Location permission error:', error);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setNotificationPermission(true);
      } else {
        Alert.alert('Permission Denied', 'Notifications help you stay updated.');
      }
    } catch (error) {
      console.error('Notification permission error:', error);
    }
  };

  const handleContinue = async () => {
    if (!acceptedTerms) {
      Alert.alert('Required', 'Please accept the terms and conditions');
      return;
    }
    if (!locationPermission) {
      Alert.alert('Required', 'Location permission is required to continue');
      return;
    }
    
    await AsyncStorage.setItem('termsAccepted', 'true');
    router.replace('/language');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
    },
    header: {
      marginTop: 40,
      marginBottom: 32,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    permissionCard: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    permissionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    permissionIcon: {
      width: 48,
      height: 48,
      borderRadius: 8,
      backgroundColor: colors.primary + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    permissionInfo: {
      flex: 1,
    },
    permissionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    permissionDesc: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    grantButton: {
      backgroundColor: colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginTop: 12,
    },
    grantButtonText: {
      fontSize: 14,
      fontWeight: '700',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    grantedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.success + '20',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 6,
      marginTop: 12,
    },
    grantedText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.success,
      marginLeft: 6,
    },
    termsCard: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginTop: 24,
      marginBottom: 24,
    },
    termsRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    termsText: {
      flex: 1,
      fontSize: 14,
      color: colors.text,
      marginLeft: 12,
    },
    termsLink: {
      color: colors.primary,
      fontWeight: '600',
    },
    continueButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 32,
    },
    continueButtonDisabled: {
      backgroundColor: colors.border,
    },
    continueButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Permissions</Text>
          <Text style={styles.subtitle}>We need your permission to provide the best experience</Text>
        </View>

        {/* Location Permission */}
        <View style={styles.permissionCard}>
          <View style={styles.permissionHeader}>
            <View style={styles.permissionIcon}>
              <MaterialCommunityIcons name="map-marker" size={24} color={colors.primary} />
            </View>
            <View style={styles.permissionInfo}>
              <Text style={styles.permissionTitle}>Location Access</Text>
              <Text style={styles.permissionDesc}>For accurate rainfall & groundwater data</Text>
            </View>
          </View>
          {locationPermission ? (
            <View style={styles.grantedBadge}>
              <MaterialCommunityIcons name="check-circle" size={16} color={colors.success} />
              <Text style={styles.grantedText}>Permission Granted</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.grantButton} onPress={requestLocationPermission}>
              <Text style={styles.grantButtonText}>Grant Permission</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Notification Permission */}
        <View style={styles.permissionCard}>
          <View style={styles.permissionHeader}>
            <View style={styles.permissionIcon}>
              <MaterialCommunityIcons name="bell" size={24} color={colors.primary} />
            </View>
            <View style={styles.permissionInfo}>
              <Text style={styles.permissionTitle}>Notifications</Text>
              <Text style={styles.permissionDesc}>Receive rain alerts & reminders</Text>
            </View>
          </View>
          {notificationPermission ? (
            <View style={styles.grantedBadge}>
              <MaterialCommunityIcons name="check-circle" size={16} color={colors.success} />
              <Text style={styles.grantedText}>Permission Granted</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.grantButton} onPress={requestNotificationPermission}>
              <Text style={styles.grantButtonText}>Grant Permission</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Terms & Conditions */}
        <View style={styles.termsCard}>
          <View style={styles.termsRow}>
            <Switch
              value={acceptedTerms}
              onValueChange={setAcceptedTerms}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
            <Text style={styles.termsText}>
              I accept the <Text style={styles.termsLink}>Terms & Conditions</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            (!acceptedTerms || !locationPermission) && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!acceptedTerms || !locationPermission}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
