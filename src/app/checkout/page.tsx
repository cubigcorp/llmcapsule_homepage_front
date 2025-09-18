'use client';

import React, { useState, useEffect } from 'react';
import GlobalHeader from '@/components/layout/Header';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  SolidButton,
  typography,
  borderColor,
  textColor,
  Input,
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
import SmallInfoIcon from '@/assets/icons/icon_info_small.svg';
import PrintIcon from '@/assets/icons/Icon_print.svg';
// 플랜 데이터 정의
const plans = {
  basic: { name: 'Basic', price: 10500, minTokens: 0, maxTokens: 119999 },
  plus: { name: 'Plus', price: 15500, minTokens: 120000, maxTokens: 279999 },
  pro: { name: 'Pro', price: 25500, minTokens: 280000, maxTokens: 599999 },
  max: { name: 'Max', price: 51000, minTokens: 600000, maxTokens: 999999 },
};

export default function CheckoutPage() {
  const { t } = useTranslation('mypage');
  const [userCount, setUserCount] = useState<number>(100);
  const [tokenUsage, setTokenUsage] = useState<number>(280000);
  const [contractPeriod, setContractPeriod] = useState<number>(6);
  const [prepayEnabled, setPrepayEnabled] = useState<boolean>(false);
  const [vatEnabled, setVatEnabled] = useState<boolean>(false);

  // Add-on 상태
  const [securityGuideCount, setSecurityGuideCount] = useState<number>(-1);
  const [adminConsoleCount, setAdminConsoleCount] = useState<number>(0);
  const [policyGuideCount, setPolicyGuideCount] = useState<number>(-1);
  const [basicModuleEnabled, setBasicModuleEnabled] = useState<boolean>(false);
  const [unstructuredModuleEnabled, setUnstructuredModuleEnabled] =
    useState<boolean>(false);
  const [selectedSubOption, setSelectedSubOption] = useState<string>('');
  const [ragSystemEnabled, setRagSystemEnabled] = useState<boolean>(false);
  const [latestTechEnabled, setLatestTechEnabled] = useState<boolean>(false);
  const [documentAnalysisEnabled, setDocumentAnalysisEnabled] =
    useState<boolean>(false);
  const [aiChatEnabled, setAiChatEnabled] = useState<boolean>(false);
  const [graphRagEnabled, setGraphRagEnabled] = useState<boolean>(false);
  const [documentSecurityEnabled, setDocumentSecurityEnabled] =
    useState<boolean>(false);
  const [aiAnswerEnabled, setAiAnswerEnabled] = useState<boolean>(false);
  const [tokenPackCount, setTokenPackCount] = useState<number>(0);

  const getCurrentPlan = (tokens: number) => {
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
        ? 12000000
        : securityGuideCount === 8
          ? 15000000
          : securityGuideCount === 12
            ? 18000000
            : 0,
    policy:
      policyGuideCount === 0
        ? 25000000
        : policyGuideCount === 200
          ? 30000000
          : policyGuideCount === 500
            ? 35000000
            : 0,
    basicModule: basicModuleEnabled ? 25000000 : 0,
    subOption:
      selectedSubOption === 'filter5'
        ? 5000000
        : selectedSubOption === 'filter8'
          ? 10000000
          : selectedSubOption === 'filter12'
            ? 15000000
            : 0,
    rag: ragSystemEnabled ? 10000000 : 0,
    graphRag: graphRagEnabled ? 38000000 : 0,
    documentSecurity: documentSecurityEnabled ? 5000000 : 0,
    aiAnswer: aiAnswerEnabled ? 5000000 : 0,
    tokenPack: tokenPackCount * 13000,
  };

  const addOnTotal = Object.values(addOnPrices).reduce(
    (sum, price) => sum + price,
    0
  );
  const subtotal = yearlyTotal + addOnTotal;
  const prepayDiscount = prepayEnabled ? subtotal * 0.002 : 0;
  const afterDiscount = subtotal - prepayDiscount;
  const vatAmount = vatEnabled ? afterDiscount * 0.1 : 0;
  const finalTotal = afterDiscount + vatAmount;

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
          <Title>{t('checkout.title')}</Title>
          <Subtitle>{t('checkout.subtitle')}</Subtitle>
        </Header>

        <MainContent>
          <LeftSection>
            {/* 플랜 선택 */}
            <Section>
              <SectionHeader>
                <SectionTitle>{t('checkout.planSelect')}</SectionTitle>
                <Badge type='solid' variant='info'>
                  {t('checkout.tokenBased')}
                </Badge>
              </SectionHeader>
              <PlanDescription>{t('checkout.planGuide')}</PlanDescription>
              <Divider />
              <SubSectionTitle>{t('checkout.selectedPlan')}</SubSectionTitle>
              <PlanCard>
                <PlanName>
                  {currentPlan.name}
                  {t('checkout.planNameSuffix')}
                </PlanName>
                <PlanPrice>
                  ₩{currentPlan.price.toLocaleString()}/Seat
                </PlanPrice>
              </PlanCard>

              <TokenUsageRow>
                <TokenUsageTitle>{t('checkout.tokenUsage')}</TokenUsageTitle>
                <TokenInputRight>
                  <TextField
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
                  <span>{t('checkout.tokenUnit')}</span>
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
                  <SliderLabel style={{ left: '11.67%' }}>
                    <span>70,000</span>
                    <Badge size='small' type='solid' variant='primary'>
                      Basic
                    </Badge>
                  </SliderLabel>
                  <SliderLabel style={{ left: '20%' }}>
                    <span>120,000</span>
                    <Badge size='small' type='solid' variant='primary'>
                      Plus
                    </Badge>
                  </SliderLabel>
                  <SliderLabel style={{ left: '46.67%' }}>
                    <span>280,000</span>
                    <Badge size='small' type='solid' variant='primary'>
                      Pro
                    </Badge>
                  </SliderLabel>
                  <SliderLabel
                    style={{ left: '100%', transform: 'translateX(-100%)' }}
                  >
                    <span>600,000</span>
                    <Badge size='small' type='strong' variant='primary'>
                      Max
                    </Badge>
                  </SliderLabel>
                </SliderLabels>
              </SliderContainer>

              <TokenBreakdownSection>
                <TokenBreakdownGrid>
                  <TokenBreakdownCard>
                    <TokenBreakdownHeader>
                      <TokenBreakdownTitle>
                        {t('checkout.breakdown.title')}
                      </TokenBreakdownTitle>
                      <Badge size='small' type='solid' variant='secondary'>
                        {t('checkout.breakdown.ratio')}
                      </Badge>
                    </TokenBreakdownHeader>
                    <TokenBreakdownContentNoPadding>
                      <TokenBreakdownHorizontal>
                        <TokenBreakdownTotalSection>
                          <TokenBreakdownTotal>
                            <TokenBreakdownTotalLabel>
                              {t('checkout.breakdown.total')}
                            </TokenBreakdownTotalLabel>
                            <TokenBreakdownTotalValue>
                              {tokenUsage.toLocaleString()}{' '}
                              <span
                                style={{
                                  color:
                                    textColor.light['fg-neutral-alternative'],
                                }}
                              >
                                T
                              </span>
                            </TokenBreakdownTotalValue>
                          </TokenBreakdownTotal>
                        </TokenBreakdownTotalSection>
                        <TokenBreakdownVerticalDivider />
                        <TokenBreakdownItems>
                          <TokenBreakdownItem>
                            <TokenBreakdownLabel>
                              {t('checkout.breakdown.input')}
                            </TokenBreakdownLabel>
                            <TokenBreakdownValue>
                              {Math.round(tokenUsage * 0.6).toLocaleString()}
                            </TokenBreakdownValue>
                          </TokenBreakdownItem>
                          <TokenBreakdownItem>
                            <TokenBreakdownLabel>
                              {t('checkout.breakdown.output')}
                            </TokenBreakdownLabel>
                            <TokenBreakdownValue>
                              {Math.round(tokenUsage * 0.4).toLocaleString()}
                            </TokenBreakdownValue>
                          </TokenBreakdownItem>
                        </TokenBreakdownItems>
                      </TokenBreakdownHorizontal>
                    </TokenBreakdownContentNoPadding>
                  </TokenBreakdownCard>
                  <TokenBreakdownCard>
                    <TokenBreakdownHeader>
                      <TokenBreakdownTitle>
                        {t('checkout.convert.title')}
                      </TokenBreakdownTitle>
                      <Badge size='small' type='solid' variant='secondary'>
                        {t('checkout.convert.assumption')}
                      </Badge>
                    </TokenBreakdownHeader>
                    <TokenBreakdownContent>
                      <LanguageBoxContainer>
                        <LanguageBox>
                          <LanguageLabel>
                            <LanguageIcon>Kr</LanguageIcon>
                            <span>{t('checkout.convert.ko')}</span>
                          </LanguageLabel>
                          <LanguageContent>
                            <LanguageTotal>
                              {Math.round(tokenUsage * 1.6).toLocaleString()}{' '}
                              <span
                                style={{
                                  color:
                                    textColor.light['fg-neutral-alternative'],
                                }}
                              >
                                {t('checkout.convert.charUnit')}
                              </span>
                            </LanguageTotal>
                            <Divider style={{ margin: '8px 0' }} />
                            <LanguageBreakdown>
                              <LanguageItem>
                                <span>{t('checkout.breakdown.input')}</span>
                                <span>
                                  {Math.round(
                                    tokenUsage * 0.6 * 1.6
                                  ).toLocaleString()}
                                </span>
                              </LanguageItem>
                              <LanguageItem>
                                <span>{t('checkout.breakdown.output')}</span>
                                <span>
                                  {Math.round(
                                    tokenUsage * 0.4 * 1.6
                                  ).toLocaleString()}
                                </span>
                              </LanguageItem>
                            </LanguageBreakdown>
                          </LanguageContent>
                        </LanguageBox>

                        <LanguageBox>
                          <LanguageLabel>
                            <LanguageIcon>En</LanguageIcon>
                            <span>{t('checkout.convert.en')}</span>
                          </LanguageLabel>
                          <LanguageContent>
                            <LanguageTotal>
                              {Math.round(tokenUsage * 4.5).toLocaleString()}{' '}
                              <span
                                style={{
                                  color:
                                    textColor.light['fg-neutral-alternative'],
                                }}
                              >
                                {t('checkout.convert.charUnit')}
                              </span>
                            </LanguageTotal>
                            <Divider style={{ margin: '8px 0' }} />
                            <LanguageBreakdown>
                              <LanguageItem>
                                <span>{t('checkout.breakdown.input')}</span>
                                <span>
                                  {Math.round(
                                    tokenUsage * 0.6 * 4.5
                                  ).toLocaleString()}
                                </span>
                              </LanguageItem>
                              <LanguageItem>
                                <span>{t('checkout.breakdown.output')}</span>
                                <span>
                                  {Math.round(
                                    tokenUsage * 0.4 * 4.5
                                  ).toLocaleString()}
                                </span>
                              </LanguageItem>
                            </LanguageBreakdown>
                          </LanguageContent>
                        </LanguageBox>

                        <A4BoxWithBorder>
                          <A4LeftSection>
                            <LanguageIcon>
                              <PrintIcon />
                            </LanguageIcon>
                            <span>A4</span>
                          </A4LeftSection>
                          <A4Grid>
                            <A4Cell>
                              <A4CellLabel>
                                {t('checkout.convert.ko')}
                              </A4CellLabel>
                            </A4Cell>
                            <A4Cell>
                              <A4CellValue>
                                <A4NumberWithUnit>
                                  <A4NumberText>
                                    {Math.ceil(
                                      Math.round(tokenUsage * 1.6) / 2200
                                    ).toLocaleString()}
                                  </A4NumberText>
                                  <A4UnitText>
                                    {t('checkout.convert.pageUnit')}
                                  </A4UnitText>
                                </A4NumberWithUnit>
                                <Badge
                                  size='small'
                                  type='outline'
                                  variant='secondary'
                                >
                                  {t('checkout.convert.estimate')}
                                </Badge>
                              </A4CellValue>
                            </A4Cell>
                            <A4Cell>
                              <A4CellLabel>
                                {t('checkout.convert.en')}
                              </A4CellLabel>
                            </A4Cell>
                            <A4Cell>
                              <A4CellValue>
                                <A4NumberWithUnit>
                                  <A4NumberText>
                                    {Math.ceil(
                                      Math.round(tokenUsage * 4.5) / 3800
                                    ).toLocaleString()}
                                  </A4NumberText>
                                  <A4UnitText>
                                    {t('checkout.convert.pageUnit')}
                                  </A4UnitText>
                                </A4NumberWithUnit>
                                <Badge
                                  size='small'
                                  type='outline'
                                  variant='secondary'
                                >
                                  {t('checkout.convert.estimate')}
                                </Badge>
                              </A4CellValue>
                            </A4Cell>
                          </A4Grid>
                        </A4BoxWithBorder>
                      </LanguageBoxContainer>

                      <TokenNote>
                        <SmallInfoIcon />
                        <TokenNoteContent>
                          {t('checkout.convert.note')}
                        </TokenNoteContent>
                      </TokenNote>
                    </TokenBreakdownContent>
                  </TokenBreakdownCard>
                </TokenBreakdownGrid>
              </TokenBreakdownSection>
            </Section>

            {/* 사용자 수 */}
            <Section>
              <SectionTitle>{t('checkout.users.title')}</SectionTitle>
              <UserInputSection>
                <TextField
                  label={t('checkout.users.label')}
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
                    {t('checkout.users.step')}
                  </Chip>
                  <Chip
                    size='x-small'
                    leadingIcon={<SmallAddIcon />}
                    onClick={() => setUserCount(userCount + 50)}
                  >
                    {t('checkout.users.step')}
                  </Chip>
                </UserCountControls>
              </UserInputSection>
            </Section>

            {/* 계약 기간 */}
            <Section>
              <SectionTitle>{t('checkout.contract.title')}</SectionTitle>
              <PeriodDescription>
                {t('checkout.contract.desc')}
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
                      {t('checkout.contract.monthsSuffix')}
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
              <Divider />
              <PrepaySection>
                <PrepayToggle>
                  <Checkbox
                    variant='primary'
                    state={prepayEnabled ? 'checked' : 'unchecked'}
                    onChange={(checked) => setPrepayEnabled(checked)}
                  />
                  <PrepayContent>
                    <PrepayTop>
                      <span>{t('checkout.contract.prepay')}</span>
                      <PrepayBadges>
                        <Badge size='small' type='strong' variant='info'>
                          {t('checkout.contract.lumpSum')}
                        </Badge>
                        <Badge size='small' type='outline' variant='info'>
                          {t('checkout.contract.pct')}
                        </Badge>
                      </PrepayBadges>
                    </PrepayTop>
                    <PrepayDescription>
                      {t('checkout.contract.prepayDesc')}
                    </PrepayDescription>
                  </PrepayContent>
                </PrepayToggle>
              </PrepaySection>
            </Section>

            {/* Add-on */}
            <Section>
              <SectionTitle>{t('checkout.addon.title')}</SectionTitle>
              <AddOnDescription>{t('checkout.addon.desc')}</AddOnDescription>

              <AddOnGroup>
                <AddOnSubTitle>{t('checkout.addon.security')}</AddOnSubTitle>
                <AddOnOptions>
                  <AddOnOption
                    $isSelected={securityGuideCount === -1}
                    onClick={() => setSecurityGuideCount(-1)}
                  >
                    <span>{t('checkout.addon.none')}</span>
                    <span>₩0</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={securityGuideCount === 5}
                    onClick={() => setSecurityGuideCount(5)}
                  >
                    <span>{t('checkout.addon.count5')}</span>
                    <span>₩12,000,000</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={securityGuideCount === 8}
                    onClick={() => setSecurityGuideCount(8)}
                  >
                    <span>{t('checkout.addon.count8')}</span>
                    <span>₩15,000,000</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={securityGuideCount === 12}
                    onClick={() => setSecurityGuideCount(12)}
                  >
                    <span>{t('checkout.addon.count12')}</span>
                    <span>₩18,000,000</span>
                  </AddOnOption>
                </AddOnOptions>
              </AddOnGroup>

              <AddOnGroup>
                <AddOnSubTitle>{t('checkout.addon.admin')}</AddOnSubTitle>
                <AddOnNote>{t('checkout.addon.adminNote')}</AddOnNote>
                <AddOnOptions>
                  <AddOnOption
                    $isSelected={policyGuideCount === -1}
                    onClick={() => setPolicyGuideCount(-1)}
                  >
                    <span>{t('checkout.addon.none')}</span>
                    <span>₩0</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={policyGuideCount === 0}
                    onClick={() => setPolicyGuideCount(0)}
                  >
                    <span>{t('checkout.addon.range100_200')}</span>
                    <span>₩25,000,000</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={policyGuideCount === 200}
                    onClick={() => setPolicyGuideCount(200)}
                  >
                    <span>{t('checkout.addon.range200_500')}</span>
                    <span>₩15,000,000</span>
                  </AddOnOption>
                  <AddOnOption
                    $isSelected={policyGuideCount === 500}
                    onClick={() => setPolicyGuideCount(500)}
                  >
                    <span>{t('checkout.addon.range500p')}</span>
                    <span>₩0</span>
                  </AddOnOption>
                </AddOnOptions>
              </AddOnGroup>

              <AddOnGroup>
                <AddOnSubTitle>{t('checkout.addon.module')}</AddOnSubTitle>
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
                    <span>{t('checkout.addon.basic')}</span>
                    <AddOnMainPrice>₩25,000,000</AddOnMainPrice>
                  </AddOnMainToggle>

                  <AddOnSubGrid>
                    <AddOnSubCard
                      $isSelected={selectedSubOption === 'none'}
                      $isDisabled={!basicModuleEnabled}
                      onClick={() =>
                        basicModuleEnabled && setSelectedSubOption('none')
                      }
                    >
                      <span>{t('checkout.addon.noneShort')}</span>
                      <span>₩0</span>
                    </AddOnSubCard>
                    <AddOnSubCard
                      $isSelected={selectedSubOption === 'filter5'}
                      $isDisabled={!basicModuleEnabled}
                      onClick={() =>
                        basicModuleEnabled && setSelectedSubOption('filter5')
                      }
                    >
                      <span>{t('checkout.addon.filter5')}</span>
                      <span>₩5,000,000</span>
                    </AddOnSubCard>
                    <AddOnSubCard
                      $isSelected={selectedSubOption === 'filter8'}
                      $isDisabled={!basicModuleEnabled}
                      onClick={() =>
                        basicModuleEnabled && setSelectedSubOption('filter8')
                      }
                    >
                      <span>{t('checkout.addon.filter8')}</span>
                      <span>₩10,000,000</span>
                    </AddOnSubCard>
                    <AddOnSubCard
                      $isSelected={selectedSubOption === 'filter12'}
                      $isDisabled={!basicModuleEnabled}
                      onClick={() =>
                        basicModuleEnabled && setSelectedSubOption('filter12')
                      }
                    >
                      <span>{t('checkout.addon.filter12')}</span>
                      <span>₩15,000,000</span>
                    </AddOnSubCard>
                  </AddOnSubGrid>
                </LargeAddOnCard>
              </AddOnGroup>

              <AddOnGroup>
                <AddOnSubTitle>{t('checkout.addon.others')}</AddOnSubTitle>
                <AddOnItemList>
                  <AddOnItem
                    $isSelected={ragSystemEnabled}
                    onClick={() => setRagSystemEnabled(!ragSystemEnabled)}
                  >
                    <Checkbox
                      variant='primary'
                      state={ragSystemEnabled ? 'checked' : 'unchecked'}
                      onChange={(checked) => setRagSystemEnabled(checked)}
                    />
                    <span>{t('checkout.addon.rag')}</span>
                    <span>₩10,000,000</span>
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
                    <span>{t('checkout.addon.graphRag')}</span>
                    <span>₩38,000,000</span>
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
                    <span>{t('checkout.addon.docSec')}</span>
                    <span>₩5,000,000</span>
                  </AddOnItem>
                  <AddOnItem
                    $isSelected={aiAnswerEnabled}
                    onClick={() => setAiAnswerEnabled(!aiAnswerEnabled)}
                  >
                    <Checkbox
                      variant='primary'
                      state={aiAnswerEnabled ? 'checked' : 'unchecked'}
                      onChange={(checked) => setAiAnswerEnabled(checked)}
                    />
                    <span>{t('checkout.addon.aiAnswer')}</span>
                    <span>₩5,000,000</span>
                  </AddOnItem>
                </AddOnItemList>
              </AddOnGroup>
            </Section>

            {/* 반복 비용 */}
            <Section>
              <SectionTitle>{t('checkout.repeat.title')}</SectionTitle>
              <AddOnDescription>{t('checkout.repeat.desc')}</AddOnDescription>
              <RepeatCostCard>
                <RepeatCostLeft>
                  <RepeatCostPrice>₩13,000</RepeatCostPrice>
                  <RepeatCostUnit>{t('checkout.repeat.unit')}</RepeatCostUnit>
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
                <TokenInfoTitle>{t('checkout.tokenInfo.title')}</TokenInfoTitle>
              </TokenInfoHeader>
              <TokenInfoList>
                <TokenInfoItem>{t('checkout.tokenInfo.b1')}</TokenInfoItem>
                <TokenInfoItem>{t('checkout.tokenInfo.b2')}</TokenInfoItem>
                <TokenInfoItem>{t('checkout.tokenInfo.b3')}</TokenInfoItem>
              </TokenInfoList>
            </TokenInfoSection>
          </LeftSection>

          <RightSection>
            <SummaryCard>
              <TopSection>
                <SummaryTitle>{t('checkout.summary.title')}</SummaryTitle>

                <SummaryItem>
                  <SummaryLabel>
                    {t('checkout.summary.selectedSpec')}
                  </SummaryLabel>
                  <SummaryDetails>
                    <SummaryDetail>
                      {t('checkout.summary.selectedPlan')}: {currentPlan.name}{' '}
                      (₩
                      {currentPlan.price.toLocaleString()}/Seat · Cap{' '}
                      {tokenUsage.toLocaleString()})
                    </SummaryDetail>
                    <SummaryDetail>
                      {t('checkout.summary.users')}: {userCount}
                    </SummaryDetail>
                    <SummaryDetail>
                      {t('checkout.summary.contract')}: {contractPeriod}
                      {t('checkout.contract.monthsSuffix')} (
                      {t('checkout.summary.discount')}{' '}
                      {contractDiscounts[
                        contractPeriod as keyof typeof contractDiscounts
                      ] || 0}
                      %)
                    </SummaryDetail>
                    <SummaryDetail>
                      {t('checkout.summary.prepay')}:{' '}
                      {prepayEnabled
                        ? t('checkout.summary.yesWith')
                        : t('checkout.summary.no')}
                    </SummaryDetail>
                    <SummaryDetail>
                      {t('checkout.summary.security')}:{' '}
                      {securityGuideCount === -1
                        ? t('checkout.summary.none')
                        : `${securityGuideCount}개`}
                    </SummaryDetail>
                    <SummaryDetail>
                      {t('checkout.summary.admin')}:{' '}
                      {policyGuideCount === -1
                        ? t('checkout.summary.none')
                        : policyGuideCount === 0
                          ? t('checkout.addon.range100_200')
                          : policyGuideCount === 200
                            ? t('checkout.addon.range200_500')
                            : t('checkout.addon.range500p')}
                    </SummaryDetail>
                    <SummaryDetail>
                      {t('checkout.summary.module')}:{' '}
                      {unstructuredModuleEnabled
                        ? t('checkout.addon.basic')
                        : t('checkout.addon.basic')}
                    </SummaryDetail>
                    <SummaryDetail
                      style={{ display: 'flex', alignItems: 'flex-start' }}
                    >
                      <span>{t('checkout.summary.others')}</span>
                      <div
                        style={{
                          width: '1px',
                          backgroundColor: color.neutral[200],
                          alignSelf: 'stretch',
                          margin: '0 12px',
                        }}
                      />
                      {[
                        ragSystemEnabled && t('checkout.addon.rag'),
                        graphRagEnabled && t('checkout.addon.graphRag'),
                        documentSecurityEnabled && t('checkout.addon.docSec'),
                        aiAnswerEnabled && t('checkout.addon.aiAnswer'),
                      ].filter(Boolean).length > 0 ? (
                        <div style={{ flex: 1 }}>
                          {ragSystemEnabled && (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '4px',
                              }}
                            >
                              {t('checkout.addon.rag')}
                            </div>
                          )}
                          {graphRagEnabled && (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '4px',
                              }}
                            >
                              {t('checkout.addon.graphRag')}
                            </div>
                          )}
                          {documentSecurityEnabled && (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '4px',
                              }}
                            >
                              {t('checkout.addon.docSec')}
                            </div>
                          )}
                          {aiAnswerEnabled && (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '4px',
                              }}
                            >
                              {t('checkout.addon.aiAnswer')}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span>{t('checkout.summary.none')}</span>
                      )}
                    </SummaryDetail>
                    <SummaryDetail>
                      {t('checkout.summary.extraTokens')}: {tokenPackCount} ×
                      ₩13,000/월
                    </SummaryDetail>
                    <SummaryDetail>
                      {t('checkout.summary.vatOn')}:{' '}
                      {vatEnabled ? 'OFF' : 'OFF'}
                    </SummaryDetail>
                  </SummaryDetails>
                </SummaryItem>
                <Divider />
                <PriceBreakdownSection>
                  <PriceBreakdownItem>
                    <span>{t('checkout.summary.monthly')}</span>
                    <span>₩{Math.round(monthlyTotal).toLocaleString()}</span>
                  </PriceBreakdownItem>
                  <PriceBreakdownItem>
                    <span>{t('checkout.summary.oneTime')}</span>
                    <span>₩{Math.round(addOnTotal).toLocaleString()}</span>
                  </PriceBreakdownItem>
                  <PriceBreakdownItem>
                    <span>{t('checkout.summary.firstBill')}</span>
                    <span>₩{Math.round(finalTotal).toLocaleString()}</span>
                  </PriceBreakdownItem>
                </PriceBreakdownSection>
                <Divider />
                <TotalSection>
                  <TotalLabel>{t('checkout.summary.total')}</TotalLabel>
                  <TotalPrice>
                    ₩{Math.round(finalTotal).toLocaleString()}
                  </TotalPrice>
                </TotalSection>
                <TaxDetailsSection>
                  <TaxDetailItem>
                    <span>{t('checkout.summary.prepayApply')}</span>
                    <span>₩{Math.round(prepayDiscount).toLocaleString()}</span>
                  </TaxDetailItem>
                  <TaxDetailItem>
                    <span>{t('checkout.summary.vatIncl')}</span>
                    <span>₩{Math.round(finalTotal).toLocaleString()}</span>
                  </TaxDetailItem>
                </TaxDetailsSection>
              </TopSection>

              <BottomSection>
                <VatToggleWrapper>
                  <VatToggle>
                    <Checkbox
                      variant='primary'
                      state={vatEnabled ? 'checked' : 'unchecked'}
                      onChange={(checked) => setVatEnabled(checked)}
                    />
                    <span>{t('checkout.vat.toggle')}</span>
                  </VatToggle>
                  <VatRate>{t('checkout.vat.rate')}</VatRate>
                </VatToggleWrapper>

                <ButtonGroup>
                  <SolidButton
                    variant='primary'
                    size='large'
                    onClick={handleCheckout}
                  >
                    {t('checkout.buttons.buy')}
                  </SolidButton>
                  <SolidButton
                    variant='secondary'
                    size='large'
                    onClick={() => alert('문의하기')}
                  >
                    {t('checkout.buttons.contact')}
                  </SolidButton>
                  <SolidButton
                    variant='secondary'
                    size='large'
                    onClick={() => alert('PDF 다운로드')}
                  >
                    <span>↓</span> {t('checkout.buttons.pdf')}
                  </SolidButton>
                </ButtonGroup>
              </BottomSection>
            </SummaryCard>
          </RightSection>
        </MainContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 80px 0 94px 0;
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
  border-radius: 12px;
  background: linear-gradient(
    91deg,
    #131218 1.14%,
    #626479 65.49%,
    #a0a5cf 129.85%
  );
  color: white;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const PlanName = styled.span`
  ${typography('ko', 'body3', 'medium')}
`;

const PlanPrice = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.dark['fg-neutral-primary']};
`;

const SubSectionTitle = styled.h4`
  ${typography('ko', 'body2', 'medium')}
  margin: 24px 0 12px 0;
`;

const SliderContainer = styled.div`
  margin-bottom: 24px;
`;

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
    background: repeating-linear-gradient(
      to right,
      transparent 0,
      transparent calc(100% / 6 - 1px),
      #e6e7e9 calc(100% / 6 - 1px),
      #d1d5db calc(100% / 6)
    );
    border-radius: 9999px;
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
  span {
    ${typography('ko', 'caption2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
  }
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
  flex-direction: column;
  gap: 20px;
`;

const TokenBreakdownCard = styled.div`
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 8px;
  overflow: visible;
`;

const TokenBreakdownHeader = styled.div`
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid ${borderColor.light['color-border-primary']};
  padding: 10px 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  background: ${color.gray['50']};
`;

const TokenBreakdownTitle = styled.h5`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
`;

const TokenBreakdownContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const TokenBreakdownContentNoPadding = styled.div`
  display: flex;
  flex-direction: column;
`;

const TokenBreakdownHorizontal = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

const TokenBreakdownTotalSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px;
`;

const TokenBreakdownVerticalDivider = styled.div`
  width: 1px;
  background-color: ${borderColor.light['color-border-primary']};
`;

const TokenBreakdownItems = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TokenBreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid ${borderColor.light['color-border-primary']};

  &:last-child {
    border-bottom: none;
  }
`;

const TokenBreakdownLabel = styled.div`
  ${typography('ko', 'caption2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const TokenBreakdownValue = styled.div`
  ${typography('ko', 'caption2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const TokenBreakdownTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TokenBreakdownTotalLabel = styled.div`
  ${typography('ko', 'caption2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-bottom: 4px;
`;

const TokenBreakdownTotalValue = styled.div`
  ${typography('ko', 'body2', 'medium')}
`;

const TokenBreakdownSubItem = styled.div`
  font-size: 11px;
  color: ${textColor.light['fg-neutral-alternative']};
  text-align: right;
  margin-top: 4px;
`;

const TokenNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: ${color.gray['50']};
  border-radius: 12px;

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }
`;

const TokenNoteContent = styled.span`
  ${typography('ko', 'caption2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  flex: 1;
`;

const UserInputSection = styled.div`
  margin-top: 20px;
`;

const UserCountControls = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const ControlButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 6px;
  background: white;
  color: ${textColor.light['fg-neutral-primary']};
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: #f8f9fa;
  }
`;

const PeriodDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 8px 0 20px 0;
`;

const PeriodOptions = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
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

const PrepaySection = styled.div`
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 20px;
`;

const PrepayToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PrepayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PrepayTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  > span {
    ${typography('ko', 'body3', 'medium')}
    color: ${textColor.light['fg-neutral-primary']};
  }
`;

const PrepayBadges = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PrepayDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
`;

const AddOnDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 8px 0 20px 0;
`;

const AddOnCardPrice = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${textColor.light['fg-neutral-primary']};
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
  margin-bottom: 24px;

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
`;

const RightSection = styled.div`
  position: sticky;
  top: 80px;
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

const SummaryItem = styled.div`
  margin-bottom: 24px;
`;

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
  padding: 24px 0 10px 0;
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

const TaxDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TaxDetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${textColor.light['fg-neutral-alternative']};

  span:first-child {
    ${typography('ko', 'body2', 'regular')}
  }

  span:last-child {
    ${typography('ko', 'body3', 'regular')}
  }
`;

const VatToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const VatToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  span {
    ${typography('ko', 'body3', 'medium')}
  }
`;

const VatRate = styled.span`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LanguageBoxContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

const LanguageBox = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  overflow: hidden;
  background: ${color.gray['50']};
`;

const LanguageLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  gap: 6px;
  width: 80px;

  span {
    ${typography('ko', 'caption2', 'medium')}
    color: ${textColor.light['fg-neutral-primary']};
  }
`;

const LanguageIcon = styled.div`
  width: 28px;
  height: 28px;
  ${typography('ko', 'caption2', 'medium')}
  background: white;
  color: ${textColor.light['fg-neutral-alternative']};
  border-radius: 8px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageContent = styled.div`
  flex: 1;
  padding: 8px 12px;
  background: white;
  border-radius: 0 12px 12px 0;
  display: flex;
  flex-direction: column;
`;

const LanguageTotal = styled.div`
  ${typography('ko', 'body2', 'medium')}
`;

const LanguageBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LanguageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span:first-child {
    ${typography('ko', 'caption2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
  }

  span:last-child {
    ${typography('ko', 'caption2', 'medium')}
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;

const A4BoxWithBorder = styled.div`
  flex: 1;
  display: flex;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  overflow: hidden;
  background: ${color.gray['50']};
`;

const A4LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  background: ${color.gray['50']};
  border-right: 1px solid ${borderColor.light['color-border-primary']};
  width: 80px;

  span {
    ${typography('ko', 'body2', 'medium')}
  }
`;

const A4Grid = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 1fr 1fr;
  flex: 1;
`;

const A4Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-right: 1px solid ${borderColor.light['color-border-primary']};
  border-bottom: 1px solid ${borderColor.light['color-border-primary']};
  background: ${color.gray['50']};

  &:nth-child(2n) {
    border-right: none;
    background: white;
    justify-content: flex-start;
  }

  &:nth-child(3),
  &:nth-child(4) {
    border-bottom: none;
  }
`;

const A4CellLabel = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const A4CellValue = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const A4NumberWithUnit = styled.div`
  display: flex;
  align-items: center;
`;

const A4NumberText = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const A4UnitText = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;
