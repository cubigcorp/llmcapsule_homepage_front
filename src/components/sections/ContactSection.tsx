'use client';

import styled from 'styled-components';
import { typography, textColor, color, radius } from '@cubig/design-system';
import ContactFormComponent from '@/components/common/ContactForm';

export default function ContactSection() {
  return (
    <ContactContainer id='contact-section'>
      <ContactOuterWrapper>
        <ContactInnerWrapper>
          <ContactLeft>
            <ContactTitle>Find the plan that fits your business</ContactTitle>

            <ContactInfo>
              <InfoBlock>
                <InfoIcon>
                  <img src={'/icons/company.svg'} alt='company' />
                </InfoIcon>
                <InfoContent>
                  <InfoTitle>
                    Request tailored guidance for your organization
                  </InfoTitle>
                </InfoContent>
              </InfoBlock>
              <InfoBlock>
                <InfoIcon>
                  <img src={'/icons/structure.svg'} alt='structure' />
                </InfoIcon>
                <InfoContent>
                  <InfoTitle>
                    Request detailed product information on LLM Capsule
                  </InfoTitle>
                </InfoContent>
              </InfoBlock>
            </ContactInfo>
          </ContactLeft>

          <ContactRight>
            <ContactFormComponent title='도입 문의하기' />
          </ContactRight>
        </ContactInnerWrapper>
      </ContactOuterWrapper>
    </ContactContainer>
  );
}

const ContactContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background-image: url('/images/bg-contact.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContactOuterWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 160px 240px;

  @media (min-width: 1920px) {
    max-width: 1920px;
    padding: 160px 320px;
  }

  @media (max-width: 1440px) {
    padding: 160px 40px;
  }

  @media (max-width: 1024px) {
    padding: 80px 80px;
  }

  @media (max-width: 768px) {
    padding: 60px 24px;
  }

  @media (max-width: 375px) {
    padding: 40px 16px;
  }
`;

const ContactInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 24px;
  background-color: ${color.gray['50']};
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactLeft = styled.div`
  width: 300px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    gap: 32px;
  }
`;

const ContactRight = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 24px;
  }
`;

const ContactTitle = styled.h3`
  ${typography(undefined, 'display1', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};

  margin: 24px 0 0 24px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: auto;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 40px;
  background-color: ${color.common['100']};
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 24px;
    height: 24px;
    color: ${textColor.light['fg-neutral-primary']};
  }
`;

const InfoTitle = styled.h4`
  ${typography(undefined, 'heading1', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;
