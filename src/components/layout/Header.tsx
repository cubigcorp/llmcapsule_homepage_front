'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { spacing, TextButton, SolidButton } from '@cubig/design-system';
import { authService } from '@/services/auth';
import { getEnvironmentConfig } from '@/utils/env';

export default function Header() {
  const pathname = usePathname();
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isDevelopment } = getEnvironmentConfig();

  useEffect(() => {
    setIsAuthPage(
      pathname === '/login' ||
        pathname === '/login/' ||
        pathname === '/signup' ||
        pathname === '/signup/' ||
        pathname.startsWith('/signup/verify') ||
        pathname.startsWith('/signup/invalid-token') ||
        pathname.startsWith('/signup/success') ||
        pathname.startsWith('/signup/fail') ||
        pathname === '/reset-password' ||
        pathname === '/reset-password/' ||
        pathname.startsWith('/reset-password/verify') ||
        pathname === '/contact' ||
        pathname === '/contact/'
    );

    // 로그인 상태 확인
    const accessToken = localStorage.getItem('access_token');
    setIsLoggedIn(!!accessToken);

    setIsLoaded(true);
  }, [pathname]);

  // 로그인 상태 변화 감지를 위한 추가 useEffect
  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = localStorage.getItem('access_token');
      setIsLoggedIn(!!accessToken);
    };

    // 초기 상태 확인
    checkLoginStatus();

    // storage 이벤트 리스너 추가 (다른 탭에서 로그인/로그아웃 시)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token' || e.key === 'refresh_token') {
        checkLoginStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // 주기적으로 로그인 상태 확인 (5초마다)
    const interval = setInterval(checkLoginStatus, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // 초기 로딩 중이거나 인증 페이지인 경우 헤더를 숨김
  if (!isLoaded || isAuthPage) {
    return null;
  }
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <GNB>
          <Leading>
            <LogoWrapper>
              <Link href='/'>
                <Image
                  src={'/icons/Logo.svg'}
                  alt='Logo'
                  width={32}
                  height={32}
                />
              </Link>
            </LogoWrapper>
            {/* <Menu>
              <TextButton variant='primary' size='medium'>
                제품소개
              </TextButton>
              <TextButton variant='primary' size='medium'>
                구매
              </TextButton>
              <TextButton variant='primary' size='medium'>
                회사소개
              </TextButton>
            </Menu> */}
          </Leading>

          <ButtonGroup>
            {isLoggedIn ? (
              <>
                <TextButton
                  variant='primary'
                  size='medium'
                  onClick={async () => {
                    try {
                      // 로그아웃 API 호출
                      await authService.logout();
                    } catch (error) {
                      console.error('로그아웃 API 호출 실패:', error);
                    } finally {
                      // 성공/실패 관계없이 클라이언트 토큰 제거
                      localStorage.removeItem('access_token');
                      localStorage.removeItem('refresh_token');
                      setIsLoggedIn(false);
                      window.location.href = '/';
                    }
                  }}
                >
                  로그아웃
                </TextButton>
                <Link href='/contact'>
                  <SolidButton variant='primary' size='medium'>
                    문의하기
                  </SolidButton>
                </Link>
              </>
            ) : (
              <>
                {isDevelopment && (
                  <Link href='/login'>
                    <TextButton variant='primary' size='medium'>
                      로그인
                    </TextButton>
                  </Link>
                )}
                <Link href='/contact'>
                  <SolidButton variant='primary' size='medium'>
                    문의하기
                  </SolidButton>
                </Link>
              </>
            )}
          </ButtonGroup>
        </GNB>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: white;
  height: 80px;
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (min-width: 1920px) {
    max-width: 1920px;
    padding: 0 120px;
  }

  @media (max-width: 1440px) {
    padding: 0 24px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  @media (max-width: 375px) {
    padding: 0 12px;
  }
`;

const GNB = styled.div`
  display: flex;
  padding: ${spacing.gap['gap-1']} ${spacing.gap['gap-1']};
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 375px) {
    gap: 4px;
  }
`;

const Leading = styled.div`
  display: flex;
  align-items: center;
  gap: 64px;
`;
