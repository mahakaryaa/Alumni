/**
 * useTranslation Hook
 * Custom hook to access translations in any component.
 * Must be used within a LanguageProvider.
 */

import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';
import { getTranslation, type Language } from '@/translations';

// Re-export LanguageContext for backward compatibility
export { LanguageContext } from '@/context/LanguageContext';

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback to Indonesian if context is not available
    return {
      language: 'id' as Language,
      setLanguage: (() => {}) as (lang: Language) => void,
      t: getTranslation('id'),
    };
  }
  return context;
}
