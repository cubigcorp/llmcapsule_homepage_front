// 번역 리소스를 정적으로 import (Next.js App Router, client-only)
import koCommon from './locales/ko/common.json';
import enCommon from './locales/en/common.json';
import koAuth from './locales/ko/auth.json';
import enAuth from './locales/en/auth.json';
import koMypage from './locales/ko/mypage.json';
import enMypage from './locales/en/mypage.json';
import koCheckout from './locales/ko/checkout.json';
import enCheckout from './locales/en/checkout.json';

export const resources = {
  ko: {
    common: koCommon,
    mypage: koMypage,
    auth: koAuth,
    checkout: koCheckout,
  },
  en: {
    common: enCommon,
    mypage: enMypage,
    auth: enAuth,
    checkout: enCheckout,
  },
} as const;

export type AppNamespace = keyof (typeof resources)['ko'];
export const defaultNS: AppNamespace = 'common';

export const supportedLanguages = ['ko', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
