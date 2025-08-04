'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import {
  SolidButton,
  TextButton,
  TextField,
  IconButton,
  Checkbox,
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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepLogin: false,
  });

  const [emailError, setEmailError] = useState('');

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'email') {
      setEmailError(validateEmail(value));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, keepLogin: checked }));
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 로직
    console.log('Google login clicked');
  };

  const handleLogin = () => {
    // 이메일 유효성 검사
    const emailValidationError = validateEmail(formData.email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    // 로그인 로직
    console.log('Login clicked', formData);
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

            <StyledGoogleButton
              variant='secondary'
              size='large'
              leadingIcon={GoogleIcon}
              onClick={handleGoogleLogin}
            >
              구글 계정으로 로그인
            </StyledGoogleButton>

            <Divider>
              <DividerText>or</DividerText>
            </Divider>

            <FormField>
              <TextField
                label='이메일'
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
                size='large'
                type='password'
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder='비밀번호를 입력해주세요.'
              />
            </FormField>

            <LoginOptions>
              <CheckboxWrapper>
                <Checkbox
                  variant='primary'
                  state={formData.keepLogin ? 'checked' : 'unchecked'}
                  onChange={handleCheckboxChange}
                />
                <CheckboxLabel>로그인 상태 유지</CheckboxLabel>
              </CheckboxWrapper>
              <OptionLinks>
                <OptionLink href='/reset-password'>비밀번호 찾기</OptionLink>
              </OptionLinks>
            </LoginOptions>

            <LoginButton
              size='large'
              onClick={handleLogin}
              disabled={!formData.email.trim() || !formData.password.trim()}
            >
              로그인
            </LoginButton>

            <SignUpPrompt>
              처음 방문하셨나요?{' '}
              <Link href='/signup'>
                <StyledSignUpButton variant='secondary' size='small'>
                  회원가입
                </StyledSignUpButton>
              </Link>
            </SignUpPrompt>
          </LoginForm>
        </LoginLeft>

        <LoginRight>
          <CarouselSection slides={slides} />
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

const LoginLeft = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 200px 40px 40px 40px;

  @media (max-width: 768px) {
    padding: 100px 24px 24px 24px;
  }

  @media (max-width: 375px) {
    padding: 80px 16px 16px 16px;
  }
`;

const LoginRight = styled.div`
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

const LoginForm = styled.div`
  width: 100%;
  max-width: 398px;
  display: flex;
  flex-direction: column;
`;

const LoginTitle = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  text-align: center;
  margin: 0;
  margin-bottom: 60px;
`;

const StyledGoogleButton = styled(SolidButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${borderColor.light['color-border-primary']};
  }
`;

const DividerText = styled.span`
  ${typography('ko', 'caption2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  padding: 0 16px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const LoginOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CheckboxLabel = styled.span`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};
`;

const OptionLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const OptionLink = styled.a`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${textColor.light['fg-neutral-strong']};
  }
`;

const LoginButton = styled(SolidButton)`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 20px;
`;

const SignUpPrompt = styled.div`
  text-align: center;
  ${typography('ko', 'body2', 'regular')};
  color: ${textColor.light['fg-neutral-alternative']};
`;

const StyledSignUpButton = styled(TextButton)``;
