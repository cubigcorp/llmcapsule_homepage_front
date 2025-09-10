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

  // 가격 계산
  const basePrice = 10500 * userCount;
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
              <PlanBadge>토큰 사용량 기반</PlanBadge>
            </SectionHeader>
            <PlanDescription>
              슬라이더로 월 예상 토큰 사용량을 지정해보세요.
            </PlanDescription>

            <SubSectionTitle>선택된 플랜</SubSectionTitle>
            <PlanCard>
              <PlanName>Pro 플랜</PlanName>
              <PlanPrice>₩10,500/Seat</PlanPrice>
            </PlanCard>

            <TokenUsageTitle>토큰 사용량</TokenUsageTitle>
            <TokenUsageRow>
              <div>
                <SliderContainer>
                  <SliderTrack>
                    <input
                      type='range'
                      min='70000'
                      max='600000'
                      value={tokenUsage}
                      onChange={(e) => setTokenUsage(parseInt(e.target.value))}
                    />
                  </SliderTrack>
                  <SliderLabels>
                    <SliderLabel>
                      <span>70,000</span>
                      <span>Basic</span>
                    </SliderLabel>
                    <SliderLabel>
                      <span>120,000</span>
                      <span>Plus</span>
                    </SliderLabel>
                    <SliderLabel>
                      <span>280,000</span>
                      <span>Pro</span>
                    </SliderLabel>
                    <SliderLabel>
                      <span>600,000</span>
                      <span>Max</span>
                    </SliderLabel>
                  </SliderLabels>
                </SliderContainer>
              </div>
              <TokenInputRight>
                <Input
                  value={tokenUsage.toString()}
                  onChange={(e) => setTokenUsage(parseInt(e.target.value) || 0)}
                  placeholder='280000'
                />
                <span>토큰</span>
              </TokenInputRight>
            </TokenUsageRow>

            <TokenBreakdownSection>
              <TokenBreakdownGrid>
                <TokenBreakdownCard>
                  <TokenBreakdownTitle>토큰 분해</TokenBreakdownTitle>
                  <TokenBreakdownSubtitle>임/출력 6:4</TokenBreakdownSubtitle>
                  <TokenBreakdownList>
                    <TokenBreakdownItem>
                      <span>입력(60%)</span>
                      <span>
                        {Math.round(tokenUsage * 0.6).toLocaleString()}
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <span>출력(40%)</span>
                      <span>
                        {Math.round(tokenUsage * 0.4).toLocaleString()}
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownTotal>
                      <span>총 합</span>
                      <span>{tokenUsage.toLocaleString()}</span>
                    </TokenBreakdownTotal>
                  </TokenBreakdownList>
                </TokenBreakdownCard>

                <TokenBreakdownCard>
                  <TokenBreakdownTitle>문자-페이지 환산</TokenBreakdownTitle>
                  <TokenBreakdownSubtitle>가정값</TokenBreakdownSubtitle>
                  <TokenBreakdownList>
                    <TokenBreakdownItem>
                      <span>한글</span>
                      <span>
                        {Math.round(tokenUsage / 0.58).toLocaleString()}자
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <span>입력</span>
                      <span>
                        {Math.round((tokenUsage * 0.6) / 0.58).toLocaleString()}
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <span>출력</span>
                      <span>
                        {Math.round((tokenUsage * 0.4) / 0.58).toLocaleString()}
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <span>영어</span>
                      <span>
                        {Math.round(tokenUsage / 0.25).toLocaleString()}자
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <span>입력</span>
                      <span>
                        {Math.round((tokenUsage * 0.6) / 0.25).toLocaleString()}
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <span>출력</span>
                      <span>
                        {Math.round((tokenUsage * 0.4) / 0.25).toLocaleString()}
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <span>워드프레스</span>
                      <span>
                        약 {Math.round(tokenUsage / 1200).toLocaleString()}장
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownSubItem>
                      <span>(기준 1,200자/장)</span>
                    </TokenBreakdownSubItem>
                  </TokenBreakdownList>
                </TokenBreakdownCard>
              </TokenBreakdownGrid>

              <TokenNote>
                <span>ℹ️</span>
                <span>
                  가정: 한글 1토큰=2자, 영어 1토큰=4자, WP 1장 =1,200자(관리자
                  변경 가능)
                </span>
              </TokenNote>
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
              <AddOnSubTitle>정형 민감 키워드 구축</AddOnSubTitle>
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
                    플랜: Pro (₩25,500/Seat · Cap 280,000)
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SectionTitle = styled.h3`
  ${typography('ko', 'body3', 'semibold')}
`;

const PlanBadge = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const PlanDescription = styled.p`
  font-size: 14px;
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0 0 16px 0;
`;

const PlanCard = styled.div`
  background: linear-gradient(270deg, #313043 0%, #8a8ead 100%);
  color: white;
  padding: 20px 24px;
  height: 72px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const PlanName = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const PlanPrice = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const SubSectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${textColor.light['fg-neutral-primary']};
  margin: 16px 0 8px 0;
`;

const SliderContainer = styled.div`
  margin-bottom: 24px;
`;

const SliderTrack = styled.div`
  margin-bottom: 12px;

  input[type='range'] {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #e1e5e9;
    outline: none;
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #007bff;
      cursor: pointer;
    }
  }
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SliderLabel = styled.div`
  text-align: center;
  font-size: 12px;

  span:first-child {
    display: block;
    color: ${textColor.light['fg-neutral-primary']};
    font-weight: 500;
    margin-bottom: 2px;
  }

  span:last-child {
    color: ${textColor.light['fg-neutral-alternative']};
    background: white;
    border: 1px solid ${borderColor.light['color-border-primary']};
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 10px;
  }
`;

const TokenUsageTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 16px 0;
`;

const TokenUsageRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const TokenInputRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 12px;
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;

const TokenBreakdownSection = styled.div`
  margin-top: 24px;
`;

const TokenBreakdownGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
`;

const TokenBreakdownCard = styled.div`
  background: #f8f9fa;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 8px;
  padding: 16px;
`;

const TokenBreakdownTitle = styled.h5`
  font-size: 13px;
  font-weight: 600;
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 4px 0;
`;

const TokenBreakdownSubtitle = styled.p`
  font-size: 11px;
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0 0 12px 0;
`;

const TokenBreakdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TokenBreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;

  span:first-child {
    color: ${textColor.light['fg-neutral-alternative']};
  }

  span:last-child {
    font-weight: 500;
    color: ${textColor.light['fg-neutral-primary']};
  }
`;

const TokenBreakdownTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  padding-top: 6px;
  border-top: 1px solid ${borderColor.light['color-border-primary']};
  margin-top: 6px;

  span {
    color: ${textColor.light['fg-neutral-primary']};
  }
`;

const TokenBreakdownSubItem = styled.div`
  font-size: 10px;
  color: ${textColor.light['fg-neutral-alternative']};
  text-align: center;
  margin-top: 4px;
`;

const TokenNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #fff8e1;
  border-radius: 6px;
  border-left: 3px solid #ffc107;

  span:first-child {
    font-size: 14px;
  }

  span:last-child {
    font-size: 11px;
    color: ${textColor.light['fg-neutral-alternative']};
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
    ${typography('ko', 'body3', 'medium')}
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
  gap: 12px;
  padding: 16px;
  border: ${(props) =>
    props.$isSelected
      ? `1.8px solid ${borderColor.light['color-border-focused']}`
      : `1px solid ${borderColor.light['color-border-primary']}`};
  border-radius: 8px;
  background: ${color.gray['50']};
  cursor: pointer;
  user-select: none;

  span:nth-child(2) {
    ${typography('ko', 'body3', 'medium')}
    color: ${textColor.light['fg-neutral-primary']};
    flex: 1;
  }

  span:last-child {
    ${typography('ko', 'body3', 'medium')}
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
