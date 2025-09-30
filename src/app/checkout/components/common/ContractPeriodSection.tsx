import React from 'react';
import styled from 'styled-components';
import {
  typography,
  textColor,
  borderColor,
  color,
  Badge,
} from '@cubig/design-system';
import { useTranslation } from 'react-i18next';

interface ContractPeriodSectionProps {
  contractPeriod: number;
  contractDiscounts: Record<number, number>;
  onContractPeriodChange: (period: number) => void;
}

export default function ContractPeriodSection({
  contractPeriod,
  contractDiscounts,
  onContractPeriodChange,
}: ContractPeriodSectionProps) {
  const { t } = useTranslation('checkout');

  const contractOptions = [
    { months: 1, discount: 0 },
    { months: 6, discount: 3 },
    { months: 12, discount: 5 },
    { months: 18, discount: 7 },
    { months: 24, discount: 10 },
  ];

  return (
    <ContractPeriodContainer>
      <ContractPeriodLabel>{t('contract.title')}</ContractPeriodLabel>
      <PeriodDescription>
        {contractPeriod}개월 마다 자동 갱신되며, 기간 할인은 운영 정책에 따라
        달라질 수 있습니다.
      </PeriodDescription>
      <PeriodOptions>
        {contractOptions.map((option) => (
          <PeriodOption
            key={option.months}
            $isSelected={contractPeriod === option.months}
            onClick={() => onContractPeriodChange(option.months)}
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
    </ContractPeriodContainer>
  );
}

const ContractPeriodContainer = styled.div`
  margin-bottom: 24px;
`;

const ContractPeriodLabel = styled.h3`
  ${typography('ko', 'heading1', 'semibold')}
  margin-bottom: 12px;
`;

const PeriodDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-bottom: 16px;
`;

const PeriodOptions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
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
