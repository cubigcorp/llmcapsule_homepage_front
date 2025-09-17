'use client';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { textColor, typography, color } from '@cubig/design-system';
import { supportedLanguages, type SupportedLanguage } from '@/i18n/resources';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation('common');

  const handleLanguageChange = (lng: SupportedLanguage) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <Container className={className}>
      {supportedLanguages.map((lng) => (
        <LanguageButton
          key={lng}
          $active={i18n.language === lng}
          onClick={() => handleLanguageChange(lng)}
          aria-pressed={i18n.language === lng}
        >
          {lng === 'ko'
            ? t('language.korean', { ns: 'common' })
            : t('language.english', { ns: 'common' })}
        </LanguageButton>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const LanguageButton = styled.button<{ $active: boolean }>`
  ${typography('ko', 'body2', 'regular')}
  color: ${({ $active }) =>
    $active
      ? textColor.light['fg-neutral-primary']
      : textColor.light['fg-neutral-alternative']};
  background: ${({ $active }) => ($active ? color.gray['100'] : 'transparent')};
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
`;
