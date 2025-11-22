import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFontSize } from '../../contexts/FontSizeContext';

export default function Assess() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { fontScale } = useFontSize();
  const [formData, setFormData] = useState({
    roofArea: '',
    rainfall: '',
    groundwaterDepth: '',
    soilType: 'clay',
  });

  const soilTypes = [
    { value: 'clay', label: 'Clay', icon: 'layers' },
    { value: 'sandy', label: 'Sandy', icon: 'waves' },
    { value: 'loamy', label: 'Loamy', icon: 'grain' },
    { value: 'rocky', label: 'Rocky', icon: 'diamond-stone' },
  ];

  const handleSubmit = () => {
    if (!formData.roofArea || !formData.rainfall) {
      Alert.alert('Required', 'Please fill roof area and rainfall');
      return;
    }
    Alert.alert('Success', 'Assessment submitted successfully');
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
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14 * fontScale,
      color: colors.textSecondary,
    },
    content: {
      flex: 1,
    },
    card: {
      backgroundColor: colors.card,
      marginHorizontal: 20,
      marginTop: 20,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 16 * fontScale,
      fontWeight: '700',
      color: colors.text,
      marginLeft: 12,
    },
    label: {
      fontSize: 14 * fontScale,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16 * fontScale,
      color: colors.text,
      backgroundColor: colors.background,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      gap: 8,
    },
    buttonText: {
      fontSize: 14 * fontScale,
      fontWeight: '600',
      color: colors.primary,
    },
    helperText: {
      fontSize: 12 * fontScale,
      color: colors.textSecondary,
      marginTop: 4,
    },
    soilGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    soilCard: {
      width: '48%',
      padding: 12,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    soilCardSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '10',
    },
    soilLabel: {
      fontSize: 14 * fontScale,
      color: colors.textSecondary,
      marginTop: 8,
      fontWeight: '600',
    },
    soilLabelSelected: {
      color: colors.primary,
    },
    uploadButton: {
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: 'dashed',
      borderRadius: 8,
      padding: 24,
      alignItems: 'center',
    },
    uploadText: {
      fontSize: 14 * fontScale,
      fontWeight: '600',
      color: colors.text,
      marginTop: 8,
    },
    uploadSubtext: {
      fontSize: 12 * fontScale,
      color: colors.textSecondary,
      marginTop: 4,
    },
    submitButton: {
      backgroundColor: colors.primary,
      marginHorizontal: 20,
      marginTop: 24,
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    submitButtonText: {
      fontSize: 16 * fontScale,
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Assessment</Text>
        <Text style={styles.headerSubtitle}>Get instant feasibility analysis</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Location */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Location</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name="crosshairs-gps" size={16} color={colors.primary} />
            <Text style={styles.buttonText}>Auto-detect Location</Text>
          </TouchableOpacity>
        </View>

        {/* Roof Area */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="ruler-square" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Roof Area (sq ft) *</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter roof area"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={formData.roofArea}
            onChangeText={(text) => setFormData({ ...formData, roofArea: text })}
          />
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name="map" size={16} color={colors.primary} />
            <Text style={styles.buttonText}>Measure with Maps</Text>
          </TouchableOpacity>
        </View>

        {/* Rainfall */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="weather-rainy" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Annual Rainfall (mm) *</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Auto-filled from IMD"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={formData.rainfall}
            onChangeText={(text) => setFormData({ ...formData, rainfall: text })}
          />
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name="cloud-download" size={16} color={colors.primary} />
            <Text style={styles.buttonText}>Auto-fill IMD Data</Text>
          </TouchableOpacity>
        </View>

        {/* Groundwater */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="water-well" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Groundwater Depth (m)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Optional"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={formData.groundwaterDepth}
            onChangeText={(text) => setFormData({ ...formData, groundwaterDepth: text })}
          />
          <Text style={styles.helperText}>Will auto-fetch if not provided</Text>
        </View>

        {/* Soil Type */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="terrain" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Soil Type</Text>
          </View>
          <View style={styles.soilGrid}>
            {soilTypes.map((soil) => (
              <TouchableOpacity
                key={soil.value}
                style={[
                  styles.soilCard,
                  formData.soilType === soil.value && styles.soilCardSelected,
                ]}
                onPress={() => setFormData({ ...formData, soilType: soil.value })}
              >
                <MaterialCommunityIcons
                  name={soil.icon as any}
                  size={24}
                  color={formData.soilType === soil.value ? colors.primary : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.soilLabel,
                    formData.soilType === soil.value && styles.soilLabelSelected,
                  ]}
                >
                  {soil.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Photos */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="camera" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Site Photos</Text>
          </View>
          <TouchableOpacity style={styles.uploadButton}>
            <MaterialCommunityIcons name="cloud-upload" size={32} color={colors.textSecondary} />
            <Text style={styles.uploadText}>Upload Photos</Text>
            <Text style={styles.uploadSubtext}>Roof, drainage, surrounding area</Text>
          </TouchableOpacity>
        </View>

        {/* Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Calculate Feasibility</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
