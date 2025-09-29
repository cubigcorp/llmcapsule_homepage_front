'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  typography,
  textColor,
  radius,
  borderColor,
  color,
} from '@cubig/design-system';

export default function FAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = t('faq.items', { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <FAQContainer>
      <FAQWrapper>
        <FAQContent>
          <LeftSection>
            <SectionTitle>{t('faq.title')}</SectionTitle>
          </LeftSection>
          <RightSection>
            <FAQMainTitle>{t('faq.mainTitle')}</FAQMainTitle>
            <FAQList>
              {faqItems.map((faq, index) => (
                <FAQItem key={index}>
                  <FAQItemContent>
                    <FAQQuestion onClick={() => handleToggle(index)}>
                      {faq.question}
                    </FAQQuestion>
                    {openIndex === index && <FAQAnswer>{faq.answer}</FAQAnswer>}
                  </FAQItemContent>
                  <FAQIcon onClick={() => handleToggle(index)}>
                    <img
                      src={
                        openIndex === index
                          ? '/icons/minus.svg'
                          : '/icons/plus.svg'
                      }
                      alt={openIndex === index ? 'minus' : 'plus'}
                    />
                  </FAQIcon>
                </FAQItem>
              ))}
            </FAQList>
          </RightSection>
        </FAQContent>
      </FAQWrapper>
    </FAQContainer>
  );
}

const FAQContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${color.gray['50']};
`;

const FAQWrapper = styled.div`
  max-width: 1440px;
  padding: 80px 40px 160px 40px;
  display: flex;
  justify-content: center;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 80px 32px 160px 32px;
  }

  @media (max-width: 768px) {
    padding: 60px 33px 120px 33px;
  }

  @media (max-width: 375px) {
    padding: 40px 16px 80px 16px;
  }
`;

const FAQContent = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const LeftSection = styled.div`
  flex-shrink: 0;
  width: 240px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const RightSection = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  margin-top: 16px;
  ${typography(undefined, 'body3', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
`;

const FAQMainTitle = styled.h3`
  ${typography(undefined, 'title3', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0 0 40px 0;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FAQItem = styled.div`
  border-top: 1px solid ${textColor.light['fg-neutral-primary']};
  padding: 24px 0;
  display: flex;
  align-items: flex-start;
  gap: 20px;

  &:last-child {
    border-bottom: 1px solid ${textColor.light['fg-neutral-primary']};
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    gap: 16px;
  }

  @media (max-width: 375px) {
    padding: 16px 0;
    gap: 12px;
  }
`;

const FAQItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FAQQuestion = styled.div`
  ${typography(undefined, 'heading2', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  cursor: pointer;
`;

const FAQIcon = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 4px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const FAQAnswer = styled.div`
  ${typography(undefined, 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  line-height: 1.6;
  width: 100%;
`;
