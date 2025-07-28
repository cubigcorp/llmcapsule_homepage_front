'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAssetPath } from '@/utils/path';
import { color } from '@cubig/design-system';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <ScrollButton onClick={scrollToTop}>
      <ArrowIcon
        src={getAssetPath('/icons/Icon_arrow_upward.svg')}
        alt='최상단으로'
      />
    </ScrollButton>
  );
}

const ScrollButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: calc(50% - 720px + 20px);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${color.gray['950']};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  z-index: 1000;

  @media (max-width: 1440px) {
    right: 20px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
`;
