'use client';

import { useState } from 'react';
import styled from 'styled-components';
import InfoIcon from '@/assets/icons/icon_info_small.svg';
import { formatDate } from '@/utils/date';
import { llmService } from '@/services/llm';
import {
  Modal,
  SolidButton,
  textColor,
  typography,
} from '@cubig/design-system';

interface CancelModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  planName?: string;
  planNumber?: string;
  nextBillingDate?: string;
  bundleId?: number;
}

export default function CancelModal({
  open,
  onClose,
  onConfirm,
  planName,
  planNumber,
  nextBillingDate,
  bundleId,
}: CancelModalProps) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!bundleId) {
      alert('번들 ID가 없습니다.');
      return;
    }

    setLoading(true);
    try {
      await llmService.cancelSubscription(bundleId);
      alert('구독이 성공적으로 취소되었습니다.');
      onConfirm();
    } catch (error) {
      console.error('구독 취소 실패:', error);
      alert('구독 취소에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title='구독취소 안내'
      actions={
        <Actions>
          <SolidButton
            variant='secondary'
            size='medium'
            onClick={onClose}
            disabled={loading}
          >
            닫기
          </SolidButton>
          <SolidButton
            variant='primary'
            size='medium'
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? '취소 중...' : '구독취소'}
          </SolidButton>
        </Actions>
      }
    >
      <Label>선택된 플랜</Label>
      <PlanBox>
        <PlanName>{planName || '-'}</PlanName>
        <PlanMeta>플랜 : {planNumber || '플랜 번호'}</PlanMeta>
      </PlanBox>

      <InfoBox>
        <InfoSvg as={InfoIcon} />
        <InfoText>
          구독을 취소하실 경우, 청구 기간이 종료되는
          <br />
          {nextBillingDate ? formatDate(nextBillingDate) : '다음 결제일'}
          까지 사용할 수 있습니다.
        </InfoText>
      </InfoBox>
    </Modal>
  );
}

const Label = styled.div`
  ${typography(undefined, 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-bottom: 8px;
`;

const PlanBox = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
`;

const PlanName = styled.div`
  ${typography(undefined, 'body3', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const PlanMeta = styled.div`
  ${typography(undefined, 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const InfoBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
`;

const InfoSvg = styled.div`
  height: 24px;
  padding-top: 2px;
`;

const InfoText = styled.p`
  ${typography(undefined, 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: flex-end;
`;
