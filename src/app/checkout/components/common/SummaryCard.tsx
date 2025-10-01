import React from 'react';
import styled from 'styled-components';
import {
  SolidButton,
  typography,
  borderColor,
  textColor,
  layerColor,
  Divider,
} from '@cubig/design-system';
import { useTranslation } from 'react-i18next';
import DownloadIcon from '@/assets/icons/icon_download.svg';

interface SummaryCardProps {
  type: 'business' | 'personal';
  currentPlan: {
    name: string;
    price: number;
  };
  userCount: number;
  tokenUsage: number;
  contractPeriod: number;
  contractDiscounts: Record<number, number>;
  yearlyTotal: number;
  addOnTotal: number;
  addOnPrices: Record<string, number>;
  // Add-on states
  securityGuideCount: number;
  policyGuideCount: number;
  basicModuleEnabled: boolean;
  selectedSubOption: string;
  aiAnswerEnabled?: boolean;
  unstructuredModuleEnabled?: boolean;
  ragSystemEnabled?: boolean;
  graphRagEnabled?: boolean;
  documentSecurityEnabled?: boolean;
  onCheckout: () => void;
}

export default function SummaryCard({
  type,
  currentPlan,
  userCount,
  tokenUsage,
  contractPeriod,
  contractDiscounts,
  yearlyTotal,
  addOnTotal,
  addOnPrices,
  securityGuideCount,
  policyGuideCount,
  basicModuleEnabled,
  selectedSubOption,
  aiAnswerEnabled = false,
  unstructuredModuleEnabled = false,
  ragSystemEnabled = false,
  graphRagEnabled = false,
  documentSecurityEnabled = false,
  onCheckout,
}: SummaryCardProps) {
  const { t } = useTranslation('checkout');

  const totalAmount = yearlyTotal + addOnTotal;
  const formatAmount = (value: number) =>
    value.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const planKey = (currentPlan.name || '').toUpperCase();
  const businessCapMap: Record<string, number> = {
    PLUS: 120000,
    PRO: 280000,
    MAX: 600000,
  };
  const personalCapMap: Record<string, number> = {
    BASIC: 70000,
    PLUS: 120000,
    PRO: 280000,
    MAX: 600000,
  };
  const planCapMax =
    (type === 'personal' ? personalCapMap[planKey] : businessCapMap[planKey]) ??
    tokenUsage;

  return (
    <SummaryCardContainer>
      <TopSection>
        <SummaryTitle>{t('summary.title')}</SummaryTitle>

        <SummaryItem>
          <SummaryLabel>{t('summary.selectedSpec')}</SummaryLabel>
          <SummaryDetails>
            <SummaryDetail>
              {t('summary.selectedPlan')}: {currentPlan.name} ($
              {formatAmount(currentPlan.price)}/Seat · Cap{' '}
              {planCapMax.toLocaleString()})
            </SummaryDetail>
            <SummaryDetail>
              {t('summary.users')}: {userCount}
            </SummaryDetail>
            <SummaryDetail>
              {t('summary.contract')}: {contractPeriod}
              {t('contract.monthsSuffix')}
            </SummaryDetail>
            <SummaryDetail>
              {t('summary.discount')}: ({contractDiscounts[contractPeriod] || 0}
              %)
            </SummaryDetail>
            <SummaryDetailPrimary>
              {t('summary.monthly')}: ${formatAmount(yearlyTotal)}
            </SummaryDetailPrimary>
          </SummaryDetails>
        </SummaryItem>

        {/* 비즈니스용만 1회성 구축 비용 표시 */}
        {type === 'business' && (
          <>
            <Divider style={{ margin: '24px 0' }} />
            <SummaryItem>
              <SummaryLabel>{t('summary.oneTime')}</SummaryLabel>
              <SummaryDetails>
                {securityGuideCount !== -1 && (
                  <SummaryDetail>
                    {t('summary.security')}: (1회 적용 {securityGuideCount}개) /
                    ${addOnPrices.security.toLocaleString()}
                  </SummaryDetail>
                )}
                {policyGuideCount !== -1 && (
                  <SummaryDetail>
                    {t('summary.admin')}: (
                    {policyGuideCount === 0
                      ? '100-200'
                      : policyGuideCount === 200
                        ? '200-500'
                        : '500+'}
                    ) / ${formatAmount(addOnPrices.policy)}
                  </SummaryDetail>
                )}
                {basicModuleEnabled && (
                  <SummaryDetail>
                    {t('summary.module')}: (기본 모듈
                    {selectedSubOption !== 'none' && selectedSubOption !== ''
                      ? ` + ${
                          selectedSubOption === 'filter5'
                            ? '키워드 5개'
                            : selectedSubOption === 'filter8'
                              ? '키워드 8개'
                              : '키워드 12개'
                        }`
                      : ''}
                    ) / $
                    {formatAmount(
                      addOnPrices.basicModule + addOnPrices.subOption
                    )}
                  </SummaryDetail>
                )}
                {aiAnswerEnabled && (
                  <SummaryDetail>
                    {t('summary.aiAnswer')}: $
                    {formatAmount(addOnPrices.aiAnswer)}
                  </SummaryDetail>
                )}
                {unstructuredModuleEnabled && (
                  <SummaryDetail>
                    {t('summary.unstructured')}: $
                    {formatAmount(addOnPrices.unstructuredModule)}
                  </SummaryDetail>
                )}
                {ragSystemEnabled && (
                  <SummaryDetail>
                    {t('summary.rag')}: ${formatAmount(addOnPrices.rag)}
                  </SummaryDetail>
                )}
                {graphRagEnabled && (
                  <SummaryDetail>
                    {t('summary.graphRag')}: $
                    {formatAmount(addOnPrices.graphRag)}
                  </SummaryDetail>
                )}
                {documentSecurityEnabled && (
                  <SummaryDetail>
                    {t('summary.docSec')}: $
                    {formatAmount(addOnPrices.documentSecurity)}
                  </SummaryDetail>
                )}
              </SummaryDetails>
              <SummaryDetailPrimary>
                {t('summary.oneTime')}: ${formatAmount(addOnTotal)}
              </SummaryDetailPrimary>
            </SummaryItem>
          </>
        )}

        <Divider style={{ margin: '24px 0' }} />
        <PriceBreakdownSection>
          {type === 'business' ? (
            <>
              <PriceBreakdownItem>
                <span>{t('summary.monthly')}</span>
                <span>${formatAmount(yearlyTotal)}</span>
              </PriceBreakdownItem>
              <PriceBreakdownItem>
                <span>{t('summary.oneTime')} </span>
                <span>${formatAmount(addOnTotal)}</span>
              </PriceBreakdownItem>
            </>
          ) : (
            <PriceBreakdownItem>
              <span>{t('summary.monthly')} </span>
              <span>${formatAmount(yearlyTotal)}</span>
            </PriceBreakdownItem>
          )}
        </PriceBreakdownSection>

        <TotalSection>
          <TotalLabel>{t('summary.total')}</TotalLabel>
          <TotalPrice>${formatAmount(totalAmount)}</TotalPrice>
        </TotalSection>
      </TopSection>

      <BottomSection>
        <ButtonGroup>
          <SolidButton variant='primary' size='large' onClick={onCheckout}>
            {t('buttons.buy')}
          </SolidButton>
          <SolidButton
            variant='secondary'
            size='large'
            onClick={() => alert('문의하기')}
          >
            {t('buttons.contact')}
          </SolidButton>
          {/**
           * <SolidButton
           *   variant='secondary'
           *   size='large'
           *   leadingIcon={DownloadIcon}
           *   onClick={() => alert('PDF 다운로드')}
           * >
           *   {t('buttons.pdf')}
           * </SolidButton>
           */}
        </ButtonGroup>
      </BottomSection>
    </SummaryCardContainer>
  );
}

const SummaryCardContainer = styled.div`
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

const SummaryDetailPrimary = styled(SummaryDetail)`
  color: ${textColor.light['fg-neutral-primary']};
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
