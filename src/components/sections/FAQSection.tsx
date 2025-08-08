'use client';

import { useState } from 'react';
import styled from 'styled-components';
import {
  typography,
  textColor,
  radius,
  borderColor,
  color,
} from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';

const faqData = [
  {
    question: 'LLM Capsule은 어떤 기능을 제공하나요?',
    answer:
      '개인 또는 기업이나 공공기관의 민감 정보를 안전하게 보호하면서 LLM 서비스를 이용할 수 있는 프로그램입니다. ChatGPT 사용 전, 입력된 민감정보를 익명/가명화 처리하여 개인정보를 보호하고 기업 내부 정보 유출을 방지하면서 GenAI 서비스를 이용할 수 있기 때문에 안전한 방식으로 사용자의 생산성을 향상시킬 수 있습니다.',
  },
  {
    question: 'LLM Capsule에서 탐지되는 개인정보 유형은 무엇이 있나요?',
    answer:
      '이름, 나이, 연도, 전화번호, 주민등록번호, 계좌번호, 신용카드번호, 법인등록번호, 이메일 주소, 금액 등 총 18종의 주요 민감정보를 자동으로 탐지 및 가명화할 수 있습니다.',
  },
  {
    question:
      '산업별로 추가 필터(예: 보험사 고유 코드, 질병 코드 등) 확장 적용이 가능한가요?',
    answer:
      '네, 기본 18종 외에 고객사 요청에 따라 산업별 특화 데이터셋, 도메인별 코드, 업무별 민감정보도 추가 커스터마이징이 가능합니다.',
  },
  {
    question: '기존 시스템(전자결재, 업무 포털, DB등)과 연동이 가능한가요?',
    answer:
      '네 가능합니다. On-Premise 방식으로 API, 파일 업로드, 연동 등 다양한 방식으로 도입이 가능합니다.',
  },
  {
    question: '실제 처리속도와 대용량 문서도 적용에 문제가 없나요?',
    answer:
      '수만건 대용량 문서/메모도 빠른 속도로 비식별화가 가능하며, 시스템 환경에 맞춘 최적화가 가능합니다.',
  },
  {
    question:
      '실제 현장에서 문장 양식이 아니라 자유로운 메모, 상담 기록 등도 LLM Capsule에서 사용할 수 있나요?',
    answer:
      '표준 양식 뿐만 아니라, 비정형 문서도 자동 탐지 및 처리할 수 있습니다.',
  },
  {
    question: '비전문가도 쉽게 사용할 수 있나요?',
    answer:
      '관리자, 실무자, IT담당자 모두 쉽게 사용할 수 있는 직관적이고 편리한 UI/UX를 제공합니다.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQContainer>
      <FAQWrapper>
        <FAQHeader>
          <SectionTitle>FAQ</SectionTitle>
          <FAQTitle>자주 묻는 질문</FAQTitle>
        </FAQHeader>
        <FAQList>
          {faqData.map((faq, index) => (
            <FAQItem key={index}>
              <FAQContent>
                <FAQQuestion onClick={() => handleToggle(index)}>
                  {faq.question}
                </FAQQuestion>
                {openIndex === index && <FAQAnswer>{faq.answer}</FAQAnswer>}
              </FAQContent>
              <FAQIcon onClick={() => handleToggle(index)}>
                <img
                  src={
                    openIndex === index
                      ? getAssetPath('/icons/minus.svg')
                      : getAssetPath('/icons/plus.svg')
                  }
                  alt={openIndex === index ? 'minus' : 'plus'}
                />
              </FAQIcon>
            </FAQItem>
          ))}
        </FAQList>
      </FAQWrapper>
    </FAQContainer>
  );
}

const FAQContainer = styled.section`
  width: 100%;
  display: flex;
  background-color: ${color.gray['50']};
`;

const FAQWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 120px 80px;
  display: flex;
  flex-direction: column;
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

const FAQHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

const FAQTitle = styled.h3`
  ${typography('ko', 'title3', 'semibold')}
  margin: 0;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;

const FAQItem = styled.div`
  border-top: 1px solid ${borderColor.light['color-border-primary']};
  padding: 24px 40px;
  display: flex;
  align-items: flex-start;
  gap: 20px;

  &:last-child {
    border-bottom: 1px solid ${borderColor.light['color-border-primary']};
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    gap: 16px;
  }

  @media (max-width: 375px) {
    padding: 16px 12px;
    gap: 12px;
  }
`;

const FAQContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FAQQuestion = styled.div`
  ${typography('ko', 'heading1', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  cursor: pointer;
`;

const FAQIcon = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: center;

  img {
    width: 16px;
    height: 16px;
  }
`;

const FAQAnswer = styled.div`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  line-height: 1.6;
  width: 840px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
