'use client';

import styled from 'styled-components';
import Image from 'next/image';
import {
  SolidButton,
  OutlineButton,
  typography,
  textColor,
} from '@cubig/design-system';

export default function HeroSection() {
  return (
    <HeroContainer>
      <HeroWrapper>
        <ContentArea>
          <TextContent>
            <MainTitle>Capsule AI for what&apos;s next</MainTitle>
            <SubTitle>
              Secure, seamless
              <br />
              for GenAI and public LLMs
            </SubTitle>
            <Description>
              LLM Capsule bridges enterprises and AI platforms securely and
              seamlessly, empowering innovation with trusted data protection and
              compliance.
            </Description>
          </TextContent>
          <ButtonGroup>
            <SolidButton
              variant='primary'
              size='large'
              onClick={() => {
                window.open('/contact', '_self');
              }}
            >
              Contact Us
            </SolidButton>
            <OutlineButton
              variant='secondary'
              size='large'
              onClick={() => {
                const demoSection = document.getElementById('demo-section');
                if (demoSection) {
                  demoSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }
              }}
            >
              Get Started
            </OutlineButton>
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
              Brochure
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
  background-repeat: repeat;
  background-size: auto;
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

  @media (max-width: 768px) {
    gap: 40px;
    padding: 40px 0;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 128px;

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 375px) {
    gap: 12px;
  }
`;

const SubTitle = styled.p`
  ${typography(undefined, 'display4', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const MainTitle = styled.h1`
  ${typography(undefined, 'display4', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const Description = styled.p`
  ${typography(undefined, 'title1', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  width: 960px;
  margin-top: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  margin: 32px 0 48px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
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
