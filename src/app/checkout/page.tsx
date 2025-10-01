'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { typography, textColor } from '@cubig/design-system';
import { useTranslation } from 'react-i18next';

export default function CheckoutRedirect() {
  const router = useRouter();
  const { t } = useTranslation('checkout');
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
          <Title>{t('mobileBlock.title')}</Title>
          <Description style={{ whiteSpace: 'pre-line' }}>
            {t('mobileBlock.description')}
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
