'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { SolidButton, TextButton, TextField } from '@cubig/design-system';
import { typography, textColor, color, radius } from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';
import CarouselSection from '@/components/common/CarouselSection';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleSubmit = () => {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    // TODO: 비밀번호 재설정 이메일 발송 API 호출
    console.log('Send reset email to:', email);
    alert('비밀번호 재설정 이메일이 발송되었습니다.');
  };

  return (
    <ResetPasswordContainer>
      <ResetPasswordWrapper>
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
        <ResetPasswordLeft>
          <ResetPasswordForm>
            <Title>비밀번호 재설정</Title>

            <FormField>
              <TextField
                label='이메일'
                size='large'
                value={email}
                onChange={handleEmailChange}
                placeholder='Email@example.com'
                description={emailError}
                status={emailError ? 'negative' : 'default'}
              />
            </FormField>

            <SubmitButton
              variant='primary'
              size='large'
              onClick={handleSubmit}
              disabled={!email.trim()}
            >
              재설정 이메일 보내기
            </SubmitButton>

            <HelperText>
              이메일이 기억나지 않으시나요?{' '}
              <Link href='/contact'>
                <TextButton variant='primary' size='small'>
                  문의하기
                </TextButton>
              </Link>
            </HelperText>
          </ResetPasswordForm>
        </ResetPasswordLeft>

        <ResetPasswordRight>
          <CarouselSection slides={slides} />
        </ResetPasswordRight>
      </ResetPasswordWrapper>
    </ResetPasswordContainer>
  );
}

const ResetPasswordContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const ResetPasswordWrapper = styled.div`
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

const ResetPasswordLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 160px 40px 40px 40px;

  @media (max-width: 1920px) {
    padding: 160px 40px 40px 40px;
  }

  @media (max-width: 768px) {
    padding: 100px 24px 24px 24px;
  }

  @media (max-width: 375px) {
    padding: 80px 16px 16px 16px;
  }
`;

const ResetPasswordRight = styled.div`
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

const LogoWrapper = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  z-index: 10;
`;

const ResetPasswordForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 400px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const Title = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: -200px 0 60px 0;
  text-align: center;

  @media (max-width: 768px) {
    ${typography('ko', 'heading2', 'bold')}
    margin: -100px 0 40px 0;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const SubmitButton = styled(SolidButton)`
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const HelperText = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  text-align: center;
  margin-top: 8px;
`;
