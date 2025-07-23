'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  typography,
  textColor,
  radius,
  color,
  borderColor,
  SolidButton,
  Badge,
  layerColor,
} from '@cubig/design-system';
import CourtIcon from '@/assets/icons/Icon_court.svg';
import MoneyIcon from '@/assets/icons/Icon_money.svg';
import HeartIcon from '@/assets/icons/Icon_heart.svg';
import CompareIcon from '@/assets/icons/Icon_compare.svg';
import FilterIcon from '@/assets/icons/Icon_tune.svg';
import FilterModal from '@/components/modals/FilterModal';

const categories = [
  {
    id: 'public',
    name: '공공기관',
    icon: CourtIcon,
    question:
      '김철수(010-1234-5678) 시민의 주민등록번호 123456-1234567로 민원 처리 요청서를 작성해줘',
    answer1:
      '[이름 A]([휴대전화번호 A]) 시민의 [개인식별번호 A]로 민원 처리 요청서를 작성해줘',
    answer2: '민원 처리 요청서',
  },
  {
    id: 'finance',
    name: '금융',
    icon: MoneyIcon,
    question:
      '이영희님(카드번호: 1234-5678-9012-3456)의 대출심사 보고서를 작성해줘',
    answer1:
      '고객 [이름 C]님(카드번호: [카드번호 C])의 대출심사 보고서를 작성해줘',
    answer2: '대출심사 보고서',
  },
  {
    id: 'medical',
    name: '의료',
    icon: HeartIcon,
    question:
      '박민수(생년월일: 1985.03.15, 연락처: 010-9876-5432)의 진료기록을 정리해줘',
    answer1:
      '[이름 D]([생년월일: [생년월일 D], 연락처: [연락처 D])의 진료기록을 정리해줘',
    answer2: '진료기록',
  },
  {
    id: 'education',
    name: '교육',
    icon: CompareIcon,
    question:
      '최수정(학번: 20240315, 부모연락처: 010-1111-2222)의 학습계획서를 작성해줘',
    answer1:
      '[이름 E](학번: [학번 E], 부모연락처: [연락처 E])의 학습계획서를 작성해줘',
    answer2: '학습계획서',
  },
];

export default function DemoSection() {
  const [activeCategory, setActiveCategory] = useState('public');
  const [activeAction, setActiveAction] = useState('anonymize');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // 타이핑 효과
  useEffect(() => {
    if (showAnswer && !isTyping) {
      const targetText =
        activeAction === 'anonymize'
          ? categories.find((cat) => cat.id === activeCategory)?.answer1 || ''
          : categories.find((cat) => cat.id === activeCategory)?.answer2 || '';

      setIsTyping(true);
      setDisplayedText('');

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < targetText.length) {
          setDisplayedText(targetText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [showAnswer, activeCategory, activeAction]);

  return (
    <DemoContainer>
      <DemoWrapper>
        <DemoHeader>
          <SectionTitle>Demo</SectionTitle>
          <DemoTitle>누구나 바로 활용할 수 있는 GPT</DemoTitle>
        </DemoHeader>

        <CategoryButtonsWrapper>
          {!hasInteracted && (
            <DemoSubtitle>메뉴를 선택해, 직접 사용해보세요!</DemoSubtitle>
          )}
          <CategoryButtons>
            {categories.map((category) => (
              <SolidButton
                key={category.id}
                variant='secondary'
                size='large'
                state={activeCategory === category.id ? 'focused' : 'default'}
                leadingIcon={category.icon}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveAction('anonymize');
                  setHasInteracted(true);
                  setShowAnswer(false);
                  setDisplayedText('');
                  setIsTyping(false);
                }}
              >
                {category.name}
              </SolidButton>
            ))}
          </CategoryButtons>
        </CategoryButtonsWrapper>

        <DemoCard>
          <QuestionSection>
            <QuestionHeader>질문</QuestionHeader>
            <QuestionBox>
              <FileDisplay>
                <FileLeftArea>
                  <FileIcon src='/icons/Icon_file.svg' alt='file' />
                </FileLeftArea>
                <FileRightArea>
                  <FileInfo>
                    <FileName>공공기관_고객민감정보.txt</FileName>
                    <FileType>TXT</FileType>
                  </FileInfo>
                  <RemoveButton>✕</RemoveButton>
                </FileRightArea>
              </FileDisplay>

              <QuestionArea>
                {categories.find((cat) => cat.id === activeCategory)?.question}
              </QuestionArea>

              <ActionButtons>
                <SlidingButtonWrapper>
                  <SlidingButton
                    active={activeAction === 'anonymize'}
                    onClick={() => {
                      setActiveAction('anonymize');
                      setShowAnswer(false);
                      setDisplayedText('');
                      setIsTyping(false);
                    }}
                  >
                    <ActionIcon
                      src='/icons/Icon_Anonymization.svg'
                      alt='anonymize'
                    />
                    정보 가리기
                  </SlidingButton>
                  <SlidingButton
                    active={activeAction === 'sync'}
                    onClick={() => {
                      setActiveAction('sync');
                      setShowAnswer(false);
                      setDisplayedText('');
                      setIsTyping(false);
                    }}
                  >
                    <ActionIcon src='/icons/Icon_sync-lock.svg' alt='sync' />
                    정보 바꾸기
                  </SlidingButton>
                </SlidingButtonWrapper>
                <SolidButton
                  variant='secondary'
                  size='medium'
                  state='default'
                  leadingIcon={FilterIcon}
                  onClick={() => setIsFilterModalOpen(true)}
                >
                  필터
                </SolidButton>
              </ActionButtons>
            </QuestionBox>
          </QuestionSection>

          <TransferButton>
            <TransferIcon src='/icons/arrows_outward.svg' alt='transfer' />
          </TransferButton>

          <AnswerSection>
            <AnswerHeader>
              <AnswerHeaderTitle>답변</AnswerHeaderTitle>
              <StyledBadge type='outline' variant='secondary' size='medium'>
                GPT-4o mini
              </StyledBadge>
            </AnswerHeader>
            <AnswerBox hasAnswer={showAnswer}>
              {displayedText}
              {isTyping && <TypingCursor>|</TypingCursor>}
            </AnswerBox>
          </AnswerSection>
        </DemoCard>

        <StyledSolidButton
          variant='primary'
          size='large'
          state='default'
          onClick={() => setShowAnswer(true)}
        >
          시작하기
        </StyledSolidButton>
        <DemoDescription>
          <DescriptionText>
            현실적인 업무 상황 속에서 LLM Capsule이 어떻게 작동하는지를
            확인해보세요. <br />
            민감정보 보호는 자동으로, GPT의 활용은 그대로 이어집니다.
          </DescriptionText>
        </DemoDescription>
      </DemoWrapper>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </DemoContainer>
  );
}

const DemoContainer = styled.section`
  width: 100%;
  display: flex;
  background-color: ${color.gray['50']};
  background-image: url('/images/Background Pattern.svg');
  background-repeat: repeat;
  background-size: auto;
`;

const DemoWrapper = styled.div`
  width: 1440px;
  padding: 120px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const DemoHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  width: fit-content;
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  border: 1px solid ${textColor.light['fg-neutral-primary']};
  padding: 2px 8px;
  border-radius: ${radius['rounded-1.5']};
  margin: 0;
`;

const DemoTitle = styled.h3`
  ${typography('ko', 'title4', 'semibold')}
  background: linear-gradient(90deg, #0F0F10 18.75%, #286DF8 54.33%, #0F0F10 83.17%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-align: center;
`;

const DemoSubtitle = styled.div`
  ${typography('ko', 'body2', 'medium')}
  color: #fff;
  background-color: ${color.gray['990']};
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: ${radius['rounded-2']};
  margin: 0;
  text-align: center;
  position: absolute;
  left: 10px;
  top: -33px;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 7%;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${color.gray['990']};
  }
`;

const CategoryButtonsWrapper = styled.div`
  position: relative;
  width: fit-content;
  margin-bottom: 16px;
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: 12px;
  background-color: #fff;
  padding: 8px;
  border-radius: 16px;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
`;

const DemoCard = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 360px;
  background-color: #fff;
  border-radius: 20px;
  padding: 16px;
  display: flex;
  align-items: stretch;
  margin-bottom: 40px;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
  position: relative;
  gap: 8px;
`;

const QuestionSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 200px;
  padding: 20px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: ${radius['rounded-3']};
`;

const QuestionHeader = styled.h4`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
`;

const AnswerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const AnswerHeaderTitle = styled.h4`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
`;

const FileDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: ${radius['rounded-2']};
  border: 1px solid ${borderColor.light['color-border-primary']};
`;

const FileLeftArea = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: ${layerColor.light['bg-layer-basement']};
  border-radius: ${radius['rounded-2']} 0 0 ${radius['rounded-2']};
  border-right: 1px solid ${borderColor.light['color-border-primary']};
`;

const FileRightArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 8px 12px;
`;

const FileIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const FileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FileName = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
`;

const FileType = styled.span`
  ${typography('ko', 'caption1', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const RemoveButton = styled.div`
  background: none;
  border: none;
  color: ${textColor.light['fg-neutral-alternative']};

  font-size: 16px;
  padding: 4px;
`;

const QuestionArea = styled.div`
  flex: 1;

  padding: 20px;
  background-color: ${color.gray['25']};

  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  line-height: 1.6;
  resize: none;
  outline: none;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
`;

const SlidingButtonWrapper = styled.div`
  display: flex;
  position: relative;
  background-color: ${color.gray['100']};
  border-radius: ${radius['rounded-2']};
  padding: 4px;
`;

const SlidingButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: ${({ active }) =>
    active ? `1px solid ${borderColor.light['color-border-primary']}` : 'none'};
  background-color: ${({ active }) => (active ? '#fff' : 'transparent')};
  color: ${({ active }) =>
    active
      ? textColor.light['fg-neutral-strong']
      : textColor.light['fg-neutral-alternative']};
  border-radius: ${radius['rounded-1']};
  cursor: pointer;
  z-index: 1;
`;

const StyledSolidButton = styled(SolidButton)`
  width: 456px;
  margin-bottom: 20px;
`;

const ActionIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const TransferButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  &:hover {
    background-color: #333;
  }
`;

const TransferIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const AnswerSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AnswerBox = styled.div<{ hasAnswer: boolean }>`
  flex: 1;
  min-height: 200px;
  padding: 20px;
  border: 1px solid
    ${({ hasAnswer }) =>
      hasAnswer
        ? borderColor.light['color-border-focused']
        : borderColor.light['color-border-primary']};
  border-radius: ${radius['rounded-3']};
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const DemoDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const DescriptionText = styled.p`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};

  text-align: center;
`;

const StyledBadge = styled(Badge)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const TypingCursor = styled.span`
  animation: blink 1s infinite;
  color: ${textColor.light['fg-neutral-primary']};

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`;
