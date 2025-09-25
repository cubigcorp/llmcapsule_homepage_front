'use client';

import { useState } from 'react';
import styled from 'styled-components';
import {
  typography,
  textColor,
  color,
  SolidButton,
} from '@cubig/design-system';
import { useTranslation } from 'react-i18next';

// Import SVG icons as React components
import GovernmentIcon from '@/assets/icons/Icon_court.svg';
import FinancialIcon from '@/assets/icons/Icon_money.svg';
import HealthcareIcon from '@/assets/icons/Icon_heart.svg';
import EducationIcon from '@/assets/icons/Icon_compare.svg';
import ManufacturingIcon from '@/assets/icons/Leading Content.svg';
import FnbIcon from '@/assets/icons/icon_award_meal.svg';

export default function DemoSection() {
  const { t } = useTranslation('common');
  const [activeButton, setActiveButton] = useState('Government');

  return (
    <DemoContainer id='demo-section'>
      <DemoWrapper>
        <DemoContent>
          <LeftSection>
            <SectionTitle>{t('demo.title')}</SectionTitle>
          </LeftSection>
          <RightSection>
            <DemoTitle>{t('demo.mainTitle')}</DemoTitle>
            <DemoSubtitle>{t('demo.subtitle')}</DemoSubtitle>

            <DemoImageContainer>
              <ButtonGroup>
                <DemoButton
                  variant='secondary'
                  size='large'
                  $active={activeButton === 'Government'}
                  onClick={() => setActiveButton('Government')}
                  leadingIcon={GovernmentIcon}
                >
                  Government
                </DemoButton>
                <DemoButton
                  variant='secondary'
                  size='large'
                  $active={activeButton === 'Financial'}
                  onClick={() => setActiveButton('Financial')}
                  leadingIcon={FinancialIcon}
                >
                  Financial
                </DemoButton>
                <DemoButton
                  variant='secondary'
                  size='large'
                  $active={activeButton === 'Healthcare'}
                  onClick={() => setActiveButton('Healthcare')}
                  leadingIcon={HealthcareIcon}
                >
                  Healthcare
                </DemoButton>
                <DemoButton
                  variant='secondary'
                  size='large'
                  $active={activeButton === 'Education'}
                  onClick={() => setActiveButton('Education')}
                  leadingIcon={EducationIcon}
                >
                  Education
                </DemoButton>
                <DemoButton
                  variant='secondary'
                  size='large'
                  $active={activeButton === 'Manufacturing'}
                  onClick={() => setActiveButton('Manufacturing')}
                  leadingIcon={ManufacturingIcon}
                >
                  Manufacturing
                </DemoButton>
                <DemoButton
                  variant='secondary'
                  size='large'
                  $active={activeButton === 'F&B'}
                  onClick={() => setActiveButton('F&B')}
                  leadingIcon={FnbIcon}
                >
                  F&B
                </DemoButton>
              </ButtonGroup>
              <DemoImage />
            </DemoImageContainer>
          </RightSection>
        </DemoContent>
      </DemoWrapper>
    </DemoContainer>
  );
}

const DemoContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DemoWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 160px 240px 80px 240px;
  margin: 0 auto;

  @media (max-width: 1440px) {
    padding: 160px 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

const DemoContent = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const LeftSection = styled.div`
  flex: 0 0 auto;
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  ${typography(undefined, 'body3', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin-top: 16px;
`;

const DemoTitle = styled.h3`
  ${typography(undefined, 'display1', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0 0 12px 0;
`;

const DemoSubtitle = styled.p`
  ${typography(undefined, 'heading2', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 40px 0;
`;

const DemoImageContainer = styled.div`
  background-image: url('/images/bg-demo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  padding: 64px 64px 0 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  padding: 8px;

  align-items: flex-start;
  gap: 10px;
  border-radius: 16px;
  border: 1px solid #fff;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.5) 100%);

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
`;

const DemoButton = styled(SolidButton)<{ $active?: boolean }>`
  transition: all 0.2s ease;
`;

const DemoImage = styled.div`
  width: 100%;
  max-width: 1032px;
  height: 685px;
  background-image: url('/images/demo-browser_desktop.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
`;
