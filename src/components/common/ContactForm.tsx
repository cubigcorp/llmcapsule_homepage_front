'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
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
import PrivacyConsentModal from '@/components/modals/PrivacyConsentModal';
import MarketingConsentModal from '@/components/modals/MarketingConsentModal';
import { validateEmail, validateContactNumber } from '@/utils/validation';
import { contactService } from '@/services/contact';
import { gtm } from '@/utils/gtm';

interface ContactFormProps {
  title?: string;
  showLogo?: boolean;
  className?: string;
}

export default function ContactFormComponent({
  title = '문의하기',
  showLogo = false,
  className,
}: ContactFormProps) {
  const { t } = useTranslation('auth');
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
    { label: t('contact.options.product'), value: 'product' },
    { label: t('contact.options.pricing'), value: 'pricing' },
    { label: t('contact.options.quote'), value: 'quote' },
    { label: t('contact.options.technical'), value: 'technical' },
    { label: t('contact.options.other'), value: 'other' },
  ] as const;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'email') {
      const result = validateEmail(value, false);
      setEmailError(result.message);
    }

    if (field === 'name') {
      if (value && value.trim().length < 2) {
        setNameError('2자 이상 입력해 주세요.');
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
      alert(t('contact.toast.required'));
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

      if (response.status === 200) {
        // GTM 이벤트 발동
        gtm.submitLead(formData.inquiryType);

        alert(t('contact.toast.success'));
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
        alert(t('contact.toast.fail'));
      }
    } catch (error) {
      console.error('문의 접수 오류:', error);
      alert(t('contact.toast.error'));
    }
  };

  const isSubmitButtonEnabled = () => {
    return (
      formData.email.trim() !== '' &&
      formData.name.trim() !== '' &&
      formData.contactNumber.trim() !== '' &&
      formData.inquiryType !== '' &&
      formData.inquiryContent.trim().length >= 2 &&
      formData.privacyAgreement &&
      !emailError &&
      !nameError &&
      !contactError
    );
  };

  return (
    <ContactFormContainer className={className}>
      {showLogo && (
        <LogoWrapper>
          <img src={'/icons/Logo.svg'} alt='Logo' width={32} height={32} />
        </LogoWrapper>
      )}

      <ContactForm>
        <ContactTitle>{t('contact.title')}</ContactTitle>

        <FormField>
          <TextField
            label={t('contact.email')}
            labelType='required'
            size='large'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={t('contact.placeholders.email')}
            description={emailError}
            status={emailError ? 'negative' : 'default'}
          />
        </FormField>

        <FormField>
          <TextField
            label={t('contact.nameOrg')}
            labelType='required'
            size='large'
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder={t('contact.placeholders.nameOrg')}
            description={nameError}
            status={nameError ? 'negative' : 'default'}
          />
        </FormField>

        <FormField>
          <TextField
            label={t('contact.phone')}
            labelType='required'
            size='large'
            value={formData.contactNumber}
            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
            placeholder={t('contact.placeholders.phone')}
            inputMode='numeric'
            pattern='[0-9]*'
            description={contactError}
            status={contactError ? 'negative' : 'default'}
          />
        </FormField>

        <FormField>
          <Dropdown
            label={t('contact.type')}
            labelType='required'
            size='large'
            value={formData.inquiryType}
            onChange={(value) => handleInputChange('inquiryType', value)}
            placeholder={t('contact.placeholders.type')}
            options={inquiryTypes}
          />
        </FormField>

        <FormField>
          <Label type='required'>{t('contact.content')}</Label>
          <div style={{ marginTop: '4px' }}>
            <Textarea
              value={formData.inquiryContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange('inquiryContent', e.target.value)
              }
              placeholder={t('contact.placeholders.content')}
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
              {t('contact.consent.requiredPrefix')}{' '}
              <AgreementLink onClick={handlePrivacyLinkClick}>
                {t('contact.consent.privacy')}
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
              {t('contact.consent.optionalPrefix')}{' '}
              <AgreementLink onClick={handleMarketingLinkClick}>
                {t('contact.consent.marketing')}
              </AgreementLink>
            </AgreementTextOptional>
          </AgreementItem>
        </AgreementSection>

        <SubmitButton
          size='large'
          onClick={handleSubmit}
          disabled={!isSubmitButtonEnabled()}
        >
          {t('contact.button.submit')}
        </SubmitButton>
      </ContactForm>

      <PrivacyConsentModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      <MarketingConsentModal
        isOpen={isMarketingModalOpen}
        onClose={() => setIsMarketingModalOpen(false)}
      />
    </ContactFormContainer>
  );
}

const ContactFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 10;
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
