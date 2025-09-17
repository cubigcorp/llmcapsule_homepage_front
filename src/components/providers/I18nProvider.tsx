'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/client';

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [ready, setReady] = useState(false);
  const [lng, setLng] = useState(i18n.language);

  useEffect(() => {
    if (i18n.isInitialized) setReady(true);
    else i18n.on('initialized', () => setReady(true));

    const handle = (l: string) => setLng(l);
    i18n.on('languageChanged', handle);
    return () => {
      i18n.off('languageChanged', handle);
    };
  }, []);

  if (!ready) return null;
  return (
    <I18nextProvider i18n={i18n} key={lng}>
      {children}
    </I18nextProvider>
  );
}
