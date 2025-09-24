'use client';

import styled from 'styled-components';
import {
  typography,
  textColor,
  color,
  SolidButton,
} from '@cubig/design-system';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function PricingSection() {
  const { t } = useTranslation('common');
  const [selectedPlan, setSelectedPlan] = useState<'business' | 'personal'>(
    'business'
  );

  return (
    <PricingContainer>
      <PricingWrapper>
        <PricingContent>
          <LeftSection>
            <SectionTitle>{t('pricing.title')}</SectionTitle>
          </LeftSection>
          <RightSection>
            <MainTitle>{t('pricing.mainTitle')}</MainTitle>
            <SubTitle>{t('pricing.subTitle')}</SubTitle>

            <PlanToggle>
              <ToggleButton
                variant={selectedPlan === 'business' ? 'primary' : 'secondary'}
                size='large'
                onClick={() => setSelectedPlan('business')}
              >
                {t('pricing.toggle.business')}
              </ToggleButton>
              <ToggleButton
                variant={selectedPlan === 'personal' ? 'primary' : 'secondary'}
                size='large'
                onClick={() => setSelectedPlan('personal')}
              >
                {t('pricing.toggle.personal')}
              </ToggleButton>
            </PlanToggle>

            <PlansGrid $isPersonal={selectedPlan === 'personal'}>
              {selectedPlan === 'business' ? (
                <>
                  <PlanCard>
                    <PlanHeader>
                      <PlanTitle>{t('pricing.plans.plus.title')}</PlanTitle>
                      <PlanSubtitle>
                        {t('pricing.plans.plus.subtitle')}
                      </PlanSubtitle>
                      <PlanPrice>{t('pricing.plans.plus.price')}</PlanPrice>
                      <PlanPeriod>{t('pricing.plans.plus.period')}</PlanPeriod>
                    </PlanHeader>
                    <PlanBody>
                      <FeatureList>
                        <FeatureItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.plus.features.feature1')}
                        </FeatureItem>
                        <FeatureItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.plus.features.feature2')}
                        </FeatureItem>
                        <FeatureItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.plus.features.feature3')}
                        </FeatureItem>
                        <FeatureItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.plus.features.feature4')}
                        </FeatureItem>
                        <FeatureItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.plus.features.feature5')}
                        </FeatureItem>
                      </FeatureList>
                      <PlanButton variant='primary' size='large'>
                        {t('pricing.plans.plus.button')}
                      </PlanButton>
                    </PlanBody>
                  </PlanCard>

                  <PlanCard>
                    <PlanHeader $custom>
                      <PlanTitle>{t('pricing.plans.custom.title')}</PlanTitle>
                      <PlanSubtitle>
                        {t('pricing.plans.custom.subtitle')}
                      </PlanSubtitle>
                      <PlanContact>
                        {t('pricing.plans.custom.contact')}
                      </PlanContact>
                    </PlanHeader>
                    <PlanBody>
                      <FeatureList>
                        <FeatureItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.custom.features.feature1')}
                        </FeatureItem>
                        <FeatureItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.custom.features.feature2')}
                        </FeatureItem>
                        <FeatureItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.custom.features.feature3')}
                        </FeatureItem>
                        <FeatureItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.custom.features.feature4')}
                        </FeatureItem>
                        <FeatureItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.custom.features.feature5')}
                        </FeatureItem>
                        <FeatureItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.custom.features.feature6')}
                        </FeatureItem>
                      </FeatureList>
                      <PlanButton variant='primary' size='large'>
                        {t('pricing.plans.custom.button')}
                      </PlanButton>
                    </PlanBody>
                  </PlanCard>
                </>
              ) : (
                <>
                  <PlanCard>
                    <PlanHeader>
                      <PlanTitle>{t('pricing.plans.basic.title')}</PlanTitle>
                      <PlanPrice>{t('pricing.plans.basic.price')}</PlanPrice>
                      <PlanPeriod>{t('pricing.plans.basic.period')}</PlanPeriod>
                    </PlanHeader>
                    <PlanBody>
                      <TokenInfo>
                        <TokenItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.basic.tokens')}
                        </TokenItem>
                        <TokenCost>
                          {t('pricing.plans.basic.costPerToken')}
                        </TokenCost>
                      </TokenInfo>
                    </PlanBody>
                    <PlanButton>{t('pricing.plans.basic.button')}</PlanButton>
                  </PlanCard>

                  <PlanCard>
                    <PlanHeader>
                      <PlanTitle>{t('pricing.plans.plus.title')}</PlanTitle>
                      <PlanPrice>{t('pricing.plans.plus.price')}</PlanPrice>
                      <PlanPeriod>{t('pricing.plans.plus.period')}</PlanPeriod>
                    </PlanHeader>
                    <PlanBody>
                      <TokenInfo>
                        <TokenItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.plus.tokens')}
                        </TokenItem>
                        <TokenCost>
                          {t('pricing.plans.plus.costPerToken')}
                        </TokenCost>
                      </TokenInfo>
                    </PlanBody>
                    <PlanButton>{t('pricing.plans.plus.button')}</PlanButton>
                  </PlanCard>

                  <PlanCard>
                    <PlanHeader>
                      <PlanTitle>{t('pricing.plans.pro.title')}</PlanTitle>
                      <PlanPrice>{t('pricing.plans.pro.price')}</PlanPrice>
                      <PlanPeriod>{t('pricing.plans.pro.period')}</PlanPeriod>
                    </PlanHeader>
                    <PlanBody>
                      <TokenInfo>
                        <TokenItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.pro.tokens')}
                        </TokenItem>
                        <TokenCost>
                          {t('pricing.plans.pro.costPerToken')}
                        </TokenCost>
                      </TokenInfo>
                    </PlanBody>
                    <PlanButton>{t('pricing.plans.pro.button')}</PlanButton>
                  </PlanCard>

                  <PlanCard>
                    <PlanHeader>
                      <PlanTitle>{t('pricing.plans.max.title')}</PlanTitle>
                      <PlanPrice>{t('pricing.plans.max.price')}</PlanPrice>
                      <PlanPeriod>{t('pricing.plans.max.period')}</PlanPeriod>
                    </PlanHeader>
                    <PlanBody>
                      <TokenInfo>
                        <TokenItem>
                          <CheckIcon src={'/icons/Check.svg'} alt='check' />
                          {t('pricing.plans.max.tokens')}
                        </TokenItem>
                        <TokenCost>
                          {t('pricing.plans.max.costPerToken')}
                        </TokenCost>
                      </TokenInfo>
                    </PlanBody>
                    <PlanButton>{t('pricing.plans.max.button')}</PlanButton>
                  </PlanCard>
                </>
              )}
            </PlansGrid>
          </RightSection>
        </PricingContent>
      </PricingWrapper>
    </PricingContainer>
  );
}

const PricingContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${color.gray['50']};
`;

const PricingWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 80px 240px;
  margin: 0 auto;

  @media (max-width: 1440px) {
    padding: 160px 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 24px;
  }

  @media (max-width: 375px) {
    padding: 32px 16px;
  }
`;

const PricingContent = styled.div`
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

const PlanToggle = styled.div`
  border-radius: 16px;
  border: 2px solid #fff;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  padding: 8px;
  width: 232px;
  gap: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const ToggleButton = styled(SolidButton)``;

const PlansGrid = styled.div<{ $isPersonal: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isPersonal ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'};
  gap: 24px;
  align-items: stretch;

  @media (min-width: 1440px) {
    grid-template-columns: ${(props) =>
      props.$isPersonal ? 'repeat(4, 1fr)' : '1fr 421px'};
  }

  @media (max-width: 1200px) {
    grid-template-columns: ${(props) =>
      props.$isPersonal ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)'};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const PlanCard = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${color.common['100']};
`;

const PlanHeader = styled.div<{ $custom?: boolean }>`
  height: 280px;
  padding: 40px;
  background-color: ${(props) =>
    props.$custom ? color.gray['900'] : color.gray['975']};
  color: ${color.common['100']};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PlanTitle = styled.h4`
  ${typography(undefined, 'title3', 'medium')}
  color: ${color.common['100']};
  margin: 0 0 8px 0;
`;

const PlanSubtitle = styled.p`
  ${typography(undefined, 'body3', 'regular')}
  color: ${color.common['100']};
  margin: 0 0 56px 0;
`;

const PlanPrice = styled.div`
  ${typography(undefined, 'display1', 'medium')}
  color: ${color.common['100']};
  margin: 0;
`;

const PlanPeriod = styled.span`
  ${typography(undefined, 'heading1', 'medium')}
  color: ${textColor.dark['fg-neutral-alternative']};
`;

const PlanContact = styled.div`
  ${typography(undefined, 'title4', 'medium')}
  color: ${textColor.dark['fg-neutral-strong']};
  margin: 0;
`;

const PlanBody = styled.div`
  height: 464px;
  padding: 40px;
  background-color: ${color.common['100']};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${color.gray['900']};

  &:last-child {
    border-bottom: none;
  }

  ${typography(undefined, 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TokenItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  ${typography(undefined, 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const TokenCost = styled.div`
  ${typography(undefined, 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-left: 28px;
`;

const CheckIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const PlanButton = styled(SolidButton)`
  width: 100%;
  margin-top: auto;
`;
