'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/client';
import { useEffect, useState } from 'react';

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // lang 속성 동기화(SEO/접근성)
    const apply = () => (document.documentElement.lang = i18n.language || 'ko');
    apply();
    i18n.on('languageChanged', apply);
    return () => i18n.off('languageChanged', apply);
  }, []);

  // 클라이언트 사이드에서만 렌더링하여 Hydration 문제 방지
  if (!isClient) {
    return <div>{children}</div>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
