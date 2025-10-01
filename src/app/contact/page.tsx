'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import CarouselSection from '@/components/common/CarouselSection';
import ContactFormComponent from '@/components/common/ContactForm';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation('auth');
  return (
    <ContactContainer>
      <ContactWrapper>
        <LogoWrapper>
          <Link href='/'>
            <Image src={'/icons/Logo.svg'} alt='Logo' width={32} height={32} />
          </Link>
        </LogoWrapper>
        <ContactLeft>
          <ContactFormComponent title={t('contact.title')} showLogo={false} />
        </ContactLeft>

        <ContactRight>
          <CarouselSection />
        </ContactRight>
      </ContactWrapper>
    </ContactContainer>
  );
}

const ContactContainer = styled.div`
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

const ContactWrapper = styled.div`
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

const ContactLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;
