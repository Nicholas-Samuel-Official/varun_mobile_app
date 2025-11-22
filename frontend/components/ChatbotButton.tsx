import { useEffect } from 'react';
import { Platform } from 'react-native';

// Chatling.ai chatbot integration
export const ChatbotButton = () => {
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Load Chatling script for web
      const script = document.createElement('script');
      script.src = 'https://chatling.ai/js/embed.js';
      script.async = true;
      script.setAttribute('data-id', 'your-chatbot-id'); // Replace with actual ID
      document.body.appendChild(script);

      return () => {
        // Cleanup
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  // For web, the chatbot button is injected by the script
  // For mobile, we would need a WebView or native integration
  return null;
};
