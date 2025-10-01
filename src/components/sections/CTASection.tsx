'use client';

import styled from 'styled-components';
import { typography, textColor, color } from '@cubig/design-system';
import { useTranslation } from 'react-i18next';

export default function CTASection() {
  const { t } = useTranslation('common');

  return (
    <CTAContainer>
      <CTAWrapper>
        <CTAContent>
          <CTATitle>{t('cta.title')}</CTATitle>
          <CTASubtitle>{t('cta.subtitle')}</CTASubtitle>
          <CTAButton
            onClick={() => {
              const el = document.getElementById('contact-section');
              if (el) {
                const headerHeight = 72;
                const rect = el.getBoundingClientRect();
                const scrollTop =
                  window.pageYOffset || document.documentElement.scrollTop;
                const targetTop = rect.top + scrollTop - headerHeight;
                window.scrollTo({ top: targetTop, behavior: 'smooth' });
              }
            }}
          >
            {t('cta.button')}
          </CTAButton>
        </CTAContent>
      </CTAWrapper>
    </CTAContainer>
  );
}

const CTAContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CTAWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 80px 40px 16px 40px;
  margin: 0 auto;

  @media (max-width: 1440px) {
    padding: 80px 40px 16px 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 16px 80px;
  }
`;

const CTAContent = styled.div`
  background-image: url('/images/bg-cta.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 104px 160px 96px 160px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1440px) {
    padding: 80px 120px 60px 120px;
  }

  @media (max-width: 768px) {
    padding: 64px 24px;
  }
`;

const CTATitle = styled.h2`
  ${typography(undefined, 'title4', 'medium')}
  color: ${color.common['100']};
  margin: 0;
  text-align: center;

  @media (max-width: 575px) {
    font-size: 18px;
    line-height: 26px;
  }
`;

const CTASubtitle = styled.p`
  ${typography(undefined, 'heading2', 'medium')}
  color: ${textColor.light['fg-neutral-assistive']};
  margin-top: 8px;
  text-align: center;
  max-width: 560px;
  white-space: pre-line;

  @media (max-width: 575px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const CTAButton = styled.button`
  margin-top: 32px;
  padding: 16px 26px;
  border-radius: 64px;
  border: none;
  background: linear-gradient(
    99deg,
    #ffa6e9 -1.23%,
    #d932ff 53.98%,
    #ff266a 101.4%
  );
  color: ${color.common['100']};
  ${typography(undefined, 'heading2', 'bold')}
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 157, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 575px) {
    margin-top: 24px;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 20px;
  }
`;
