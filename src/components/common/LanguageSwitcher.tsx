'use client';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Dropdown } from '@cubig/design-system';
import { supportedLanguages, type SupportedLanguage } from '@/i18n/resources';
import { useMediaQuery } from '@/hooks/useMediaQuery';
interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation('common');
  const isMobile = useMediaQuery('(max-width: 575px)');

  const handleLanguageChange = (lng: SupportedLanguage) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  const languageOptions = supportedLanguages.map((lng) => ({
    value: lng,
    label: lng.toUpperCase(),
  }));

  return (
    <Container className={className}>
      <Dropdown
        options={languageOptions}
        value={i18n.language}
        onChange={(value) => handleLanguageChange(value as SupportedLanguage)}
        placeholder='KO'
        size={isMobile ? 'small' : 'medium'}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;
