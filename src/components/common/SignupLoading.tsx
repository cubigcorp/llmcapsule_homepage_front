'use client';

import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/animations/loading.json';
import CarouselSection from './CarouselSection';

export default function SignupLoading() {
  return (
    <SignupContainer>
      <SignupWrapper>
        <SignupLeft>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Lottie
                animationData={loadingAnimation}
                style={{ width: 120, height: 120 }}
                loop={true}
              />
            </div>
          </div>
        </SignupLeft>
        <SignupRight>
          <CarouselSection />
        </SignupRight>
      </SignupWrapper>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const SignupWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const SignupLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupRight = styled.div`
  flex: 1;

  @media (max-width: 992px) {
    display: none;
  }
`;
