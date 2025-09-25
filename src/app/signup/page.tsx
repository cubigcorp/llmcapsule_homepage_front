'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';

// Google Identity Services 타입 정의
declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { SolidButton, TextField, toast } from '@cubig/design-system';
import { typography, textColor, borderColor } from '@cubig/design-system';
// import { getAssetPath } from '@/utils/path';

import CarouselSection from '@/components/common/CarouselSection';
import SignupLoading from '@/components/common/SignupLoading';
import EmailVerificationSection from '@/components/common/EmailVerificationSection';
import EmailConflictModal from '@/components/common/EmailConflictModal';
import GoogleIcon from '@/assets/icons/Google.svg';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validation';
import { authService } from '@/services/auth';

function SignupPageContent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation('auth');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setFormData((prev) => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isEmailConflictModalOpen, setIsEmailConflictModalOpen] =
    useState(false);
  const [conflictEmail, setConflictEmail] = useState('');
  const [isEmailVerification, setIsEmailVerification] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'email') {
      const result = validateEmail(value, false);
      setEmailError(result.message);
    }

    if (field === 'password') {
      const result = validatePassword(value, false);
      setPasswordError(result.message);
      // 비밀번호 변경 시 확인 비밀번호도 재검증
      if (formData.confirmPassword) {
        const confirmResult = validateConfirmPassword(
          formData.confirmPassword,
          value,
          false
        );
        setConfirmPasswordError(confirmResult.message);
      }
    }

    if (field === 'confirmPassword') {
      const result = validateConfirmPassword(value, formData.password, false);
      setConfirmPasswordError(result.message);
    }
  };

  const handleEmailBlur = () => {
    const result = validateEmail(formData.email, true);
    setEmailError(result.message);
  };

  const handlePasswordBlur = () => {
    const result = validatePassword(formData.password, true);
    setPasswordError(result.message);
  };

  const handleConfirmPasswordBlur = () => {
    const result = validateConfirmPassword(
      formData.confirmPassword,
      formData.password,
      true
    );
    setConfirmPasswordError(result.message);
  };

  const handleEmailConflictModalClose = () => {
    setIsEmailConflictModalOpen(false);
    setConflictEmail('');
  };

  const handleEmailConflictModalConfirm = () => {
    setIsEmailConflictModalOpen(false);
    setConflictEmail('');
    // 로그인 페이지로 이동
    window.location.href = '/login';
  };

  const handleGoogleSignup = async () => {
    try {
      // Google Identity Services 초기화
      if (typeof window !== 'undefined' && window.google) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id:
            '827074253539-i0qbolbrlllgv24rrcd32ktm8h9uo21i.apps.googleusercontent.com',
          scope: 'openid email profile',
          callback: async (response: { access_token: string }) => {
            if (response.access_token) {
              try {
                // Google API로 사용자 정보 가져오기
                const userInfoResponse = await fetch(
                  `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`
                );
                const userInfo = await userInfoResponse.json();

                // 이메일 중복 확인
                try {
                  const checkEmailResponse = await authService.checkEmail(
                    userInfo.email
                  );

                  if (checkEmailResponse.success && checkEmailResponse.data) {
                    const { is_available } = checkEmailResponse.data;

                    if (!is_available) {
                      // 이미 가입된 계정인 경우 모달 표시
                      setConflictEmail(userInfo.email);
                      setIsEmailConflictModalOpen(true);
                      return;
                    }
                  }
                } catch (error) {
                  console.log(
                    'Check email API failed, proceeding with Google signup:',
                    error
                  );
                  // API 호출 실패 시에도 계속 진행
                }

                // 구글 이메일 인증 API 호출
                const verifyResponse = await authService.verifyEmailGoogle({
                  access_token: response.access_token,
                });

                if (verifyResponse.success) {
                  window.location.href = `/signup/verify?token=${response.access_token}&google=true`;
                } else {
                  alert('구글 이메일 인증에 실패했습니다.');
                }
              } catch (error) {
                console.error('Google signup error:', error);
                alert('구글 회원가입 중 오류가 발생했습니다.');
              }
            }
          },
        });

        client.requestAccessToken();
      } else {
        alert('Google 로그인을 사용할 수 없습니다.');
      }
    } catch (error) {
      console.error('Google signup error:', error);
      alert('구글 회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleSignup = async () => {
    // 이메일 유효성 검사
    const emailResult = validateEmail(formData.email, true);
    if (!emailResult.isValid) {
      setEmailError(emailResult.message);
      return;
    }

    // 이메일 중복 검사
    try {
      const emailCheckResponse = await authService.checkEmail(formData.email);
      if (emailCheckResponse.data && !emailCheckResponse.data.is_available) {
        setEmailError(t('signup.emailVerify.emailInUse'));
        return;
      }
    } catch (error) {
      console.error('Email check error:', error);
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

    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    try {
      // 실제 이메일 인증 API 호출
      const response = await authService.verifyEmail({
        email: formData.email,
        password: formData.password,
        redirect_url: `${window.location.origin}/signup/verify`,
        service_name: 'llm_capsule',
      });

      if (response.success) {
        // 성공 시 이메일 확인 화면으로 변경
        setIsEmailVerification(true);
      } else {
        // 실패 시 에러 메시지 표시
        alert(t('signup.emailVerify.requestFail'));
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number } };
        if (axiosError.response?.status === 409) {
          setEmailError(t('signup.emailVerify.emailInUse'));
        } else {
          alert(t('signup.emailVerify.requestFail'));
        }
      } else {
        alert(t('signup.emailVerify.requestFail'));
      }
    }
  };

  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    console.log('이메일 재발송 버튼 클릭됨');

    setIsResending(true);

    try {
      // 실제 이메일 재발송 API 호출
      const response = await authService.verifyEmail({
        email: formData.email,
        password: formData.password,
        redirect_url: `${window.location.origin}/signup/verify`,
        service_name: 'llm_capsule',
      });

      console.log('API 응답:', response);

      if (response.success) {
        console.log('Toast 성공 메시지 표시');
        toast.success(t('signup.emailVerify.resendSuccess'));
      } else {
        console.log('Toast 실패 메시지 표시');
        toast.error(t('signup.emailVerify.resendFail'));
      }
    } catch (error) {
      console.log('API 에러:', error);
      toast.error(t('signup.emailVerify.resendFail'));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <SignupContainer>
      <SignupWrapper>
        <LogoWrapper>
          <Link href='/'>
            <Image src={'/icons/Logo.svg'} alt='Logo' width={32} height={32} />
          </Link>
        </LogoWrapper>
        <SignupLeft $isEmailVerification={isEmailVerification}>
          <SignupForm $isEmailVerification={isEmailVerification}>
            {!isEmailVerification ? (
              <>
                <SignupTitle>{t('signup.title')}</SignupTitle>

                <FormField>
                  <TextField
                    label={t('signup.email')}
                    labelType='required'
                    size='large'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={handleEmailBlur}
                    placeholder={t('signup.placeholder.email')}
                    description={emailError}
                    status={emailError ? 'negative' : 'default'}
                  />
                </FormField>

                <FormField>
                  <TextField
                    label={t('signup.password')}
                    labelType='required'
                    size='large'
                    type='password'
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    onBlur={handlePasswordBlur}
                    placeholder={t('signup.placeholder.password')}
                    description={passwordError}
                    status={passwordError ? 'negative' : 'default'}
                  />
                </FormField>

                <FormField>
                  <TextField
                    label={t('signup.confirmPassword')}
                    labelType='required'
                    size='large'
                    type='password'
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange('confirmPassword', e.target.value)
                    }
                    onBlur={handleConfirmPasswordBlur}
                    placeholder={t('signup.placeholder.confirm')}
                    description={confirmPasswordError}
                    status={confirmPasswordError ? 'negative' : 'default'}
                  />
                </FormField>

                <SignupButton
                  size='large'
                  onClick={handleSignup}
                  disabled={
                    !formData.email.trim() ||
                    !formData.password.trim() ||
                    !formData.confirmPassword.trim()
                  }
                >
                  {t('signup.button.continue')}
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
                  {t('signup.button.google')}
                </StyledGoogleButton>
              </>
            ) : (
              <>
                <EmailVerificationSection
                  email={formData.email}
                  onResendEmail={handleResendEmail}
                  loading={isResending}
                />
              </>
            )}
          </SignupForm>
        </SignupLeft>

        <SignupRight>
          <CarouselSection />
        </SignupRight>
      </SignupWrapper>

      {/* 이메일 중복 확인 모달 */}
      <EmailConflictModal
        isOpen={isEmailConflictModalOpen}
        onClose={handleEmailConflictModalClose}
        onConfirm={handleEmailConflictModalConfirm}
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

const SignupLeft = styled.div<{ $isEmailVerification?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const SignupRight = styled.div`
  flex: 1;

  @media (max-width: 992px) {
    display: none;
  }
`;

const SignupForm = styled.div<{ $isEmailVerification?: boolean }>`
  width: 100%;
  max-width: 398px;
  display: flex;
  flex-direction: ${(props) => (props.$isEmailVerification ? 'row' : 'column')};
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

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupLoading />}>
      <SignupPageContent />
    </Suspense>
  );
}
