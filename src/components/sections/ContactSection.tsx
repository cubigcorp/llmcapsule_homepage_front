'use client';

import styled from 'styled-components';
import { typography, textColor, color, radius } from '@cubig/design-system';
import ContactFormComponent from '@/components/common/ContactForm';

export default function ContactSection() {
  return (
    <ContactContainer>
      <ContactWrapper>
        <ContactLeft>
          <ContactHeader>
            <SectionTitle>Contact</SectionTitle>
            <ContactTitle>알맞은 플랜을 찾고 계신가요?</ContactTitle>
            <ContactDescription>
              고객사의 니즈에 맞춘 LLM Capsule 도입 방안을 <br />
              안내해 드립니다.
            </ContactDescription>
          </ContactHeader>

          <ContactInfo>
            <InfoBlock>
              <InfoIcon>
                <img src={'/icons/company.svg'} alt='company' />
              </InfoIcon>
              <InfoContent>
                <InfoTitle>기업의 문의 내용에 따른 맞춤형 안내</InfoTitle>
                <InfoDivider />
                <InfoText>
                  문의하신 내용을 기반으로 담당자가 기업에 <br />
                  최적화된 정보를 제공해 드립니다.
                </InfoText>
              </InfoContent>
            </InfoBlock>
            <InfoBlock>
              <InfoIcon>
                <img src={'/icons/structure.svg'} alt='structure' />
              </InfoIcon>
              <InfoContent>
                <InfoTitle>LLM Capsule 제품에 대한 상세한 소개</InfoTitle>
                <InfoDivider />
                <InfoText>
                  LLM Capsule의 상세 기능 및 기술에 대한 <br />
                  소개서를 제공해 드립니다.
                </InfoText>
              </InfoContent>
            </InfoBlock>
          </ContactInfo>
        </ContactLeft>

        <ContactRight>
          <ContactFormComponent title='도입 문의하기' />
        </ContactRight>
      </ContactWrapper>
    </ContactContainer>
  );
}

const ContactContainer = styled.section`
  width: 100%;
  display: flex;
`;

const ContactLeft = styled.div`
  flex: 1;
  background-color: ${color.gray['950']};
  align-items: center;
  padding: 120px 80px;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 400px;
    padding: 60px 24px;
  }

  @media (max-width: 375px) {
    min-height: 300px;
    padding: 40px 16px;
  }
`;

const ContactRight = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 80px;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 500px;
    padding: 60px 24px;
  }

  @media (max-width: 375px) {
    min-height: 400px;
    padding: 40px 16px;
  }
`;

const ContactWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 146px;

  @media (max-width: 768px) {
    margin-bottom: 80px;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 375px) {
    margin-bottom: 60px;
  }
`;

const SectionTitle = styled.h2`
  width: fit-content;
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.dark['fg-neutral-strong']};
  border: 1px solid ${textColor.dark['fg-neutral-primary']};
  padding: 2px 8px;
  border-radius: ${radius['rounded-1.5']};
  margin: 0;
`;

const ContactTitle = styled.h3`
  ${typography('ko', 'title3', 'semibold')}
  color: ${color.common['100']};
  margin: 0;
`;

const ContactDescription = styled.p`
  ${typography('ko', 'heading1', 'regular')}
  color: ${color.gray['500']};
  margin: 0;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
  background-color: ${color.gray['925']};
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 24px;
    height: 24px;
    color: ${textColor.dark['fg-neutral-strong']};
  }
`;

const InfoTitle = styled.h4`
  ${typography('ko', 'heading1', 'medium')}
  color: ${textColor.dark['fg-neutral-primary']};
  margin: 0;
`;

const InfoText = styled.p`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.dark['fg-neutral-primary']};
  margin: 0;
  line-height: 1.6;
`;

const InfoDivider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${color.gray['800']};
  margin: 0;
`;
