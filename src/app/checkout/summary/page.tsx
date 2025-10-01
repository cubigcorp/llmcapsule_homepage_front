'use client';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import React, { useEffect, useRef, useState, Suspense } from 'react';
import styled from 'styled-components';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import GlobalHeader from '@/components/layout/Header';
import { useTranslation } from 'react-i18next';
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

function CheckoutSummaryContent() {
  const { t } = useTranslation('checkout');
  const params = useSearchParams();
  const router = useRouter();
  const formatAmount = (value: number) =>
    value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  const initializedRef = useRef(false);
  const apiCallInProgressRef = useRef(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [paypalPlanId, setPaypalPlanId] = useState<string | null>(null);

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

  useEffect(() => {
    console.log(
      'useEffect called, initializedRef:',
      initializedRef.current,
      'apiCallInProgress:',
      apiCallInProgressRef.current
    );

    if (initializedRef.current || apiCallInProgressRef.current) {
      console.log('Early return - already initialized or API call in progress');
      return;
    }

    initializedRef.current = true;
    apiCallInProgressRef.current = true;
    console.log('Starting PayPal initialization');

    // handlePay 함수를 직접 여기서 정의해서 의존성 문제 해결
    const initPayPal = async () => {
      console.log('initPayPal called');
      setIsPurchasing(true);

      try {
        const allPlans = await llmService.getAllPlans();
        const planList =
          (allPlans.data as { id: number; name: string }[]) || [];
        const target = planList.find(
          (p) => (p.name || '').toUpperCase() === (plan || '').toUpperCase()
        );
        const planIdForApi = target?.id;

        // Build Business add-ons mapping (quantity fixed to 1)
        const addOns: { add_on_id: number; quantity: number }[] = [];
        if ((purchaseType || 'BUSINESS').toUpperCase() === 'BUSINESS') {
          // Central Admin Console Admin Setup (policyGuideCount: -1 | 0 | 200 | 500)
          if (policyGuideCount === '0')
            addOns.push({ add_on_id: 1, quantity: 1 });
          if (policyGuideCount === '200')
            addOns.push({ add_on_id: 2, quantity: 1 });
          // 500+ is $0 → not sent

          // Structured Sensitive Information Condition Module (securityGuideCount: 5|8|12)
          if (securityGuideCount === '5')
            addOns.push({ add_on_id: 3, quantity: 1 });
          if (securityGuideCount === '8')
            addOns.push({ add_on_id: 4, quantity: 1 });
          if (securityGuideCount === '12')
            addOns.push({ add_on_id: 5, quantity: 1 });

          // Add Sensitive Keywords → Basic module (7) + sub options (8/9/10)
          if (basicModuleEnabled) addOns.push({ add_on_id: 7, quantity: 1 });
          if (selectedSubOption === 'filter5')
            addOns.push({ add_on_id: 8, quantity: 1 });
          if (selectedSubOption === 'filter8')
            addOns.push({ add_on_id: 9, quantity: 1 });
          if (selectedSubOption === 'filter12')
            addOns.push({ add_on_id: 10, quantity: 1 });

          // Other modules toggles
          if (unstructuredModuleEnabled)
            addOns.push({ add_on_id: 11, quantity: 1 });
          if (ragSystemEnabled) addOns.push({ add_on_id: 12, quantity: 1 });
          if (graphRagEnabled) addOns.push({ add_on_id: 13, quantity: 1 });
          if (documentSecurityEnabled)
            addOns.push({ add_on_id: 14, quantity: 1 });
          if (aiAnswerEnabled) addOns.push({ add_on_id: 15, quantity: 1 });
        }

        const purchaseReq = {
          plan_id: planIdForApi || 1,
          seat_count: users,
          contract_month: period,
          is_prepayment: false,
          add_on: addOns,
          total_price: totalAmount,
          purchase_type: (purchaseType || 'BUSINESS') as
            | 'BUSINESS'
            | 'PERSONAL',
        };

        const purchaseRes = await llmService.createPurchase(purchaseReq);

        if (!purchaseRes.success || !purchaseRes.data) {
          alert('결제 준비에 실패했습니다.');
          setIsPurchasing(false);
          return;
        }
        console.log('purchaseRes', purchaseRes);

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
        setPaypalPlanId(paypalPlan);
      } catch {
        alert('결제 준비 중 오류가 발생했습니다.');
      } finally {
        setIsPurchasing(false);
        apiCallInProgressRef.current = false;
      }
    };

    void initPayPal();
  }, []); // 완전히 빈 의존성 배열

  // React PayPal JS Handlers
  const createSubscription = (
    _data: unknown,
    actions: {
      subscription: { create: (arg: { plan_id: string }) => Promise<string> };
    }
  ) => {
    if (!paypalPlanId) throw new Error('Missing PayPal plan id');
    return actions.subscription.create({ plan_id: paypalPlanId });
  };

  const onApprove = async (data: { subscriptionID: string }) => {
    try {
      if (!paymentId || !paypalPlanId) {
        alert('결제 정보가 없습니다. 다시 시도해주세요.');
        return;
      }
      const completeRes = await llmService.completePayment(paymentId, {
        subscription_id: data.subscriptionID,
        plan_id: paypalPlanId,
      });
      if (completeRes.success) {
        const sp = new URLSearchParams({
          purchaseType: String(purchaseType),
          plan: String(plan),
          price: String(price),
          users: String(users),
          period: String(period),
          monthlyTotal: String(monthlyTotal),
          oneTimeTotal: String(oneTimeTotal),
          totalAmount: String(totalAmount),
        });
        router.push(`/checkout/success?${sp.toString()}`);
      } else {
        alert('결제 완료 처리에 실패했습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('결제 완료 처리 중 오류가 발생했습니다.');
    }
  };

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
            <Title>{t('checkout:summary.title')}</Title>
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

            <SectionTitle>{t('checkout:summary.selectedSpec')}</SectionTitle>
            <Bullets>
              <li>
                {t('checkout:summary.selectedPlan')}: {plan} ($
                {price.toLocaleString()}/Seat · Cap{' '}
                {planCapMax.toLocaleString()})
              </li>
              <li>
                {t('checkout:summary.users')}: {users}
              </li>
              <li>
                {t('checkout:summary.contract')}: {period}
                {t('checkout:contract.monthsSuffix')}
              </li>
              <li>
                {t('checkout:summary.discount')}: ({discount.toLocaleString()}%)
              </li>
              <li style={{ color: textColor.light['fg-neutral-primary'] }}>
                {t('checkout:summary.monthly')}: ${formatAmount(monthlyTotal)}
              </li>
            </Bullets>

            <Divider style={{ margin: '32px 0' }} />

            {hasOneTimeCost && (
              <>
                <SectionTitle>{t('checkout:summary.oneTime')}</SectionTitle>
                <Bullets>
                  {Number(securityGuideCount) > 0 && (
                    <li>
                      {t('checkout:summary.security')} (1회 적용{' '}
                      {securityGuideCount}개)
                    </li>
                  )}
                  {policyGuideCount && <li>{t('checkout:summary.admin')}</li>}
                  {basicModuleEnabled && (
                    <li>
                      {t('checkout:summary.module')}
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
                    <li>{t('checkout:summary.unstructured')}</li>
                  )}
                  {ragSystemEnabled && <li>{t('checkout:summary.rag')}</li>}
                  {graphRagEnabled && <li>{t('checkout:summary.graphRag')}</li>}
                  {documentSecurityEnabled && (
                    <li>{t('checkout:summary.docSec')}</li>
                  )}
                  {aiAnswerEnabled && <li>{t('checkout:summary.aiAnswer')}</li>}
                  <li style={{ color: textColor.light['fg-neutral-primary'] }}>
                    {t('checkout:summary.oneTime')}: $
                    {formatAmount(oneTimeTotal)}
                  </li>
                </Bullets>
              </>
            )}

            <TotalsBox>
              <TotalsGroup>
                <TotalsLine>
                  <span>{t('checkout:summary.monthly')}</span>
                  <span>${formatAmount(monthlyTotal)}</span>
                </TotalsLine>
                {hasOneTimeCost && (
                  <TotalsLine>
                    <span>{t('checkout:summary.oneTime')}</span>
                    <span>${formatAmount(oneTimeTotal)}</span>
                  </TotalsLine>
                )}
              </TotalsGroup>
              <TotalsGrandLine>
                <GrandLabel>{t('checkout:summary.total')}</GrandLabel>
                <GrandValue>${formatAmount(totalAmount)}</GrandValue>
              </TotalsGrandLine>
            </TotalsBox>

            <Notice>
              <InfoIcon />
              <NoticeText>
                {t('checkout:b2bInfo.text1')}
                <br />
                {t('checkout:b2bInfo.text2')}
              </NoticeText>
            </Notice>
          </SummaryCard>

          <Actions>
            <BackButton variant='secondary' size='large' onClick={handleBack}>
              취소
            </BackButton>
            <PayPalSlot>
              {paypalPlanId ? (
                <PayPalButtons
                  style={{
                    layout: 'horizontal',
                    shape: 'rect',
                    color: 'black',
                    label: 'paypal',
                    tagline: false,
                    height: 48,
                    borderRadius: 8,
                    disableMaxWidth: true,
                  }}
                  createSubscription={createSubscription}
                  onApprove={(data) =>
                    onApprove(data as { subscriptionID: string })
                  }
                />
              ) : null}
            </PayPalSlot>
          </Actions>
        </ContentWrapper>
      </Container>
    </>
  );
}

export default function CheckoutSummaryPage() {
  const clientId = env.PAYPAL_CLIENT_ID;

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        vault: true,
        intent: 'subscription',
        components: 'buttons',
      }}
    >
      <Suspense fallback={null}>
        <CheckoutSummaryContent />
      </Suspense>
    </PayPalScriptProvider>
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
`;
