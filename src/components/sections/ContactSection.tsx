'use client';

import { useState } from 'react';
import styled from 'styled-components';
import {
  typography,
  textColor,
  radius,
  color,
  borderColor,
  SolidButton,
  TextField,
  Checkbox,
} from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';
import MarketingConsentModal from '@/components/modals/MarketingConsentModal';
import PrivacyConsentModal from '@/components/modals/PrivacyConsentModal';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    department: '',
    position: '',
    businessConcern: '',
    requiredConsent: false,
    marketingConsent: false,
  });

  const [isMarketingModalOpen, setIsMarketingModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  const handleMarketingConsentClick = () => {
    setIsMarketingModalOpen(true);
  };

  const handlePrivacyConsentClick = () => {
    setIsPrivacyModalOpen(true);
  };

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
                <img src={getAssetPath('/icons/company.svg')} alt='company' />
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
                <img
                  src={getAssetPath('/icons/structure.svg')}
                  alt='structure'
                />
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
          <TextField
            label='이름'
            labelType='required'
            size='large'
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder='이름을 입력해 주세요.'
          />

          <TextField
            label='휴대전화번호'
            labelType='required'
            size='large'
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder='- 없이 숫자만 입력해 주세요.'
          />

          <TextField
            label='업무용 메일'
            labelType='required'
            size='large'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder='업무용 메일을 입력해 주세요.'
          />

          <TextField
            label='회사/소속기관명'
            labelType='required'
            size='large'
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder='회사/소속기관명을 입력해 주세요.'
          />

          <RowFormField>
            <TextField
              label='부서명'
              size='large'
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              placeholder='부서명을 입력해 주세요.'
            />

            <TextField
              label='직함'
              size='large'
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              placeholder='직함을 입력해 주세요.'
            />
          </RowFormField>

          <FormField>
            <FormLabel>해결하고 싶은 비즈니스 고민</FormLabel>
            <FormTextarea
              placeholder='문의 내용을 입력해주세요.'
              value={formData.businessConcern}
              onChange={(e) =>
                handleInputChange('businessConcern', e.target.value)
              }
            />
          </FormField>

          <ConsentSection>
            <ConsentItem>
              <Checkbox
                id='required'
                variant='primary'
                state={formData.requiredConsent ? 'checked' : 'unchecked'}
                onChange={(checked) =>
                  handleCheckboxChange('requiredConsent', checked)
                }
              />
              <span style={{ textDecoration: 'none', color: 'inherit' }}>
                (필수)
              </span>
              <span
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={handlePrivacyConsentClick}
              >
                개인정보 수집 및 이용 동의
              </span>
            </ConsentItem>
            <ConsentItem>
              <Checkbox
                id='optional'
                variant='primary'
                state={formData.marketingConsent ? 'checked' : 'unchecked'}
                onChange={(checked) =>
                  handleCheckboxChange('marketingConsent', checked)
                }
              />
              <span
                style={{
                  textDecoration: 'none',
                  color: textColor.light['fg-neutral-alternative'],
                }}
              >
                (선택){' '}
              </span>
              <span
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={handleMarketingConsentClick}
              >
                마케팅 정보 수신 동의
              </span>
            </ConsentItem>
          </ConsentSection>

          <SolidButton variant='primary' size='large' state='default'>
            도입 문의하기
          </SolidButton>
        </ContactForm>
      </ContactRight>

      <MarketingConsentModal
        isOpen={isMarketingModalOpen}
        onClose={() => setIsMarketingModalOpen(false)}
      />
      <PrivacyConsentModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </ContactContainer>
  );
}

const ContactContainer = styled.section`
  width: 1440px;
  display: flex;
  margin: 0 auto;
`;

const ContactLeft = styled.div`
  width: 640px;
  background-color: ${color.gray['950']};
  display: flex;
  align-items: center;
`;

const ContactRight = styled.div`
  width: 800px;
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
  background-color: #fff;
  padding: 120px 80px;
  border-radius: ${radius['rounded-2']};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RowFormField = styled.div`
  display: flex;
  gap: 16px;

  > * {
    flex: 1;
  }
`;

const FormLabel = styled.label`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
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
    color: ${textColor.light['fg-neutral-assistive']} !important;
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
