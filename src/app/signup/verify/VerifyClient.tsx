'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import SignupLoading from '@/components/common/SignupLoading';
import {
  SolidButton,
  TextField,
  Dropdown,
  Checkbox,
  toast,
} from '@cubig/design-system';
import { typography, textColor } from '@cubig/design-system';
import CarouselSection from '@/components/common/CarouselSection';
import { getCountries } from '@/utils/countries';
import {
  validateEmail,
  validateContactNumber,
  validateCompany,
} from '@/utils/validation';
import { authService } from '@/services/auth';
import { otpService } from '@/services/otp';
import { env } from '@/utils/env';
import PrivacyConsentModal from '@/components/modals/PrivacyConsentModal';
import MarketingConsentModal from '@/components/modals/MarketingConsentModal';
import { useTranslation } from 'react-i18next';

export default function VerifyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation('auth');

  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';
  const google = searchParams.get('google') || '';
  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';
  const sub = searchParams.get('sub') || '';

  const isGoogleSignup = google === 'true';
  const countries = getCountries(i18n.language);

  const [formData, setFormData] = useState({
    email: email ?? '',
    lastName: lastName ?? '',
    firstName: firstName ?? '',
    country: '',
    contactNumber: '',
    company: '',
    password: '',
    confirmPassword: '',
  });

  const [contactError, setContactError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);
  const [termsAgreement, setTermsAgreement] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isMarketingModalOpen, setIsMarketingModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [countryError, setCountryError] = useState('');
  const [isTokenValidating, setIsTokenValidating] = useState(true);

  // 토큰 검증
  useEffect(() => {
    const validateToken = async () => {
      if (isGoogleSignup) {
        // 구글 회원가입인 경우 토큰으로 이메일 정보 가져오기
        if (token) {
          try {
            const userInfoResponse = await fetch(
              `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`
            );
            const userInfo = await userInfoResponse.json();

            // 폼 데이터에 구글 정보 설정
            setFormData((prev) => ({
              ...prev,
              email: userInfo.email || email,
              firstName: userInfo.given_name || firstName,
              lastName: userInfo.family_name || lastName,
            }));
          } catch (error) {
            console.error('Failed to fetch Google user info:', error);
          }
        }
        setIsTokenValidating(false);
        return;
      }

      if (!token && email) {
        setIsTokenValidating(false);
        return;
      }

      if (!token) {
        const params = new URLSearchParams();
        if (email) params.append('email', email);
        router.push(`/signup/invalid-token?${params.toString()}`);
        return;
      }

      try {
        const response = await authService.checkEmailToken(token);

        if (!response.data?.is_valid) {
          const params = new URLSearchParams();
          if (email) params.append('email', email);
          router.push(`/signup/invalid-token?${params.toString()}`);
          return;
        }

        setIsTokenValidating(false);
      } catch (error) {
        console.error('Token validation error:', error);
        const params = new URLSearchParams();
        if (email) params.append('email', email);
        router.push(`/signup/invalid-token?${params.toString()}`);
      }
    };

    validateToken();
  }, [token, email, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'contactNumber') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({ ...prev, contactNumber: numericValue }));
      const result = validateContactNumber(numericValue, false);
      setContactError(result.message);
    }
  };

  const handleFirstNameBlur = () => {
    if (!formData.firstName.trim()) {
      setFirstNameError('이름을 입력해 주세요.');
    } else {
      setFirstNameError('');
    }
  };

  const handleLastNameBlur = () => {
    if (!formData.lastName.trim()) {
      setLastNameError('성을 입력해 주세요.');
    } else {
      setLastNameError('');
    }
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, country: value }));
    const country = countries.find((c) => c.value === value);
    if (country) {
      setSelectedCountry(country);
      setCountryError('');
    } else {
      setSelectedCountry(null);
    }
  };

  const extractCountryCode = (countryValue: string): string => {
    const match = countryValue.match(/\+(\d+)/);
    return match ? match[1] : '';
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field === 'termsAgreement') setTermsAgreement(checked);
    else if (field === 'marketingConsent') setMarketingConsent(checked);
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
    setVerificationError('');
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
            setVerificationError(
              '인증 시간이 만료되었습니다. 다시 시도해 주세요.'
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const handleRequestVerification = async () => {
    const result = validateContactNumber(formData.contactNumber, true);
    if (!result.isValid) {
      setContactError(result.message);
      return;
    }
    if (!selectedCountry) {
      setCountryError('국가를 선택해주세요.');
      return;
    }

    try {
      const phoneCheckResponse = await authService.checkPhone(
        formData.contactNumber
      );
      if (phoneCheckResponse.data && !phoneCheckResponse.data.is_available) {
        setContactError('이미 등록된 휴대폰 번호입니다.');
        return;
      }
    } catch (error) {
      console.error('Phone check error:', error);
      return;
    }

    setFirstNameError('');
    setLastNameError('');
    setContactError('');
    setCountryError('');

    try {
      const response = await otpService.sendOtp(
        {
          phone: formData.contactNumber,
          country_code: extractCountryCode(selectedCountry.value),
          otp_type: 'phone',
          service_name: 'cubig-auth',
        },
        env.OTP_API_KEY
      );
      if (response.success) {
        setIsVerificationSent(true);
        startTimer();
      } else {
        alert('인증번호 전송에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch {
      alert('인증번호 전송에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setVerificationError('인증번호를 입력해 주세요.');
      return;
    }

    setVerificationError('');

    try {
      const response = await otpService.verifyOtp(
        {
          phone: formData.contactNumber,
          otp_type: 'phone',
          otp: verificationCode,
        },
        env.OTP_API_KEY
      );
      if (response.success) {
        setIsVerificationCompleted(true);
        setIsTimerRunning(false);
        setVerificationError('');
      } else {
        setVerificationError('인증번호가 일치하지 않습니다.');
      }
    } catch {
      setVerificationError('인증번호가 일치하지 않습니다.');
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await otpService.sendOtp(
        {
          phone: formData.contactNumber,
          country_code: extractCountryCode(selectedCountry!.value),
          otp_type: 'phone',
          service_name: 'cubig-auth',
        },
        env.OTP_API_KEY
      );
      if (response.success) {
        startTimer();
        toast.success('인증번호를 재발송하였습니다.');
      } else {
        alert('인증번호 재발송에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch {
      alert('인증번호 재발송에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleSignup = async () => {
    if (!formData.firstName.trim()) {
      setFirstNameError('이름을 입력해 주세요.');
      return;
    }
    if (!formData.lastName.trim()) {
      setLastNameError('성을 입력해 주세요.');
      return;
    }
    if (!formData.email.trim()) return alert('이메일을 입력해주세요.');
    if (!formData.contactNumber.trim()) {
      setContactError('휴대폰 번호를 입력해주세요.');
      return;
    }
    if (!selectedCountry) {
      setCountryError('국가를 선택해주세요.');
      return;
    }
    if (!termsAgreement) return alert('필수 약관에 동의해주세요.');

    const emailResult = validateEmail(formData.email, true);
    if (!emailResult.isValid) return alert(emailResult.message);

    const contactResult = validateContactNumber(formData.contactNumber, true);
    if (!contactResult.isValid) {
      setContactError(contactResult.message);
      return;
    }

    try {
      const phoneCheckResponse = await authService.checkPhone(
        formData.contactNumber
      );
      if (phoneCheckResponse.data && !phoneCheckResponse.data.is_available) {
        setContactError('이미 등록된 휴대폰 번호입니다.');
        return;
      }
    } catch (error) {
      console.error('Phone check error:', error);
      return;
    }

    setFirstNameError('');
    setLastNameError('');
    setContactError('');
    setCompanyError('');
    setCountryError('');

    try {
      let response;
      if (isGoogleSignup) {
        const signupData = {
          sub: sub ?? '',
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.contactNumber,
          phone_country_code: extractCountryCode(selectedCountry.value),
          organization_name: formData.company,
          consent_marketing: marketingConsent,
        };
        response = await authService.signupGoogle(signupData);
      } else {
        if (!token) return alert('유효하지 않은 링크입니다.');
        const signupData = {
          user_auth_info_token: token,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.contactNumber,
          phone_country_code: extractCountryCode(selectedCountry.value),
          organization_name: formData.company,
          consent_personal_info: termsAgreement,
          consent_marketing: marketingConsent,
        };
        response = await authService.signupEmail(signupData);
      }

      if (response.success) router.push('/signup/success');
      else router.push('/signup/fail');
    } catch {
      router.push('/signup/fail');
    }
  };

  const isVerificationButtonEnabled = () => {
    return (
      formData.email.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.firstName.trim() !== '' &&
      formData.country !== '' &&
      formData.contactNumber.trim() !== '' &&
      !contactError &&
      !isVerificationCompleted &&
      (!isVerificationSent || !isTimerRunning)
    );
  };

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

  // 토큰 검증 중일 때 로딩 화면 표시
  if (isTokenValidating) {
    return <SignupLoading />;
  }

  return (
    <SignupContainer>
      <LogoWrapper>
        <Link href='/'>
          <Image src={'/icons/Logo.svg'} alt='Logo' width={32} height={32} />
        </Link>
      </LogoWrapper>
      <SignupWrapper>
        <SignupLeft>
          <SignupForm>
            <SignupTitle>{t('signup.title')}</SignupTitle>

            <FormField>
              <TextField
                label={t('signup.email')}
                labelType='required'
                size='large'
                value={formData.email}
                placeholder={t('signup.placeholder.email')}
                status='positive'
                disabled
              />
            </FormField>

            <FormField>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <TextField
                    label={t('signupVerify.lastName')}
                    labelType='required'
                    size='large'
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange('lastName', e.target.value)
                    }
                    onBlur={handleLastNameBlur}
                    placeholder={t('signupVerify.placeholder.lastName')}
                    description={lastNameError}
                    status={lastNameError ? 'negative' : 'default'}
                    maxLength={50}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <TextField
                    label={t('signupVerify.firstName')}
                    labelType='required'
                    size='large'
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange('firstName', e.target.value)
                    }
                    onBlur={handleFirstNameBlur}
                    placeholder={t('signupVerify.placeholder.firstName')}
                    description={firstNameError}
                    status={firstNameError ? 'negative' : 'default'}
                    maxLength={50}
                  />
                </div>
              </div>
            </FormField>

            <FormField>
              <Dropdown
                type='combobox'
                labelType='required'
                label={t('signupVerify.country')}
                size='large'
                placeholder={t('signupVerify.placeholder.country')}
                value={formData.country}
                onChange={handleCountryChange}
                options={getCountries(
                  (typeof window !== 'undefined' &&
                    window.localStorage.getItem('i18nextLng')) ||
                    'ko'
                )}
                description={countryError}
                status={countryError ? 'negative' : 'default'}
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
                    label={t('signupVerify.phone')}
                    labelType='required'
                    size='large'
                    value={formData.contactNumber}
                    onChange={(e) =>
                      handleInputChange('contactNumber', e.target.value)
                    }
                    onBlur={() => {
                      const result = validateContactNumber(
                        formData.contactNumber,
                        true
                      );
                      setContactError(result.message);
                    }}
                    placeholder={t('signupVerify.placeholder.phone')}
                    description={isVerificationCompleted ? '' : contactError}
                    status={
                      isVerificationCompleted
                        ? 'positive'
                        : contactError
                          ? 'negative'
                          : 'default'
                    }
                    inputMode='numeric'
                    pattern='[0-9]*'
                    disabled={isVerificationCompleted}
                  />
                </div>
                <div style={{ width: '95px', marginTop: '24px' }}>
                  <StyledVerificationButton
                    variant='primary'
                    size='large'
                    onClick={handleRequestVerification}
                    disabled={!isVerificationButtonEnabled()}
                  >
                    {t('signupVerify.requestCode')}
                  </StyledVerificationButton>
                </div>
              </div>
            </FormField>

            {isVerificationSent && !isVerificationCompleted && (
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
                      onChange={(e) => {
                        setVerificationCode(e.target.value);
                        if (verificationError) {
                          setVerificationError('');
                        }
                      }}
                      placeholder={t('signupVerify.codePlaceholder')}
                      description={verificationError}
                      status={verificationError ? 'negative' : 'default'}
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '8px',
                      }}
                    >
                      <ResendButton onClick={handleResendCode}>
                        {t('signupVerify.resend')}
                      </ResendButton>
                      {isTimerRunning && (
                        <TimerContainer>
                          <TimerText>
                            <Image
                              src={'/icons/Icon_history.svg'}
                              alt='Timer'
                              width={16}
                              height={16}
                            />
                            <TimeText>{formatTime(timeLeft)}</TimeText>
                            <RemainingText>
                              {' '}
                              {t('signupVerify.remaining')}
                            </RemainingText>
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
                      disabled={isVerificationCompleted}
                    >
                      {t('signupVerify.verify')}
                    </StyledVerificationButton>
                  </div>
                </div>
              </FormField>
            )}

            <FormField>
              <TextField
                label={t('signupVerify.company')}
                size='large'
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder={t('signupVerify.placeholder.company')}
                maxLength={50}
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
                  {t('contact.consent.requiredPrefix')}{' '}
                  <AgreementLink onClick={handlePrivacyLinkClick}>
                    {t('contact.consent.privacy')}
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
                  {t('contact.consent.optionalPrefix')}{' '}
                  <AgreementLink onClick={handleMarketingLinkClick}>
                    {t('contact.consent.marketing')}
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
              {t('signupVerify.submit')}
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
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const SignupLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupRight = styled.div`
  flex: 1;

  @media (max-width: 992px) {
    display: none;
  }
`;

const SignupForm = styled.div`
  width: 100%;
  max-width: 398px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  height: auto;
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
