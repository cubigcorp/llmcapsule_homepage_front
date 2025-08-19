'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { SolidButton } from '@cubig/design-system';
import { typography, textColor } from '@cubig/design-system';
import CarouselSection from '@/components/common/CarouselSection';

export default function SignupFailPage() {
  const handleRetry = () => {
    window.location.href = '/signup';
  };

  const handleContact = () => {
    window.location.href = '/contact';
  };

  return (
    <SignupContainer>
      <SignupWrapper>
        <LogoWrapper>
          <Link href='/'>
            <Image src={'/icons/Logo.svg'} alt='Logo' width={32} height={32} />
          </Link>
        </LogoWrapper>
        <SignupLeft>
          <SignupForm>
            <ErrorIcon>
              <Image
                src={'/icons/Icon_error.svg'}
                alt='Error'
                width={48}
                height={48}
              />
            </ErrorIcon>
            <Title>회원가입에 실패했습니다.</Title>
            <Description>
              서버 요청을 처리하는 데 일시적인 문제가 발생했습니다.
              <br />
              지속적으로 문제가 발생하면 고객센터에 문의해 주세요.
            </Description>
            <ButtonContainer>
              <RetryButton
                variant='secondary'
                size='large'
                onClick={handleRetry}
              >
                다시시도
              </RetryButton>
              <ContactButton size='large' onClick={handleContact}>
                문의하기
              </ContactButton>
            </ButtonContainer>
          </SignupForm>
        </SignupLeft>

        <SignupRight>
          <CarouselSection />
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
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  @media (max-width: 768px) {
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
  text-align: center;
  height: 100%;
`;

const ErrorIcon = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0 0 24px 0;
`;

const Description = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 48px 0;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const RetryButton = styled(SolidButton)`
  width: 100%;
`;

const ContactButton = styled(SolidButton)`
  width: 100%;
`;
