'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IconButton } from '@cubig/design-system';
import { color, radius, typography, textColor } from '@cubig/design-system';

interface SlideData {
  image: string;
  content: string;
  title: string;
  description: string;
}

interface CarouselSectionProps {
  slides?: SlideData[];
}

const defaultSlides: SlideData[] = [
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

export default function CarouselSection({
  slides = defaultSlides,
}: CarouselSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      handleNextSlide(false);
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentSlide]);

  const handlePreviousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    resetTimer();
  };

  const handleNextSlide = (reset = true) => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    if (reset) {
      resetTimer();
    }
  };

  const LeftArrowIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M8.71182 9.99996L12.1062 13.3941C12.2215 13.5095 12.2805 13.6546 12.2833 13.8293C12.2859 14.0039 12.2269 14.1516 12.1062 14.2725C11.9854 14.3932 11.839 14.4535 11.667 14.4535C11.4951 14.4535 11.3487 14.3932 11.2279 14.2725L7.48266 10.5273C7.40474 10.4492 7.34974 10.3669 7.31766 10.2804C7.28557 10.1939 7.26953 10.1004 7.26953 9.99996C7.26953 9.89954 7.28557 9.80607 7.31766 9.71954C7.34974 9.63302 7.40474 9.55073 7.48266 9.47267L11.2279 5.72746C11.3433 5.61218 11.4884 5.55316 11.6631 5.55038C11.8377 5.54774 11.9854 5.60677 12.1062 5.72746C12.2269 5.84829 12.2872 5.99468 12.2872 6.16663C12.2872 6.33857 12.2269 6.48496 12.1062 6.6058L8.71182 9.99996Z'
        fill='white'
      />
    </svg>
  );

  const RightArrowIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M10.7883 9.99993L7.39393 6.60576C7.27865 6.49035 7.21963 6.34528 7.21685 6.17055C7.21421 5.99597 7.27324 5.84826 7.39393 5.72743C7.51477 5.60673 7.66115 5.54639 7.8331 5.54639C8.00504 5.54639 8.15143 5.60673 8.27227 5.72743L12.0175 9.47264C12.0954 9.55069 12.1504 9.63298 12.1825 9.71951C12.2146 9.80604 12.2306 9.89951 12.2306 9.99993C12.2306 10.1003 12.2146 10.1938 12.1825 10.2803C12.1504 10.3669 12.0954 10.4492 12.0175 10.5272L8.27227 14.2724C8.15685 14.3877 8.01178 14.4467 7.83706 14.4495C7.66247 14.4522 7.51477 14.3931 7.39393 14.2724C7.27324 14.1516 7.21289 14.0052 7.21289 13.8333C7.21289 13.6613 7.27324 13.5149 7.39393 13.3941L10.7883 9.99993Z'
        fill='white'
      />
    </svg>
  );

  return (
    <CarouselContainer>
      <SvgWrapper>
        {slides.map((slide, index) => (
          <Slide key={index} $active={index === currentSlide}>
            <BackgroundImage src={slide.image} alt='Content' />
            <ContentOverlay
              $slideIndex={index}
              style={{ backgroundImage: `url(${slide.content})` }}
            />
            <TextContent>
              <TextTitle>{slide.title}</TextTitle>
              <TextDescription>{slide.description}</TextDescription>
            </TextContent>
          </Slide>
        ))}
        <NavigationButtons>
          <IconButton
            type='outline'
            size='medium'
            icon={LeftArrowIcon}
            onClick={handlePreviousSlide}
          />
          <IconButton
            type='outline'
            size='medium'
            icon={RightArrowIcon}
            onClick={() => handleNextSlide()}
          />
        </NavigationButtons>
      </SvgWrapper>
    </CarouselContainer>
  );
}

const Slide = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.$active ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  pointer-events: ${(props) => (props.$active ? 'auto' : 'none')};
`;

const CarouselContainer = styled.div`
  flex: 1;
  height: 100%;
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

const SvgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${color.gray['50']};
  border-radius: ${radius['rounded-5']};
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${radius['rounded-5']};
`;

const ContentOverlay = styled.div<{ $slideIndex: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => {
    switch (props.$slideIndex) {
      case 0:
        return '400px';
      case 1:
        return '380px';
      case 2:
        return '400px';
      case 3:
        return '360px';
      default:
        return '400px';
    }
  }};
  height: ${(props) => {
    switch (props.$slideIndex) {
      case 0:
        return '214px';
      case 1:
        return '392px';
      case 2:
        return '258px';
      case 3:
        return '327px';
      default:
        return '214px';
    }
  }};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
  z-index: 10;

  @media (max-width: 768px) {
    width: ${(props) => {
      switch (props.$slideIndex) {
        case 0:
          return '270px';
        case 1:
          return '256px';
        case 2:
          return '270px';
        case 3:
          return '243px';
        default:
          return '270px';
      }
    }};
    height: ${(props) => {
      switch (props.$slideIndex) {
        case 0:
          return '144px';
        case 1:
          return '264px';
        case 2:
          return '174px';
        case 3:
          return '220px';
        default:
          return '144px';
      }
    }};
  }

  @media (max-width: 375px) {
    width: ${(props) => {
      switch (props.$slideIndex) {
        case 0:
          return '235px';
        case 1:
          return '225px';
        case 2:
          return '235px';
        case 3:
          return '210px';
        default:
          return '235px';
      }
    }};
    height: ${(props) => {
      switch (props.$slideIndex) {
        case 0:
          return '126px';
        case 1:
          return '232px';
        case 2:
          return '152px';
        case 3:
          return '192px';
        default:
          return '126px';
      }
    }};
  }
`;

const TextContent = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  max-width: 368px;
  z-index: 20;

  @media (max-width: 768px) {
    bottom: 20px;
    left: 20px;
    max-width: 300px;
  }

  @media (max-width: 375px) {
    bottom: 16px;
    left: 16px;
    max-width: 250px;
  }
`;

const TextTitle = styled.h3`
  ${typography('ko', 'heading2', 'medium')}
  color: ${textColor.dark['fg-neutral-strong']};
  margin: 0 0 16px 0;
`;

const TextDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.dark['fg-neutral-primary']};
  margin: 0;
  line-height: 1.6;
`;

const NavigationButtons = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  display: flex;
  gap: 12px;
  z-index: 20;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    gap: 8px;
  }

  @media (max-width: 375px) {
    bottom: 16px;
    right: 16px;
    gap: 6px;
  }
`;
