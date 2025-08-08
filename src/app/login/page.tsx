'use client';

import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SolidButton, TextButton, TextField } from '@cubig/design-system';
import { typography, textColor, borderColor } from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';
import CarouselSection from '@/components/common/CarouselSection';
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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

        // 홈페이지로 이동
        router.push('/');
      } else {
        // 로그인 실패 시 에러 메시지 표시
        setPasswordError('입력하신 정보를 다시 확인해주세요.');
      }
    } catch {
      setPasswordError('입력하신 정보를 다시 확인해주세요.');
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse: GoogleTokenResponse) => {
      try {
        // Google API로 사용자 정보 가져오기 (현재는 사용하지 않음)
        await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.access_token}`
        );

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

          // 홈페이지로 이동
          router.push('/');
        } else {
          const userInfoResponse = await fetch(
            `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.access_token}`
          );
          const userInfo = await userInfoResponse.json();

          const verifyResponse = await authService.verifyEmailGoogle({
            access_token: tokenResponse.access_token,
          });

          if (verifyResponse.success) {
            const params = new URLSearchParams({
              google: 'true',
              email: userInfo.email,
            });
            window.location.href = `/signup/verify?${params.toString()}`;
          } else {
            alert('구글 이메일 인증에 실패했습니다.');
          }
        }
      } catch {
        alert('구글 로그인 중 오류가 발생했습니다.');
      }
    },
    onError: () => {
      alert('구글 로그인에 실패했습니다.');
    },
  });

  const handleGoogleLogin = (e?: React.MouseEvent) => {
    // 기본 동작 방지
    e?.preventDefault();
    login();
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
    <LoginContainer>
      <LoginWrapper>
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
        <LoginLeft>
          <LoginForm>
            <LoginTitle>로그인</LoginTitle>

            <FormField>
              <TextField
                label='이메일'
                labelType='required'
                size='large'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
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
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder='비밀번호를 입력해주세요.'
                description={passwordError}
                status={passwordError ? 'negative' : 'default'}
              />
            </FormField>

            <LoginButton
              size='large'
              onClick={handleLogin}
              disabled={!isLoginButtonEnabled()}
            >
              로그인
            </LoginButton>

            <HelperText>
              <Link href='/reset-password'>
                <TextButton variant='primary' size='small'>
                  비밀번호 찾기
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
              구글 계정으로 로그인
            </GoogleButton>

            <SignupText>
              처음 방문하시나요?{' '}
              <Link href='/signup'>
                <TextButton variant='secondary' size='small'>
                  회원가입
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
  max-width: ${({ theme }) => theme.container.lg};
  margin: 0 auto;
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: 1921px) {
    max-width: ${({ theme }) => theme.container.xl};
  }

  ${({ theme }) => theme.media.maxMd} {
    flex-direction: column;
  }
`;

const LoginLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};

  ${({ theme }) => theme.media.maxXl} {
    padding: 120px ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
  }

  ${({ theme }) => theme.media.maxMd} {
    padding: 100px 20px 20px 20px;
  }

  ${({ theme }) => theme.media.maxSm} {
    padding: 80px ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm};
  }
`;

const LoginRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.maxMd} {
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
  height: 100%;
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
