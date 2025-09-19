'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {
  defaultNS,
  resources,
  supportedLanguages,
  type SupportedLanguage,
} from './resources';

export type { SupportedLanguage };

// 기본 언어
export const defaultLanguage: SupportedLanguage = 'ko';

// 클라이언트에서만 i18n 초기화 (핫리로드/중복 방지)
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      // 언어 감지기로 결정 (localStorage → navigator → htmlTag)
      fallbackLng: defaultLanguage,
      supportedLngs: supportedLanguages,
      resources,
      defaultNS,
      ns: [defaultNS],
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng',
      },
      interpolation: { escapeValue: false },
      react: {
        useSuspense: false,
        bindI18n: 'languageChanged',
        bindI18nStore: 'added removed',
      },
      // Hydration 문제 해결을 위한 설정
      lng: defaultLanguage, // 초기 언어를 명시적으로 설정
      debug: false,
    });
}

export default i18n;
