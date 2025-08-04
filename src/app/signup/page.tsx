'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import {
  SolidButton,
  TextButton,
  TextField,
  Checkbox,
  IconButton,
} from '@cubig/design-system';
import {
  typography,
  textColor,
  color,
  radius,
  borderColor,
} from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';
import CarouselSection from '@/components/common/CarouselSection';
import EmailVerificationSection from '@/components/common/EmailVerificationSection';
import GoogleIcon from '@/assets/icons/Google.svg';
import PrivacyConsentModal from '@/components/modals/PrivacyConsentModal';
import MarketingConsentModal from '@/components/modals/MarketingConsentModal';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validation';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreement: false,
    marketingConsent: false,
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isEmailVerification, setIsEmailVerification] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isMarketingModalOpen, setIsMarketingModalOpen] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const slides = [
    {
      image: '/images/background_01.png',
      content: '/images/Content_1.svg',
      title: '실시간 프롬프트 필터링',
      description:
        '프롬프트 입력 시 이름, 연락처, 계좌번호 등 민감정보를 즉시 감지하고 자동 가명화하여 유출을 방지합니다. 사용자가 인식하지 못하는 사이에 모든 개인정보가 안전하게 보호됩니다.',
    },
    {
      image: '/images/background_03.png',
      content: '/images/Content_2.svg',
      title: '문서 내 민감정보 탐지',
      description:
        '업로드/첨부되는 각종 문서에서도 민감정보를 실시간으로 탐지하여 자동 가명화 또는 마스킹 처리합니다. AI가 대량의 문서 속 숨겨진 개인정보까지 놓치지 않고 안전하게 관리합니다.',
    },
    {
      image: '/images/background_02.png',
      content: '/images/Content_3.svg',
      title: '문맥 기반 정보 탐지',
      description:
        '단어 단위가 아닌, 문맥적 의미까지 AI가 이해하여 지능적으로 탐지합니다. 개인정보뿐만 아니라, 회사별/산업별 중요정보까지 보호할 수 있습니다.',
    },
    {
      image: '/images/background_03.png',
      content: '/images/Content_4.svg',
      title: 'ON-PREMISE 독립 운영',
      description:
        '외부 클라우드 없이 사내망 내에서 완전한 독립 설치가 가능하며, 더욱 더 안전한 이용이 가능합니다.  기업의 보안 정책에 완벽하게 부합하는 솔루션입니다.',
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'email') {
      const result = validateEmail(value, emailTouched);
      setEmailError(result.message);
    }

    if (field === 'password') {
      const result = validatePassword(value, passwordTouched);
      setPasswordError(result.message);
      // 비밀번호 변경 시 확인 비밀번호도 재검증 (터치된 경우에만)
      if (confirmPasswordTouched && formData.confirmPassword) {
        const confirmResult = validateConfirmPassword(
          formData.confirmPassword,
          value,
          true
        );
        setConfirmPasswordError(confirmResult.message);
      }
    }

    if (field === 'confirmPassword') {
      const result = validateConfirmPassword(
        value,
        formData.password,
        confirmPasswordTouched
      );
      setConfirmPasswordError(result.message);
    }
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  const handleGoogleSignup = () => {
    // 구글 회원가입 로직
    console.log('Google signup clicked');
  };

  const handleSignup = () => {
    // 이메일 유효성 검사
    const emailResult = validateEmail(formData.email, true);
    if (!emailResult.isValid) {
      setEmailError(emailResult.message);
      return;
    }

    // 비밀번호 유효성 검사
    const passwordResult = validatePassword(formData.password, true);
    if (!passwordResult.isValid) {
      setPasswordError(passwordResult.message);
      return;
    }

    // 비밀번호 확인 검사
    const confirmPasswordResult = validateConfirmPassword(
      formData.confirmPassword,
      formData.password,
      true
    );
    if (!confirmPasswordResult.isValid) {
      setConfirmPasswordError(confirmPasswordResult.message);
      return;
    }

    // 필수 약관 동의 검사
    if (!formData.termsAgreement) {
      alert('개인정보 수집·이용 및 이용 약관에 동의해 주세요.');
      return;
    }

    // 모든 유효성 검사 통과 시 이메일 인증 페이지로 변경
    setIsEmailVerification(true);
  };

  const handleResendEmail = () => {
    // TODO: 이메일 재발송 API 호출
    console.log('Resend email to:', formData.email);
  };

  const handlePrivacyLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPrivacyModalOpen(true);
  };

  const handleMarketingLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMarketingModalOpen(true);
  };

  return (
    <SignupContainer>
      <SignupWrapper>
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
        <SignupLeft $isEmailVerification={isEmailVerification}>
          <SignupForm $isEmailVerification={isEmailVerification}>
            {!isEmailVerification ? (
              <>
                <SignupTitle>회원가입</SignupTitle>

                <FormField>
                  <TextField
                    label='이메일'
                    labelType='required'
                    size='large'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => {
                      setEmailTouched(true);
                      const result = validateEmail(formData.email, true);
                      setEmailError(result.message);
                    }}
                    placeholder='email@example.com'
                    description={emailError}
                    status={emailError ? 'negative' : 'default'}
                  />
                </FormField>

                <FormField>
                  <TextField
                    label='비밀번호'
                    labelType='required'
                    size='large'
                    type='password'
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    onBlur={() => {
                      setPasswordTouched(true);
                      const result = validatePassword(formData.password, true);
                      setPasswordError(result.message);
                    }}
                    placeholder='비밀번호를 입력해주세요.'
                    description={passwordError}
                    status={passwordError ? 'negative' : 'default'}
                  />
                </FormField>

                <FormField>
                  <TextField
                    label='비밀번호 확인'
                    labelType='required'
                    size='large'
                    type='password'
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange('confirmPassword', e.target.value)
                    }
                    onBlur={() => {
                      setConfirmPasswordTouched(true);
                      const result = validateConfirmPassword(
                        formData.confirmPassword,
                        formData.password,
                        true
                      );
                      setConfirmPasswordError(result.message);
                    }}
                    placeholder='비밀번호를 다시 입력해주세요.'
                    description={confirmPasswordError}
                    status={confirmPasswordError ? 'negative' : 'default'}
                  />
                </FormField>

                <AgreementSection>
                  <AgreementItem>
                    <Checkbox
                      variant='primary'
                      state={formData.termsAgreement ? 'checked' : 'unchecked'}
                      onChange={(checked) =>
                        handleCheckboxChange('termsAgreement', checked)
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
                      state={
                        formData.marketingConsent ? 'checked' : 'unchecked'
                      }
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

                <SignupButton
                  size='large'
                  onClick={handleSignup}
                  disabled={
                    !formData.email.trim() ||
                    !formData.password.trim() ||
                    !formData.confirmPassword.trim() ||
                    !formData.termsAgreement
                  }
                >
                  계속하기
                </SignupButton>

                <Divider>
                  <DividerText>or</DividerText>
                </Divider>

                <StyledGoogleButton
                  variant='secondary'
                  size='large'
                  leadingIcon={GoogleIcon}
                  onClick={handleGoogleSignup}
                >
                  구글 계정으로 계속하기
                </StyledGoogleButton>
              </>
            ) : (
              <>
                <EmailVerificationSection
                  email={formData.email}
                  onResendEmail={handleResendEmail}
                />
              </>
            )}
          </SignupForm>
        </SignupLeft>

        <SignupRight>
          <CarouselSection slides={slides} />
        </SignupRight>
      </SignupWrapper>

      <PrivacyConsentModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      <MarketingConsentModal
        isOpen={isMarketingModalOpen}
        onClose={() => setIsMarketingModalOpen(false)}
      />
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
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

const SignupWrapper = styled.div`
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

const SignupLeft = styled.div<{ $isEmailVerification?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) =>
    props.$isEmailVerification
      ? '40px 40px 40px 40px'
      : '160px 40px 40px 40px'};

  @media (max-width: 1920px) {
    padding: ${(props) =>
      props.$isEmailVerification
        ? '40px 40px 40px 40px'
        : '160px 40px 40px 40px'};
  }

  @media (max-width: 1440px) {
    padding: ${(props) =>
      props.$isEmailVerification
        ? '40px 40px 40px 40px'
        : '160px 40px 40px 40px'};
  }

  @media (max-width: 768px) {
    padding: ${(props) =>
      props.$isEmailVerification
        ? '40px 20px 20px 20px'
        : '120px 20px 20px 20px'};
  }

  @media (max-width: 375px) {
    padding: ${(props) =>
      props.$isEmailVerification
        ? '40px 16px 16px 16px'
        : '100px 16px 16px 16px'};
  }
`;

const SignupRight = styled.div`
  flex: 1;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
    min-height: 300px;
    display: none;
  }

  @media (max-width: 375px) {
    padding: 12px;
    min-height: 250px;
  }
`;

const SvgWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${radius['rounded-5']};
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${radius['rounded-5']};
`;

const ContentOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 472px;
  height: 252px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
  z-index: 10;

  @media (max-width: 768px) {
    width: 320px;
    height: 170px;
  }

  @media (max-width: 375px) {
    width: 280px;
    height: 150px;
  }
`;

const NavigationButtons = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  display: flex;
  gap: 8px;
  z-index: 20;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }

  @media (max-width: 375px) {
    bottom: 16px;
    right: 16px;
  }
`;

const LeftArrowIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
  >
    <path
      d='M8.71182 9.99996L12.1062 13.3941C12.2215 13.5095 12.2805 13.6546 12.2833 13.8293C12.2859 14.0039 12.2269 14.1516 12.1062 14.2725C11.9854 14.3932 11.839 14.4535 11.667 14.4535C11.4951 14.4535 11.3487 14.3932 11.2279 14.2725L7.48266 10.5273C7.40474 10.4492 7.34974 10.3669 7.31766 10.2804C7.28557 10.1939 7.26953 10.1004 7.26953 9.99996C7.26953 9.89954 7.28557 9.80607 7.31766 9.71954C7.34974 9.63302 7.40474 9.55073 7.48266 9.47267L11.2279 5.72746C11.3433 5.61218 11.4884 5.55316 11.6631 5.55038C11.8377 5.54774 11.9854 5.60677 12.1062 5.72746C12.2269 5.84829 12.2872 5.99468 12.2872 6.16663C12.2872 6.33857 12.2269 6.48496 12.1062 6.6058L8.71182 9.99996Z'
      fill='white'
    />
  </svg>
);

const RightArrowIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
  >
    <path
      d='M10.7883 9.99993L7.39393 6.60576C7.27865 6.49035 7.21963 6.34528 7.21685 6.17055C7.21421 5.99597 7.27324 5.84826 7.39393 5.72743C7.51477 5.60673 7.66115 5.54639 7.8331 5.54639C8.00504 5.54639 8.15143 5.60673 8.27227 5.72743L12.0175 9.47264C12.0954 9.55069 12.1504 9.63298 12.1825 9.71951C12.2146 9.80604 12.2306 9.89951 12.2306 9.99993C12.2306 10.1003 12.2146 10.1938 12.1825 10.2803C12.1504 10.3669 12.0954 10.4492 12.0175 10.5272L8.27227 14.2724C8.15685 14.3877 8.01178 14.4467 7.83706 14.4495C7.66247 14.4522 7.51477 14.3931 7.39393 14.2724C7.27324 14.1516 7.21289 14.0052 7.21289 13.8333C7.21289 13.6613 7.27324 13.5149 7.39393 13.3941L10.7883 9.99993Z'
      fill='white'
    />
  </svg>
);

const TextContent = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  max-width: 368px;
  z-index: 20;

  @media (max-width: 768px) {
    bottom: 20px;
    left: 20px;
    max-width: 300px;
  }

  @media (max-width: 375px) {
    bottom: 16px;
    left: 16px;
    max-width: 250px;
  }
`;

const TextTitle = styled.h3`
  ${typography('ko', 'heading2', 'medium')}
  color: ${textColor.dark['fg-neutral-strong']};
  margin: 0 0 16px 0;
`;

const TextDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.dark['fg-neutral-primary']};
  margin: 0;
  line-height: 1.6;
`;

const SignupForm = styled.div<{ $isEmailVerification?: boolean }>`
  width: 100%;
  max-width: 398px;
  display: flex;
  flex-direction: ${(props) => (props.$isEmailVerification ? 'row' : 'column')};
  align-items: center;
  text-align: left;
  height: 100%;
`;

const SignupTitle = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  text-align: center;
  margin: 0;
  margin-bottom: 60px;
  color: ${textColor.light['fg-neutral-strong']};
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  width: 100%;
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

const SignupButton = styled(SolidButton)`
  width: 100%;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${borderColor.light['color-border-primary']};
  }
`;

const DividerText = styled.span`
  ${typography('ko', 'caption2', 'regular')}
  color: ${textColor.light['fg-neutral-assistive']};
  padding: 0 16px;
`;

const StyledGoogleButton = styled(SolidButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-top: 20px;
`;
