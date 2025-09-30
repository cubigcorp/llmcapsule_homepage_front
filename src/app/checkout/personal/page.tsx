'use client';

import React, { useState, useEffect } from 'react';
import GlobalHeader from '@/components/layout/Header';
import { useTranslation } from 'react-i18next';
import { llmService } from '@/services/llm';
import type { Plan } from '@/utils/api';
import TokenBreakdown from '../components/common/TokenBreakdown';
import SummaryCard from '../components/common/SummaryCard';
import UserCountSection from '../components/common/UserCountSection';
import ContractPeriodSection from '../components/common/ContractPeriodSection';
import styled from 'styled-components';
import Image from 'next/image';
import {
  typography,
  borderColor,
  textColor,
  Divider,
  TextField,
  Badge,
  color,
} from '@cubig/design-system';
import AddIcon from '@/assets/icons/icon_add.svg';
import IndeterminateIcon from '@/assets/icons/icon_indeterminate.svg';
import InfoIcon from '@/assets/icons/icon_info.svg';

import PlanBasicImage from '@/assets/images/plan_basic.png';
import PlanPlusImage from '@/assets/images/plan_plus.png';
import PlanProImage from '@/assets/images/plan_pro.png';
import PlanMaxImage from '@/assets/images/plan_max.png';
const plans = {
  basic: { name: 'Basic', price: 8.99, minTokens: 0, maxTokens: 69999 },
  plus: { name: 'Plus', price: 12.99, minTokens: 70000, maxTokens: 119999 },
  pro: { name: 'Pro', price: 19.99, minTokens: 120000, maxTokens: 279999 },
  max: { name: 'Max', price: 39.99, minTokens: 280000, maxTokens: 999999 },
};

export default function CheckoutPage() {
  const { t } = useTranslation('checkout');
  const [userCount, setUserCount] = useState<number>(1);
  const [tokenUsage, setTokenUsage] = useState<number>(300000);
  const [contractPeriod, setContractPeriod] = useState<number>(6);
  const [apiPlans, setApiPlans] = useState<Plan[]>([]);

  const getPlanImage = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'basic':
        return PlanBasicImage;
      case 'plus':
        return PlanPlusImage;
      case 'pro':
        return PlanProImage;
      case 'max':
        return PlanMaxImage;
      default:
        return PlanBasicImage;
    }
  };

  const [tokenPackCount, setTokenPackCount] = useState<number>(0);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await llmService.getAllPlans();
        setApiPlans(plansData.data || []);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      }
    };
    fetchPlans();
  }, []);

  const getCurrentPlan = (tokens: number) => {
    if (apiPlans.length > 0) {
      const sortedPlans = [...apiPlans]
        .filter((plan) => plan.monthly_token_limit !== null)
        .sort(
          (a, b) => (a.monthly_token_limit || 0) - (b.monthly_token_limit || 0)
        );

      for (let i = sortedPlans.length - 1; i >= 0; i--) {
        if (tokens >= (sortedPlans[i].monthly_token_limit || 0) * 0.8) {
          return {
            name: sortedPlans[i].name,
            price: sortedPlans[i].price,
            minTokens: i > 0 ? sortedPlans[i - 1].monthly_token_limit || 0 : 0,
            maxTokens: sortedPlans[i].monthly_token_limit || 0,
          };
        }
      }

      return {
        name: sortedPlans[0].name,
        price: sortedPlans[0].price,
        minTokens: 0,
        maxTokens: sortedPlans[0].monthly_token_limit || 0,
      };
    }

    if (tokens >= plans.max.minTokens) return plans.max;
    if (tokens >= plans.pro.minTokens) return plans.pro;
    if (tokens >= plans.plus.minTokens) return plans.plus;
    if (tokens >= plans.basic.minTokens) return plans.basic;
    return plans.basic;
  };

  const currentPlan = getCurrentPlan(tokenUsage);

  // 가격 계산
  const basePrice = currentPlan.price * userCount;
  const contractDiscounts = { 1: 0, 6: 3, 12: 5, 18: 7, 24: 10 };
  const discountRate =
    contractDiscounts[contractPeriod as keyof typeof contractDiscounts] || 0;

  const monthlyTotal = basePrice * (1 - discountRate / 100);
  const yearlyTotal = monthlyTotal * contractPeriod;

  const handleUserCountChange = (value: string) => {
    const count = parseInt(value) || 100;
    if (count >= 100 && count <= 280000) {
      setUserCount(count);
    }
  };

  const handleCheckout = () => {
    alert('결제 기능은 추후 구현 예정입니다.');
  };

  return (
    <>
      <GlobalHeader />
      <Container>
        <Header>
          <Title>{t('title')}</Title>
          <Subtitle>{t('subtitle')}</Subtitle>
        </Header>

        <MainContent>
          <LeftSection>
            {/* 플랜 선택 */}
            <Section>
              <SectionHeader>
                <SectionTitle>{t('planSelect')}</SectionTitle>
                <Badge type='solid' variant='info'>
                  {t('tokenBased')}
                </Badge>
              </SectionHeader>
              <PlanDescription>{t('planGuide')}</PlanDescription>
              <Divider />
              <SubSectionTitle>{t('selectedPlan')}</SubSectionTitle>
              <PlanCardContainer>
                <PlanBadge>
                  <Image
                    src={getPlanImage(currentPlan.name)}
                    alt={`${currentPlan.name} plan`}
                    style={{ objectFit: 'cover' }}
                  />
                </PlanBadge>
                <PlanInfo>
                  <PlanName>
                    {currentPlan.name}
                    {t('planNameSuffix')}
                  </PlanName>
                  <PlanPrice>
                    ${currentPlan.price.toLocaleString()}/Seat
                  </PlanPrice>
                </PlanInfo>
              </PlanCardContainer>

              <TokenUsageRow>
                <TokenUsageTitle>{t('tokenUsage')}</TokenUsageTitle>
                <TokenInputRight>
                  <TextField
                    size='small'
                    style={{
                      width: '116px',
                    }}
                    value={tokenUsage.toString()}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 0;
                      // 최소/최대값 제한
                      const clampedValue = Math.min(
                        Math.max(newValue, 0),
                        600000
                      );
                      setTokenUsage(clampedValue);
                    }}
                    placeholder='280000'
                  />
                  <span>{t('tokenUnit')}</span>
                </TokenInputRight>
              </TokenUsageRow>

              <SliderContainer>
                <SliderTrack>
                  <SliderProgress $progress={(tokenUsage / 600000) * 100} />
                  <input
                    type='range'
                    min='0'
                    max='600000'
                    step='1000'
                    value={tokenUsage}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setTokenUsage(newValue);
                    }}
                  />
                </SliderTrack>
                <SliderLabels>
                  <SliderLabelLeft>
                    <span>0</span>
                    <Badge size='small' type='solid' variant='primary'>
                      Basic
                    </Badge>
                  </SliderLabelLeft>
                  <SliderLabel70k>
                    <span>70,000</span>
                    <Badge size='small' type='solid' variant='primary'>
                      Plus
                    </Badge>
                  </SliderLabel70k>
                  <SliderLabel120k>
                    <span>120,000</span>
                    <Badge size='small' type='solid' variant='primary'>
                      Pro
                    </Badge>
                  </SliderLabel120k>
                  <SliderLabel280k>
                    <span>280,000</span>
                    <Badge size='small' type='strong' variant='primary'>
                      Max
                    </Badge>
                  </SliderLabel280k>
                  <SliderLabelRight>
                    <span>600,000</span>
                  </SliderLabelRight>
                </SliderLabels>
              </SliderContainer>

              <TokenBreakdown tokenUsage={tokenUsage} />
            </Section>

            {/* 사용자 수 */}
            <Section>
              <UserCountSection
                userCount={userCount}
                onUserCountChange={setUserCount}
                type='personal'
              />
            </Section>

            {/* 계약 기간 */}
            <Section>
              <ContractPeriodSection
                contractPeriod={contractPeriod}
                contractDiscounts={contractDiscounts}
                onContractPeriodChange={setContractPeriod}
              />
            </Section>

            {false && (
              <Section>
                <SectionTitle>{t('repeat.title')}</SectionTitle>
                <PlanDescription>{t('repeat.desc')}</PlanDescription>
                <RepeatCostCard>
                  <RepeatCostLeft>
                    <RepeatCostPrice>$13,000</RepeatCostPrice>
                    <RepeatCostUnit>{t('repeat.unit')}</RepeatCostUnit>
                  </RepeatCostLeft>
                  <CounterContainer>
                    <CounterButton
                      onClick={() =>
                        setTokenPackCount(Math.max(0, tokenPackCount - 1))
                      }
                    >
                      <IndeterminateIcon />
                    </CounterButton>
                    <CounterDisplay>{tokenPackCount}</CounterDisplay>
                    <CounterButton
                      onClick={() =>
                        setTokenPackCount(
                          Math.min(userCount, tokenPackCount + 1)
                        )
                      }
                    >
                      <AddIcon />
                    </CounterButton>
                  </CounterContainer>
                </RepeatCostCard>
              </Section>
            )}

            {/* Token 정보 */}
            <TokenInfoSection>
              <TokenInfoHeader>
                <InfoIcon />
                <TokenInfoTitle>{t('tokenInfo.title')}</TokenInfoTitle>
              </TokenInfoHeader>
              <TokenInfoList>
                <TokenInfoItem>{t('tokenInfo.b1')}</TokenInfoItem>
                <TokenInfoItem>{t('tokenInfo.b2')}</TokenInfoItem>
                <TokenInfoItem>{t('tokenInfo.b3')}</TokenInfoItem>
              </TokenInfoList>
            </TokenInfoSection>
          </LeftSection>

          <RightSection>
            <SummaryCard
              type='personal'
              currentPlan={currentPlan}
              userCount={userCount}
              tokenUsage={tokenUsage}
              contractPeriod={contractPeriod}
              contractDiscounts={contractDiscounts}
              tokenPackCount={tokenPackCount}
              yearlyTotal={yearlyTotal}
              addOnTotal={0}
              addOnPrices={{}}
              securityGuideCount={-1}
              policyGuideCount={-1}
              basicModuleEnabled={false}
              selectedSubOption=''
              onCheckout={handleCheckout}
            />

            <B2BInfoCard>
              <B2BInfoIcon>
                <InfoIcon />
              </B2BInfoIcon>
              <B2BInfoContent>
                <B2BInfoText>{t('b2bInfo.text1')}</B2BInfoText>
                <B2BInfoText>{t('b2bInfo.text2')}</B2BInfoText>
              </B2BInfoContent>
            </B2BInfoCard>
          </RightSection>
        </MainContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 72px 0 94px 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 64px 32px 60px 32px;
  gap: 12px;
`;

const Title = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
`;

const Subtitle = styled.p`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
`;

const LeftSection = styled.div`
  display: flex;
  padding: 0 16px 0 32px;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.div`
  background: white;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  padding: 24px 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

const SectionTitle = styled.h3`
  ${typography('ko', 'body3', 'semibold')}
`;

const PlanDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  margin: 0 0 24px 0;
`;

const PlanCardContainer = styled.div`
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  background: white;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const PlanBadge = styled.div`
  width: 80px;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
`;

const PlanInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const PlanName = styled.span`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const PlanPrice = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const SubSectionTitle = styled.h4`
  ${typography('ko', 'body2', 'medium')}
  margin: 24px 0 12px 0;
`;

const SliderContainer = styled.div``;

const SliderTrack = styled.div`
  margin-bottom: 16px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background: #e1e5e9;
    border-radius: 3px;
    transform: translateY(-50%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(
      to right,
      #e6e7e9 0%,
      #e6e7e9 1px,
      transparent 1px,
      transparent calc(100% / 6 - 1px),
      #e6e7e9 calc(100% / 6 - 1px),
      #e6e7e9 calc(100% / 6),
      transparent calc(100% / 6),
      transparent calc(200% / 6 - 1px),
      #e6e7e9 calc(200% / 6 - 1px),
      #e6e7e9 calc(200% / 6),
      transparent calc(200% / 6),
      transparent calc(300% / 6 - 1px),
      #e6e7e9 calc(300% / 6 - 1px),
      #e6e7e9 calc(300% / 6),
      transparent calc(300% / 6),
      transparent calc(400% / 6 - 1px),
      #e6e7e9 calc(400% / 6 - 1px),
      #e6e7e9 calc(400% / 6),
      transparent calc(400% / 6),
      transparent calc(500% / 6 - 1px),
      #e6e7e9 calc(500% / 6 - 1px),
      #e6e7e9 calc(500% / 6),
      transparent calc(500% / 6),
      transparent calc(100% - 1px),
      #e6e7e9 calc(100% - 1px),
      #e6e7e9 100%
    );
    pointer-events: none;
  }

  input[type='range'] {
    width: 100%;
    height: 20px;
    border-radius: 3px;
    background: transparent;
    outline: none;
    -webkit-appearance: none;
    position: relative;
    z-index: 2;

    &::-webkit-slider-track {
      background: transparent;
      height: 4px;
      border-radius: 3px;
    }

    &::-webkit-slider-runnable-track {
      background: transparent;
      height: 4px;
      border-radius: 3px;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: white;
      border: 2px solid ${color.neutral[950]};
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: relative;
      top: -2px;
    }
  }
`;

const SliderProgress = styled.div<{ $progress: number }>`
  position: absolute;
  top: 50%;
  left: 0;
  width: ${(props) => props.$progress}%;
  height: 4px;
  background: ${color.neutral[950]};
  border-radius: 3px;
  transform: translateY(-50%);
  z-index: 1;
`;

const SliderLabels = styled.div`
  position: relative;
  height: 40px;
`;

const SliderLabel = styled.div`
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  text-align: center;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  > span {
    ${typography('ko', 'caption2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;

const SliderLabelLeft = styled(SliderLabel)`
  left: 0%;
  transform: translateX(0%);
  text-align: left;
  align-items: flex-start;
`;

const SliderLabelCenter = styled(SliderLabel)`
  transform: translateX(-50%);
  text-align: center;
  align-items: center;
`;

const SliderLabelRight = styled(SliderLabel)`
  left: 100%;
  transform: translateX(-100%);
  text-align: right;
  align-items: flex-end;
`;

const SliderLabel70k = styled(SliderLabelCenter)`
  left: 11.67%;
`;

const SliderLabel120k = styled(SliderLabelCenter)`
  left: 20%;
`;

const SliderLabel280k = styled(SliderLabelCenter)`
  left: 46.67%;
`;

const TokenUsageTitle = styled.h4`
  ${typography('ko', 'body2', 'medium')}
  margin: 0;
  flex-shrink: 0;
  width: 100px;
`;

const TokenUsageRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const TokenInputRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  span {
    ${typography('ko', 'body2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;

const RepeatCostCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 16px;
  background: white;
`;

const RepeatCostLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RepeatCostPrice = styled.span`
  ${typography('ko', 'body3', 'medium')}
`;

const RepeatCostUnit = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 8px;
  overflow: hidden;
`;

const CounterButton = styled.button`
  padding: 8px;
  border: none;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${typography('ko', 'body1', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  border-right: 1px solid ${borderColor.light['color-border-primary']};

  svg {
    color: ${textColor.light['fg-neutral-primary']};
  }

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${color.gray['50']};
  }
`;

const CounterDisplay = styled.div`
  padding: 4px 12px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography('ko', 'body2', 'medium')}
  border-right: 1px solid ${borderColor.light['color-border-primary']};
`;

const TokenInfoSection = styled.div`
  background: ${color.gray['50']};
  padding: 20px;
  border-radius: 12px;
`;

const TokenInfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const TokenInfoTitle = styled.h5`
  ${typography('ko', 'body3', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const TokenInfoList = styled.div`
  display: flex;
  flex-direction: column;
`;

const TokenInfoItem = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const RightSection = styled.div`
  position: sticky;
  top: 72px;
  padding: 0 32px 0 16px;
  height: fit-content;
`;

const B2BInfoCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background-color: ${color.gray['50']};
  margin-top: 20px;
`;

const B2BInfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${textColor.light['fg-neutral-alternative']};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const B2BInfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const B2BInfoText = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;
