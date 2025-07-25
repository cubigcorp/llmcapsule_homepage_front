'use client';

import styled from 'styled-components';
import {
  typography,
  textColor,
  color,
  radius,
  borderColor,
  SolidButton,
} from '@cubig/design-system';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function DocumentModal({
  isOpen,
  onClose,
  title,
  content,
}: DocumentModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon src='/icons/Icon_close.svg' alt='close' />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <ModalBodyInnerWrapper>
            <DocumentContent>{content}</DocumentContent>
          </ModalBodyInnerWrapper>
        </ModalBody>

        <ModalFooter>
          <SolidButton variant='primary' size='medium' onClick={onClose}>
            확인
          </SolidButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: #17171929;
  backdrop-filter: blur(2px);
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: ${radius['rounded-2']};
  width: 640px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 12px 24px;
`;

const ModalTitle = styled.h2`
  ${typography('ko', 'body3', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: ${radius['rounded-1']};
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${color.gray['100']};
  }
`;

const CloseIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const ModalBody = styled.div`
  padding: 12px 25px 12px 25px;
  flex: 1;
`;

const ModalBodyInnerWrapper = styled.div`
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: ${radius['rounded-2']};
  padding: 14px;
  display: flex;
  flex-direction: column;
`;

const DocumentContent = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0 0 24px 0;
  line-height: 1.6;
`;

const ModalFooter = styled.div`
  padding: 12px 24px 24px 24px;

  display: flex;
  justify-content: flex-end;
`;
