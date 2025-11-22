import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LanguageCode = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml' | 'mr' | 'bn';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    welcome: 'Welcome to Varun',
    dashboard: 'Dashboard',
    assess: 'Assess',
    expert: 'Expert',
    community: 'Community',
    profile: 'Profile',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    waterSaved: 'Water Saved',
    carbonSaved: 'Carbon Saved',
    efficiency: 'Efficiency',
    settings: 'Settings',
    logout: 'Logout',
    darkMode: 'Dark Mode',
    language: 'Language',
    fontSize: 'Font Size',
    permissions: 'Permissions',
    helpSupport: 'Help & Support',
    editProfile: 'Edit Profile',
    save: 'Save',
    cancel: 'Cancel',
  },
  hi: {
    welcome: 'वरुण में आपका स्वागत है',
    dashboard: 'डैशबोर्ड',
    assess: 'मूल्यांकन',
    expert: 'विशेषज्ञ',
    community: 'समुदाय',
    profile: 'प्रोफ़ाइल',
    login: 'लॉगिन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    forgotPassword: 'पासवर्ड भूल गए?',
    dontHaveAccount: 'खाता नहीं है?',
    alreadyHaveAccount: 'पहले से खाता है?',
    waterSaved: 'पानी बचाया',
    carbonSaved: 'कार्बन बचाया',
    efficiency: 'दक्षता',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    darkMode: 'डार्क मोड',
    language: 'भाषा',
    fontSize: 'फ़ॉन्ट आकार',
    permissions: 'अनुमतियाँ',
    helpSupport: 'सहायता और समर्थन',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
  },
  ta: {
    welcome: 'வருணுக்கு வரவேற்கிறோம்',
    dashboard: 'டாஷ்போர்டு',
    assess: 'மதிப்பீடு',
    expert: 'நிபுணர்',
    community: 'சமூகம்',
    profile: 'சுயவிவரம்',
    login: 'உள்நுழைய',
    signup: 'பதிவு செய்க',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
    dontHaveAccount: 'கணக்கு இல்லையா?',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    waterSaved: 'நீர் சேமிப்பு',
    carbonSaved: 'கார்பன் சேமிப்பு',
    efficiency: 'திறன்',
    settings: 'அமைப்புகள்',
    logout: 'வெளியேறு',
    darkMode: 'இருண்ட பயன்முறை',
    language: 'மொழி',
    fontSize: 'எழுத்துரு அளவு',
    permissions: 'அனுமதிகள்',
    helpSupport: 'உதவி மற்றும் ஆதரவு',
    editProfile: 'சுயவிவரத்தைத் திருத்து',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
  },
  te: {
    welcome: 'వరుణకు స్వాగతం',
    dashboard: 'డాష్‌బోర్డ్',
    assess: 'అంచనా',
    expert: 'నిపుణుడు',
    community: 'కమ్యూనిటీ',
    profile: 'ప్రొఫైల్',
    login: 'లాగిన్',
    signup: 'సైన్ అప్',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    dontHaveAccount: 'ఖాతా లేదా?',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    waterSaved: 'నీటి పొదుపు',
    carbonSaved: 'కార్బన్ పొదుపు',
    efficiency: 'సామర్థ్యం',
    settings: 'సెట్టింగ్‌లు',
    logout: 'లాగ్అవుట్',
    darkMode: 'డార్క్ మోడ్',
    language: 'భాష',
    fontSize: 'ఫాంట్ పరిమాణం',
    permissions: 'అనుమతులు',
    helpSupport: 'సహాయం & మద్దతు',
    editProfile: 'ప్రొఫైల్ సవరించండి',
    save: 'సేవ్ చేయండి',
    cancel: 'రద్దు చేయండి',
  },
  kn: {
    welcome: 'ವರುಣಕ್ಕೆ ಸ್ವಾಗತ',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    assess: 'ಮೌಲ್ಯಮಾಪನ',
    expert: 'ತಜ್ಞ',
    community: 'ಸಮುದಾಯ',
    profile: 'ಪ್ರೊಫೈಲ್',
    login: 'ಲಾಗಿನ್',
    signup: 'ಸೈನ್ ಅಪ್',
    email: 'ಇಮೇಲ್',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    forgotPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?',
    dontHaveAccount: 'ಖಾತೆ ಇಲ್ಲವೇ?',
    alreadyHaveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
    waterSaved: 'ನೀರು ಉಳಿಸಲಾಗಿದೆ',
    carbonSaved: 'ಕಾರ್ಬನ್ ಉಳಿಸಲಾಗಿದೆ',
    efficiency: 'ದಕ್ಷತೆ',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    logout: 'ಲಾಗ್ಔಟ್',
    darkMode: 'ಡಾರ್ಕ್ ಮೋಡ್',
    language: 'ಭಾಷೆ',
    fontSize: 'ಫಾಂಟ್ ಗಾತ್ರ',
    permissions: 'ಅನುಮತಿಗಳು',
    helpSupport: 'ಸಹಾಯ & ಬೆಂಬಲ',
    editProfile: 'ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ',
    save: 'ಉಳಿಸಿ',
    cancel: 'ರದ್ದುಗೊಳಿಸಿ',
  },
  ml: {
    welcome: 'വരുണിലേക്ക് സ്വാഗതം',
    dashboard: 'ഡാഷ്ബോർഡ്',
    assess: 'വിലയിരുത്തൽ',
    expert: 'വിദഗ്ധൻ',
    community: 'കമ്മ്യൂണിറ്റി',
    profile: 'പ്രൊഫൈൽ',
    login: 'ലോഗിൻ',
    signup: 'സൈൻ അപ്പ്',
    email: 'ഇമെയിൽ',
    password: 'പാസ്‌വേഡ്',
    forgotPassword: 'പാസ്‌വേഡ് മറന്നോ?',
    dontHaveAccount: 'അക്കൗണ്ട് ഇല്ലേ?',
    alreadyHaveAccount: 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?',
    waterSaved: 'വെള്ളം സംരക്ഷിച്ചു',
    carbonSaved: 'കാർബൺ സംരക്ഷിച്ചു',
    efficiency: 'കാര്യക്ഷമത',
    settings: 'ക്രമീകരണങ്ങൾ',
    logout: 'ലോഗൗട്ട്',
    darkMode: 'ഡാർക്ക് മോഡ്',
    language: 'ഭാഷ',
    fontSize: 'ഫോണ്ട് വലുപ്പം',
    permissions: 'അനുമതികൾ',
    helpSupport: 'സഹായവും പിന്തുണയും',
    editProfile: 'പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക',
    save: 'സേവ് ചെയ്യുക',
    cancel: 'റദ്ദാക്കുക',
  },
  mr: {
    welcome: 'वरुणमध्ये स्वागत आहे',
    dashboard: 'डॅशबोर्ड',
    assess: 'मूल्यांकन',
    expert: 'तज्ञ',
    community: 'समुदाय',
    profile: 'प्रोफाइल',
    login: 'लॉगिन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    forgotPassword: 'पासवर्ड विसरलात?',
    dontHaveAccount: 'खाते नाही?',
    alreadyHaveAccount: 'आधीच खाते आहे?',
    waterSaved: 'पाणी वाचवले',
    carbonSaved: 'कार्बन वाचवले',
    efficiency: 'कार्यक्षमता',
    settings: 'सेटिंग्ज',
    logout: 'लॉगआउट',
    darkMode: 'डार्क मोड',
    language: 'भाषा',
    fontSize: 'फॉन्ट आकार',
    permissions: 'परवानग्या',
    helpSupport: 'मदत आणि समर्थन',
    editProfile: 'प्रोफाइल संपादित करा',
    save: 'जतन करा',
    cancel: 'रद्द करा',
  },
  bn: {
    welcome: 'বরুণে স্বাগতম',
    dashboard: 'ড্যাশবোর্ড',
    assess: 'মূল্যায়ন',
    expert: 'বিশেষজ্ঞ',
    community: 'সম্প্রদায়',
    profile: 'প্রোফাইল',
    login: 'লগইন',
    signup: 'সাইন আপ',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    dontHaveAccount: 'অ্যাকাউন্ট নেই?',
    alreadyHaveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    waterSaved: 'জল সংরক্ষিত',
    carbonSaved: 'কার্বন সংরক্ষিত',
    efficiency: 'দক্ষতা',
    settings: 'সেটিংস',
    logout: 'লগআউট',
    darkMode: 'ডার্ক মোড',
    language: 'ভাষা',
    fontSize: 'ফন্ট আকার',
    permissions: 'অনুমতি',
    helpSupport: 'সাহায্য এবং সহায়তা',
    editProfile: 'প্রোফাইল সম্পাদনা করুন',
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল করুন',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage && savedLanguage in translations) {
        setLanguageState(savedLanguage as LanguageCode);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      await AsyncStorage.setItem('language', lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
