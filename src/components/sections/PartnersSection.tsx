'use client';

import styled, { keyframes } from 'styled-components';
import {
  typography,
  textColor,
  radius,
  borderColor,
} from '@cubig/design-system';

const partnerLogos = [
  { src: '/icons/airforce.svg', alt: 'Air Force' },
  { src: '/icons/Amazon.svg', alt: 'Amazon' },
  { src: '/icons/army.svg', alt: 'Army' },
  { src: '/icons/ewha.svg', alt: 'Ewha' },
  { src: '/icons/gangnamgu.svg', alt: 'Gangnam' },
  { src: '/icons/hanabank.svg', alt: 'Hana Bank' },
  { src: '/icons/ibk.svg', alt: 'IBK 기업은행' },
  { src: '/icons/kyobo.svg', alt: 'KYOBO' },
  { src: '/icons/naver_cloud.svg', alt: 'Naver Cloud' },
  { src: '/icons/police.svg', alt: 'Police' },
  { src: '/icons/sktelecom.svg', alt: 'SK telecom' },
  { src: '/icons/wooribank.svg', alt: 'Woori Bank' },
];

export default function PartnersSection() {
  return (
    <PartnersContainer>
      <PartnersWrapper>
        <PartnersContent>
          <PartnersLeft>
            <SectionTitle>CUBIG Partners</SectionTitle>
            <PartnersDescription>
              주요 산업 분야를 선도하는 기업들과 <br />
              함께하고 있습니다.
            </PartnersDescription>
          </PartnersLeft>
          <PartnersDivider />
          <PartnersLogos>
            <AnimatedTrack>
              {partnerLogos.map((logo, index) => (
                <PartnerLogo
                  key={`first-${index}`}
                  src={logo.src}
                  alt={logo.alt}
                />
              ))}
              {partnerLogos.map((logo, index) => (
                <PartnerLogo
                  key={`second-${index}`}
                  src={logo.src}
                  alt={logo.alt}
                />
              ))}
            </AnimatedTrack>
          </PartnersLogos>
        </PartnersContent>
      </PartnersWrapper>
    </PartnersContainer>
  );
}

const PartnersContainer = styled.section`
  width: 100%;
  display: flex;
`;

const PartnersWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 320px;
  padding: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;

  @media (min-width: 1920px) {
    max-width: 1920px;
    padding: 120px;
  }

  @media (max-width: 1440px) {
    padding: 60px 24px;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 40px 16px;
    gap: 16px;
  }

  @media (max-width: 375px) {
    padding: 32px 12px;
    gap: 12px;
  }
`;

const SectionTitle = styled.h2`
  width: fit-content;
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  border: 1px solid ${textColor.light['fg-neutral-primary']};
  padding: 2px 8px;
  border-radius: ${radius['rounded-1.5']};
  margin: 0;
`;

const PartnersContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const PartnersLeft = styled.div`
  display: flex;
  padding-right: 40px;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding-right: 0;
    align-items: center;
    text-align: center;
  }
`;

const PartnersDescription = styled.p`
  ${typography('ko', 'heading1', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  line-height: 1.6;
`;

const PartnersDivider = styled.div`
  width: 1px;
  height: 200px;
  background-color: ${borderColor.light['color-border-primary']};

  @media (max-width: 768px) {
    width: 200px;
    height: 1px;
  }
`;

const slide = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const PartnersLogos = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 80px,
    black calc(100% - 80px),
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    black 80px,
    black calc(100% - 80px),
    transparent
  );
`;

const AnimatedTrack = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  animation: ${slide} 60s linear infinite;
`;

const PartnerLogo = styled.img`
  object-fit: contain;
  flex-shrink: 0;
  margin: 0 40px;
`;
