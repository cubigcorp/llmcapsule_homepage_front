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

interface MarketingConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MarketingConsentModal({
  isOpen,
  onClose,
}: MarketingConsentModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>마케팅 정보 수신 동의</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <ModalBody>
          <ModalBodyInnerWrapper>
            <ConsentText>
              주식회사 큐빅에서 제공하는 뉴스레터, 솔루션 정보 등 광고성 정보를
              받으시려면 마케팅 정보 이용에 동의해 주시기 바랍니다.
              <br />
              이용 항목: 이름, 휴대전화번호, 업무용 메일, 회사/소속기관명
              <br />
              수집 목적: 이메일을 통한 뉴스레터, 솔루션 정보, 신규 서비스 안내
              등 광고성 정보 제공
              <br />
              보유 및 이용기간: 마케팅 동의 철회 시까지 보유 및 이용
              <br />
              ※ 이용자는 contact@cubig.ai를 통해 수신동의를 변경(동의/철회)할 수
              있습니다.
              <br />
              <br />※ 이용자는 마케팅 정보 이용에 동의하지 않을 수 있으며, 동의
              여부와 관계없이 문의하기 서비스를 이용할 수 있습니다. 다만,
              동의하지 않을 경우 마케팅 정보 수신이 불가능함을 알려드립니다.
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
  background-color: #17171929;
  backdrop-filter: blur(2px);
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
  margin: 0 0 24px 0;
  line-height: 1.6;
`;

const ModalFooter = styled.div`
  padding: 12px 24px 24px 24px;

  display: flex;
  justify-content: flex-end;
`;
