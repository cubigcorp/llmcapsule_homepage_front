'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  spacing,
  TextButton,
  SolidButton,
  OutlineButton,
  borderColor,
} from '@cubig/design-system';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { authService } from '@/services/auth';
import type { UserInfo } from '@/utils/api';
import LogoIcon from '@/assets/icons/Logo.svg';
import ArrowDownIcon from '@/assets/icons/icon_arrow-down.svg';
export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation('common');
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);

  const scrollToSection = (sectionId: string) => {
    // 홈페이지가 아닌 경우 홈으로 이동 후 스크롤
    if (pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 72; // 헤더 높이
      const rect = element.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const targetTop = rect.top + scrollTop - headerHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      try {
        history.replaceState(null, '', `#${sectionId}`);
      } catch {}
    }
  };

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

      if (accessToken) {
        setIsLoadingUserInfo(true);
        try {
          const response = await authService.getMyInfo();

          if (!response.success || !response.data) {
            throw new Error('Failed to get user info');
          }

          setIsLoggedIn(true);
          setUserInfo(response.data);
        } catch (error) {
          console.error('사용자 정보 조회 실패:', error);

          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setIsLoggedIn(false);
          setUserInfo(null);

          if (
            typeof window !== 'undefined' &&
            !window.location.pathname.includes('/login') &&
            !window.location.pathname.includes('/signup') &&
            !window.location.pathname.includes('/verify') &&
            window.location.pathname.includes('/mypage')
          ) {
            window.location.href = '/login';
          }
        } finally {
          setIsLoadingUserInfo(false);
        }
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
        setIsLoadingUserInfo(false);
      }
    };

    checkLoginStatus();

    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    const interval = setInterval(checkLoginStatus, 600000);

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
                <LogoIcon />
              </Link>
            </LogoWrapper>
            <Menu>
              <TextButton
                variant='secondary'
                size='medium'
                onClick={() => scrollToSection('about-section')}
              >
                {t('header.about')}
              </TextButton>
              <TextButton
                variant='secondary'
                size='medium'
                onClick={() => scrollToSection('demo-section')}
              >
                {t('header.demo')}
              </TextButton>
              <TextButton
                variant='secondary'
                size='medium'
                onClick={() => scrollToSection('performance-section')}
              >
                {t('header.performance')}
              </TextButton>
              <TextButton
                variant='secondary'
                size='medium'
                onClick={() => scrollToSection('pricing-section')}
              >
                {t('header.pricing')}
              </TextButton>
              <TextButton
                variant='secondary'
                size='medium'
                onClick={() => scrollToSection('faq-section')}
              >
                {t('header.faq')}
              </TextButton>
            </Menu>
          </Leading>

          <ButtonGroup>
            <LanguageSwitcher />
            {isLoggedIn ? (
              <>
                <SolidButton
                  variant='primary'
                  size='medium'
                  onClick={() => scrollToSection('contact-section')}
                >
                  {t('header.contact')}
                </SolidButton>
                <Link href='/mypage'>
                  <TextButton variant='primary' size='medium'>
                    {isLoadingUserInfo
                      ? '...'
                      : userInfo?.last_name && userInfo?.first_name
                        ? `${userInfo.last_name}${userInfo.first_name}`
                        : userInfo?.first_name ||
                          userInfo?.last_name ||
                          '사용자'}
                  </TextButton>
                </Link>
              </>
            ) : (
              <>
                <Link href='/login'>
                  <OutlineButton variant='secondary' size='medium'>
                    {t('header.login')}
                  </OutlineButton>
                </Link>
                <SolidButton
                  variant='primary'
                  size='medium'
                  onClick={() => scrollToSection('contact-section')}
                >
                  {t('header.contact')}
                </SolidButton>
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
  height: 72px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${borderColor.light['color-border-primary']};
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
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
    padding: ${spacing.gap['gap-4']};
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
  gap: ${spacing.gap['gap-6']};
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    display: none;
  }
`;
