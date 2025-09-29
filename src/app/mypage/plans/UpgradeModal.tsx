'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Modal,
  SolidButton,
  textColor,
  color,
  typography,
} from '@cubig/design-system';
import PlanBasicImage from '@/assets/images/plan_basic.png';
import PlanPlusImage from '@/assets/images/plan_plus.png';
import PlanProImage from '@/assets/images/plan_pro.png';
import PlanMaxImage from '@/assets/images/plan_max.png';

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
  onClose: () => void;
  onUpgrade: (planId: number) => void;
}

import { llmService } from '@/services/llm';
import type { Plan } from '@/utils/api';

export default function UpgradeModal({
  open,
  currentPlanName,
  onClose,
  onUpgrade,
}: UpgradeModalProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [fetchedOptions, setFetchedOptions] = useState<PlanOption[]>([]);

  // fetch plans when opened (always from backend)
  useEffect(() => {
    const run = async () => {
      if (!open) return;
      try {
        const res = await llmService.getAllPlans();

        console.log('res', res);
        const plans: Plan[] = res.data || [];

        const nameMap = (n: string): PlanOption['name'] => {
          if (n === 'ENTERPRISE') return 'MAX';
          return (n as PlanOption['name']) || 'BASIC';
        };

        const normalized = plans
          .filter((p) =>
            ['BASIC', 'PLUS', 'PRO', 'ENTERPRISE'].includes(p.name)
          )
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
      } catch (_err) {
        setFetchedOptions([]);
      }
    };
    run();
  }, [open, currentPlanName]);

  const sorted = useMemo(
    () => fetchedOptions.slice().sort((a, b) => a.price - b.price),
    [fetchedOptions]
  );

  const handleConfirm = () => {
    if (selectedId != null) onUpgrade(selectedId);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title='플랜 업그레이드 '
      actions={
        <FooterActions>
          <SolidButton variant='secondary' onClick={onClose}>
            취소
          </SolidButton>
          <SolidButton
            variant='primary'
            disabled={selectedId == null}
            onClick={handleConfirm}
          >
            업그레이드
          </SolidButton>
        </FooterActions>
      }
      size='large'
    >
      <Subtitle>플랜을 업그레이드하여 더 많은 토큰을 사용해보세요</Subtitle>
      <Grid>
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
            <Divider />
            <TokenRow>
              <TokenLabel>최대 토큰 수</TokenLabel>
              <TokenValue>{p.monthlyTokenLimit.toLocaleString()}</TokenValue>
            </TokenRow>
          </PlanCard>
        ))}
      </Grid>
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const PlanCard = styled.div<{ $selected: boolean }>`
  border: 1px solid
    ${(p) =>
      p.$selected ? textColor.light['fg-neutral-primary'] : color.gray['200']};
  border-radius: 12px;
  background: white;
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
  ${typography(undefined, 'body1', 'bold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const PlanPrice = styled.div`
  ${typography(undefined, 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const Divider = styled.div`
  height: 1px;
  background: ${color.gray['200']};
`;

const TokenRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const TokenLabel = styled.div`
  ${typography(undefined, 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const TokenValue = styled.div`
  ${typography(undefined, 'title1', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const FooterActions = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: flex-end;
`;
