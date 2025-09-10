'use client';

import React, { useState } from 'react';
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
// 플랜 데이터 정의
const plans = {
  basic: { name: 'Basic', price: 10500, minTokens: 0, maxTokens: 119999 },
  plus: { name: 'Plus', price: 15500, minTokens: 120000, maxTokens: 279999 },
  pro: { name: 'Pro', price: 25500, minTokens: 280000, maxTokens: 599999 },
  max: { name: 'Max', price: 51000, minTokens: 600000, maxTokens: 999999 },
};

export default function CheckoutPage() {
  const [userCount, setUserCount] = useState<number>(200);
  const [tokenUsage, setTokenUsage] = useState<number>(280000);
  const [contractPeriod, setContractPeriod] = useState<number>(12);
  const [prepayEnabled, setPrepayEnabled] = useState<boolean>(true);
  const [vatEnabled, setVatEnabled] = useState<boolean>(false);

  // Add-on 상태
  const [securityGuideCount, setSecurityGuideCount] = useState<number>(0);
  const [policyGuideCount, setPolicyGuideCount] = useState<number>(0);
  const [basicModuleEnabled, setBasicModuleEnabled] = useState<boolean>(false);
  const [selectedSubOption, setSelectedSubOption] = useState<string>('');
  const [ragSystemEnabled, setRagSystemEnabled] = useState<boolean>(true);
  const [graphRagEnabled, setGraphRagEnabled] = useState<boolean>(false);
  const [documentSecurityEnabled, setDocumentSecurityEnabled] =
    useState<boolean>(false);
  const [aiAnswerEnabled, setAiAnswerEnabled] = useState<boolean>(false);
  const [tokenPackCount, setTokenPackCount] = useState<number>(12);

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
          ? 15000000
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
    const count = parseInt(value) || 0;
    if (count >= 0 && count <= 280000) {
      setUserCount(count);
    }
  };

  const handleCheckout = () => {
    alert('결제 기능은 추후 구현 예정입니다.');
  };

  return (
    <Container>
      <Header>
        <Title>요금 계산기</Title>
        <Subtitle>
          비즈니스 환경에 맞는 요금제를 손쉽게 계산하고 비교해 보세요.
        </Subtitle>
      </Header>

      <MainContent>
        <LeftSection>
          {/* 플랜 선택 */}
          <Section>
            <SectionHeader>
              <SectionTitle>플랜 선택</SectionTitle>
              <Badge type='solid' variant='info'>
                토큰 사용량 기반
              </Badge>
            </SectionHeader>
            <PlanDescription>
              슬라이더로 월 예상 토큰 사용량을 지정해보세요.
            </PlanDescription>
            <Divider />
            <SubSectionTitle>선택된 플랜</SubSectionTitle>
            <PlanCard>
              <PlanName>{currentPlan.name} 플랜</PlanName>
              <PlanPrice>₩{currentPlan.price.toLocaleString()}/Seat</PlanPrice>
            </PlanCard>

            <TokenUsageRow>
              <TokenUsageTitle>토큰 사용량</TokenUsageTitle>
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
                <span>토큰</span>
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
                    <TokenBreakdownTitle>토큰 분배</TokenBreakdownTitle>
                    <Badge size='small' type='solid' variant='secondary'>
                      입/출력 6:4
                    </Badge>
                  </TokenBreakdownHeader>
                  <TokenBreakdownContent>
                    <TokenBreakdownItem>
                      <TokenBreakdownLabel>입력(60%)</TokenBreakdownLabel>
                      <TokenBreakdownValue>
                        {Math.round(tokenUsage * 0.6).toLocaleString()}
                      </TokenBreakdownValue>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <TokenBreakdownLabel>출력(40%)</TokenBreakdownLabel>
                      <TokenBreakdownValue>
                        {Math.round(tokenUsage * 0.4).toLocaleString()}
                      </TokenBreakdownValue>
                    </TokenBreakdownItem>
                    <Divider style={{ margin: '20px 0 12px 0' }} />
                    <TokenBreakdownTotal>
                      <TokenBreakdownTotalLabel>총 합</TokenBreakdownTotalLabel>
                      <TokenBreakdownTotalValue>
                        {tokenUsage.toLocaleString()}
                      </TokenBreakdownTotalValue>
                    </TokenBreakdownTotal>
                  </TokenBreakdownContent>
                </TokenBreakdownCard>
                <TokenBreakdownCard>
                  <TokenBreakdownHeader>
                    <TokenBreakdownTitle>문자·페이지 환산</TokenBreakdownTitle>
                    <Badge size='small' type='solid' variant='secondary'>
                      가정값
                    </Badge>
                  </TokenBreakdownHeader>
                  <TokenBreakdownContent>
                    <TokenBreakdownItem>
                      <TokenBreakdownLabel>한글</TokenBreakdownLabel>
                      <TokenBreakdownValue>
                        {Math.round(tokenUsage / 0.58).toLocaleString()}자
                      </TokenBreakdownValue>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <TokenBreakdownLabel>입력</TokenBreakdownLabel>
                      <TokenBreakdownValue>
                        {Math.round((tokenUsage * 0.6) / 0.58).toLocaleString()}
                      </TokenBreakdownValue>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <TokenBreakdownLabel>출력</TokenBreakdownLabel>
                      <TokenBreakdownValue>
                        {Math.round((tokenUsage * 0.4) / 0.58).toLocaleString()}
                      </TokenBreakdownValue>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <TokenBreakdownLabel>영어</TokenBreakdownLabel>
                      <TokenBreakdownValue>
                        {Math.round(tokenUsage / 0.25).toLocaleString()}자
                      </TokenBreakdownValue>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <TokenBreakdownLabel>입력</TokenBreakdownLabel>
                      <TokenBreakdownValue>
                        {Math.round((tokenUsage * 0.6) / 0.25).toLocaleString()}
                      </TokenBreakdownValue>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <TokenBreakdownLabel>출력</TokenBreakdownLabel>
                      <TokenBreakdownValue>
                        {Math.round((tokenUsage * 0.4) / 0.25).toLocaleString()}
                      </TokenBreakdownValue>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <TokenBreakdownLabel>워드프레스</TokenBreakdownLabel>
                      <TokenBreakdownValue>
                        약 {Math.round(tokenUsage / 1200).toLocaleString()}장
                      </TokenBreakdownValue>
                    </TokenBreakdownItem>
                    <TokenBreakdownSubItem>
                      <span>(기준 1,200자/장)</span>
                    </TokenBreakdownSubItem>
                    <TokenNote style={{ marginTop: '20px' }}>
                      <SmallInfoIcon />
                      <span>
                        가정: 한글 1토큰≈2자, 영어 1토큰≈4자, WP 1장
                        ≈1,200자(관리자 변경 가능)
                      </span>
                    </TokenNote>
                  </TokenBreakdownContent>
                </TokenBreakdownCard>
              </TokenBreakdownGrid>
            </TokenBreakdownSection>
          </Section>

          {/* 사용자 수 */}
          <Section>
            <SectionTitle>사용자 수</SectionTitle>
            <UserInputSection>
              <TextField
                label='사용 인원'
                size='large'
                value={userCount.toString()}
                onChange={(e) => handleUserCountChange(e.target.value)}
              />
              <UserCountControls>
                <Chip
                  size='x-small'
                  leadingIcon={<RemoveIcon />}
                  onClick={() => setUserCount(Math.max(0, userCount - 50))}
                >
                  50명
                </Chip>
                <Chip
                  size='x-small'
                  leadingIcon={<SmallAddIcon />}
                  onClick={() => setUserCount(userCount + 50)}
                >
                  50명
                </Chip>
              </UserCountControls>
            </UserInputSection>
          </Section>

          {/* 계약 기간 */}
          <Section>
            <SectionTitle>계약 기간</SectionTitle>
            <PeriodDescription>
              기간 할인은 운영 정책에 따라 달라질 수 있습니다.
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
                  <span>{option.months}개월</span>
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
                    <span>선결제</span>
                    <PrepayBadges>
                      <Badge size='small' type='strong' variant='info'>
                        일시불
                      </Badge>
                      <Badge size='small' type='outline' variant='info'>
                        0.2%
                      </Badge>
                    </PrepayBadges>
                  </PrepayTop>
                  <PrepayDescription>
                    기간 할인은 운영 정책에 따라 달라질 수 있습니다.
                  </PrepayDescription>
                </PrepayContent>
              </PrepayToggle>
            </PrepaySection>
          </Section>

          {/* Add-on */}
          <Section>
            <SectionTitle>Add-on (1회성 구축비)</SectionTitle>
            <AddOnDescription>
              기간/선결제 할인이 적용되지 않습니다.
            </AddOnDescription>

            <AddOnGroup>
              <AddOnSubTitle>정형 민감 키워드 구축</AddOnSubTitle>
              <AddOnOptions>
                <AddOnOption
                  $isSelected={securityGuideCount === 0}
                  onClick={() => setSecurityGuideCount(0)}
                >
                  <span>선택 안 함</span>
                  <span>₩0</span>
                </AddOnOption>
                <AddOnOption
                  $isSelected={securityGuideCount === 5}
                  onClick={() => setSecurityGuideCount(5)}
                >
                  <span>5개</span>
                  <span>₩12,000,000</span>
                </AddOnOption>
                <AddOnOption
                  $isSelected={securityGuideCount === 8}
                  onClick={() => setSecurityGuideCount(8)}
                >
                  <span>8개</span>
                  <span>₩15,000,000</span>
                </AddOnOption>
                <AddOnOption
                  $isSelected={securityGuideCount === 12}
                  onClick={() => setSecurityGuideCount(12)}
                >
                  <span>12개</span>
                  <span>₩18,000,000</span>
                </AddOnOption>
              </AddOnOptions>
            </AddOnGroup>

            <AddOnGroup>
              <AddOnSubTitle>중앙 관리자 콘솔 Admin 구축</AddOnSubTitle>
              <AddOnNote>최적 수 기준 권장가: ₩25,000,000</AddOnNote>
              <AddOnOptions>
                <AddOnOption
                  $isSelected={policyGuideCount === 0}
                  onClick={() => setPolicyGuideCount(0)}
                >
                  <span>0 - 200</span>
                  <span>₩25,000,000</span>
                </AddOnOption>
                <AddOnOption
                  $isSelected={policyGuideCount === 200}
                  onClick={() => setPolicyGuideCount(200)}
                >
                  <span>200 - 500</span>
                  <span>₩15,000,000</span>
                </AddOnOption>
                <AddOnOption
                  $isSelected={policyGuideCount === 500}
                  onClick={() => setPolicyGuideCount(500)}
                >
                  <span>500+</span>
                  <span>₩0</span>
                </AddOnOption>
              </AddOnOptions>
            </AddOnGroup>

            <AddOnGroup>
              <AddOnSubTitle>비정형 민감정보 조건 모듈</AddOnSubTitle>
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
                  <span>기본 모듈</span>
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
                    <span>선택 안 함</span>
                    <span>₩0</span>
                  </AddOnSubCard>
                  <AddOnSubCard
                    $isSelected={selectedSubOption === 'filter5'}
                    $isDisabled={!basicModuleEnabled}
                    onClick={() =>
                      basicModuleEnabled && setSelectedSubOption('filter5')
                    }
                  >
                    <span>필터 5개</span>
                    <span>₩5,000,000</span>
                  </AddOnSubCard>
                  <AddOnSubCard
                    $isSelected={selectedSubOption === 'filter8'}
                    $isDisabled={!basicModuleEnabled}
                    onClick={() =>
                      basicModuleEnabled && setSelectedSubOption('filter8')
                    }
                  >
                    <span>필터 8개</span>
                    <span>₩10,000,000</span>
                  </AddOnSubCard>
                  <AddOnSubCard
                    $isSelected={selectedSubOption === 'filter12'}
                    $isDisabled={!basicModuleEnabled}
                    onClick={() =>
                      basicModuleEnabled && setSelectedSubOption('filter12')
                    }
                  >
                    <span>필터 12개</span>
                    <span>₩15,000,000</span>
                  </AddOnSubCard>
                </AddOnSubGrid>
              </LargeAddOnCard>
            </AddOnGroup>

            <AddOnGroup>
              <AddOnSubTitle>기타 모듈</AddOnSubTitle>
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
                  <span>RAG 시스템</span>
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
                  <span>최신 기술 Graph RAG 적용</span>
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
                    onChange={(checked) => setDocumentSecurityEnabled(checked)}
                  />
                  <span>문서보안등급별 접근 제어</span>
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
                  <span>문맥 기반 AI 답변 적용</span>
                  <span>₩5,000,000</span>
                </AddOnItem>
              </AddOnItemList>
            </AddOnGroup>
          </Section>

          {/* 반복 비용 */}
          <Section>
            <SectionTitle>반복 비용 (Add-on)</SectionTitle>
            <AddOnDescription>추가 토큰 팩</AddOnDescription>
            <RepeatCostCard>
              <RepeatCostLeft>
                <RepeatCostPrice>₩13,000</RepeatCostPrice>
                <RepeatCostUnit>10만 토큰/월 당</RepeatCostUnit>
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
                  onClick={() => setTokenPackCount(tokenPackCount + 1)}
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
              <TokenInfoTitle>Token/모델 비용 고지</TokenInfoTitle>
            </TokenInfoHeader>
            <TokenInfoList>
              <TokenInfoItem>
                • Seat(Base): 플랜별 토큰 Cap 포함. Cap 내 사용은 추가 과금
                없음.
              </TokenInfoItem>
              <TokenInfoItem>
                • Cap 초과 정책: 차단 또는 추가 구매는 별도 정책으로 안내.
              </TokenInfoItem>
              <TokenInfoItem>
                • Seat(Base): 플랜별 토큰 Cap 포함. Cap 내 사용은 추가 과금
                없음.
              </TokenInfoItem>
            </TokenInfoList>
          </TokenInfoSection>
        </LeftSection>

        <RightSection>
          <SummaryCard>
            <TopSection>
              <SummaryTitle>요약</SummaryTitle>

              <SummaryItem>
                <SummaryLabel>선택 사양 합계</SummaryLabel>
                <SummaryDetails>
                  <SummaryDetail>
                    플랜: {currentPlan.name} (₩
                    {currentPlan.price.toLocaleString()}/Seat · Cap{' '}
                    {tokenUsage.toLocaleString()})
                  </SummaryDetail>
                  <SummaryDetail>좌석: {userCount}</SummaryDetail>
                  <SummaryDetail>
                    기간: {contractPeriod}개월 (기간 할인{' '}
                    {contractDiscounts[
                      contractPeriod as keyof typeof contractDiscounts
                    ] || 0}
                    %)
                  </SummaryDetail>
                  <SummaryDetail>
                    선결제: {prepayEnabled ? '예' : '아니오'}(추가{' '}
                    {prepayEnabled ? '0.2%' : '0%'})
                  </SummaryDetail>
                  <SummaryDetail>
                    추가 토큰 팩: {tokenPackCount} × ₩13,000/월
                  </SummaryDetail>
                  <SummaryDetail>
                    VAT 포함: {vatEnabled ? 'ON' : 'OFF'}
                  </SummaryDetail>
                </SummaryDetails>
              </SummaryItem>
              <Divider />
              <PriceBreakdownSection>
                <PriceBreakdownItem>
                  <span>월 반복 비용</span>
                  <span>₩{Math.round(monthlyTotal).toLocaleString()}</span>
                </PriceBreakdownItem>
                <PriceBreakdownItem>
                  <span>1회성 구축비</span>
                  <span>₩{Math.round(addOnTotal).toLocaleString()}</span>
                </PriceBreakdownItem>
                <PriceBreakdownItem>
                  <span>첫 청구 예상 비용(월과금)</span>
                  <span>₩{Math.round(finalTotal).toLocaleString()}</span>
                </PriceBreakdownItem>
              </PriceBreakdownSection>
              <Divider />
              <TotalSection>
                <TotalLabel>총 계약 금액</TotalLabel>
                <TotalPrice>
                  ₩{Math.round(finalTotal).toLocaleString()}
                </TotalPrice>
              </TotalSection>
              <TaxDetailsSection>
                <TaxDetailItem>
                  <span>선결제 적용 (추가 0.2%)</span>
                  <span>₩{Math.round(prepayDiscount).toLocaleString()}</span>
                </TaxDetailItem>
                <TaxDetailItem>
                  <span>VAT 포함</span>
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
                  <span>세금/VAT 포함</span>
                </VatToggle>
                <VatRate>VAT 10%</VatRate>
              </VatToggleWrapper>

              <ButtonGroup>
                <SolidButton
                  variant='primary'
                  size='large'
                  onClick={handleCheckout}
                >
                  구매하기
                </SolidButton>
                <SolidButton
                  variant='secondary'
                  size='large'
                  onClick={() => alert('문의하기')}
                >
                  문의하기
                </SolidButton>
                <SolidButton
                  variant='secondary'
                  size='large'
                  onClick={() => alert('PDF 다운로드')}
                >
                  <span>↓</span> PDF 다운로드
                </SolidButton>
              </ButtonGroup>
            </BottomSection>
          </SummaryCard>
        </RightSection>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 94px;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 16px;
  align-items: start;
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
  ${typography('ko', 'body2', 'medium')}
  margin: 0;
`;

const TokenBreakdownContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
`;

const TokenBreakdownItem = styled.div`
  display: flex;
  font-size: 13px;
  background: white;
  border-radius: 6px;
  margin-bottom: 6px;
  border: 1px solid #e5e7eb;
  overflow: hidden;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TokenBreakdownLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  ${typography('ko', 'body2', 'medium')}
  background: ${color.gray['50']};
  padding: 4px 20px;
  text-align: center;
`;

const TokenBreakdownValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  ${typography('ko', 'body2', 'regular')}
  padding: 4px 20px;
  text-align: center;
  color: ${textColor.light['fg-neutral-alternative']};
`;

const TokenBreakdownTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

const TokenBreakdownTotalLabel = styled.div`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const TokenBreakdownTotalValue = styled.div`
  ${typography('ko', 'body2', 'regular')}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  color: ${textColor.light['fg-neutral-alternative']};
  padding: 4px 20px;
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

  span:last-child {
    ${typography('ko', 'caption2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
    flex: 1;
  }
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

const AddOnCard = styled.div<{ $isEnabled: boolean }>`
  padding: 16px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 8px;
  background: white;
  margin-bottom: 12px;
  opacity: ${(props) => (props.$isEnabled ? 1 : 0.6)};
`;

const AddOnToggle = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  input {
    width: 16px;
    height: 16px;
  }

  span {
    font-size: 14px;
    font-weight: 500;
  }
`;

const AddOnSubOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const AddOnSubOption = styled.div`
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  text-align: center;

  span:first-child {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: ${textColor.light['fg-neutral-primary']};
    margin-bottom: 2px;
  }

  span:last-child {
    font-size: 11px;
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;

const AddOnList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddOnListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 13px;

  span:first-child {
    color: ${textColor.light['fg-neutral-primary']};
  }

  span:last-child {
    font-weight: 600;
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;

const TokenPackSection = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const TokenPackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  span:first-child {
    font-size: 16px;
    font-weight: 700;
    color: ${textColor.light['fg-neutral-primary']};
  }

  span:last-child {
    font-size: 12px;
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;

const TokenPackControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const TokenPackValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${textColor.light['fg-neutral-primary']};
  min-width: 32px;
  text-align: center;
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
