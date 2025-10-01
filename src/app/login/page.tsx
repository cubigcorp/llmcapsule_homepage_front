'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SolidButton, TextButton, TextField } from '@cubig/design-system';
import { typography, textColor, borderColor } from '@cubig/design-system';
import CarouselSection from '@/components/common/CarouselSection';
import EmailConflictModal from '@/components/common/EmailConflictModal';
import GoogleIcon from '@/assets/icons/Google.svg';
import { authService } from '@/services/auth';
import { validateEmail } from '@/utils/validation';

interface GoogleTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation('auth');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEmailConflictModalOpen, setIsEmailConflictModalOpen] =
    useState(false);
  const [conflictEmail, setConflictEmail] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'email') {
      const result = validateEmail(value, false);
      setEmailError(result.message);
    }
  };

  const handleLogin = async (e?: React.MouseEvent) => {
    // 기본 동작 방지
    e?.preventDefault();

    // 이메일 유효성 검사
    const emailResult = validateEmail(formData.email, true);
    if (!emailResult.isValid) {
      setEmailError(emailResult.message);
      return;
    }

    setEmailError('');
    setPasswordError('');

    try {
      const response = await authService.loginEmail({
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        // 로그인 성공 시 토큰 저장
        localStorage.setItem('access_token', response.data!.access_token);
        localStorage.setItem('refresh_token', response.data!.refresh_token);

        // 마이페이지로 이동
        router.push('/mypage');
      } else {
        if (response.status === 409) {
          // 구글 계정으로 가입된 경우
          setEmailError(t('login.error.googleAccount'));
        } else {
          // 일반 로그인 실패
          setPasswordError(t('login.error.invalid'));
        }
      }
    } catch {
      setPasswordError(t('login.error.invalid'));
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse: GoogleTokenResponse) => {
      try {
        // 구글 로그인 API 호출
        const loginResponse = await authService.loginGoogle({
          access_token: tokenResponse.access_token,
        });

        if (loginResponse.success) {
          // 로그인 성공 시 토큰 저장
          localStorage.setItem(
            'access_token',
            loginResponse.data!.access_token
          );
          localStorage.setItem(
            'refresh_token',
            loginResponse.data!.refresh_token
          );

          // 마이페이지로 이동
          router.push('/mypage');
        } else {
          // 409 에러인 경우 이미 이메일로 가입된 계정
          if (loginResponse.status === 409) {
            setConflictEmail(''); // 이메일 주소는 모달에서 표시하지 않음
            setIsEmailConflictModalOpen(true);
            return;
          }

          const verifyResponse = await authService.verifyEmailGoogle({
            access_token: tokenResponse.access_token,
          });

          if (verifyResponse.success) {
            router.push(
              `/signup/verify?token=${tokenResponse.access_token}&google=true`
            );
          } else {
            // verifyEmailGoogle 실패 시 바로 회원가입 페이지로 이동
            router.push('/signup');
          }
        }
      } catch (error) {
        console.error('Google login error:', error);
        // 에러가 발생해도 회원가입 시도
        try {
          const verifyResponse = await authService.verifyEmailGoogle({
            access_token: tokenResponse.access_token,
          });

          if (verifyResponse.success) {
            router.push(
              `/signup/verify?token=${tokenResponse.access_token}&google=true`
            );
          } else {
            // verifyEmailGoogle 실패 시 바로 회원가입 페이지로 이동
            router.push('/signup');
          }
        } catch (verifyError) {
          console.error('Google verify error:', verifyError);
          // 에러 발생 시에도 회원가입 페이지로 이동
          router.push('/signup');
        }
      }
    },
    onError: () => {
      alert(t('login.error.googleFail'));
    },
  });

  const handleGoogleLogin = (e?: React.MouseEvent) => {
    // 기본 동작 방지
    e?.preventDefault();
    login();
  };

  const handleEmailConflictModalClose = () => {
    setIsEmailConflictModalOpen(false);
    setConflictEmail('');
  };

  const handleEmailConflictModalConfirm = () => {
    setIsEmailConflictModalOpen(false);
    setConflictEmail('');
    // 이메일 로그인 폼으로 포커스 이동
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    if (emailInput) {
      emailInput.focus();
    }
  };

  // 로그인 버튼 활성화 조건
  const isLoginButtonEnabled = () => {
    return (
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      !emailError
    );
  };

  return (
    <>
      <LoginContainer>
        <LoginWrapper>
          <LogoWrapper>
            <Link href='/'>
              <Image
                src={'/icons/Logo.svg'}
                alt='Logo'
                width={32}
                height={32}
              />
            </Link>
          </LogoWrapper>
          <LoginLeft>
            <LoginForm>
              <LoginTitle>{t('login.title')}</LoginTitle>

              <FormField>
                <TextField
                  label={t('login.email')}
                  labelType='required'
                  size='large'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t('login.placeholder.email')}
                  description={emailError}
                  status={emailError ? 'negative' : 'default'}
                />
              </FormField>

              <FormField>
                <TextField
                  label={t('login.password')}
                  labelType='required'
                  size='large'
                  type='password'
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange('password', e.target.value)
                  }
                  placeholder={t('login.placeholder.password')}
                  description={passwordError}
                  status={passwordError ? 'negative' : 'default'}
                />
              </FormField>

              <LoginButton
                size='large'
                onClick={handleLogin}
                disabled={!isLoginButtonEnabled()}
              >
                {t('login.button.login')}
              </LoginButton>

              <HelperText>
                <Link href='/reset-password'>
                  <TextButton variant='primary' size='small'>
                    {t('login.helper.forgot')}
                  </TextButton>
                </Link>
              </HelperText>

              <Divider>
                <DividerText>or</DividerText>
              </Divider>

              <GoogleButton
                variant='secondary'
                size='large'
                leadingIcon={GoogleIcon}
                onClick={handleGoogleLogin}
              >
                {t('login.button.google')}
              </GoogleButton>

              <SignupText>
                {t('login.helper.signupPrompt')}{' '}
                <Link href='/signup'>
                  <TextButton variant='secondary' size='small'>
                    {t('login.helper.signup')}
                  </TextButton>
                </Link>
              </SignupText>
            </LoginForm>
          </LoginLeft>

          <LoginRight>
            <CarouselSection />
          </LoginRight>
        </LoginWrapper>
      </LoginContainer>

      {/* 이메일 중복 확인 모달 */}
      <EmailConflictModal
        isOpen={isEmailConflictModalOpen}
        onClose={handleEmailConflictModalClose}
        onConfirm={handleEmailConflictModalConfirm}
      />
    </>
  );
}

const LoginContainer = styled.div`
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

const LoginWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LoginLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 992px) {
    display: none;
  }
`;

const LoginForm = styled.div`
  width: 100%;
  max-width: 398px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  height: auto;
`;

const LoginTitle = styled.h1`
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

const LoginButton = styled(SolidButton)`
  width: 100%;
  margin-bottom: 20px;
`;

const HelperText = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;

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

const GoogleButton = styled(SolidButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 20px;
`;

const SignupText = styled.div`
  text-align: center;
  margin-top: 20px;
`;
