'use client';

import React from 'react';
import styled from 'styled-components';
import { typography, textColor } from '@cubig/design-system';
import { useTranslation } from 'react-i18next';

export default function TermsPage() {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language?.toLowerCase().startsWith('en');
  const frameSrc = isEnglish ? '/legal/terms(en).html' : '/legal/terms.html';
  return (
    <>
      <Container>
        <Content>
          <Title>Terms of Service</Title>
          <HtmlFrame src={frameSrc} title='Terms of Service' />
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: white;
  padding-top: 80px;
`;

const Content = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 24px 40px 24px;
`;

const Title = styled.h1`
  ${typography('ko', 'heading2', 'semibold')};
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 16px 0;
`;

const HtmlFrame = styled.iframe`
  width: 100%;
  height: 80vh;
  background: white;
`;
