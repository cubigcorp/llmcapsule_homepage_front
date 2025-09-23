'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const { t } = useTranslation('mypage');
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
    router.push('/mypage/profile');
  };

  const handlePlanManagementClick = () => {
    router.push('/checkout');
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
          title={t('lnb.title')}
          bottom={
            <>
              <LNBItem
                value={t('lnb.bottom.contact')}
                onClick={handleContactClick}
                leadingIcon={HeadphoneIcon}
                style={{ color: textColor.light['fg-neutral-alternative'] }}
              />
              <Divider />
              <LNBItem
                value={t('lnb.bottom.logout')}
                onClick={handleLogout}
                leadingIcon={LogoutIcon}
                style={{ color: textColor.light['fg-neutral-alternative'] }}
              />
            </>
          }
        >
          <LNBItem
            value={t('lnb.items.home')}
            onClick={handleHomeClick}
            leadingIcon={HomeIcon}
            selected={pathname === '/mypage'}
          />
          <LNBItemGroup title={t('lnb.groups.account')}>
            <LNBItem
              value={t('lnb.items.profile')}
              onClick={handleMyInfoClick}
              leadingIcon={AccountIcon}
              selected={pathname === '/mypage/profile'}
            />
          </LNBItemGroup>
          <LNBItemGroup title={t('lnb.groups.payment')}>
            <LNBItem
              value={t('lnb.items.checkout')}
              onClick={handlePlanManagementClick}
              leadingIcon={WalletIcon}
              selected={pathname === '/checkout'}
            />
          </LNBItemGroup>
          <LNBItemGroup title={t('lnb.groups.resources')}>
            <LNBItem
              value={t('lnb.items.download')}
              onClick={() => router.push('/mypage/download')}
              leadingIcon={DownloadIcon}
              selected={pathname === '/mypage/download'}
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
  padding-top: 72px;
`;

const LNBWrapper = styled.div`
  width: 260px;
  flex-shrink: 0;
  background: white;
  border-right: 1px solid ${borderColor.light['color-border-primary']};
  height: calc(100vh - 72px);
  position: sticky;
  top: 72px;
`;

const ContentArea = styled.div`
  flex: 1;
  min-height: calc(100vh - 72px);
`;
