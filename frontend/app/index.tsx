import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

      setTimeout(() => {
        if (!hasLaunched) {
          router.replace('/onboarding');
        } else if (isLoggedIn === 'true') {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding/login');
        }
      }, 1000);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      router.replace('/onboarding');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2196F3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
