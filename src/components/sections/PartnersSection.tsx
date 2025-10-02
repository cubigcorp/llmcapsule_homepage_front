'use client';

import styled, { keyframes } from 'styled-components';

const partnerLogos = [
  { src: '/icons/airforce.png', alt: 'Air Force' },
  { src: '/icons/Amazon.png', alt: 'Amazon' },
  { src: '/icons/army.png', alt: 'Army' },
  { src: '/icons/ewha.png', alt: 'Ewha' },
  { src: '/icons/gangnamgu.png', alt: 'Gangnam' },
  { src: '/icons/ibk.png', alt: 'IBK 기업은행' },
  { src: '/icons/kyobo.png', alt: 'KYOBO' },
  { src: '/icons/naver_cloud.png', alt: 'Naver Cloud' },
  { src: '/icons/police.png', alt: 'Police' },
  { src: '/icons/sktelecom.png', alt: 'SK telecom' },
  { src: '/icons/wooribank.png', alt: 'Woori Bank' },
];

export default function PartnersSection() {
  return (
    <PartnersContainer>
      <PartnersWrapper>
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
      </PartnersWrapper>
    </PartnersContainer>
  );
}

const PartnersContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PartnersWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 120px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media (min-width: 1920px) {
    max-width: 1920px;
  }

  @media (max-width: 1440px) {
    max-width: 1440px;
  }

  @media (max-width: 768px) {
    height: auto;
    gap: 40px;
  }

  @media (max-width: 375px) {
    gap: 24px;
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
  animation: ${slide} 100s linear infinite;
`;

const PartnerLogo = styled.img`
  object-fit: contain;
  flex-shrink: 0;
  height: 120px;
  margin: 0 120px 0 0px;
  @media (max-width: 768px) {
    height: 80px;
    margin-right: 60px;
  }
`;
