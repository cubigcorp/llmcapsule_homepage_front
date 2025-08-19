'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import {
  SolidButton,
  TextField,
  Checkbox,
  Dropdown,
  Label,
} from '@cubig/design-system';
import {
  typography,
  textColor,
  radius,
  borderColor,
} from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';
import CarouselSection from '@/components/common/CarouselSection';
import PrivacyConsentModal from '@/components/modals/PrivacyConsentModal';
import MarketingConsentModal from '@/components/modals/MarketingConsentModal';
import { validateEmail, validateContactNumber } from '@/utils/validation';
import { contactService } from '@/services/contact';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    contactNumber: '',
    inquiryType: '',
    inquiryContent: '',
    privacyAgreement: false,
    marketingConsent: false,
  });

  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [contactError, setContactError] = useState('');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isMarketingModalOpen, setIsMarketingModalOpen] = useState(false);

  const inquiryTypes = [
    { label: '제품 문의', value: 'product' },
    { label: '가격 문의', value: 'pricing' },
    { label: '견적 요청', value: 'quote' },
    { label: '기술 지원', value: 'technical' },
    { label: '기타', value: 'other' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'email') {
      const result = validateEmail(value, false);
      setEmailError(result.message);
    }

    if (field === 'name') {
      if (value && value.trim().length < 2) {
        setNameError('이름/소속을 2자 이상 입력해 주세요.');
      } else {
        setNameError('');
      }
    }

    if (field === 'contactNumber') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({ ...prev, contactNumber: numericValue }));
      const result = validateContactNumber(numericValue, false);
      setContactError(result.message);
    }
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  const handlePrivacyLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPrivacyModalOpen(true);
  };

  const handleMarketingLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMarketingModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!isSubmitButtonEnabled()) {
      alert('모든 필수 항목을 입력하고 동의해 주세요.');
      return;
    }

    try {
      const contactData = {
        email: formData.email,
        name_or_organization: formData.name,
        phone: formData.contactNumber,
        contact_type: formData.inquiryType,
        content: formData.inquiryContent,
        consent_personal_info: formData.privacyAgreement,
        consent_marketing: formData.marketingConsent,
        service_name: 'cubig-auth',
      };

      const response = await contactService.sendContact(contactData);

      if (response.success) {
        alert('문의가 성공적으로 접수되었습니다.');
        // 폼 초기화
        setFormData({
          email: '',
          name: '',
          contactNumber: '',
          inquiryType: '',
          inquiryContent: '',
          privacyAgreement: false,
          marketingConsent: false,
        });
      } else {
        alert('문의 접수에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('문의 접수 오류:', error);
      alert('문의 접수 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const isSubmitButtonEnabled = () => {
    return (
      formData.email.trim() !== '' &&
      formData.name.trim() !== '' &&
      formData.contactNumber.trim() !== '' &&
      formData.inquiryType !== '' &&
      formData.inquiryContent.trim().length >= 10 &&
      formData.privacyAgreement &&
      !emailError &&
      !nameError &&
      !contactError
    );
  };

  return (
    <ContactContainer>
      <ContactWrapper>
        <LogoWrapper>
          <Link href='/'>
            <Image
              src={getAssetPath('/icons/Logo.svg')}
              alt='Logo'
              width={32}
              height={32}
            />
          </Link>
        </LogoWrapper>
        <ContactLeft>
          <ContactForm>
            <ContactTitle>문의하기</ContactTitle>

            <FormField>
              <TextField
                label='이메일'
                labelType='required'
                size='large'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder='Email@example.com'
                description={emailError}
                status={emailError ? 'negative' : 'default'}
              />
            </FormField>

            <FormField>
              <TextField
                label='이름/소속'
                labelType='required'
                size='large'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder='이름 혹은 소속을 입력해주세요.'
                description={nameError}
                status={nameError ? 'negative' : 'default'}
              />
            </FormField>

            <FormField>
              <TextField
                label='연락처'
                labelType='required'
                size='large'
                value={formData.contactNumber}
                onChange={(e) =>
                  handleInputChange('contactNumber', e.target.value)
                }
                placeholder="'-' 없이 입력해 주세요."
                inputMode='numeric'
                pattern='[0-9]*'
                description={contactError}
                status={contactError ? 'negative' : 'default'}
              />
            </FormField>

            <FormField>
              <Dropdown
                label='문의 유형'
                labelType='required'
                size='large'
                value={formData.inquiryType}
                onChange={(value) => handleInputChange('inquiryType', value)}
                placeholder='선택해주세요.'
                options={inquiryTypes}
              />
            </FormField>

            <FormField>
              <Label type='required'>문의 내용</Label>
              <div style={{ marginTop: '4px' }}>
                <Textarea
                  value={formData.inquiryContent}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleInputChange('inquiryContent', e.target.value)
                  }
                  placeholder='문의하실 내용을 입력해주세요. (10자 이상)'
                  rows={4}
                />
              </div>
            </FormField>

            <AgreementSection>
              <AgreementItem>
                <Checkbox
                  variant='primary'
                  state={formData.privacyAgreement ? 'checked' : 'unchecked'}
                  onChange={(checked) =>
                    handleCheckboxChange('privacyAgreement', checked)
                  }
                />
                <AgreementText>
                  (필수){' '}
                  <AgreementLink onClick={handlePrivacyLinkClick}>
                    개인정보 수집·이용 및 이용 약관에 동의합니다.
                  </AgreementLink>
                </AgreementText>
              </AgreementItem>
              <AgreementItem>
                <Checkbox
                  variant='primary'
                  state={formData.marketingConsent ? 'checked' : 'unchecked'}
                  onChange={(checked) =>
                    handleCheckboxChange('marketingConsent', checked)
                  }
                />
                <AgreementTextOptional>
                  (선택){' '}
                  <AgreementLink onClick={handleMarketingLinkClick}>
                    마케팅 정보 수신 동의
                  </AgreementLink>
                </AgreementTextOptional>
              </AgreementItem>
            </AgreementSection>

            <SubmitButton
              size='large'
              onClick={handleSubmit}
              disabled={!isSubmitButtonEnabled()}
            >
              문의하기
            </SubmitButton>
          </ContactForm>
        </ContactLeft>

        <ContactRight>
          <CarouselSection />
        </ContactRight>
      </ContactWrapper>

      <PrivacyConsentModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      <MarketingConsentModal
        isOpen={isMarketingModalOpen}
        onClose={() => setIsMarketingModalOpen(false)}
      />
    </ContactContainer>
  );
}

const ContactContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  z-index: 10;
`;

const ContactWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: 1920px) {
    max-width: 1920px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContactForm = styled.div`
  width: 100%;
  max-width: 398px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
`;

const ContactTitle = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0 0 60px 0;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 0 40px 0;
  }

  @media (max-width: 375px) {
    margin: 0 0 32px 0;
  }
`;

const FormField = styled.div`
  width: 100%;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 32px;
  }
`;

const Textarea = styled.textarea`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};

  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: ${radius['rounded-2']};
  padding: 12px 16px;
  width: 100%;
  height: 96px;
  resize: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${textColor.light['fg-neutral-assistive']};
  }
  &:focus {
    outline: none;
    border: 1.6px solid ${borderColor.light['color-border-focused']};
  }
`;

const AgreementSection = styled.div`
  margin-bottom: 32px;
  width: 100%;
`;

const AgreementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AgreementText = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};
`;

const AgreementTextOptional = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const AgreementLink = styled.a`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${textColor.light['fg-neutral-primary']};
  }
`;

const SubmitButton = styled(SolidButton)`
  width: 100%;
`;
