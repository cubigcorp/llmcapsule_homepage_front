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
import {
  validateLastName,
  validateFirstName,
  validateContactNumber,
} from '@/utils/validation';

export default function SignupVerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    country: '대한민국 (+82)',
    contactNumber: '',
    company: '',
  });

  const [lastNameError, setLastNameError] = useState('');
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [contactError, setContactError] = useState('');
  const [contactTouched, setContactTouched] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2분 (120초)
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const contactRegex = /^[0-9]{10,11}$/;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'lastName') {
      const result = validateLastName(value, lastNameTouched);
      setLastNameError(result.message);
    }

    if (field === 'firstName') {
      const result = validateFirstName(value, firstNameTouched);
      setFirstNameError(result.message);
    }

    if (field === 'contactNumber') {
      // 숫자만 허용
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({ ...prev, contactNumber: numericValue }));

      const result = validateContactNumber(numericValue, contactTouched);
      setContactError(result.message);
    }
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
  };

  const handleResendCode = () => {
    if (timeLeft > 0) return; // 타이머가 실행 중이면 재발송 불가

    // TODO: 인증번호 재발송 API 호출
    console.log('Resend verification code for:', formData.contactNumber);
    startTimer();
  };

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

  useEffect(() => {
    if (token) {
      // TODO: 백엔드에 토큰 검증 API 요청
      console.log('Token received:', token);
    }
  }, [token]);

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  const handleSignup = () => {
    // 성 필드 유효성 검사
    const lastNameResult = validateLastName(formData.lastName, true);
    if (!lastNameResult.isValid) {
      setLastNameError(lastNameResult.message);
      return;
    }

    // 이름 필드 유효성 검사
    const firstNameResult = validateFirstName(formData.firstName, true);
    if (!firstNameResult.isValid) {
      setFirstNameError(firstNameResult.message);
      return;
    }

    // 연락처 유효성 검사
    const contactResult = validateContactNumber(formData.contactNumber, true);
    if (!contactResult.isValid) {
      setContactError(contactResult.message);
      return;
    }

    // TODO: 회원가입 API 호출
    console.log('Signup with data:', formData);
    alert('회원가입이 완료되었습니다.');
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
                    onBlur={() => {
                      setLastNameTouched(true);
                      const result = validateLastName(formData.lastName, true);
                      setLastNameError(result.message);
                    }}
                    placeholder='예) 홍'
                    maxLength={50}
                    description={lastNameError}
                    status={lastNameError ? 'negative' : 'default'}
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
                    onBlur={() => {
                      setFirstNameTouched(true);
                      const result = validateFirstName(
                        formData.firstName,
                        true
                      );
                      setFirstNameError(result.message);
                    }}
                    placeholder='예) 길동'
                    maxLength={50}
                    description={firstNameError}
                    status={firstNameError ? 'negative' : 'default'}
                  />
                </div>
              </div>
            </FormField>

            <FormField>
              <Dropdown
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
                    disabled={isVerificationSent}
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
                placeholder='회사명을 입력해 주세요.'
                maxLength={50}
              />
            </FormField>

            <SignupButton variant='primary' size='large' onClick={handleSignup}>
              회원가입
            </SignupButton>
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

const SignupLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 160px 40px 40px 40px;

  @media (max-width: 1920px) {
    padding: 160px 40px 40px 40px;
  }

  @media (max-width: 1440px) {
    padding: 160px 40px 40px 40px;
  }

  @media (max-width: 768px) {
    padding: 120px 20px 20px 20px;
  }

  @media (max-width: 375px) {
    padding: 100px 16px 16px 16px;
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
