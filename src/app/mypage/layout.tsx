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

import AccountIcon from '@/assets/icons/icon_account.svg';
import DownloadIcon from '@/assets/icons/icon_download.svg';
import HeadphoneIcon from '@/assets/icons/icon_headphone.svg';
import LogoutIcon from '@/assets/icons/icon_logout.svg';
import HomeIcon from '@/assets/icons/Icon_home.svg';
import WalletIcon from '@/assets/icons/icon_wallet.svg';
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

  const handleHomeClick = () => {
    router.push('/mypage');
  };

  const handleMyInfoClick = () => {
    router.push('/mypage');
  };

  const handlePlanManagementClick = () => {
    console.log('플랜 관리 클릭');
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
          title='마이페이지'
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
          <LNBItem
            value='홈'
            onClick={handleHomeClick}
            leadingIcon={HomeIcon}
          />
          <LNBItemGroup title='계정'>
            <LNBItem
              value='회원정보 수정'
              onClick={handleMyInfoClick}
              leadingIcon={AccountIcon}
            />
          </LNBItemGroup>
          <LNBItemGroup title='결제'>
            <LNBItem
              value='플랜 관리'
              onClick={handlePlanManagementClick}
              leadingIcon={WalletIcon}
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
