import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FontSize = 'small' | 'medium' | 'large';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  fontScale: number;
}

const fontScales = {
  small: 0.9,
  medium: 1.0,
  large: 1.15,
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');

  useEffect(() => {
    loadFontSize();
  }, []);

  const loadFontSize = async () => {
    try {
      const savedSize = await AsyncStorage.getItem('fontSize');
      if (savedSize === 'small' || savedSize === 'medium' || savedSize === 'large') {
        setFontSizeState(savedSize);
      }
    } catch (error) {
      console.error('Error loading font size:', error);
    }
  };

  const setFontSize = async (size: FontSize) => {
    setFontSizeState(size);
    try {
      await AsyncStorage.setItem('fontSize', size);
    } catch (error) {
      console.error('Error saving font size:', error);
    }
  };

  const fontScale = fontScales[fontSize];

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, fontScale }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within FontSizeProvider');
  }
  return context;
};
