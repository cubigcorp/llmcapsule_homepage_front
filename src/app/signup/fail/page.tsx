'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { SolidButton, TextButton } from '@cubig/design-system';
import { typography, textColor, borderColor } from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';
import CarouselSection from '@/components/common/CarouselSection';

export default function SignupFailPage() {
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
            <Image
              src={getAssetPath('/icons/Logo.svg')}
              alt='Logo'
              width={32}
              height={32}
            />
          </Link>
        </LogoWrapper>
        <SignupLeft>
          <SignupForm>
            <ErrorIcon>
              <Image
                src={getAssetPath('/icons/Icon_error.svg')}
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
