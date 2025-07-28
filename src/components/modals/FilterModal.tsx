'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import {
  typography,
  textColor,
  color,
  borderColor,
  radius,
  SolidButton,
  Chip,
} from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const basicItems = [
    {
      id: 'year',
      name: '연도',
      icon: (
        <FilterIcon src={getAssetPath('/icons/Icon_calendar.svg')} alt='연도' />
      ),
    },
    {
      id: 'phone',
      name: '전화번호',
      icon: (
        <FilterIcon src={getAssetPath('/icons/Icon_call.svg')} alt='전화번호' />
      ),
    },
    {
      id: 'age',
      name: '나이',
      icon: (
        <FilterIcon src={getAssetPath('/icons/Icon_profile.svg')} alt='나이' />
      ),
    },
    {
      id: 'name',
      name: '이름',
      icon: (
        <FilterIcon src={getAssetPath('/icons/Icon_profile.svg')} alt='이름' />
      ),
    },
    {
      id: 'birthdate',
      name: '연월일',
      icon: (
        <FilterIcon
          src={getAssetPath('/icons/Icon_calendar.svg')}
          alt='연월일'
        />
      ),
    },
    {
      id: 'residentNumber',
      name: '주민등록번호',
      icon: (
        <FilterIcon
          src={getAssetPath('/icons/Icon_badge.svg')}
          alt='주민등록번호'
        />
      ),
    },
    {
      id: 'alienNumber',
      name: '외국인등록번호',
      icon: (
        <FilterIcon
          src={getAssetPath('/icons/Icon_badge.svg')}
          alt='외국인등록번호'
        />
      ),
    },
    {
      id: 'driverLicense',
      name: '운전면허번호',
      icon: (
        <FilterIcon
          src={getAssetPath('/icons/Icon_car.svg')}
          alt='운전면허번호'
        />
      ),
    },
    {
      id: 'passport',
      name: '여권번호',
      icon: (
        <FilterIcon
          src={getAssetPath('/icons/Icon_badge.svg')}
          alt='여권번호'
        />
      ),
    },
  ];

  const selectableItems = [
    {
      id: 'accountNumber',
      name: '계좌번호',
      icon: (
        <FilterIcon
          src={getAssetPath('/icons/Icon_accunt.svg')}
          alt='계좌번호'
        />
      ),
    },
    {
      id: 'creditCard',
      name: '신용카드번호',
      icon: (
        <FilterIcon
          src={getAssetPath('/icons/Icon_card.svg')}
          alt='신용카드번호'
        />
      ),
    },
    {
      id: 'carNumber',
      name: '자동차번호',
      icon: (
        <FilterIcon
          src={getAssetPath('/icons/Icon_car.svg')}
          alt='자동차번호'
        />
      ),
    },
    {
      id: 'email',
      name: '이메일주소',
      icon: (
        <FilterIcon
          src={getAssetPath('/icons/Icon_mail.svg')}
          alt='이메일주소'
        />
      ),
    },
    {
      id: 'businessNumber',
      name: '사업자등록번호',
      icon: (
        <FilterIcon
          src={getAssetPath('/icons/Icon_badge.svg')}
          alt='사업자등록번호'
        />
      ),
    },
    {
      id: 'corporateNumber',
      name: '법인등록번호',
      icon: (
        <FilterIcon
          src={getAssetPath('/icons/Icon_badge.svg')}
          alt='법인등록번호'
        />
      ),
    },
    {
      id: 'amount',
      name: '금액',
      icon: (
        <FilterIcon src={getAssetPath('/icons/Icon_money.svg')} alt='금액' />
      ),
    },
    {
      id: 'height',
      name: 'Cm(신장)',
      icon: (
        <FilterIcon src={getAssetPath('/icons/Icon_height.svg')} alt='신장' />
      ),
    },
    {
      id: 'weight',
      name: 'Kg(몸무게)',
      icon: (
        <FilterIcon src={getAssetPath('/icons/Icon_weight.svg')} alt='몸무게' />
      ),
    },
  ];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>필터</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <ModalBody>
          <Section>
            <SectionTitle>기본 항목</SectionTitle>
            <FilterGrid>
              {basicItems.map((item) => (
                <Chip
                  key={item.id}
                  type='outline'
                  size='small'
                  state='focused'
                  leadingIcon={item.icon}
                >
                  {item.name}
                </Chip>
              ))}
            </FilterGrid>
          </Section>

          <Divider />

          <Section>
            <SectionTitle>선택 항목</SectionTitle>
            <FilterGrid>
              {selectableItems.map((item) => (
                <Chip
                  key={item.id}
                  type='outline'
                  size='small'
                  state='focused'
                  leadingIcon={item.icon}
                >
                  {item.name}
                </Chip>
              ))}
            </FilterGrid>
          </Section>
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
  background-color: #fff;
  border-radius: ${radius['rounded-3']};
  box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
  width: 640px;
  height: 470px;
  overflow: hidden;
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
  flex: 1;
  padding: 12px 25px 12px 25px;
  overflow-y: auto;
`;

const Section = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0 0 16px 0;
`;

const FilterGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  & > * {
    cursor: default !important;
  }
`;

const FilterIcon = styled.img`
  width: 14px;
  height: 14px;
  display: block;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${borderColor.light['color-border-primary']};
  margin: 24px 0;
`;

const ModalFooter = styled.div`
  padding: 12px 24px 24px 24px;
  display: flex;
  justify-content: flex-end;
`;
