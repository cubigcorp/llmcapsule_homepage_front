'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { SolidButton } from '@cubig/design-system';
import { typography, textColor } from '@cubig/design-system';
import CarouselSection from '@/components/common/CarouselSection';

export default function SignupSuccessPage() {
  const handleGoToHome = () => {
    window.location.href = '/';
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
            <SuccessIcon>
              <Image
                src={'/icons/Icon_circlecheck.svg'}
                alt='Success'
                width={48}
                height={48}
              />
            </SuccessIcon>
            <Title>
              LLM Capsule <br />
              회원가입을 환영합니다!{' '}
            </Title>
            <ButtonContainer>
              <StartButton size='large' onClick={handleGoToHome}>
                시작하기
              </StartButton>
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
`;

const SuccessIcon = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0 0 60px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const StartButton = styled(SolidButton)`
  width: 100%;
`;
