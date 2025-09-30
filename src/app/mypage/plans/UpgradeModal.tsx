'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Modal,
  SolidButton,
  textColor,
  color,
  typography,
  borderColor,
  Divider,
} from '@cubig/design-system';
import PlanBasicImage from '@/assets/images/plan_basic.png';
import PlanPlusImage from '@/assets/images/plan_plus.png';
import PlanProImage from '@/assets/images/plan_pro.png';
import PlanMaxImage from '@/assets/images/plan_max.png';
import CardIcon from '@/assets/icons/icon_card.svg';
type PlanOption = {
  id: number;
  name: 'BASIC' | 'PLUS' | 'PRO' | 'MAX';
  price: number;
  diffTokens: number;
  monthlyTokenLimit: number;
};

interface UpgradeModalProps {
  open: boolean;
  currentPlanName?: 'BASIC' | 'PLUS' | 'PRO' | 'MAX';
  purchaseType?: 'PERSONAL' | 'BUSINESS';
  onClose: () => void;
  onUpgrade: (planId: number) => void;
}

import { llmService } from '@/services/llm';
import type { Plan } from '@/utils/api';

export default function UpgradeModal({
  open,
  currentPlanName,
  purchaseType = 'PERSONAL',
  onClose,
  onUpgrade,
}: UpgradeModalProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [fetchedOptions, setFetchedOptions] = useState<PlanOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!open) return;

      setLoading(true);
      setFetchedOptions([]);
      setSelectedId(null);

      try {
        const res = await llmService.getAllPlans();

        console.log('res', res);
        const plans: Plan[] = res.data || [];

        const nameMap = (n: string): PlanOption['name'] => {
          return (n as PlanOption['name']) || 'BASIC';
        };

        const allowedPlans =
          purchaseType === 'PERSONAL'
            ? ['BASIC', 'PLUS', 'PRO', 'MAX']
            : ['PLUS', 'PRO', 'MAX'];

        const normalized = plans
          .filter((p) => allowedPlans.includes(p.name))
          .map((p) => ({
            id: p.id,
            name: nameMap(p.name),
            price: Number(p.price),
            monthly_token_limit: p.monthly_token_limit || 0,
          }));

        const current =
          normalized.find((p) => p.name === (currentPlanName || 'BASIC')) ||
          normalized[0];

        const built: PlanOption[] = normalized.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          diffTokens: Math.max(
            0,
            (p.monthly_token_limit || 0) - (current?.monthly_token_limit || 0)
          ),
          monthlyTokenLimit: p.monthly_token_limit || 0,
        }));

        setFetchedOptions(built);
      } catch {
        setFetchedOptions([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [open, currentPlanName, purchaseType]);

  const sorted = useMemo(
    () => fetchedOptions.slice().sort((a, b) => a.price - b.price),
    [fetchedOptions]
  );

  const handleConfirm = () => {
    if (selectedId != null) onUpgrade(selectedId);
  };

  return (
    <Modal
      size='medium'
      open={open}
      onClose={onClose}
      title='플랜 업그레이드 '
      actions={
        <FooterActions>
          <SolidButton variant='secondary' onClick={onClose}>
            취소
          </SolidButton>
          <SolidButton
            leadingIcon={CardIcon}
            variant='primary'
            disabled={selectedId == null}
            onClick={handleConfirm}
          >
            업그레이드
          </SolidButton>
        </FooterActions>
      }
    >
      <Subtitle>플랜을 업그레이드하여 더 많은 토큰을 사용해보세요</Subtitle>
      {loading ? (
        <LoadingContainer>
          <LoadingText>플랜 정보를 불러오는 중...</LoadingText>
        </LoadingContainer>
      ) : (
        <Grid $businessLayout={purchaseType === 'BUSINESS'}>
          {sorted.map((p) => (
            <PlanCard
              key={p.id}
              $selected={selectedId === p.id}
              onClick={() => setSelectedId(p.id)}
            >
              <HeaderRow>
                <Thumb src={getPlanImage(p.name)} alt={p.name} />
                <TextCol>
                  <PlanTitle>{getPlanLabel(p.name)} 플랜</PlanTitle>
                  <PlanPrice>${p.price.toFixed(2)}/Seat</PlanPrice>
                </TextCol>
              </HeaderRow>
              <Divider style={{ margin: '12px 0' }} />
              <TokenRow>
                <TokenLabel>최대 토큰 수</TokenLabel>
                <TokenValue>{p.monthlyTokenLimit.toLocaleString()}</TokenValue>
              </TokenRow>
            </PlanCard>
          ))}
        </Grid>
      )}
    </Modal>
  );
}

function getPlanImage(name: PlanOption['name']) {
  switch (name) {
    case 'PLUS':
      return PlanPlusImage.src;
    case 'PRO':
      return PlanProImage.src;
    case 'MAX':
      return PlanMaxImage.src;
    default:
      return PlanBasicImage.src;
  }
}

function getPlanLabel(name: PlanOption['name']) {
  switch (name) {
    case 'BASIC':
      return 'Basic';
    case 'PLUS':
      return 'Plus';
    case 'PRO':
      return 'Pro';
    case 'MAX':
      return 'Max';
  }
}

const Subtitle = styled.p`
  ${typography(undefined, 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0 0 16px 0;
`;

const Grid = styled.div<{ $businessLayout: boolean }>`
  display: grid;
  grid-template-columns: ${(p) =>
    p.$businessLayout ? '1fr 1fr 1fr' : '1fr 1fr'};
  gap: 16px;
`;

const PlanCard = styled.div<{ $selected: boolean }>`
  border: 1px solid
    ${(p) =>
      p.$selected
        ? borderColor.light['color-border-focused']
        : color.gray['200']};
  background-color: ${(p) => (p.$selected ? color.gray['50'] : 'white')};
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Thumb = styled.img`
  width: 64px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
`;

const TextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlanTitle = styled.h4`
  ${typography(undefined, 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const PlanPrice = styled.div`
  ${typography(undefined, 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const TokenRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const TokenLabel = styled.div`
  ${typography(undefined, 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const TokenValue = styled.div`
  ${typography(undefined, 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const FooterActions = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: flex-end;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const LoadingText = styled.div`
  ${typography(undefined, 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;
