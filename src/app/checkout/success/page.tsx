'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import GlobalHeader from '@/components/layout/Header';
import styled from 'styled-components';
import PlanBasicImage from '@/assets/images/plan_basic.png';
import PlanPlusImage from '@/assets/images/plan_plus.png';
import PlanProImage from '@/assets/images/plan_pro.png';
import PlanMaxImage from '@/assets/images/plan_max.png';
import InfoIcon from '@/assets/icons/icon_info.svg';
import DownloadIcon from '@/assets/icons/icon_download.svg';
import { useTranslation } from 'react-i18next';
import {
  SolidButton,
  Divider,
  textColor,
  borderColor,
  layerColor,
  typography,
  color,
} from '@cubig/design-system';

type CompletePayload = never; // deprecated

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

export default function CheckoutSuccessPage() {
  const { t } = useTranslation();
  const params = useSearchParams();
  const router = useRouter();
  const plan = (params.get('plan') || 'Plus').toUpperCase();
  const purchaseType = (params.get('purchaseType') || 'BUSINESS').toUpperCase();
  const price = Number(params.get('price') || '0');
  const users = Number(params.get('users') || '0');
  const period = Number(params.get('period') || '0');
  const monthlyTotal = Number(params.get('monthlyTotal') || '0');
  const oneTimeTotal = Number(params.get('oneTimeTotal') || '0');
  const totalAmount = Number(params.get('totalAmount') || '0');

  const planImage = getPlanImageByName(plan);
  const normalizedPlan = plan as 'BASIC' | 'PLUS' | 'PRO' | 'MAX';
  const payment = {} as { payment_id?: number; created_at?: string };
  const formatKoreanDateTime = (d: Date) =>
    `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${d
      .getHours()
      .toString()
      .padStart(2, '0')}시 ${d.getMinutes().toString().padStart(2, '0')}분`;
  const orderNumber = payment?.payment_id
    ? `OR${String(payment.payment_id).padStart(4, '0')}`
    : `OR${new Date().getTime().toString().slice(-4)}`;
  const orderDate = formatKoreanDateTime(
    payment?.created_at ? new Date(payment.created_at) : new Date()
  );
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
          return 0;
      }
    }
    switch (normalizedPlan) {
      case 'PLUS':
        return 120000;
      case 'PRO':
        return 280000;
      case 'MAX':
        return 600000;
      default:
        return 0;
    }
  })();

  return (
    <>
      <GlobalHeader />
      <Container>
        <ContentWrapper>
          <Header>
            <Title>{t('checkout:success.title')}</Title>
            <OrderInfo></OrderInfo>
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
                  <PlanPrice>₩{price.toLocaleString()}/Seat</PlanPrice>
                  <PlanDivider>·</PlanDivider>
                  <PlanCap>Seat · Cap {planCapMax.toLocaleString()}</PlanCap>
                </PlanMeta>
              </PlanInfo>
            </PlanRow>

            <SectionTitle>{t('checkout:summary.selectedSpec')}</SectionTitle>
            <Bullets>
              <li>
                {t('checkout:summary.selectedPlan')}: {plan} (₩
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
              <li style={{ color: textColor.light['fg-neutral-primary'] }}>
                {t('checkout:summary.monthly')}: ₩
                {monthlyTotal.toLocaleString()}
              </li>
            </Bullets>

            {oneTimeTotal > 0 && (
              <>
                <Divider style={{ margin: '32px 0' }} />
                <SectionTitle>{t('checkout:summary.oneTime')}</SectionTitle>
                <Bullets>
                  <li style={{ color: textColor.light['fg-neutral-primary'] }}>
                    {t('checkout:summary.oneTime')}: ₩
                    {oneTimeTotal.toLocaleString()}
                  </li>
                </Bullets>
              </>
            )}

            <TotalsBox>
              <TotalsGroup>
                <TotalsLine>
                  <span>{t('checkout:summary.monthly')}</span>
                  <span>₩{monthlyTotal.toLocaleString()}</span>
                </TotalsLine>
                {oneTimeTotal > 0 && (
                  <TotalsLine>
                    <span>{t('checkout:summary.oneTime')}</span>
                    <span>₩{oneTimeTotal.toLocaleString()}</span>
                  </TotalsLine>
                )}
              </TotalsGroup>
              <TotalsGrandLine>
                <GrandLabel>{t('checkout:summary.total')}</GrandLabel>
                <GrandValue>₩{totalAmount.toLocaleString()}</GrandValue>
              </TotalsGrandLine>
            </TotalsBox>
          </SummaryCard>

          <ButtonSection>
            {/**
             * <DownloadButton
             *   variant='secondary'
             *   size='large'
             *   leadingIcon={DownloadIcon}
             * >
             *   {t('mypage:checkout.success.downloadPdf')}
             * </DownloadButton>
             */}
            <CompleteButton
              variant='primary'
              size='large'
              onClick={() => router.push('/mypage/plans')}
            >
              {t('mypage:checkout.success.managePlan')}
            </CompleteButton>
          </ButtonSection>
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

const SummaryCard = styled.div`
  background: white;
  border-radius: 0;
  border: none;
  padding: 8px 0 0 0;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  ${typography('ko', 'heading2', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 8px 0;
`;

const OrderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OrderDate = styled.span`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
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

// Duplicate tokens removed (already defined above)

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

// Duplicate blocks removed (already defined above)

const TotalLabel = styled.span`
  ${typography('ko', 'heading1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const TotalValue = styled.span`
  ${typography('ko', 'heading1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const NoticeSection = styled.div`
  padding: 12px;
  background: ${color.gray['50']};
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NoticeIcon = styled(InfoIcon)`
  flex-shrink: 0;
  color: ${textColor.light['fg-neutral-alternative']};
`;

const NoticeText = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
  white-space: pre-line;
`;

const ButtonSection = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 12px;
  justify-content: center;
`;

const DownloadButton = styled(SolidButton)`
  flex: 1;
`;

const CompleteButton = styled(SolidButton)`
  flex: 1;
`;
