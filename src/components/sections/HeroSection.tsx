'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  SolidButton,
  OutlineButton,
  typography,
  textColor,
} from '@cubig/design-system';

export default function HeroSection() {
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleGetStarted = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      router.push('/login');
      return;
    }
    router.push('/checkout');
  };

  return (
    <HeroContainer>
      <HeroWrapper>
        <ContentArea>
          <TextContent>
            <MainTitle>{t('hero.mainTitle')}</MainTitle>
            <SubTitle>{t('hero.subTitle')}</SubTitle>
            <Description>{t('hero.description')}</Description>
          </TextContent>
          <ButtonGroup>
            <SolidButton
              variant='primary'
              size='large'
              onClick={handleGetStarted}
            >
              {t('hero.getStarted')}
            </SolidButton>
            <OutlineButton
              variant='secondary'
              size='large'
              onClick={() => {
                window.open(
                  'https://cubig.gabia.io/QR_files/Brochure_LLM_K.pdf',
                  '_blank'
                );
              }}
            >
              {t('hero.brochure')}
            </OutlineButton>
          </ButtonGroup>
          <ImageArea>
            <Image
              src={'/images/img-hero_LLM.svg'}
              alt='LLM Capsule Hero Image'
              width={1360}
              height={600}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </ImageArea>
        </ContentArea>
      </HeroWrapper>
    </HeroContainer>
  );
}

const HeroContainer = styled.section`
  width: 100%;
  padding-top: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    url('/images/bg-line.svg'),
    linear-gradient(180deg, #fbfbfb 12.18%, #f0f0f2 100%);
  background-repeat: no-repeat, no-repeat;
  background-size: auto, cover;
  background-position:
    center top,
    center;
`;

const HeroWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

const ContentArea = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0 32px;
  }

  @media (max-width: 375px) {
    padding: 0 16px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 128px;

  @media (max-width: 768px) {
    margin-top: 64px;
  }

  @media (max-width: 375px) {
    margin-top: 40px;
  }
`;

const SubTitle = styled.p`
  ${typography(undefined, 'display4', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  white-space: pre-line;
  @media (max-width: 1024px) {
    ${typography(undefined, 'display4', 'medium')}
  }

  @media (max-width: 768px) {
    ${typography(undefined, 'display3', 'medium')}
  }

  @media (max-width: 575px) {
    font-size: 28px;
    line-height: 40px;
  }
`;

const MainTitle = styled.h1`
  ${typography(undefined, 'display4', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  @media (max-width: 1024px) {
    ${typography(undefined, 'display4', 'medium')}
  }

  @media (max-width: 768px) {
    ${typography(undefined, 'display3', 'medium')}
  }

  @media (max-width: 575px) {
    font-size: 28px;
    line-height: 40px;
  }
`;

const Description = styled.p`
  ${typography(undefined, 'title1', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  max-width: 960px;
  width: 100%;
  margin-top: 16px;
  white-space: pre-line;
  @media (max-width: 1024px) {
    ${typography(undefined, 'title1', 'regular')}
  }

  @media (max-width: 768px) {
    ${typography(undefined, 'heading3', 'regular')}
  }

  @media (max-width: 575px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  margin: 32px 0 48px 0;
`;

const ImageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
  }
`;
