'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { typography, textColor } from '@cubig/design-system';

export default function CheckoutRedirect() {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 980px)');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(false);
  }, []);

  useEffect(() => {
    if (!isChecking && !isMobile) {
      router.replace('/checkout/business');
    }
  }, [router, isMobile, isChecking]);

  if (isChecking) {
    return (
      <Container>
        <Message>체크아웃 페이지로 이동 중...</Message>
      </Container>
    );
  }

  if (isMobile) {
    return (
      <Container>
        <MessageBox>
          <Title>데스크탑에서만 이용 가능합니다</Title>
          <Description>
            견적 계산 및 결제는 데스크탑 환경에서만 이용하실 수 있습니다.
            <br />
            PC 또는 노트북에서 다시 접속해 주세요.
          </Description>
        </MessageBox>
      </Container>
    );
  }

  return (
    <Container>
      <Message>체크아웃 페이지로 이동 중...</Message>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const MessageBox = styled.div`
  text-align: center;
  max-width: 400px;
`;

const Title = styled.h1`
  ${typography('ko', 'title3', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 16px 0;
`;

const Description = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
  line-height: 1.6;
`;

const Message = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;
