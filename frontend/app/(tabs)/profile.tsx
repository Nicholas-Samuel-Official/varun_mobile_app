import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menuItems = [
  {
    id: 'chatbot',
    title: 'Varun AI Chatbot',
    icon: 'robot',
    color: '#2196F3',
    description: 'Ask questions, get tips',
  },
  {
    id: 'faq',
    title: 'FAQ & Help',
    icon: 'help-circle',
    color: '#FF9800',
    description: 'Common questions',
  },
  {
    id: 'carbon',
    title: 'Carbon Tracker',
    icon: 'leaf',
    color: '#4CAF50',
    description: 'Track your environmental impact',
  },
  {
    id: 'iot',
    title: 'IoT Sensors',
    icon: 'radar',
    color: '#9C27B0',
    description: 'Manage your sensors',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'bell',
    color: '#F44336',
    description: 'Manage alerts',
  },
  {
    id: 'language',
    title: 'Language',
    icon: 'translate',
    color: '#00BCD4',
    description: 'Change app language',
  },
  {
    id: 'about',
    title: 'About Varun',
    icon: 'information',
    color: '#607D8B',
    description: 'Learn more about the app',
  },
  {
    id: 'case-studies',
    title: 'Case Studies',
    icon: 'file-document',
    color: '#3F51B5',
    description: 'Success stories',
  },
];

export default function Profile() {
  const router = useRouter();

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
            router.replace('/onboarding/login');
          },
        },
      ]
    );
  };

  const handleMenuPress = (id: string) => {
    switch (id) {
      case 'chatbot':
        Alert.alert('Varun AI', 'Chatbot feature coming soon!');
        break;
      case 'faq':
        Alert.alert('FAQ', 'FAQ section coming soon!');
        break;
      case 'carbon':
        Alert.alert('Carbon Tracker', 'Carbon tracking feature coming soon!');
        break;
      case 'iot':
        Alert.alert('IoT Sensors', 'Sensor management coming soon!');
        break;
      default:
        Alert.alert('Coming Soon', `${id} feature will be available soon!`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarLarge}>
            <MaterialCommunityIcons name="account" size={48} color="#2196F3" />
          </View>
          <Text style={styles.userName}>Water Saver</Text>
          <Text style={styles.userEmail}>user@example.com</Text>
          <View style={styles.userStats}>
            <View style={styles.userStatItem}>
              <Text style={styles.userStatValue}>3,650L</Text>
              <Text style={styles.userStatLabel}>Saved</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.userStatItem}>
              <Text style={styles.userStatValue}>45 days</Text>
              <Text style={styles.userStatLabel}>Streak</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.userStatItem}>
              <Text style={styles.userStatValue}>8</Text>
              <Text style={styles.userStatLabel}>Badges</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons name="pencil" size={16} color="#2196F3" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.id)}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#E3F2FD' }]}>
              <MaterialCommunityIcons name="cog" size={24} color="#2196F3" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>App Settings</Text>
              <Text style={styles.menuDescription}>Preferences & configuration</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#FFF3E0' }]}>
              <MaterialCommunityIcons name="shield-check" size={24} color="#FF9800" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Privacy & Security</Text>
              <Text style={styles.menuDescription}>Manage your data</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#E8F5E9' }]}>
              <MaterialCommunityIcons name="lifebuoy" size={24} color="#4CAF50" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Help & Support</Text>
              <Text style={styles.menuDescription}>Get help from our team</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#F3E5F5' }]}>
              <MaterialCommunityIcons name="star" size={24} color="#9C27B0" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Rate Us</Text>
              <Text style={styles.menuDescription}>Share your feedback</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color="#F44336" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.version}>Version 1.0.0</Text>

        <View style={{ height: 40 }} />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
  },
  content: {
    flex: 1,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
  },
  userEmail: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  userStatLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    gap: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#757575',
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: '#757575',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    marginHorizontal: 16,
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 24,
  },
});
