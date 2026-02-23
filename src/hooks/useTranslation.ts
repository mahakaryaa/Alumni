/**
 * useTranslation Hook
 * Custom hook to access translations in any component
 */

import { useContext, createContext } from 'react';
import { getTranslation, type Language, type Translations } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback to Indonesian if context is not available
    return {
      language: 'id' as Language,
      setLanguage: () => {},
      t: getTranslation('id'),
    };
  }
  return context;
}
