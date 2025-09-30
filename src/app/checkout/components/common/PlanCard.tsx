import React from 'react';
import styled from 'styled-components';
import {
  typography,
  textColor,
  borderColor,
  color,
} from '@cubig/design-system';
import { useTranslation } from 'react-i18next';

interface PlanCardProps {
  planName: string;
  planPrice: number;
  tokenUsage: number;
  userCount: number;
}

export default function PlanCard({
  planName,
  planPrice,
  tokenUsage,
  userCount,
}: PlanCardProps) {
  const { t } = useTranslation('checkout');

  return (
    <PlanCardContainer>
      <PlanCardHeader>
        <PlanName>{planName}</PlanName>
        <PlanDetails>
          <PlanPrice>
            ${planPrice.toLocaleString()}/Seat · Cap{' '}
            {tokenUsage.toLocaleString()}
          </PlanPrice>
          <UserCount>{userCount} Users</UserCount>
        </PlanDetails>
      </PlanCardHeader>
    </PlanCardContainer>
  );
}

const PlanCardContainer = styled.div`
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  background: ${color.gray['50']};
  padding: 20px;
`;

const PlanCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlanName = styled.h3`
  ${typography('ko', 'heading1', 'semibold')}
  margin: 0;
`;

const PlanDetails = styled.div`
  text-align: right;
`;

const PlanPrice = styled.div`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const UserCount = styled.div`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-top: 4px;
`;
