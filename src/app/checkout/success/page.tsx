'use client';

import React from 'react';
import GlobalHeader from '@/components/layout/Header';
import styled from 'styled-components';
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

export default function CheckoutSuccessPage() {
  const { t } = useTranslation();

  // Mock data
  const orderData = {
    orderNumber: 'OR4234',
    orderDate: '2025년 9월 8일 13시 00분',
    plan: {
      name: 'MAX',
      price: '₩51,000/Seat',
      description: 'Seat • Cap 600,000',
      details: {
        plan: 'Max',
        users: '200',
        period: '12개월 (기간 할인 5%)',
        prepay: '예(추가 2%)',
        extraTokens: '0 • ₩13,000/월',
        vat: 'OFF',
      },
    },
    pricing: {
      monthlyFee: '₩4,845,000',
      oneTimeFee: '₩90,000,000',
      firstBill: '₩94,845,000',
      total: '₩161,674,920',
      prepayDiscount: '₩146,977,200',
      vatIncluded: '₩161,674,920',
    },
  };

  return (
    <>
      <GlobalHeader />
      <Container>
        <Header>
          <Title>{t('mypage:checkout.success.title')}</Title>
          <OrderInfo>
            <OrderNumber>
              {t('mypage:checkout.success.orderNumber')} {orderData.orderNumber}
            </OrderNumber>
            <OrderDivider>|</OrderDivider>
            <OrderDate>{orderData.orderDate}</OrderDate>
          </OrderInfo>
        </Header>

        <Content>
          <Divider />
          <PlanSection>
            <PlanBadge />
            <PlanInfo>
              <PlanName>{orderData.plan.name}</PlanName>
              <PlanDetails>
                <PlanPrice>{orderData.plan.price}</PlanPrice>
                <PlanDivider>|</PlanDivider>
                <PlanDescription>{orderData.plan.description}</PlanDescription>
              </PlanDetails>
            </PlanInfo>
          </PlanSection>

          <DetailsSection>
            <DetailItem>
              <DetailBullet>•</DetailBullet>
              <DetailText>
                {t('mypage:checkout.success.plan')}{' '}
                {orderData.plan.details.plan}
              </DetailText>
            </DetailItem>
            <DetailItem>
              <DetailBullet>•</DetailBullet>
              <DetailText>
                {t('mypage:checkout.success.quantity')}{' '}
                {orderData.plan.details.users}
              </DetailText>
            </DetailItem>
            <DetailItem>
              <DetailBullet>•</DetailBullet>
              <DetailText>
                {t('mypage:checkout.success.period')}{' '}
                {orderData.plan.details.period}
              </DetailText>
            </DetailItem>
            <DetailItem>
              <DetailBullet>•</DetailBullet>
              <DetailText>
                {t('mypage:checkout.success.prepay')}{' '}
                {orderData.plan.details.prepay}
              </DetailText>
            </DetailItem>
            <DetailItem>
              <DetailBullet>•</DetailBullet>
              <DetailText>
                {t('mypage:checkout.success.extraTokens')}{' '}
                {orderData.plan.details.extraTokens}
              </DetailText>
            </DetailItem>
            <DetailItem>
              <DetailBullet>•</DetailBullet>
              <DetailText>
                {t('mypage:checkout.success.vatIncluded')}{' '}
                {orderData.plan.details.vat}
              </DetailText>
            </DetailItem>
          </DetailsSection>

          <PricingContainer>
            <PricingSection>
              <PricingRow>
                <PricingLabel>
                  {t('mypage:checkout.success.monthlyFee')}
                </PricingLabel>
                <PricingValue>{orderData.pricing.monthlyFee}</PricingValue>
              </PricingRow>
              <PricingRow>
                <PricingLabel>
                  {t('mypage:checkout.success.oneTimeFee')}
                </PricingLabel>
                <PricingValue>{orderData.pricing.oneTimeFee}</PricingValue>
              </PricingRow>
              <PricingRow>
                <PricingLabel>
                  {t('mypage:checkout.success.firstBill')}
                </PricingLabel>
                <PricingValue>{orderData.pricing.firstBill}</PricingValue>
              </PricingRow>
            </PricingSection>

            <TotalSection>
              <TotalRow>
                <TotalLabel>{t('mypage:checkout.success.total')}</TotalLabel>
                <TotalValue>{orderData.pricing.total}</TotalValue>
              </TotalRow>
              <PricingRow>
                <PricingLabel>
                  {t('mypage:checkout.success.prepayApply')}
                </PricingLabel>
                <PricingValue>{orderData.pricing.prepayDiscount}</PricingValue>
              </PricingRow>
              <PricingRow>
                <PricingLabel>
                  {t('mypage:checkout.success.vatFinal')}
                </PricingLabel>
                <PricingValue>{orderData.pricing.vatIncluded}</PricingValue>
              </PricingRow>
            </TotalSection>
          </PricingContainer>

          <NoticeSection>
            <NoticeIcon />
            <NoticeText>{t('mypage:checkout.success.notice')}</NoticeText>
          </NoticeSection>

          <ButtonSection>
            <DownloadButton
              variant='secondary'
              size='large'
              leadingIcon={DownloadIcon}
            >
              {t('mypage:checkout.success.downloadPdf')}
            </DownloadButton>
            <CompleteButton variant='primary' size='large'>
              {t('mypage:checkout.success.managePlan')}
            </CompleteButton>
          </ButtonSection>
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 144px 32px 32px 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 60px;
`;

const Title = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 12px 0;
`;

const OrderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OrderNumber = styled.span`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const OrderDivider = styled.span`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-assistive']};
`;

const OrderDate = styled.span`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PlanSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PlanBadge = styled.div`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  background: url(${PlanMaxImage.src}) lightgray 50% / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography('ko', 'body2', 'semibold')}
`;

const PlanInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlanName = styled.h2`
  ${typography('ko', 'title2', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const PlanDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlanPrice = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const PlanDivider = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-assistive']};
`;

const PlanDescription = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const DetailBullet = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  line-height: 1.5;
  margin-top: 1px;
`;

const DetailText = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  line-height: 1.5;
`;

const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  overflow: hidden;
`;

const PricingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const PricingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PricingLabel = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};
`;

const PricingValue = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const TotalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: ${layerColor.light['bg-layer-basement']};
  border-top: 1px solid ${borderColor.light['color-border-primary']};
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
