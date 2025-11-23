import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '../contexts/ThemeContext';
import { useFontSize } from '../contexts/FontSizeContext';

export default function AboutUs() {
  const router = useRouter();
  const { colors } = useTheme();
  const { fontScale } = useFontSize();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.primary,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 20 * fontScale,
      fontWeight: '700',
      color: '#FFFFFF',
      flex: 1,
    },
    content: {
      flex: 1,
    },
    logoContainer: {
      alignItems: 'center',
      paddingVertical: 32,
      backgroundColor: colors.card,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 16,
    },
    appTitle: {
      fontSize: 32 * fontScale,
      fontWeight: '700',
      color: colors.primary,
      marginBottom: 4,
    },
    tagline: {
      fontSize: 16 * fontScale,
      color: colors.textSecondary,
      textAlign: 'center',
      paddingHorizontal: 40,
    },
    section: {
      paddingHorizontal: 20,
      paddingVertical: 24,
    },
    paragraph: {
      fontSize: 15 * fontScale,
      lineHeight: 24 * fontScale,
      color: colors.text,
      marginBottom: 16,
      textAlign: 'justify',
    },
    highlightBox: {
      backgroundColor: colors.primary + '15',
      padding: 20,
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      marginVertical: 16,
    },
    highlightText: {
      fontSize: 16 * fontScale,
      fontWeight: '600',
      color: colors.primary,
      lineHeight: 24 * fontScale,
      textAlign: 'center',
    },
    featuresContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 16,
    },
    featureChip: {
      backgroundColor: colors.card,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    featureText: {
      fontSize: 13 * fontScale,
      color: colors.text,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/ora_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>VARUN</Text>
          <Text style={styles.tagline}>Intelligent Rainwater Harvesting & Recharge Planner</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.paragraph}>
            Varun is a smart, AI-powered water management platform designed to help every household,
            community, and institution turn rainfall into a reliable, sustainable source of water.
            Built on advanced hydrological models, GIS mapping, real-time weather data, and IoT
            integration, Varun makes rooftop rainwater harvesting simple, efficient, and future-ready.
          </Text>

          <View style={styles.highlightBox}>
            <Text style={styles.highlightText}>
              Our mission is to empower people with the tools, knowledge, and technology to conserve
              water, recharge groundwater, and reduce dependency on external sources like tanker
              lorries and borewells.
            </Text>
          </View>

          <Text style={styles.paragraph}>
            With Varun, users can instantly assess their rooftop's harvesting potential, track
            real-time water levels through sensors, receive rainfall alerts, monitor savings, and plan
            for future seasons using AI-driven predictions. The app also connects users with certified
            experts for on-site inspection, system design, and cost estimation—making rainwater
            harvesting accessible to both urban and rural communities.
          </Text>

          <Text style={styles.paragraph}>
            At Varun, we believe water security starts from every rooftop. By turning rainfall into a
            resource, we aim to support smarter cities, resilient villages, and sustainable
            environments. Our platform contributes to India's Smart City Mission, SDG-6 (Clean Water &
            Sanitation), and long-term climate adaptation.
          </Text>

          <View style={styles.highlightBox}>
            <Text style={styles.highlightText}>
              Together, we can harvest every drop—and secure tomorrow's water, today.
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.featureChip}>
              <Text style={styles.featureText}>🤖 AI-Powered Predictions</Text>
            </View>
            <View style={styles.featureChip}>
              <Text style={styles.featureText}>🗺️ GIS Mapping</Text>
            </View>
            <View style={styles.featureChip}>
              <Text style={styles.featureText}>📡 IoT Integration</Text>
            </View>
            <View style={styles.featureChip}>
              <Text style={styles.featureText}>🌧️ Real-time Weather</Text>
            </View>
            <View style={styles.featureChip}>
              <Text style={styles.featureText}>👨‍🔬 Expert Consultation</Text>
            </View>
            <View style={styles.featureChip}>
              <Text style={styles.featureText}>💰 Cost Estimation</Text>
            </View>
            <View style={styles.featureChip}>
              <Text style={styles.featureText}>📊 Water Analytics</Text>
            </View>
            <View style={styles.featureChip}>
              <Text style={styles.featureText}>🏙️ Smart City Ready</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
