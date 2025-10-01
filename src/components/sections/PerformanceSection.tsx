'use client';

import styled from 'styled-components';
import { typography, textColor } from '@cubig/design-system';
import { useTranslation } from 'react-i18next';

export default function PerformanceSection() {
  const { t } = useTranslation('common');

  return (
    <PerformanceContainer id='performance-section'>
      <PerformanceWrapper>
        <PerformanceContent>
          <LeftSection>
            <SectionTitle>{t('performance.title')}</SectionTitle>
          </LeftSection>
          <RightSection>
            <MainTitle>{t('performance.mainTitle')}</MainTitle>
            <SubTitle>{t('performance.subTitle')}</SubTitle>
            <StatsGrid>
              <StatCard>
                <StatValue>98.1%</StatValue>
                <StatTitle>{t('performance.stats.type1Error.title')}</StatTitle>
                <StatDescription>
                  {t('performance.stats.type1Error.description')}
                </StatDescription>
              </StatCard>
              <StatCard>
                <StatValue>99.14%</StatValue>
                <StatTitle>{t('performance.stats.type2Error.title')}</StatTitle>
                <StatDescription>
                  {t('performance.stats.type2Error.description')}
                </StatDescription>
              </StatCard>
              <StatCard>
                <StatValue>100%</StatValue>
                <StatTitle>
                  {t('performance.stats.structuredData.title')}
                </StatTitle>
                <StatDescription>
                  {t('performance.stats.structuredData.description')}
                </StatDescription>
              </StatCard>
              <StatCard>
                <StatValue>98%</StatValue>
                <StatTitle>
                  {t('performance.stats.responseSimilarity.title')}
                </StatTitle>
                <StatDescription>
                  {t('performance.stats.responseSimilarity.description')}
                </StatDescription>
              </StatCard>
            </StatsGrid>
          </RightSection>
        </PerformanceContent>
      </PerformanceWrapper>
    </PerformanceContainer>
  );
}

const PerformanceContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PerformanceWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 80px 40px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 40px 24px;
  }

  @media (max-width: 375px) {
    padding: 32px 16px;
  }
`;

const PerformanceContent = styled.div`
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

  @media (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const RightSection = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  ${typography(undefined, 'body3', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin-top: 16px;
`;

const MainTitle = styled.h3`
  ${typography(undefined, 'display1', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0 0 12px 0;
`;

const SubTitle = styled.p`
  ${typography(undefined, 'heading2', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 40px 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${textColor.light['fg-neutral-primary']};
  padding-bottom: 32px;
`;

const StatValue = styled.div`
  margin-top: 12px;
  ${typography(undefined, 'display3', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
`;

const StatTitle = styled.h4`
  ${typography(undefined, 'heading2', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin-top: 16px;
`;

const StatDescription = styled.p`
  ${typography(undefined, 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-top: 8px;
  max-width: 400px;
  width: 100%;
`;
