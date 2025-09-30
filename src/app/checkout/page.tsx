'use client';

import React, { useState, useEffect } from 'react';
import GlobalHeader from '@/components/layout/Header';
import { useTranslation } from 'react-i18next';
import { llmService } from '@/services/llm';
import styled from 'styled-components';
import Image from 'next/image';
import {
  SolidButton,
  typography,
  borderColor,
  textColor,
  Divider,
  layerColor,
  Checkbox,
  TextField,
  Chip,
  Badge,
  color,
} from '@cubig/design-system';
import RemoveIcon from '@/assets/icons/icon_remove.svg';
import AddIcon from '@/assets/icons/icon_add.svg';
import SmallAddIcon from '@/assets/icons/icon_add_small.svg';
import IndeterminateIcon from '@/assets/icons/icon_indeterminate.svg';
import InfoIcon from '@/assets/icons/icon_info.svg';
import InfoSmallIcon from '@/assets/icons/icon_info_small.svg';
import PrintIcon from '@/assets/icons/Icon_print.svg';
import IconData from '@/assets/icons/icon_data.svg';
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
  const [userCount, setUserCount] = useState<number>(100);
  const [tokenUsage, setTokenUsage] = useState<number>(300000);
  const [contractPeriod, setContractPeriod] = useState<number>(6);
  const [apiPlans, setApiPlans] = useState<
    Array<{
      id: number;
      name: string;
      price: string;
      monthly_token_limit: number;
    }>
  >([]);

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

  // Add-on 상태
  const [securityGuideCount, setSecurityGuideCount] = useState<number>(-1);
  const [policyGuideCount, setPolicyGuideCount] = useState<number>(-1);
  const [basicModuleEnabled, setBasicModuleEnabled] = useState<boolean>(false);
  const [unstructuredModuleEnabled, setUnstructuredModuleEnabled] =
    useState<boolean>(false);
  const [selectedSubOption, setSelectedSubOption] = useState<string>('');
  const [ragSystemEnabled, setRagSystemEnabled] = useState<boolean>(false);
  const [graphRagEnabled, setGraphRagEnabled] = useState<boolean>(false);
  const [documentSecurityEnabled, setDocumentSecurityEnabled] =
    useState<boolean>(false);
  const [aiAnswerEnabled, setAiAnswerEnabled] = useState<boolean>(false);
  const [tokenPackCount, setTokenPackCount] = useState<number>(0);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await llmService.getAllPlans();
        setApiPlans(plansData);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      }
    };
    fetchPlans();
  }, []);

  const getCurrentPlan = (tokens: number) => {
    if (apiPlans.length > 0) {
      const sortedPlans = [...apiPlans].sort(
        (a, b) => a.monthly_token_limit - b.monthly_token_limit
      );

      for (let i = sortedPlans.length - 1; i >= 0; i--) {
        if (tokens >= sortedPlans[i].monthly_token_limit * 0.8) {
          return {
            name: sortedPlans[i].name,
            price: parseFloat(sortedPlans[i].price),
            minTokens: i > 0 ? sortedPlans[i - 1].monthly_token_limit : 0,
            maxTokens: sortedPlans[i].monthly_token_limit,
          };
        }
      }

      return {
        name: sortedPlans[0].name,
        price: parseFloat(sortedPlans[0].price),
        minTokens: 0,
        maxTokens: sortedPlans[0].monthly_token_limit,
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

  // Add-on 가격
  const addOnPrices = {
    security:
      securityGuideCount === 5
        ? 4210
        : securityGuideCount === 8
          ? 8420
          : securityGuideCount === 12
            ? 12630
            : 0,
    policy:
      policyGuideCount === 0
        ? 21050
        : policyGuideCount === 200
          ? 12630
          : policyGuideCount === 500
            ? 0
            : 0,
    basicModule: basicModuleEnabled ? 6740 : 0,
    subOption:
      selectedSubOption === 'filter5'
        ? 10110
        : selectedSubOption === 'filter8'
          ? 12630
          : selectedSubOption === 'filter12'
            ? 15160
            : 0,
    rag: ragSystemEnabled ? 8420 : 0,
    graphRag: graphRagEnabled ? 31990 : 0,
    documentSecurity: documentSecurityEnabled ? 4210 : 0,
    aiAnswer: aiAnswerEnabled ? 4210 : 0,
    unstructuredModule: unstructuredModuleEnabled ? 21050 : 0,
    tokenPack: tokenPackCount * 13000,
  };

  const addOnTotal = Object.values(addOnPrices).reduce(
    (sum, price) => sum + price,
    0
  );

  const handleUserCountChange = (value: string) => {
    const count = parseInt(value) || 100;
    if (count >= 100 && count <= 280000) {
      setUserCount(count);
    }
  };

  // 사용자 수에 따른 중앙관리자 콘솔 자동 선택
  useEffect(() => {
    if (userCount >= 100 && userCount <= 200) {
      setPolicyGuideCount(0); // 100-200 선택
    } else if (userCount > 200 && userCount <= 500) {
      setPolicyGuideCount(200); // 200-500 선택
    } else if (userCount > 500) {
      setPolicyGuideCount(500); // 500+ 선택
    } else {
      setPolicyGuideCount(-1); // 선택 안함
    }
  }, [userCount]);

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
              <PlanCard>
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
              </PlanCard>

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

              <TokenBreakdownSection>
                <TokenBreakdownGrid>
                  <TokenBreakdownLeft>
                    <TokenCard>
                      <TokenHeader>
                        <TokenTitle>{t('breakdown.title')}</TokenTitle>
                        <Badge size='small' type='solid' variant='secondary'>
                          {t('breakdown.ratio')}
                        </Badge>
                      </TokenHeader>
                      <TokenContent>
                        <TokenLeft>
                          <TokenIcon>
                            <IconData />
                          </TokenIcon>
                          <TokenLabel>{t('breakdown.tokenLabel')}</TokenLabel>
                        </TokenLeft>
                        <TokenRight>
                          <TokenTotal>
                            {tokenUsage.toLocaleString()}
                            <TokenUnit>T</TokenUnit>
                          </TokenTotal>
                          <TokenDivider />
                          <TokenBreakdown>
                            <TokenBreakdownItem>
                              <span>{t('breakdown.input')}</span>
                              <span>
                                {Math.round(tokenUsage * 0.6).toLocaleString()}
                                <BreakdownUnit>T</BreakdownUnit>
                              </span>
                            </TokenBreakdownItem>
                            <TokenBreakdownItem>
                              <span>{t('breakdown.output')}</span>
                              <span>
                                {Math.round(tokenUsage * 0.4).toLocaleString()}
                                <BreakdownUnit>T</BreakdownUnit>
                              </span>
                            </TokenBreakdownItem>
                          </TokenBreakdown>
                        </TokenRight>
                      </TokenContent>
                    </TokenCard>

                    <TokenCard>
                      <TokenHeader>
                        <TokenTitle>{t('convert.pageConversion')}</TokenTitle>
                      </TokenHeader>
                      <PageContentWrapper>
                        <PageTokenContent>
                          <TokenLeft>
                            <A4Icon>
                              <PrintIcon />
                            </A4Icon>
                            <TokenLabel>{t('convert.a4Label')}</TokenLabel>
                          </TokenLeft>
                          <TokenRight>
                            <TokenTotal>
                              {Math.ceil(Math.round(tokenUsage * 1.6) / 2200) +
                                Math.ceil(Math.round(tokenUsage * 4.5) / 3800)}
                              <TokenUnit>{t('convert.pageUnit')}</TokenUnit>
                            </TokenTotal>
                            <TokenDivider />
                            <TokenBreakdown>
                              <TokenBreakdownItem>
                                <span>{t('convert.ko')}</span>
                                <span>
                                  {Math.ceil(
                                    Math.round(tokenUsage * 1.6) / 2200
                                  )}
                                  <BreakdownUnit>
                                    {t('convert.pageUnit')}
                                  </BreakdownUnit>
                                </span>
                              </TokenBreakdownItem>
                              <TokenBreakdownItem>
                                <span>{t('convert.en')}</span>
                                <span>
                                  {Math.ceil(
                                    Math.round(tokenUsage * 4.5) / 3800
                                  )}
                                  <BreakdownUnit>
                                    {t('convert.pageUnit')}
                                  </BreakdownUnit>
                                </span>
                              </TokenBreakdownItem>
                            </TokenBreakdown>
                          </TokenRight>
                        </PageTokenContent>
                        <PageAssumptionNote>
                          <InfoSmallIcon />
                          <span>{t('assumptions.pageConversion')}</span>
                        </PageAssumptionNote>
                      </PageContentWrapper>
                    </TokenCard>
                  </TokenBreakdownLeft>

                  <TokenBreakdownRight>
                    <TokenCard>
                      <TokenHeader>
                        <TokenTitle>
                          {t('convert.characterConversion')}
                        </TokenTitle>
                      </TokenHeader>
                      <LanguageContent>
                        <LanguageCard>
                          <TokenLeft>
                            <LanguageIcon>{t('convert.krLabel')}</LanguageIcon>
                            <TokenLabel>{t('convert.ko')}</TokenLabel>
                          </TokenLeft>
                          <TokenRight>
                            <TokenTotal>
                              {Math.round(tokenUsage * 1.6).toLocaleString()}
                              <TokenUnit>{t('convert.charUnit')}</TokenUnit>
                            </TokenTotal>
                            <TokenDivider />
                            <TokenBreakdown>
                              <TokenBreakdownItem>
                                <span>{t('breakdown.input')}</span>
                                <span>
                                  {Math.round(
                                    tokenUsage * 0.6 * 1.6
                                  ).toLocaleString()}
                                  <BreakdownUnit>
                                    {t('convert.charUnit')}
                                  </BreakdownUnit>
                                </span>
                              </TokenBreakdownItem>
                              <TokenBreakdownItem>
                                <span>{t('breakdown.output')}</span>
                                <span>
                                  {Math.round(
                                    tokenUsage * 0.4 * 1.6
                                  ).toLocaleString()}
                                  <BreakdownUnit>
                                    {t('convert.charUnit')}
                                  </BreakdownUnit>
                                </span>
                              </TokenBreakdownItem>
                            </TokenBreakdown>
                          </TokenRight>
                        </LanguageCard>

                        <LanguageCard>
                          <TokenLeft>
                            <LanguageIcon>{t('convert.enLabel')}</LanguageIcon>
                            <TokenLabel>{t('convert.en')}</TokenLabel>
                          </TokenLeft>
                          <TokenRight>
                            <TokenTotal>
                              {Math.round(tokenUsage * 4.5).toLocaleString()}
                              <TokenUnit>{t('convert.charUnit')}</TokenUnit>
                            </TokenTotal>
                            <TokenDivider />
                            <TokenBreakdown>
                              <TokenBreakdownItem>
                                <span>{t('breakdown.input')}</span>
                                <span>
                                  {Math.round(
                                    tokenUsage * 0.6 * 4.5
                                  ).toLocaleString()}
                                  <BreakdownUnit>
                                    {t('convert.charUnit')}
                                  </BreakdownUnit>
                                </span>
                              </TokenBreakdownItem>
                              <TokenBreakdownItem>
                                <span>{t('breakdown.output')}</span>
                                <span>
                                  {Math.round(
                                    tokenUsage * 0.4 * 4.5
                                  ).toLocaleString()}
                                  <BreakdownUnit>
                                    {t('convert.charUnit')}
                                  </BreakdownUnit>
                                </span>
                              </TokenBreakdownItem>
                            </TokenBreakdown>
                          </TokenRight>
                        </LanguageCard>
                        <PageAssumptionNote>
                          <InfoSmallIcon />
                          <span>{t('assumptions.characterConversion')}</span>
                        </PageAssumptionNote>
                      </LanguageContent>
                    </TokenCard>
                  </TokenBreakdownRight>
                </TokenBreakdownGrid>
              </TokenBreakdownSection>
            </Section>

            {/* 사용자 수 */}
            <Section>
              <SectionTitle>{t('users.title')}</SectionTitle>
              <UserInputSection>
                <TextField
                  label={t('users.label')}
                  size='large'
                  value={userCount.toString()}
                  onChange={(e) => handleUserCountChange(e.target.value)}
                />
                <UserCountControls>
                  <Chip
                    size='x-small'
                    leadingIcon={<RemoveIcon />}
                    onClick={() => setUserCount(Math.max(100, userCount - 50))}
                  >
                    {t('users.step')}
                  </Chip>
                  <Chip
                    size='x-small'
                    leadingIcon={<SmallAddIcon />}
                    onClick={() => setUserCount(userCount + 50)}
                  >
                    {t('users.step')}
                  </Chip>
                </UserCountControls>
              </UserInputSection>
            </Section>

            {/* 계약 기간 */}
            <Section>
              <SectionTitle>{t('contract.title')}</SectionTitle>
              <PeriodDescription>
                {contractPeriod}개월 마다 자동 갱신되며, 기간 할인은 운영 정책에
                따라 달라질 수 있습니다.
              </PeriodDescription>
              <PeriodOptions>
                {[
                  { months: 1, discount: 0 },
                  { months: 6, discount: 3 },
                  { months: 12, discount: 5 },
                  { months: 18, discount: 7 },
                  { months: 24, discount: 10 },
                ].map((option) => (
                  <PeriodOption
                    key={option.months}
                    $isSelected={contractPeriod === option.months}
                    onClick={() => setContractPeriod(option.months)}
                  >
                    <span>
                      {option.months}
                      {t('contract.monthsSuffix')}
                    </span>
                    <Badge
                      size='small'
                      type='solid'
                      variant={option.discount === 0 ? 'primary' : 'info'}
                    >
                      {option.discount}%
                    </Badge>
                  </PeriodOption>
                ))}
              </PeriodOptions>
            </Section>

            {/* Add-on */}
            <Section>
              <SectionTitle>{t('addon.title')}</SectionTitle>
              <AddOnDescription>{t('addon.desc')}</AddOnDescription>

              <AddOnGroup>
                <AddOnSubTitle>{t('addon.admin')}</AddOnSubTitle>
                <AddOnNote>{t('addon.adminNote')}</AddOnNote>
                <AddOnOptions>
                  <AddOnOption
                    $isSelected={policyGuideCount === -1}
                    onClick={() => setPolicyGuideCount(-1)}
                  >
                    <span>{t('addon.none')}</span>
                    <span>$0</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={policyGuideCount === 0}
                    onClick={() => setPolicyGuideCount(0)}
                  >
                    <span>{t('addon.range100_200')}</span>
                    <span>$21,050</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={policyGuideCount === 200}
                    onClick={() => setPolicyGuideCount(200)}
                  >
                    <span>{t('addon.range200_500')}</span>
                    <span>$12,630</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={policyGuideCount === 500}
                    onClick={() => setPolicyGuideCount(500)}
                  >
                    <span>{t('addon.range500p')}</span>
                    <span>$0</span>
                  </AddOnOption>
                </AddOnOptions>
              </AddOnGroup>
              <Divider style={{ margin: '20px 0' }} />
              <AddOnGroup>
                <AddOnSubTitle>{t('addon.security')}</AddOnSubTitle>
                <AddOnOptions>
                  <AddOnOption
                    $isSelected={securityGuideCount === -1}
                    onClick={() => setSecurityGuideCount(-1)}
                  >
                    <span>{t('addon.none')}</span>
                    <span>$0</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={securityGuideCount === 5}
                    onClick={() => setSecurityGuideCount(5)}
                  >
                    <span>{t('addon.count5')}</span>
                    <span>$4,210</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={securityGuideCount === 8}
                    onClick={() => setSecurityGuideCount(8)}
                  >
                    <span>{t('addon.count8')}</span>
                    <span>$8,420</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={securityGuideCount === 12}
                    onClick={() => setSecurityGuideCount(12)}
                  >
                    <span>{t('addon.count12')}</span>
                    <span>$12,630</span>
                  </AddOnOption>
                </AddOnOptions>
              </AddOnGroup>
              <Divider style={{ margin: '20px 0' }} />
              <AddOnGroup>
                <AddOnSubTitle>{t('addon.module')}</AddOnSubTitle>
                <LargeAddOnCard $isSelected={basicModuleEnabled}>
                  <AddOnMainToggle>
                    <Checkbox
                      variant='primary'
                      state={basicModuleEnabled ? 'checked' : 'unchecked'}
                      onChange={(checked) => {
                        setBasicModuleEnabled(checked);
                        if (checked) {
                          setSelectedSubOption('none');
                        } else {
                          setSelectedSubOption('');
                        }
                      }}
                    />
                    <span>{t('addon.basic')}</span>
                    <AddOnMainPrice>$6,740</AddOnMainPrice>
                  </AddOnMainToggle>

                  <AddOnSubGrid>
                    <AddOnSubCard
                      $isSelected={selectedSubOption === 'none'}
                      $isDisabled={!basicModuleEnabled}
                      onClick={() =>
                        basicModuleEnabled && setSelectedSubOption('none')
                      }
                    >
                      <span>{t('addon.noneShort')}</span>
                      <span>$0</span>
                    </AddOnSubCard>
                    <AddOnSubCard
                      $isSelected={selectedSubOption === 'filter5'}
                      $isDisabled={!basicModuleEnabled}
                      onClick={() =>
                        basicModuleEnabled && setSelectedSubOption('filter5')
                      }
                    >
                      <span>{t('addon.filter5')}</span>
                      <span>$10,110</span>
                    </AddOnSubCard>
                    <AddOnSubCard
                      $isSelected={selectedSubOption === 'filter8'}
                      $isDisabled={!basicModuleEnabled}
                      onClick={() =>
                        basicModuleEnabled && setSelectedSubOption('filter8')
                      }
                    >
                      <span>{t('addon.filter8')}</span>
                      <span>$12,630</span>
                    </AddOnSubCard>
                    <AddOnSubCard
                      $isSelected={selectedSubOption === 'filter12'}
                      $isDisabled={!basicModuleEnabled}
                      onClick={() =>
                        basicModuleEnabled && setSelectedSubOption('filter12')
                      }
                    >
                      <span>{t('addon.filter12')}</span>
                      <span>$15,160</span>
                    </AddOnSubCard>
                  </AddOnSubGrid>
                </LargeAddOnCard>
              </AddOnGroup>
              <Divider style={{ margin: '20px 0' }} />

              <AddOnGroup>
                <AddOnSubTitle>{t('addon.others')}</AddOnSubTitle>
                <AddOnItemList>
                  <AddOnItem
                    $isSelected={aiAnswerEnabled}
                    onClick={() => setAiAnswerEnabled(!aiAnswerEnabled)}
                  >
                    <Checkbox
                      variant='primary'
                      state={aiAnswerEnabled ? 'checked' : 'unchecked'}
                      onChange={(checked) => setAiAnswerEnabled(checked)}
                    />
                    <span>{t('addon.aiAnswer')}</span>
                    <span>$4,210</span>
                  </AddOnItem>
                  <AddOnItem
                    $isSelected={unstructuredModuleEnabled}
                    onClick={() =>
                      setUnstructuredModuleEnabled(!unstructuredModuleEnabled)
                    }
                  >
                    <Checkbox
                      variant='primary'
                      state={
                        unstructuredModuleEnabled ? 'checked' : 'unchecked'
                      }
                      onChange={(checked) =>
                        setUnstructuredModuleEnabled(checked)
                      }
                    />
                    <span>{t('addon.unstructured')}</span>
                    <span>$21,050</span>
                  </AddOnItem>
                  <AddOnItem
                    $isSelected={ragSystemEnabled}
                    onClick={() => setRagSystemEnabled(!ragSystemEnabled)}
                  >
                    <Checkbox
                      variant='primary'
                      state={ragSystemEnabled ? 'checked' : 'unchecked'}
                      onChange={(checked) => setRagSystemEnabled(checked)}
                    />
                    <span>{t('addon.rag')}</span>
                    <span>$8,420</span>
                  </AddOnItem>
                  <AddOnItem
                    $isSelected={graphRagEnabled}
                    onClick={() => setGraphRagEnabled(!graphRagEnabled)}
                  >
                    <Checkbox
                      variant='primary'
                      state={graphRagEnabled ? 'checked' : 'unchecked'}
                      onChange={(checked) => setGraphRagEnabled(checked)}
                    />
                    <span>{t('addon.graphRag')}</span>
                    <span>$31,990</span>
                  </AddOnItem>
                  <AddOnItem
                    $isSelected={documentSecurityEnabled}
                    onClick={() =>
                      setDocumentSecurityEnabled(!documentSecurityEnabled)
                    }
                  >
                    <Checkbox
                      variant='primary'
                      state={documentSecurityEnabled ? 'checked' : 'unchecked'}
                      onChange={(checked) =>
                        setDocumentSecurityEnabled(checked)
                      }
                    />
                    <span>{t('addon.docSec')}</span>
                    <span>$4,210</span>
                  </AddOnItem>
                </AddOnItemList>
              </AddOnGroup>
            </Section>

            {/* 반복 비용 */}
            <Section>
              <SectionTitle>{t('repeat.title')}</SectionTitle>
              <AddOnDescription>{t('repeat.desc')}</AddOnDescription>
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
                      setTokenPackCount(Math.min(userCount, tokenPackCount + 1))
                    }
                  >
                    <AddIcon />
                  </CounterButton>
                </CounterContainer>
              </RepeatCostCard>
            </Section>

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
            <SummaryCard>
              <TopSection>
                <SummaryTitle>{t('summary.title')}</SummaryTitle>

                <SummaryItem>
                  <SummaryLabel>기본 항목</SummaryLabel>
                  <SummaryDetails>
                    <SummaryDetail>
                      선택된 플랜: {currentPlan.name} ($
                      {currentPlan.price.toLocaleString()}/Seat · Cap{' '}
                      {tokenUsage.toLocaleString()})
                    </SummaryDetail>
                    <SummaryDetail>사용 인원: {userCount}</SummaryDetail>
                    <SummaryDetail>
                      추가 토큰(반복 비용): {tokenPackCount} × $13,000/월
                    </SummaryDetail>
                    <SummaryDetail>
                      계약 기간: {contractPeriod}개월
                    </SummaryDetail>
                    <SummaryDetail>
                      할인율: (
                      {contractDiscounts[
                        contractPeriod as keyof typeof contractDiscounts
                      ] || 0}
                      %)
                    </SummaryDetail>
                    <SummaryDetail>
                      정기 결제 비용: $
                      {Math.round(
                        yearlyTotal + tokenPackCount * 13000 * contractPeriod
                      ).toLocaleString()}
                    </SummaryDetail>
                  </SummaryDetails>
                </SummaryItem>
                <Divider style={{ margin: '24px 0' }} />
                <SummaryItem>
                  <SummaryLabel>1회성 구축 비용</SummaryLabel>
                  <SummaryDetails>
                    {securityGuideCount !== -1 && (
                      <SummaryDetail>
                        정형 민감정보 조건 모듈: (1회 적용 {securityGuideCount}
                        개) / ${addOnPrices.security.toLocaleString()}
                      </SummaryDetail>
                    )}
                    {policyGuideCount !== -1 && (
                      <SummaryDetail>
                        중앙 관리자 콘솔 Admin 구축: (
                        {policyGuideCount === 0
                          ? '100-200'
                          : policyGuideCount === 200
                            ? '200-500'
                            : '500+'}
                        ) / ${addOnPrices.policy.toLocaleString()}
                      </SummaryDetail>
                    )}
                    {basicModuleEnabled && (
                      <SummaryDetail>
                        민감 키워드 추가: (기본 모듈
                        {selectedSubOption !== 'none' &&
                        selectedSubOption !== ''
                          ? ` + ${selectedSubOption === 'filter5' ? '키워드 5개' : selectedSubOption === 'filter8' ? '키워드 8개' : '키워드 12개'}`
                          : ''}
                        ) / $
                        {(
                          addOnPrices.basicModule + addOnPrices.subOption
                        ).toLocaleString()}
                      </SummaryDetail>
                    )}
                    {aiAnswerEnabled && (
                      <SummaryDetail>
                        문맥 기반 AI 답변 적용: $
                        {addOnPrices.aiAnswer.toLocaleString()}
                      </SummaryDetail>
                    )}
                    {unstructuredModuleEnabled && (
                      <SummaryDetail>
                        비정형 민감정보 조건 모듈: $
                        {addOnPrices.unstructuredModule.toLocaleString()}
                      </SummaryDetail>
                    )}
                    {ragSystemEnabled && (
                      <SummaryDetail>
                        RAG 시스템: ${addOnPrices.rag.toLocaleString()}
                      </SummaryDetail>
                    )}
                    {graphRagEnabled && (
                      <SummaryDetail>
                        최신 기술 Graph RAG 적용: $
                        {addOnPrices.graphRag.toLocaleString()}
                      </SummaryDetail>
                    )}
                    {documentSecurityEnabled && (
                      <SummaryDetail>
                        문서 보안 등급 별 접근 제어: $
                        {addOnPrices.documentSecurity.toLocaleString()}
                      </SummaryDetail>
                    )}
                  </SummaryDetails>
                </SummaryItem>
                <Divider style={{ margin: '24px 0' }} />
                <PriceBreakdownSection>
                  <PriceBreakdownItem>
                    <span>정기 결제 비용</span>
                    <span>
                      $
                      {Math.round(
                        yearlyTotal + tokenPackCount * 13000 * contractPeriod
                      ).toLocaleString()}
                    </span>
                  </PriceBreakdownItem>
                  <PriceBreakdownItem>
                    <span>1회성 구축 비용</span>
                    <span>${Math.round(addOnTotal).toLocaleString()}</span>
                  </PriceBreakdownItem>
                </PriceBreakdownSection>

                <TotalSection>
                  <TotalLabel>총 계약 금액</TotalLabel>
                  <TotalPrice>
                    $
                    {Math.round(
                      yearlyTotal +
                        tokenPackCount * 13000 * contractPeriod +
                        addOnTotal
                    ).toLocaleString()}
                  </TotalPrice>
                </TotalSection>
              </TopSection>

              <BottomSection>
                <ButtonGroup>
                  <SolidButton
                    variant='primary'
                    size='large'
                    onClick={handleCheckout}
                  >
                    {t('buttons.buy')}
                  </SolidButton>
                  <SolidButton
                    variant='secondary'
                    size='large'
                    onClick={() => alert('문의하기')}
                  >
                    {t('buttons.contact')}
                  </SolidButton>
                  <SolidButton
                    variant='secondary'
                    size='large'
                    onClick={() => alert('PDF 다운로드')}
                  >
                    <span>↓</span> {t('buttons.pdf')}
                  </SolidButton>
                </ButtonGroup>
              </BottomSection>
            </SummaryCard>

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

const PlanCard = styled.div`
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

const TokenBreakdownSection = styled.div`
  margin-top: 24px;
`;

const TokenBreakdownGrid = styled.div`
  display: flex;
  gap: 20px;
`;

const TokenBreakdownLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TokenBreakdownRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserInputSection = styled.div`
  margin-top: 20px;
`;

const UserCountControls = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const PeriodDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 8px 0 20px 0;
`;

const PeriodOptions = styled.div`
  display: flex;
  gap: 12px;
`;

const PeriodOption = styled.div<{ $isSelected: boolean }>`
  padding: 16px 20px;
  border: ${(props) =>
    props.$isSelected
      ? `1.8px solid ${borderColor.light['color-border-focused']}`
      : `1px solid ${borderColor.light['color-border-primary']}`};
  border-radius: 12px;
  background: ${color.gray['50']};
  cursor: pointer;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  > span {
    ${typography('ko', 'body3', 'medium')}
  }
`;

const AddOnDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 8px 0 20px 0;
`;

const LargeAddOnCard = styled.div<{ $isSelected?: boolean }>`
  border: ${(props) =>
    props.$isSelected
      ? `1.8px solid ${borderColor.light['color-border-focused']}`
      : `1px solid ${borderColor.light['color-border-primary']}`};
  border-radius: 12px;
  padding: 24px;
  background: white;
`;

const AddOnMainToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${borderColor.light['color-border-primary']};
  margin-bottom: 20px;

  > span:nth-child(2) {
    ${typography('ko', 'body2', 'semibold')}
    color: ${textColor.light['fg-neutral-primary']};
    flex: 1;
  }
`;

const AddOnMainPrice = styled.span`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const AddOnSubGrid = styled.div`
  display: flex;
  gap: 12px;
`;

const AddOnSubCard = styled.div<{
  $isSelected: boolean;
  $isDisabled?: boolean;
}>`
  padding: 16px;
  border: ${(props) =>
    props.$isSelected
      ? `1.8px solid ${borderColor.light['color-border-focused']}`
      : `1px solid ${borderColor.light['color-border-primary']}`};
  border-radius: 8px;
  background: ${color.gray['50']};
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$isDisabled ? 0.5 : 1)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  flex: 1;

  span:first-child {
    ${typography('ko', 'body3', 'medium')}
    color: ${textColor.light['fg-neutral-primary']};
  }

  span:last-child {
    ${typography('ko', 'body2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;

const AddOnItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AddOnItem = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  border: ${(props) =>
    props.$isSelected
      ? `1.8px solid ${borderColor.light['color-border-focused']}`
      : `1px solid ${borderColor.light['color-border-primary']}`};
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  span:nth-child(2) {
    ${typography('ko', 'body3', 'medium')}
    flex: 1;
  }

  span:last-child {
    ${typography('ko', 'body3', 'regular')}
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

const AddOnGroup = styled.div`
  &:last-child {
    margin-bottom: 0;
  }
`;

const AddOnSubTitle = styled.h4`
  ${typography('ko', 'body2', 'medium')}
  margin: 0 0 8px 0;
`;

const AddOnNote = styled.p`
  ${typography('ko', 'body2', 'regular')}
  margin: 0 0 12px 0;
  color: ${textColor.light['fg-neutral-alternative']};
`;

const AddOnOptions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const AddOnOption = styled.div<{ $isSelected: boolean }>`
  padding: 16px 20px;
  border: ${(props) =>
    props.$isSelected
      ? `1.8px solid ${borderColor.light['color-border-focused']}`
      : `1px solid ${borderColor.light['color-border-primary']}`};
  border-radius: 12px;
  background: ${color.gray['50']};
  cursor: pointer;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  span:first-child {
    ${typography('ko', 'body3', 'semibold')}
    color: ${textColor.light['fg-neutral-primary']};
  }

  span:last-child {
    ${typography('ko', 'body2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
  }
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

const SummaryCard = styled.div`
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  overflow: hidden;
`;

const TopSection = styled.div`
  background: white;
  padding: 20px 24px;
`;

const BottomSection = styled.div`
  background: ${layerColor.light['bg-layer-basement']};
  padding: 20px 24px;
`;

const SummaryTitle = styled.h3`
  ${typography('ko', 'heading1', 'semibold')}
  margin-bottom: 16px;
`;

const SummaryItem = styled.div``;

const SummaryLabel = styled.h4`
  ${typography('ko', 'body2', 'medium')}
  margin-bottom: 8px;
`;

const SummaryDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SummaryDetail = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};

  &:before {
    content: '• ';
    margin-right: 4px;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalLabel = styled.div`
  ${typography('ko', 'heading1', 'semibold')}
`;

const TotalPrice = styled.div`
  ${typography('ko', 'title1', 'semibold')}
`;

const PriceBreakdownSection = styled.div`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriceBreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span:first-child {
    ${typography('ko', 'body2', 'medium')}
  }

  span:last-child {
    font-weight: 600;
    ${typography('ko', 'body3', 'medium')}
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

const TokenCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: ${color.gray['50']};
`;

const TokenHeader = styled.div`
  padding: 16px 12px 8px 12px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TokenTitle = styled.h5`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const TokenContent = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  margin: 0 12px 16px 12px;
`;

const LanguageContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LanguageCard = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
`;

const TokenLeft = styled.div`
  display: flex;
  width: 80px;
  height: 89px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-right: 1px solid ${borderColor.light['color-border-primary']};
  padding: 8px 0;
`;

const TokenIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography('ko', 'caption2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};

  svg {
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;

const TokenLabel = styled.div`
  ${typography('ko', 'caption2', 'regular')}
`;

const TokenRight = styled.div`
  padding: 8px 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TokenTotal = styled.div`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  display: flex;
  align-items: center;
  gap: 2px;
`;

const TokenUnit = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const TokenBreakdown = styled.div`
  display: flex;
  flex-direction: column;
`;

const TokenDivider = styled.div`
  height: 1px;
  background-color: ${borderColor.light['color-border-primary']};
  margin: 8px 0;
`;

const TokenBreakdownItem = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  span:first-child {
    ${typography('ko', 'caption2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
  }

  span:last-child {
    ${typography('ko', 'caption2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;

const BreakdownUnit = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const LanguageIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography('ko', 'caption2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const A4Icon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const PageContentWrapper = styled.div`
  padding: 0 12px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PageTokenContent = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
`;

const PageAssumptionNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${textColor.light['fg-neutral-alternative']};
  }

  span {
    ${typography('ko', 'caption2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;
