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

interface PrivacyConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyConsentModal({
  isOpen,
  onClose,
}: PrivacyConsentModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>개인정보 수집 및 이용 동의</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <ModalBody>
          <ModalBodyInnerWrapper>
            <ConsentText>
              개인정보 수집 및 활용 목적, 수집 항목, 보유 및 이용 기간, 동의
              거부권 및 거부 시 불이익에 관하여 안내 드립니다.
              <br />
              <br />
              1. 수집 항목: 이름, 휴대전화번호, 업무용 메일, 회사/소속기관명
              <br />
              2. 수집 목적: 문의 응답 제공 및 문의 내역 관리, 기술 정보 전달
              등의 목적으로만 이용합니다.
              <br />
              3. 보유 및 이용기간: 문의 신청 후 동의 철회 시까지 보유
              <br />
              <span className='indent'>
                ※ 이용자는 제공된 개인정보의 이용을 거부하고자 할 때
                contact@cubig.ai를 통해 열람, 정정, 삭제를 요구할 수 있습니다.
              </span>
              <br />
              4.개인정보 파기: 이용자가 동의를 철회한 경우, 지체없이 해당
              개인정보를 파기합니다.
              <br />
              <span className='indent'>
                ※ 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수
                없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로
                분쇄하거나 소각하여 파기합니다.
              </span>
            </ConsentText>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
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
  font-size: 20px;
  color: ${textColor.light['fg-neutral-alternative']};
  cursor: pointer;
  padding: 4px;
  border-radius: ${radius['rounded-1']};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${color.gray['100']};
  }
`;

const ModalBody = styled.div`
  padding: 12px 25px 12px 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ModalBodyInnerWrapper = styled.div`
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: ${radius['rounded-2']};
  padding: 14px;
  display: flex;
  flex-direction: column;
`;

const ConsentText = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0;
  line-height: 1.6;

  .indent {
    margin-left: 20px;
  }
`;

const ModalFooter = styled.div`
  padding: 12px 24px 24px 24px;
  display: flex;
  justify-content: flex-end;
`;
