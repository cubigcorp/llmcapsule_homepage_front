'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { spacing, TextButton, SolidButton } from '@cubig/design-system';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { authService } from '@/services/auth';
import { isDevStage } from '@/utils/env';
import type { UserInfo } from '@/utils/api';
import ArrowDownIcon from '@/assets/icons/icon_arrow-down.svg';
export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation('common');
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

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
    const checkLoginStatus = async () => {
      const accessToken = localStorage.getItem('access_token');
      const loggedIn = !!accessToken;
      setIsLoggedIn(loggedIn);

      // 로그인 상태이면 사용자 정보 조회
      if (loggedIn) {
        try {
          const response = await authService.getMyInfo();
          setUserInfo(response.data || null);
        } catch (error) {
          console.error('사용자 정보 조회 실패:', error);
          // 토큰이 유효하지 않은 경우 로그아웃 처리
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setIsLoggedIn(false);
          setUserInfo(null);
        }
      } else {
        setUserInfo(null);
      }
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

    // 주기적으로 로그인 상태 확인 (30초마다)
    const interval = setInterval(checkLoginStatus, 30000);

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
            <LanguageSwitcher />
            {isLoggedIn ? (
              <>
                <Link href='/contact'>
                  <SolidButton variant='primary' size='medium'>
                    {t('header.contact')}
                  </SolidButton>
                </Link>
                <Link href='/mypage'>
                  <TextButton
                    variant='primary'
                    size='medium'
                    trailingIcon={ArrowDownIcon}
                  >
                    {userInfo?.last_name && userInfo?.first_name
                      ? `${userInfo.last_name}${userInfo.first_name}`
                      : userInfo?.first_name || userInfo?.last_name || '사용자'}
                  </TextButton>
                </Link>
              </>
            ) : (
              <>
                {isDevStage && (
                  <Link href='/login'>
                    <TextButton variant='primary' size='medium'>
                      {t('header.login')}
                    </TextButton>
                  </Link>
                )}
                <Link href='/contact'>
                  <SolidButton variant='primary' size='medium'>
                    {t('header.contact')}
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
  gap: 12px;
`;

const Leading = styled.div`
  display: flex;
  align-items: center;
  gap: 64px;
`;
