import React from 'react';
import styled from 'styled-components';
import {
  SolidButton,
  typography,
  borderColor,
  textColor,
  layerColor,
  Divider,
  color,
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
  tokenPackCount: number;
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
  tokenPackCount,
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

  return (
    <SummaryCardContainer>
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
            <SummaryDetail>계약 기간: {contractPeriod}개월</SummaryDetail>
            <SummaryDetail>
              할인율: ({contractDiscounts[contractPeriod] || 0}%)
            </SummaryDetail>
            <SummaryDetail>
              정기 결제 비용: ${Math.round(yearlyTotal).toLocaleString()}
            </SummaryDetail>
          </SummaryDetails>
        </SummaryItem>

        {/* 비즈니스용만 1회성 구축 비용 표시 */}
        {type === 'business' && (
          <>
            <Divider style={{ margin: '24px 0' }} />
            <SummaryItem>
              <SummaryLabel>1회성 구축 비용</SummaryLabel>
              <SummaryDetails>
                {securityGuideCount !== -1 && (
                  <SummaryDetail>
                    정형 민감정보 조건 모듈: (1회 적용 {securityGuideCount}개) /
                    ${addOnPrices.security.toLocaleString()}
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
          </>
        )}

        <Divider style={{ margin: '24px 0' }} />
        <PriceBreakdownSection>
          {type === 'business' ? (
            <>
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
            </>
          ) : (
            <PriceBreakdownItem>
              <span>정기 결제 비용</span>
              <span>${Math.round(totalAmount).toLocaleString()}</span>
            </PriceBreakdownItem>
          )}
        </PriceBreakdownSection>

        <TotalSection>
          <TotalLabel>총 계약 금액</TotalLabel>
          <TotalPrice>${Math.round(totalAmount).toLocaleString()}</TotalPrice>
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
          <SolidButton
            variant='secondary'
            size='large'
            leadingIcon={DownloadIcon}
            onClick={() => alert('PDF 다운로드')}
          >
            {t('buttons.pdf')}
          </SolidButton>
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
