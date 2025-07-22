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

const faqData = [
  {
    question: '상품 구성에 대해 설명해주세요.',
    answer: `LLM Capsule은 실시간 프롬프트 필터링, 문서 내 민감정보 탐지,
      컨텍스트 기반 정보 탐지, 독립적인 On-Premise 운영 등 4가지 핵심
      기능을 제공합니다. 제공되는 기능은 요금제에 따라 다르며, 기업의
      보안 요구사항에 맞춰 선택하실 수 있습니다.`,
  },
  {
    question: '과금 기준은 어떻게 되나요?',
    answer: '답변 준비중입니다.',
  },
  {
    question: '얼마나 잘 보호해줄 수 있나요?',
    answer: '답변 준비중입니다.',
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
                    openIndex === index ? '/icons/minus.svg' : '/icons/plus.svg'
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
  width: 1440px;
  padding: 120px 80px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const FAQHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
`;
