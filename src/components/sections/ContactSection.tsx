'use client';

import styled from 'styled-components';
import {
  typography,
  textColor,
  radius,
  color,
  borderColor,
  SolidButton,
} from '@cubig/design-system';

export default function ContactSection() {
  return (
    <ContactContainer>
      <ContactLeft>
        <ContactWrapper>
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
                <img src='/icons/company.svg' alt='company' />
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
                <img src='/icons/structure.svg' alt='structure' />
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
        </ContactWrapper>
      </ContactLeft>

      <ContactRight>
        <ContactForm>
          <FormField>
            <FormLabel>이름 *</FormLabel>
            <FormInput placeholder='이름을 입력해 주세요.' />
          </FormField>

          <FormField>
            <FormLabel>휴대전화번호 *</FormLabel>
            <FormInput placeholder='- 없이 숫자만 입력해 주세요.' />
          </FormField>

          <FormField>
            <FormLabel>업무용 메일 *</FormLabel>
            <FormInput placeholder='회사/소속기관명을 입력해 주세요.' />
          </FormField>

          <RowFormField>
            <FormField>
              <FormLabel>부서명</FormLabel>
              <FormInput placeholder='부서명을 입력해 주세요.' />
            </FormField>

            <FormField>
              <FormLabel>직함</FormLabel>
              <FormInput placeholder='직함을 입력해 주세요.' />
            </FormField>
          </RowFormField>

          <FormField>
            <FormLabel>해결하고 싶은 비즈니스 고민</FormLabel>
            <FormTextarea placeholder='문의 내용을 입력해주세요.' />
          </FormField>

          <ConsentSection>
            <ConsentItem>
              <ConsentCheckbox type='checkbox' id='required' />
              <ConsentLabel htmlFor='required'>
                (필수) 개인정보 수집 및 이용 동의
              </ConsentLabel>
            </ConsentItem>
            <ConsentItem>
              <ConsentCheckbox type='checkbox' id='optional' />
              <ConsentLabel htmlFor='optional'>
                (선택) 마케팅 정보 수신 동의
              </ConsentLabel>
            </ConsentItem>
          </ConsentSection>

          <SolidButton variant='primary' size='large' state='default'>
            도입 문의하기
          </SolidButton>
        </ContactForm>
      </ContactRight>
    </ContactContainer>
  );
}

const ContactContainer = styled.section`
  width: 1440px;
  display: flex;
  margin: 0 auto;
`;

const ContactLeft = styled.div`
  flex: 1;
  background-color: ${color.gray['950']};
  display: flex;
  align-items: center;
`;

const ContactRight = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactWrapper = styled.div`
  width: 100%;
  padding: 120px 80px;
  display: flex;
  flex-direction: column;
`;

const ContactHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 146px;
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

const ContactForm = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: #fff;
  padding: 60px 40px;
  border-radius: ${radius['rounded-2']};
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RowFormField = styled.div`
  display: flex;
  gap: 16px;

  > ${FormField} {
    flex: 1;
  }
`;

const FormLabel = styled.label`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};

  &:has(+ input[required])::after {
    content: ' *';
    color: #ef4444;
  }
`;

const FormInput = styled.input`
  padding: 12px 16px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: ${radius['rounded-1']};
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};

  &::placeholder {
    color: ${textColor.light['fg-neutral-alternative']};
  }

  &:focus {
    outline: none;
    border-color: ${color.gray['400']};
  }
`;

const FormTextarea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: ${radius['rounded-1']};
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};
  min-height: 120px;
  resize: vertical;

  &::placeholder {
    color: ${textColor.light['fg-neutral-alternative']};
  }

  &:focus {
    outline: none;
    border-color: ${color.gray['400']};
  }
`;

const ConsentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

const ConsentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ConsentCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${color.gray['400']};
`;

const ConsentLabel = styled.label`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};
  cursor: pointer;
`;
