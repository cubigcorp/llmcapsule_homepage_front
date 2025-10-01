'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Modal } from '@cubig/design-system';
import { typography, textColor } from '@cubig/design-system';

interface EmailConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function EmailConflictModal({
  isOpen,
  onClose,
}: EmailConflictModalProps) {
  const { t } = useTranslation('auth');

  return (
    <Modal
      size='x-small'
      open={isOpen}
      onClose={onClose}
      title={t('login.modal.emailConflict.title')}
      actions={<> </>}
    >
      <ModalContent>
        <ModalMessage>{t('login.modal.emailConflict.message')}</ModalMessage>
      </ModalContent>
    </Modal>
  );
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalMessage = styled.div`
  ${typography('ko', 'body1', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
`;
