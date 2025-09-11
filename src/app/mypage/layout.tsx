'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import {
  LNB,
  LNBItem,
  LNBItemGroup,
  Divider,
  borderColor,
  textColor,
} from '@cubig/design-system';
import {
  PersonIcon,
  AccountIcon,
  MoneyIcon,
  DownloadIcon,
  HeadphoneIcon,
  LogoutIcon,
} from '@/components/icons';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      router.push('/login');
      return;
    }

    setIsAuthenticated(true);
  }, [router]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      router.push('/');
    }
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleMyInfoClick = () => {
    router.push('/mypage');
  };

  const handlePlanManagementClick = () => {
    console.log('플랜 관리 클릭');
  };

  const handlePricingCalculatorClick = () => {
    router.push('/mypage/checkout');
  };

  const handleAppDownloadClick = () => {
    console.log('앱 다운로드 클릭');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container>
      <LNBWrapper>
        <LNB
          title='설정'
          bottom={
            <>
              <LNBItem
                value='문의하기'
                onClick={handleContactClick}
                leadingIcon={HeadphoneIcon}
                style={{ color: textColor.light['fg-neutral-alternative'] }}
              />
              <Divider />
              <LNBItem
                value='로그아웃'
                onClick={handleLogout}
                leadingIcon={LogoutIcon}
                style={{ color: textColor.light['fg-neutral-alternative'] }}
              />
            </>
          }
        >
          <LNBItemGroup title='계정'>
            <LNBItem
              value='내 정보'
              onClick={handleMyInfoClick}
              leadingIcon={PersonIcon}
            />
          </LNBItemGroup>

          <LNBItemGroup title='결제'>
            <LNBItem
              value='플랜 관리'
              onClick={handlePlanManagementClick}
              leadingIcon={AccountIcon}
            />
            <LNBItem
              value='요금 계산기'
              onClick={handlePricingCalculatorClick}
              leadingIcon={MoneyIcon}
            />
          </LNBItemGroup>

          <LNBItemGroup title='리소스'>
            <LNBItem
              value='앱 다운로드'
              onClick={handleAppDownloadClick}
              leadingIcon={DownloadIcon}
            />
          </LNBItemGroup>
        </LNB>
      </LNBWrapper>

      <ContentArea>{children}</ContentArea>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  padding-top: 80px;
`;

const LNBWrapper = styled.div`
  width: 260px;
  flex-shrink: 0;
  background: white;
  border-right: 1px solid ${borderColor.light['color-border-primary']};
  height: calc(100vh - 80px);
  position: sticky;
  top: 80px;
`;

const ContentArea = styled.div`
  flex: 1;
  min-height: calc(100vh - 80px);
`;
