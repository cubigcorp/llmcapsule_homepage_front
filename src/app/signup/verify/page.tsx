'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  SolidButton,
  TextButton,
  TextField,
  Checkbox,
  Dropdown,
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
import { countries } from '@/utils/countries';
import { validateContactNumber, validateCompany } from '@/utils/validation';
import PrivacyConsentModal from '@/components/modals/PrivacyConsentModal';
import MarketingConsentModal from '@/components/modals/MarketingConsentModal';

export default function SignupVerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // 토큰에서 이메일 추출 (실제로는 토큰 디코딩 또는 API 호출)
  const extractEmailFromToken = (token: string | null) => {
    // TODO: 실제 토큰에서 이메일 추출 로직
    // 임시로 하드코딩된 이메일 반환
    return 'user@example.com';
  };

  const [formData, setFormData] = useState({
    email: extractEmailFromToken(token),
    lastName: '',
    firstName: '',
    country: '',
    contactNumber: '',
    company: '',
  });

  const [contactError, setContactError] = useState('');
  const [contactTouched, setContactTouched] = useState(false);
  const [companyError, setCompanyError] = useState('');
  const [companyTouched, setCompanyTouched] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2분 (120초)
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);
  const [termsAgreement, setTermsAgreement] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isMarketingModalOpen, setIsMarketingModalOpen] = useState(false);

  const contactRegex = /^[0-9]{10,11}$/;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'contactNumber') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({ ...prev, contactNumber: numericValue }));
      const result = validateContactNumber(numericValue, false);
      setContactError(result.message);
    }

    if (field === 'company') {
      const result = validateCompany(value, false);
      setCompanyError(result.message);
    }
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field === 'termsAgreement') {
      setTermsAgreement(checked);
    } else if (field === 'marketingConsent') {
      setMarketingConsent(checked);
    }
  };

  const handlePrivacyLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPrivacyModalOpen(true);
  };

  const handleMarketingLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMarketingModalOpen(true);
  };

  const startTimer = () => {
    setTimeLeft(120);
    setIsTimerRunning(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const handleRequestVerification = () => {
    const result = validateContactNumber(formData.contactNumber, true);
    if (!result.isValid) {
      setContactError(result.message);
      return;
    }

    // TODO: 인증 요청 API 호출
    console.log('Request verification for:', formData.contactNumber);
    setIsVerificationSent(true);
    startTimer();
  };

  const handleVerifyCode = () => {
    if (!verificationCode) {
      alert('인증번호를 입력해 주세요.');
      return;
    }

    // TODO: 인증번호 확인 API 호출
    console.log('Verify code:', verificationCode);

    // 임시로 인증 완료 처리 (실제로는 API 응답에 따라 결정)
    setIsVerificationCompleted(true);
  };

  const handleResendCode = () => {
    if (timeLeft > 0) return; // 타이머가 실행 중이면 재발송 불가

    // TODO: 인증번호 재발송 API 호출
    console.log('Resend verification code for:', formData.contactNumber);
    startTimer();
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  const handleSignup = () => {
    // 연락처 유효성 검사
    const contactResult = validateContactNumber(formData.contactNumber, true);
    if (!contactResult.isValid) {
      setContactError(contactResult.message);
      return;
    }

    // TODO: 회원가입 API 호출
    console.log('Signup with data:', formData);

    // 임시로 성공 페이지로 이동 (실제로는 API 응답에 따라 결정)
    window.location.href = '/signup/success';

    // 실패 시: window.location.href = '/signup/fail';
  };

  // 인증요청 버튼 활성화 조건
  const isVerificationButtonEnabled = () => {
    return (
      formData.email.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.firstName.trim() !== '' &&
      formData.country !== '' &&
      formData.contactNumber.trim() !== '' &&
      !contactError
    );
  };

  // 회원가입 버튼 활성화 조건
  const isSignupButtonEnabled = () => {
    return (
      formData.email.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.firstName.trim() !== '' &&
      formData.country !== '' &&
      formData.contactNumber.trim() !== '' &&
      !contactError &&
      isVerificationSent &&
      verificationCode.trim() !== '' &&
      isVerificationCompleted &&
      termsAgreement
    );
  };

  return (
    <SignupContainer>
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
      <SignupWrapper>
        <SignupLeft>
          <SignupForm>
            <SignupTitle>회원가입</SignupTitle>

            <FormField>
              <TextField
                label='이메일'
                labelType='required'
                size='large'
                value={formData.email}
                placeholder='user@example.com'
                status='positive'
                disabled
              />
            </FormField>

            <FormField>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <TextField
                    label='성'
                    labelType='required'
                    size='large'
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange('lastName', e.target.value)
                    }
                    placeholder='예) 홍'
                    maxLength={50}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <TextField
                    label='이름'
                    labelType='required'
                    size='large'
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange('firstName', e.target.value)
                    }
                    placeholder='예) 길동'
                    maxLength={50}
                  />
                </div>
              </div>
            </FormField>

            <FormField>
              <Dropdown
                labelType='required'
                label='국가'
                size='large'
                value={formData.country}
                onChange={(value) => handleInputChange('country', value)}
                options={countries}
              />
            </FormField>

            <FormField>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <TextField
                    label='연락처'
                    labelType='required'
                    size='large'
                    value={formData.contactNumber}
                    onChange={(e) =>
                      handleInputChange('contactNumber', e.target.value)
                    }
                    onBlur={() => {
                      setContactTouched(true);
                      const result = validateContactNumber(
                        formData.contactNumber,
                        true
                      );
                      setContactError(result.message);
                    }}
                    placeholder='휴대폰 번호를 입력해 주세요.'
                    description={contactError}
                    status={contactError ? 'negative' : 'default'}
                    inputMode='numeric'
                    pattern='[0-9]*'
                  />
                </div>
                <div style={{ width: '95px', marginTop: '24px' }}>
                  <StyledVerificationButton
                    variant='primary'
                    size='large'
                    onClick={handleRequestVerification}
                    disabled={!isVerificationButtonEnabled()}
                  >
                    인증요청
                  </StyledVerificationButton>
                </div>
              </div>
            </FormField>

            {isVerificationSent && (
              <FormField>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <TextField
                      size='large'
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder='인증번호 입력'
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '8px',
                      }}
                    >
                      <ResendButton
                        onClick={handleResendCode}
                        disabled={isTimerRunning}
                      >
                        인증번호 재발송
                      </ResendButton>
                      {isTimerRunning && (
                        <TimerContainer>
                          <TimerText>
                            <Image
                              src={getAssetPath('/icons/Icon_history.svg')}
                              alt='Timer'
                              width={16}
                              height={16}
                            />
                            <TimeText>{formatTime(timeLeft)}</TimeText>
                            <RemainingText> 남음</RemainingText>
                          </TimerText>
                        </TimerContainer>
                      )}
                    </div>
                  </div>
                  <div style={{ width: '95px', marginTop: '0' }}>
                    <StyledVerificationButton
                      variant='secondary'
                      size='large'
                      onClick={handleVerifyCode}
                    >
                      확인
                    </StyledVerificationButton>
                  </div>
                </div>
              </FormField>
            )}

            <FormField>
              <TextField
                label='회사/소속기관명'
                size='large'
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                onBlur={() => {
                  setCompanyTouched(true);
                  const result = validateCompany(formData.company, true);
                  setCompanyError(result.message);
                }}
                placeholder='회사명을 입력해 주세요.'
                maxLength={50}
                description={companyError}
                status={companyError ? 'negative' : 'default'}
              />
            </FormField>

            <AgreementSection>
              <AgreementItem>
                <Checkbox
                  variant='primary'
                  state={termsAgreement ? 'checked' : 'unchecked'}
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
                  state={marketingConsent ? 'checked' : 'unchecked'}
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
              variant='primary'
              size='large'
              onClick={handleSignup}
              disabled={!isSignupButtonEnabled()}
            >
              회원가입
            </SignupButton>
          </SignupForm>
        </SignupLeft>

        <SignupRight>
          <CarouselSection />
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

const SignupLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 40px 40px 40px;

  @media (max-width: 1920px) {
    padding: 80px 40px 40px 40px;
  }

  @media (max-width: 1440px) {
    padding: 80px 40px 40px 40px;
  }

  @media (max-width: 768px) {
    padding: 60px 20px 20px 20px;
  }

  @media (max-width: 375px) {
    padding: 60px 16px 16px 16px;
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

const SignupForm = styled.div`
  width: 100%;
  max-width: 398px;
  display: flex;
  flex-direction: column;
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

const ResendButton = styled.button`
  background: none;
  border: none;
  color: ${textColor.light['fg-neutral-primary']};
  text-decoration: underline;
  cursor: pointer;
  ${typography('ko', 'body2', 'medium')}

  &:disabled {
    color: ${textColor.light['fg-neutral-disable']};
    cursor: not-allowed;
    text-decoration: none;
  }

  &:hover:not(:disabled) {
    color: ${textColor.light['fg-neutral-strong']};
  }
`;

const TimerText = styled.span`
  ${typography('ko', 'caption2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TimeText = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const RemainingText = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SignupButton = styled(SolidButton)`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledVerificationButton = styled(SolidButton)`
  width: 100%;
`;
