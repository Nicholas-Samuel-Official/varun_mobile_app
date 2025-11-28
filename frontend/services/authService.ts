import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.backendUrl || process.env.EXPO_PUBLIC_BACKEND_URL;

interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: any;
    accessToken: string;
    refreshToken: string;
  };
}

class AuthService {
  async signup(name: string, email: string, phone: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        await this.storeTokens(data.data.accessToken, data.data.refreshToken);
        await AsyncStorage.setItem('user_data', JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  async login(emailOrPhone: string, password: string): Promise<AuthResponse> {
    try {
      const isEmail = emailOrPhone.includes('@');
      const body = isEmail
        ? { email: emailOrPhone, password }
        : { phone: emailOrPhone, password };

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success && data.data) {
        await this.storeTokens(data.data.accessToken, data.data.refreshToken);
        await AsyncStorage.setItem('user_data', JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  async logout(): Promise<void> {
    try {
      const token = await this.getAccessToken();
      if (token) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user_data']);
    }
  }

  async requestPasswordReset(email: string): Promise<AuthResponse> {
    try {
      // Generate OTP (backend will handle this in production)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP temporarily (in production, backend sends this via email/SMS)
      await AsyncStorage.setItem(`otp_${email}`, otp);
      await AsyncStorage.setItem(`otp_timestamp_${email}`, Date.now().toString());

      // Simulate sending OTP
      console.log(`OTP for ${email}: ${otp}`);
      
      return { 
        success: true, 
        message: `OTP sent to ${email}. Check console for demo OTP: ${otp}` 
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, message: 'Failed to send OTP' };
    }
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    try {
      const storedOTP = await AsyncStorage.getItem(`otp_${email}`);
      const timestamp = await AsyncStorage.getItem(`otp_timestamp_${email}`);

      if (!storedOTP || !timestamp) return false;

      // Check if OTP is expired (5 minutes)
      const isExpired = Date.now() - parseInt(timestamp) > 5 * 60 * 1000;
      if (isExpired) {
        await AsyncStorage.multiRemove([`otp_${email}`, `otp_timestamp_${email}`]);
        return false;
      }

      return storedOTP === otp;
    } catch (error) {
      console.error('OTP verification error:', error);
      return false;
    }
  }

  async resetPassword(email: string, newPassword: string): Promise<AuthResponse> {
    try {
      // In production, this would call backend API
      // For now, we'll just clear the OTP
      await AsyncStorage.multiRemove([`otp_${email}`, `otp_timestamp_${email}`]);
      
      return { 
        success: true, 
        message: 'Password reset successful. Please login with your new password.' 
      };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, message: 'Failed to reset password' };
    }
  }

  async storeTokens(accessToken: string, refreshToken: string): Promise<void> {
    await AsyncStorage.setItem('access_token', accessToken);
    await AsyncStorage.setItem('refresh_token', refreshToken);
  }

  async getAccessToken(): Promise<string | null> {
    return await AsyncStorage.getItem('access_token');
  }

  async getRefreshToken(): Promise<string | null> {
    return await AsyncStorage.getItem('refresh_token');
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAccessToken();
    return token !== null;
  }

  async getUserData(): Promise<any> {
    const userData = await AsyncStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }
}

export default new AuthService();
