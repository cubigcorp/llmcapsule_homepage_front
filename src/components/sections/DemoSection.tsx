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
import DocumentModal from '@/components/modals/DocumentModal';
import { getAssetPath } from '@/utils/path';

const categories = [
  {
    id: 'public',
    name: '공공기관',
    icon: CourtIcon,
    question:
      '이 문서에 있는 개인정보(이름, 주민등록번호, 연락처 등)를 민원 접수용 요약 양식으로 변환해 주세요.',
    answer1:
      '네, 문서에 있는 개인정보를 민원 접수용 양식으로 변환해 드리겠습니다.\n민원인 성명: [이름 A]\n주민등록번호: [주민등록번호 A]\n연락처: [전화번호 A]\n이메일: [이메일 주소 A]\n민원 내용 요약: 건물 인허가 관련 민원 접수 요청',
    answer2:
      '네, 문서에 있는 개인정보를 민원 접수용 양식으로 변환해 드리겠습니다.\n민원인 성명: 홍길동\n주민등록번호: 132546-1136890\n연락처: 010-1111-0000\n이메일: gildong.hong@cubig.ai\n민원 내용 요약: 건물 인허가 관련 민원 접수 요청',
  },
  {
    id: 'finance',
    name: '금융',
    icon: MoneyIcon,
    question: '대출 승인 관련 주요 내용만 추려서 보고용으로 작성해 주세요.',
    answer1:
      '신청인: [이름 B]\n연락처: [전화번호 B]\n카드번호: [신용카드번호 B]\n주민등록번호: [주민등록번호 B]\n대출상품명: 신용대출\n대출신청금액: 2,000만원\n심사결과: 승인\n부가내용: 최근 3개월간 카드 사용내역 및 소득자료 제출 완료',
    answer2:
      '신청인: 홍길순\n연락처: 010-0102-0304\n카드번호: 1111-2222-3333-4444\n주민등록번호: 000123-1456789\n대출상품명: 신용대출\n대출신청금액: 2,000만원\n심사결과: 승인\n부가내용: 최근 3개월간 카드 사용내역 및 소득자료 제출 완료',
  },
  {
    id: 'medical',
    name: '의료',
    icon: HeartIcon,
    question: '오늘 내원했던 박민수 환자 최근 진료 이력과 진단명만 정리해줘요',
    answer1:
      '환자명: [이름 C]\n연락처: [전화번호 C]\n생년월일: [연월일 C]\n진료일자: [연월일 D]\n진단명: 뇌진탕\n진료과: 신경외과\n주요 증상: 두통, 어지럼증\n진료내용: 내원, CT 촬영 후 뇌진탕 진단. 입원 및 3일치 약 처방.',
    answer2:
      '환자명: 김길동\n연락처: 010-1234-5678\n생년월일: 1988-07-12\n진료일자: 2024-01-01\n진단명: 뇌진탕\n진료과: 신경외과\n주요 증상: 두통, 어지럼증\n진료내용: 내원, CT 촬영 후 뇌진탕 진단. 입원 및 3일치 약 처방.',
  },
  {
    id: 'education',
    name: '교육',
    icon: CompareIcon,
    question: '상담 기록 중 주요 요청사항 중심으로 간단히 요약해 주세요.',
    answer1:
      '학생명: [이름D]\n주요 요청사항: 학부모와 연락 필요, 최근 성적 변동 상담 희망',
    answer2:
      '학생명: 이영희\n주요 요청사항: 학부모와 연락 필요, 최근 성적 변동 상담 희망',
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
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

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
              <FileDisplayWrapper>
                {!hasInteracted && (
                  <DemoSubtitle>
                    클릭하면 원본 문서를 볼 수 있어요.
                  </DemoSubtitle>
                )}
                <FileDisplay
                  onClick={() => {
                    setIsDocumentModalOpen(true);
                    setHasInteracted(true);
                  }}
                >
                  <FileLeftArea>
                    <FileIcon
                      src={getAssetPath('/icons/Icon_file.svg')}
                      alt='file'
                    />
                  </FileLeftArea>
                  <FileRightArea>
                    <FileInfo>
                      <FileName>
                        {activeCategory === 'public'
                          ? '민원 처리 요청서(민감정보포함).txt'
                          : activeCategory === 'finance'
                            ? '대출심사 보고서(고객정보유).pdf'
                            : activeCategory === 'medical'
                              ? '진료기록(환자정보포함).docx'
                              : activeCategory === 'education'
                                ? '학생상담내용(학생정보있음).hwp'
                                : '민원 처리 요청서(민감정보포함).txt'}
                      </FileName>
                      <FileType>
                        {activeCategory === 'public'
                          ? 'TXT'
                          : activeCategory === 'finance'
                            ? 'PDF'
                            : activeCategory === 'medical'
                              ? 'DOCX'
                              : activeCategory === 'education'
                                ? 'HWP'
                                : 'TXT'}
                      </FileType>
                    </FileInfo>
                    <RemoveButton>
                      <RemoveIcon
                        src={getAssetPath('/icons/Icon_arrow_forward.svg')}
                        alt='remove'
                      />
                    </RemoveButton>
                  </FileRightArea>
                </FileDisplay>
              </FileDisplayWrapper>

              <QuestionArea>
                {categories.find((cat) => cat.id === activeCategory)?.question}
              </QuestionArea>

              <ActionButtons>
                <SlidingButtonWrapper>
                  <SlidingButton
                    $active={activeAction === 'anonymize'}
                    onClick={() => {
                      setActiveAction('anonymize');
                      setShowAnswer(false);
                      setDisplayedText('');
                      setIsTyping(false);
                    }}
                  >
                    <ActionIcon
                      src={getAssetPath('/icons/Icon_Anonymization.svg')}
                      alt='anonymize'
                    />
                    정보 가리기
                  </SlidingButton>
                  <SlidingButton
                    $active={activeAction === 'sync'}
                    onClick={() => {
                      setActiveAction('sync');
                      setShowAnswer(false);
                      setDisplayedText('');
                      setIsTyping(false);
                    }}
                  >
                    <ActionIcon
                      src={getAssetPath('/icons/Icon_sync-lock.svg')}
                      alt='sync'
                    />
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
            <TransferIcon
              src={getAssetPath('/icons/arrows_outward.svg')}
              alt='transfer'
            />
          </TransferButton>

          <AnswerSection>
            <AnswerHeader>
              <AnswerHeaderTitle>답변</AnswerHeaderTitle>
              <StyledBadge type='outline' variant='secondary' size='medium'>
                GPT-4o mini
              </StyledBadge>
            </AnswerHeader>
            <AnswerBox $hasAnswer={showAnswer}>
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
      <DocumentModal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        title={
          activeCategory === 'public'
            ? '민원 처리 요청서(민감정보포함).txt'
            : activeCategory === 'finance'
              ? '대출심사 보고서(고객정보유).pdf'
              : activeCategory === 'medical'
                ? '진료기록(환자정보포함).docx'
                : activeCategory === 'education'
                  ? '학생상담내용(학생정보있음).hwp'
                  : '민원 처리 요청서(민감정보포함).txt'
        }
        content={
          activeCategory === 'public'
            ? '김철수, 연락처 010-1234-5678, 주민번호 123456-1234567, 메일 chulsoo.kim@cubig.ai\n오늘 오전에 와서 건물 인허가 때문에 민원 접수함. 주소랑 추가 정보는 안 물어봄.\n상담 중에 담당자가 전화로도 안내드림. 본인 확인할 때 주민번호 뒷자리까지 직접 확인함.\n문의내용은 인허가 진행 절차랑 필요서류 문의임.'
            : activeCategory === 'finance'
              ? '이영희 고객님, 휴대폰번호 (010-5678-2345), 카드번호: 1234-5678-9012-3456, 주민등록번호: 881201-1234567, 대출신청금액: 2,000만원, 대출상품명: 신용대출, 심사결과: 승인, 부가내용: 최근 3개월간 카드 사용내역 및 소득 자료 제출 완료)'
              : activeCategory === 'medical'
                ? '오늘 오전 박민수(85년3월15일생, 010-0123-4567)씨 내원. 두통이랑 어지럼증 심하게 호소, 주소는 상도동인데 구체적번지 모름.\n아침부터 증상 있었다고 함. 진료실에서 신경외과 이지은 선생님이 CT 찍자고 해서 바로 촬영. 결과 뇌진탕 나옴.\n입원 결정, 약(진통제+혈관확장제) 3일 처방함. 보호자랑도 얘기함. 추가 소견 필요하면 연락달라고 안내함. 주민번호 뒷자리는 직접 안 물어봄.'
                : activeCategory === 'education'
                  ? '오늘 3학년 2반 김지수(010-7654-3210, 주민번호 060312-2345678, jisoo.kim@school.ac.kr) 학생 상담 진행함.\n최근 결석이 잦아서 학부모와 연락 필요하다고 메모 남김. 상담 중에 개인정보 확인 위해 주민번호랑 연락처 재확인.\n학생 주소는 따로 기록 안 함. 진로 희망은 의대 쪽이라고 했고, 최근 성적 변동 상담 요청함.'
                  : categories.find((cat) => cat.id === activeCategory)
                      ?.question || ''
        }
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
  width: 100%;
  max-width: 1440px;
  padding: 120px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  @media (min-width: 1920px) {
    max-width: 1920px;
    padding: 120px 120px;
  }

  @media (max-width: 1440px) {
    padding: 80px 24px;
  }

  @media (max-width: 768px) {
    padding: 60px 16px;
  }

  @media (max-width: 375px) {
    padding: 40px 12px;
  }
`;

const DemoHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  @media (max-width: 375px) {
    margin-bottom: 32px;
  }
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

const FileDisplayWrapper = styled.div`
  position: relative;
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
  top: -40px;
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const DemoCard = styled.div`
  width: 100%;
  max-width: 1018px;
  height: 360px;
  background-color: #fff;

  @media (max-width: 768px) {
    height: auto;
    min-height: 300px;
  }

  @media (max-width: 375px) {
    min-height: 250px;
  }
  border-radius: 20px;
  padding: 16px;
  display: flex;
  align-items: stretch;
  margin-bottom: 40px;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
  position: relative;
  gap: 16px;
`;

const QuestionSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const QuestionBox = styled.div`
  display: flex;
  width: 485px;
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
  border-radius: ${radius['rounded-2']};
  border: 1px solid ${borderColor.light['color-border-primary']};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${color.gray['50']};
  }
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
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const RemoveIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const QuestionArea = styled.div`
  flex: 1;
  padding: 20px;
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

const SlidingButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: ${({ $active }) =>
    $active
      ? `1px solid ${borderColor.light['color-border-primary']}`
      : 'none'};
  background-color: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  color: ${({ $active }) =>
    $active
      ? textColor.light['fg-neutral-strong']
      : textColor.light['fg-neutral-alternative']};
  border-radius: ${radius['rounded-2']};
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

const AnswerBox = styled.div<{ $hasAnswer: boolean }>`
  flex: 1;
  min-height: 200px;
  width: 485px;
  padding: 20px;
  border: 1px solid
    ${({ $hasAnswer }) =>
      $hasAnswer
        ? borderColor.light['color-border-focused']
        : borderColor.light['color-border-primary']};
  border-radius: ${radius['rounded-3']};
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  white-space: pre-line;
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
