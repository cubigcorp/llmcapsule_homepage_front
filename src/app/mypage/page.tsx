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
interface UserInfo {
  email: string;
  name?: string;
}

export default function MyPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        router.push('/login');
        return;
      }

      try {
        // TODO: 사용자 정보 API 호출
        // const userResponse = await authService.getUserInfo();
        // setUserInfo(userResponse.data);

        // 임시로 토큰에서 정보 추출 또는 기본값 설정
        setUserInfo({
          email: 'user@example.com', // 실제로는 API에서 가져와야 함
          name: '사용자',
        });
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
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

  if (isLoading) {
    return (
      <Container>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </Container>
    );
  }

  if (!userInfo) {
    return null;
  }

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleMyInfoClick = () => {
    // TODO: 내 정보 페이지로 이동 또는 모달 열기
    console.log('내 정보 클릭');
  };

  const handlePlanManagementClick = () => {
    console.log('플랜 관리 클릭');
  };

  const handlePricingCalculatorClick = () => {
    console.log('요금 계산기 클릭');
  };

  const handleAppDownloadClick = () => {
    console.log('앱 다운로드 클릭');
  };

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

      <ContentArea>
        <WelcomeMessage>
          안녕하세요, {userInfo.name || '사용자'}님!
        </WelcomeMessage>
        <UserInfo>
          <InfoItem>
            <Label>이메일:</Label>
            <Value>{userInfo.email}</Value>
          </InfoItem>
        </UserInfo>
      </ContentArea>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  padding-top: 80px;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 16px;
  color: #666;
  width: 100%;
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
  padding: 40px;
  background: #f8f9fa;
  min-height: calc(100vh - 80px);
`;

const WelcomeMessage = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 40px 0;
`;

const UserInfo = styled.div`
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 24px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-weight: 500;
  color: #666;
  width: 80px;
  flex-shrink: 0;
`;

const Value = styled.span`
  color: #1a1a1a;
`;
