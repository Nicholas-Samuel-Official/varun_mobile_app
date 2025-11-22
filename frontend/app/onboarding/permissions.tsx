import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as Location from 'expo-location';

const permissions = [
  {
    id: 'location',
    title: 'Location Access',
    description: 'Get accurate rainfall & groundwater data for your area',
    icon: 'map-marker',
    color: '#2196F3',
    required: true,
  },
  {
    id: 'camera',
    title: 'Camera Access',
    description: 'Upload site photos for expert consultation',
    icon: 'camera',
    color: '#4CAF50',
    required: false,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Receive rain alerts & maintenance reminders',
    icon: 'bell',
    color: '#FF9800',
    required: false,
  },
];

export default function Permissions() {
  const router = useRouter();
  const [grantedPermissions, setGrantedPermissions] = useState<string[]>([]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setGrantedPermissions((prev) => [...prev, 'location']);
        Alert.alert('Success', 'Location permission granted!');
      } else {
        Alert.alert('Permission Denied', 'Location access is required for the app to work properly.');
      }
    } catch (error) {
      console.error('Location permission error:', error);
    }
  };

  const requestPermission = async (id: string) => {
    if (id === 'location') {
      await requestLocationPermission();
    } else {
      // Mock permission grant for other permissions
      setGrantedPermissions((prev) => [...prev, id]);
      Alert.alert('Success', `${id} permission granted!`);
    }
  };

  const handleContinue = () => {
    if (!grantedPermissions.includes('location')) {
      Alert.alert('Required Permission', 'Location access is required to continue.');
      return;
    }
    router.replace('/(tabs)');
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Permissions',
      'Some features may not work without proper permissions. Continue anyway?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => router.replace('/(tabs)'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="shield-check" size={64} color="#2196F3" />
        <Text style={styles.title}>Permissions Needed</Text>
        <Text style={styles.subtitle}>
          To provide the best experience, Varun needs access to:
        </Text>
      </View>

      <View style={styles.content}>
        {permissions.map((permission) => (
          <View key={permission.id} style={styles.permissionCard}>
            <View style={[styles.iconContainer, { backgroundColor: permission.color + '20' }]}>
              <MaterialCommunityIcons
                name={permission.icon as any}
                size={32}
                color={permission.color}
              />
            </View>
            <View style={styles.permissionInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.permissionTitle}>{permission.title}</Text>
                {permission.required && <Text style={styles.requiredBadge}>Required</Text>}
              </View>
              <Text style={styles.permissionDescription}>{permission.description}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.grantButton,
                grantedPermissions.includes(permission.id) && styles.grantedButton,
              ]}
              onPress={() => requestPermission(permission.id)}
              disabled={grantedPermissions.includes(permission.id)}
            >
              <MaterialCommunityIcons
                name={grantedPermissions.includes(permission.id) ? 'check' : 'lock-open'}
                size={20}
                color={grantedPermissions.includes(permission.id) ? '#4CAF50' : '#2196F3'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.infoText}>
          You can change these permissions later in your device settings
        </Text>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  permissionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionInfo: {
    flex: 1,
    marginLeft: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginRight: 8,
  },
  requiredBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F44336',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  permissionDescription: {
    fontSize: 12,
    color: '#757575',
    lineHeight: 18,
  },
  grantButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  grantedButton: {
    backgroundColor: '#E8F5E9',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  infoText: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  skipText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    paddingVertical: 8,
  },
});
