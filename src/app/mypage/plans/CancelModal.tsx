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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('plans');
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!bundleId) {
      alert(t('cancelModal.alerts.noBundleId'));
      return;
    }

    setLoading(true);
    try {
      await llmService.cancelSubscription(bundleId);
      alert(t('cancelModal.alerts.success'));
      onConfirm();
    } catch (error) {
      console.error('구독 취소 실패:', error);
      alert(t('cancelModal.alerts.error'));
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('cancelModal.title')}
      actions={
        <Actions>
          <SolidButton
            variant='secondary'
            size='medium'
            onClick={onClose}
            disabled={loading}
          >
            {t('cancelModal.close')}
          </SolidButton>
          <SolidButton
            variant='primary'
            size='medium'
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? t('cancelModal.confirming') : t('cancelModal.confirm')}
          </SolidButton>
        </Actions>
      }
    >
      <Label>{t('cancelModal.selectedPlan')}</Label>
      <PlanBox>
        <PlanName>{planName || '-'}</PlanName>
        <PlanMeta>
          {t('cancelModal.planLabel')}
          {planNumber || t('cancelModal.planNumberLabel')}
        </PlanMeta>
      </PlanBox>

      <InfoBox>
        <InfoSvg as={InfoIcon} />
        <InfoText>
          {t('cancelModal.info', {
            date: nextBillingDate
              ? formatDate(nextBillingDate)
              : t('cancelModal.infoNextBilling'),
          })}
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
