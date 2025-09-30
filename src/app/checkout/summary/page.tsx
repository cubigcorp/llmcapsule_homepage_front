'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import GlobalHeader from '@/components/layout/Header';
import {
  SolidButton,
  Divider,
  typography,
  textColor,
  borderColor,
  color,
  layerColor,
} from '@cubig/design-system';
import { llmService } from '@/services/llm';
import { env } from '@/utils/env';
import PlanBasicImage from '@/assets/images/plan_basic.png';
import PlanPlusImage from '@/assets/images/plan_plus.png';
import PlanProImage from '@/assets/images/plan_pro.png';
import PlanMaxImage from '@/assets/images/plan_max.png';
import InfoIcon from '@/assets/icons/icon_info.svg';

function getPlanImageByName(name: string) {
  switch ((name || '').toLowerCase()) {
    case 'basic':
      return PlanBasicImage;
    case 'plus':
      return PlanPlusImage;
    case 'pro':
      return PlanProImage;
    case 'max':
      return PlanMaxImage;
    default:
      return PlanPlusImage;
  }
}

export default function CheckoutSummaryPage() {
  const params = useSearchParams();
  const router = useRouter();
  const paypalContainerRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [paymentId, setPaymentId] = useState<number | null>(null);

  const purchaseType = params.get('purchaseType') || 'BUSINESS';
  const plan = params.get('plan') || 'Pro';
  const price = Number(params.get('price') || '19.99');
  const cap = params.get('cap') || params.get('tokens') || '280000';
  const users = Number(params.get('users') || '1');
  const period = Number(params.get('period') || '12');
  const discount = Number(params.get('discount') || '0');
  const monthlyTotal = Number(params.get('monthlyTotal') || '0');
  const oneTimeTotal = Number(params.get('oneTimeTotal') || '0');
  const totalAmount = Number(
    params.get('totalAmount') || monthlyTotal + oneTimeTotal
  );

  // Add-on selections (for business)
  const securityGuideCount = params.get('securityGuideCount');
  const policyGuideCount = params.get('policyGuideCount');
  const basicModuleEnabled = params.get('basicModuleEnabled') === 'true';
  const selectedSubOption = params.get('selectedSubOption') || '';
  const ragSystemEnabled = params.get('ragSystemEnabled') === 'true';
  const graphRagEnabled = params.get('graphRagEnabled') === 'true';
  const documentSecurityEnabled =
    params.get('documentSecurityEnabled') === 'true';
  const aiAnswerEnabled = params.get('aiAnswerEnabled') === 'true';
  const unstructuredModuleEnabled =
    params.get('unstructuredModuleEnabled') === 'true';

  const hasOneTimeCost =
    purchaseType === 'BUSINESS' &&
    (oneTimeTotal > 0 ||
      Number(securityGuideCount) > 0 ||
      !!policyGuideCount ||
      basicModuleEnabled ||
      unstructuredModuleEnabled ||
      ragSystemEnabled ||
      graphRagEnabled ||
      documentSecurityEnabled ||
      aiAnswerEnabled);

  const handleBack = () => router.back();

  async function loadPayPalSdk(clientId: string) {
    return new Promise<void>((resolve, reject) => {
      // 이미 로드된 경우
      if (
        document.querySelector('script[src^="https://www.paypal.com/sdk/js"]')
      ) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
      document.body.appendChild(script);
    });
  }

  const handlePay = useCallback(async () => {
    if (isPurchasing) return;
    setIsPurchasing(true);

    try {
      // 1) 서버에 구매 생성 (paypal_plan 생성)
      // plan_id를 이름으로 매핑
      const allPlans = await llmService.getAllPlans();
      const planList = (allPlans.data as { id: number; name: string }[]) || [];
      const target = planList.find(
        (p) => (p.name || '').toUpperCase() === (plan || '').toUpperCase()
      );
      const planIdForApi = target?.id;

      if (!planIdForApi) {
        alert('선택한 플랜을 찾을 수 없습니다. 다시 시도해 주세요.');
        setIsPurchasing(false);
        return;
      }

      const purchaseReq = {
        plan_id: planIdForApi,
        seat_count: users,
        contract_month: period,
        is_prepayment: false,
        add_on: [] as { add_on_id: number; quantity: number }[],
        total_price: totalAmount,
        purchase_type: (purchaseType || 'BUSINESS') as 'BUSINESS' | 'PERSONAL',
      };

      const purchaseRes = await llmService.createPurchase(purchaseReq);
      if (!purchaseRes.success || !purchaseRes.data) {
        alert('결제 준비에 실패했습니다.');
        setIsPurchasing(false);
        return;
      }

      const paypalPlan = (
        purchaseRes.data as { paypal_plan_id?: string; id?: number }
      ).paypal_plan_id as string | null;
      const returnedPaymentId = (
        purchaseRes.data as { paypal_plan_id?: string; id?: number }
      ).id as number | null;

      const clientIdToUse = env.PAYPAL_CLIENT_ID;

      if (!paypalPlan || !clientIdToUse || !returnedPaymentId) {
        alert('결제 정보가 올바르지 않습니다. (PayPal Client ID 설정 필요)');
        setIsPurchasing(false);
        return;
      }

      setPaymentId(returnedPaymentId);

      await loadPayPalSdk(clientIdToUse);

      const winAny = window as unknown as {
        paypal?: {
          Buttons: (opts: {
            style: Record<string, unknown>;
            createSubscription: (
              data: unknown,
              actions: {
                subscription: {
                  create: (arg: { plan_id: string }) => Promise<string>;
                };
              }
            ) => Promise<string>;
            onApprove: (data: {
              subscriptionID: string;
            }) => Promise<void> | void;
          }) => { render: (el: HTMLElement) => void };
        };
      };
      if (winAny?.paypal && paypalContainerRef.current) {
        // 컨테이너 초기화
        paypalContainerRef.current.innerHTML = '';
        winAny.paypal
          .Buttons({
            style: {
              shape: 'rect',
              color: 'gold',
              layout: 'vertical',
              label: 'subscribe',
            },
            createSubscription: function (
              _data: unknown,
              actions: {
                subscription: {
                  create: (arg: { plan_id: string }) => Promise<string>;
                };
              }
            ) {
              return actions.subscription.create({ plan_id: paypalPlan });
            },
            onApprove: async (data: { subscriptionID: string }) => {
              console.log('onApprove', data);
              try {
                if (!paymentId) return;
                const completeRes = await llmService.completePayment(
                  paymentId,
                  {
                    subscription_id: data.subscriptionID,
                    plan_id: paypalPlan,
                  }
                );
                if (completeRes.success) {
                  router.push('/checkout/success');
                } else {
                  alert('결제 완료 처리에 실패했습니다.');
                }
              } catch {
                alert('결제 완료 처리 중 오류가 발생했습니다.');
              }
            },
          })
          .render(paypalContainerRef.current);
      }
    } catch {
      alert('결제 준비 중 오류가 발생했습니다.');
    } finally {
      setIsPurchasing(false);
    }
  }, [
    isPurchasing,
    plan,
    users,
    period,
    totalAmount,
    purchaseType,
    router,
    paymentId,
  ]);

  // 페이지 진입 시 바로 PayPal 버튼 생성
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    void handlePay();
  }, [handlePay]);

  const planImage = getPlanImageByName(plan);

  // Seat Cap should display the MAX cap of the selected plan (not the chosen tokens)
  const normalizedPlan = (plan || '').toUpperCase() as
    | 'BASIC'
    | 'PLUS'
    | 'PRO'
    | 'MAX';
  const planCapMax = (() => {
    if (purchaseType === 'PERSONAL') {
      switch (normalizedPlan) {
        case 'BASIC':
          return 70000;
        case 'PLUS':
          return 120000;
        case 'PRO':
          return 280000;
        case 'MAX':
          return 600000;
        default:
          return Number(cap);
      }
    }
    // BUSINESS
    switch (normalizedPlan) {
      case 'PLUS':
        return 120000;
      case 'PRO':
        return 280000;
      case 'MAX':
        return 600000;
      default:
        return Number(cap);
    }
  })();

  return (
    <>
      <GlobalHeader />
      <Container>
        <ContentWrapper>
          <Header>
            <Title>결제 상세</Title>
          </Header>
          <Divider />
          <SummaryCard>
            <PlanRow>
              <PlanBadge>
                <Image
                  src={planImage}
                  alt={`${plan} plan`}
                  width={56}
                  height={56}
                />
              </PlanBadge>
              <PlanInfo>
                <PlanName>{plan}</PlanName>
                <PlanMeta>
                  <PlanPrice>${price.toLocaleString()}/Seat</PlanPrice>
                  <PlanDivider>·</PlanDivider>
                  <PlanCap>Seat · Cap {planCapMax.toLocaleString()}</PlanCap>
                </PlanMeta>
              </PlanInfo>
            </PlanRow>

            <SectionTitle>기본 항목</SectionTitle>
            <Bullets>
              <li>
                선택된 플랜: {plan} (${price.toLocaleString()}/Seat · Cap{' '}
                {planCapMax.toLocaleString()})
              </li>
              <li>사용 인원: {users}</li>
              <li>계약 기간: {period}개월</li>
              <li>할인율: ({discount.toLocaleString()}%)</li>
              <li style={{ color: textColor.light['fg-neutral-primary'] }}>
                정기 결제 비용: ₩{monthlyTotal.toLocaleString()}
              </li>
            </Bullets>

            <Divider style={{ margin: '32px 0' }} />

            {hasOneTimeCost && (
              <>
                <SectionTitle>1회성 구축 비용</SectionTitle>
                <Bullets>
                  {Number(securityGuideCount) > 0 && (
                    <li>
                      정형 민감 조건 모듈 (1회 적용 {securityGuideCount}개)
                    </li>
                  )}
                  {policyGuideCount && <li>중앙 관리자 콘솔 Admin 구축</li>}
                  {basicModuleEnabled && (
                    <li>
                      민감 키워드 추가
                      {selectedSubOption
                        ? selectedSubOption === 'filter5'
                          ? ' (키워드 5개)'
                          : selectedSubOption === 'filter8'
                            ? ' (키워드 8개)'
                            : selectedSubOption === 'filter12'
                              ? ' (키워드 12개)'
                              : ''
                        : ''}
                    </li>
                  )}
                  {unstructuredModuleEnabled && (
                    <li>비정형 민감정보 조건 모듈</li>
                  )}
                  {ragSystemEnabled && <li>RAG 시스템</li>}
                  {graphRagEnabled && <li>최신 기술 Graph RAG 적용</li>}
                  {documentSecurityEnabled && <li>문서보안등급별 접근 제어</li>}
                  {aiAnswerEnabled && <li>문맥 기반 AI 답변 적용</li>}
                  <li style={{ color: textColor.light['fg-neutral-primary'] }}>
                    1회성 구축 비용: ₩{oneTimeTotal.toLocaleString()}
                  </li>
                </Bullets>
              </>
            )}

            <TotalsBox>
              <TotalsGroup>
                <TotalsLine>
                  <span>정기 결제 비용</span>
                  <span>₩{monthlyTotal.toLocaleString()}</span>
                </TotalsLine>
                {hasOneTimeCost && (
                  <TotalsLine>
                    <span>1회성 구축 비용</span>
                    <span>₩{oneTimeTotal.toLocaleString()}</span>
                  </TotalsLine>
                )}
              </TotalsGroup>
              <TotalsGrandLine>
                <GrandLabel>총 계약 금액</GrandLabel>
                <GrandValue>₩{totalAmount.toLocaleString()}</GrandValue>
              </TotalsGrandLine>
            </TotalsBox>

            <Notice>
              <InfoIcon />
              <NoticeText>
                LLM Capsule B2B 제품은 조직도 및 서버, DB 구축 등의 작업이
                필요해 평균 2-3개월 정도의 도입기간이 소요됩니다.
                <br /> 결제 완료시 3영업일 이내로 연락드리도록 하겠습니다.
                연락받으실 이메일, 번호를 확인해주세요.
              </NoticeText>
            </Notice>
          </SummaryCard>

          <Actions>
            <BackButton variant='secondary' size='large' onClick={handleBack}>
              취소
            </BackButton>
            <PayPalSlot ref={paypalContainerRef} />
          </Actions>
        </ContentWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: white;
  padding-top: 80px;
`;

const ContentWrapper = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px 24px 40px 24px;
`;

const Header = styled.div`
  margin-bottom: 48px;
`;

const Title = styled.h1`
  ${typography('ko', 'heading2', 'semibold')}
  margin: 0;
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 0;
  border: none;
  padding: 8px 0 0 0;
`;

const PlanRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const PlanBadge = styled.div`
  width: 80px;
  height: 56px;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlanInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlanName = styled.div`
  ${typography('ko', 'title1', 'semibold')}
`;

const PlanMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${textColor.light['fg-neutral-alternative']};
`;

const PlanPrice = styled.span`
  ${typography('ko', 'body2', 'medium')}
`;

const PlanDivider = styled.span`
  ${typography('ko', 'body2', 'regular')}
`;

const PlanCap = styled.span`
  ${typography('ko', 'body2', 'regular')}
`;

const SectionTitle = styled.h3`
  ${typography('ko', 'body1', 'semibold')}
  margin: 0 0 12px 0;
`;

const Bullets = styled.ul`
  margin: 0 0 6px 0;
  gap: 6px;
  list-style: none;
  padding-left: 0;
  li {
    ${typography('ko', 'body2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
    line-height: 1.6;
    display: flex;
    align-items: baseline;
  }
  li::before {
    content: '• ';
    margin-right: 4px;
  }
`;

const TotalsBox = styled.div`
  margin: 32px 0 20px 0;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 16px;
  overflow: hidden;
`;

const TotalsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: white;
`;

const TotalsLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${typography('ko', 'body2', 'medium')}
`;

const TotalsGrandLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${layerColor.light['bg-layer-basement']};
  border-top: 1px solid ${borderColor.light['color-border-primary']};
`;

const GrandLabel = styled.span`
  ${typography('ko', 'heading1', 'semibold')}
`;

const GrandValue = styled.span`
  ${typography('ko', 'heading1', 'semibold')}
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${color.gray['50']};
  padding: 12px;
  border-radius: 12px;
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const NoticeText = styled.div``;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 40px;
`;

const BackButton = styled(SolidButton)`
  flex: 1;
`;

const PayPalSlot = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
