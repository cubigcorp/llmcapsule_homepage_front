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
import GoogleIcon from '@/assets/icons/Google.svg';

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

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

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

  const validateEmail = (email: string) => {
    if (!email) return '';
    if (!emailRegex.test(email)) {
      return '유효한 이메일을 입력해 주세요.';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return '';
    if (!passwordRegex.test(password)) {
      return '올바른 비밀번호를 입력해 주세요.';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) return '';
    if (confirmPassword !== formData.password) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'email') {
      setEmailError(validateEmail(value));
    }

    if (field === 'password') {
      setPasswordError(validatePassword(value));
      // 비밀번호 변경 시 확인 비밀번호도 재검증
      if (formData.confirmPassword) {
        setConfirmPasswordError(
          validateConfirmPassword(formData.confirmPassword)
        );
      }
    }

    if (field === 'confirmPassword') {
      setConfirmPasswordError(validateConfirmPassword(value));
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
    const emailValidationError = validateEmail(formData.email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    // 비밀번호 유효성 검사
    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    // 비밀번호 확인 검사
    const confirmPasswordValidationError = validateConfirmPassword(
      formData.confirmPassword
    );
    if (confirmPasswordValidationError) {
      setConfirmPasswordError(confirmPasswordValidationError);
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
    // 이메일 재발송 로직
    console.log('Resend email to:', formData.email);
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
                    placeholder='Email@example.com'
                    description={emailError}
                    status={emailError ? 'negative' : 'normal'}
                    descriptionStatus={emailError ? 'error' : 'default'}
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
                    placeholder='8~20자, 영문+숫자+특수문자'
                    description={passwordError}
                    status={passwordError ? 'negative' : 'normal'}
                    descriptionStatus={passwordError ? 'error' : 'default'}
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
                    placeholder='비밀번호를 다시 입력해주세요.'
                    description={confirmPasswordError}
                    status={confirmPasswordError ? 'negative' : 'normal'}
                    descriptionStatus={
                      confirmPasswordError ? 'error' : 'default'
                    }
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
                      <AgreementLink href='/terms'>
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
                      <AgreementLink href='/marketing'>
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
                <EmailVerificationWrapper>
                  <Image
                    src={getAssetPath('/icons/Icon_info.svg')}
                    alt='Info'
                    width={48}
                    height={48}
                  />
                  <Title>이메일을 확인해주세요</Title>
                  <Description>
                    계정 설정을 완료하려면 {formData.email}로 보낸 링크를
                    클릭해주세요.
                  </Description>
                  <ResendButton
                    variant='secondary'
                    size='small'
                    onClick={handleResendEmail}
                    leadingIcon={ResendIcon}
                  >
                    메일 재발송
                  </ResendButton>
                </EmailVerificationWrapper>
              </>
            )}
          </SignupForm>
        </SignupLeft>

        <SignupRight>
          <CarouselSection slides={slides} />
        </SignupRight>
      </SignupWrapper>
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
  flex-direction: column;
  align-items: ${(props) =>
    props.$isEmailVerification ? 'flex-start' : 'center'};
  text-align: left;
  justify-content: center;
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
  color: ${textColor.light['fg-neutral-strong']};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const SignupButton = styled(SolidButton)`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
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
`;

const Title = styled.h2`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
`;

const Description = styled.p`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const ResendButton = styled(SolidButton)``;

const EmailVerificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;

const ResendIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
  >
    <path
      d='M4.23385 7.99994C4.23385 8.15039 4.2443 8.30294 4.26519 8.45761C4.28619 8.61239 4.31208 8.76155 4.34285 8.90511C4.3633 9.01367 4.35047 9.12433 4.30435 9.23711C4.25824 9.34989 4.17874 9.42339 4.06585 9.45761C3.9573 9.4875 3.84941 9.47594 3.74219 9.42294C3.63497 9.36994 3.56552 9.28922 3.53385 9.18078C3.4783 8.99611 3.43663 8.80483 3.40885 8.60694C3.38108 8.40917 3.36719 8.20683 3.36719 7.99994C3.36719 6.7025 3.82447 5.59761 4.73902 4.68528C5.65358 3.77283 6.77408 3.33328 8.10052 3.36661H8.50435L7.68902 2.55128C7.59669 2.45894 7.54947 2.35678 7.54735 2.24478C7.54524 2.13289 7.59247 2.02861 7.68902 1.93194C7.78558 1.83539 7.88874 1.78711 7.99852 1.78711C8.10841 1.78711 8.21163 1.83539 8.30819 1.93194L9.80435 3.42811C9.9138 3.53755 9.96852 3.6615 9.96852 3.79994C9.96852 3.93839 9.9138 4.06233 9.80435 4.17178L8.30819 5.66794C8.21585 5.76017 8.11652 5.80461 8.01019 5.80128C7.90374 5.79783 7.80224 5.74783 7.70569 5.65128C7.60913 5.55461 7.56085 5.45139 7.56085 5.34161C7.56085 5.23183 7.60913 5.12861 7.70569 5.03194L8.50435 4.23328H8.10052C7.00908 4.21105 6.09174 4.5715 5.34852 5.31461C4.60541 6.05783 4.23385 6.95294 4.23385 7.99994ZM11.7672 7.99994C11.7672 7.8495 11.7567 7.69694 11.7359 7.54228C11.7149 7.3875 11.689 7.23833 11.6582 7.09478C11.6377 6.97511 11.6506 6.86167 11.6967 6.75444C11.7428 6.64722 11.8223 6.57094 11.9352 6.52561C12.0437 6.48461 12.1478 6.48783 12.2474 6.53528C12.3469 6.58272 12.4125 6.66067 12.444 6.76911C12.4996 6.96489 12.5451 7.1645 12.5807 7.36794C12.6161 7.57128 12.6339 7.78194 12.6339 7.99994C12.6339 9.28628 12.1766 10.3884 11.262 11.3063C10.3475 12.2243 9.22697 12.6666 7.90052 12.6333H7.49669L8.31202 13.4486C8.40435 13.5409 8.45158 13.6431 8.45369 13.7551C8.4558 13.867 8.40858 13.9713 8.31202 14.0679C8.21547 14.1645 8.1123 14.2128 8.00252 14.2128C7.89263 14.2128 7.78941 14.1645 7.69285 14.0679L6.19669 12.5718C6.08724 12.4623 6.03252 12.3384 6.03252 12.1999C6.03252 12.0615 6.08724 11.9376 6.19669 11.8281L7.69285 10.3319C7.78519 10.2397 7.8873 10.1925 7.99919 10.1903C8.11119 10.1882 8.21547 10.2354 8.31202 10.3319C8.40858 10.4286 8.45685 10.5318 8.45685 10.6416C8.45685 10.7514 8.40858 10.8546 8.31202 10.9513L7.49669 11.7666H7.90052C8.99197 11.7888 9.9093 11.4284 10.6525 10.6853C11.3956 9.94205 11.7672 9.04694 11.7672 7.99994Z'
      fill='#171719'
    />
  </svg>
);
