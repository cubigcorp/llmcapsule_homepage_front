'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { textColor } from '@cubig/design-system';

interface UserInfo {
  email: string;
  name?: string;
}

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: 'user@example.com', // 실제로는 API에서 가져와야 함
    name: '사용자',
  });

  // TODO: 추후 실제 API 호출로 사용자 정보 업데이트
  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const userResponse = await authService.getUserInfo();
  //       setUserInfo(userResponse.data);
  //     } catch (error) {
  //       console.error('사용자 정보 조회 실패:', error);
  //     }
  //   };
  //   fetchUserInfo();
  // }, []);

  return (
    <Container>
      <WelcomeMessage>
        안녕하세요, {userInfo.name || '사용자'}님!
      </WelcomeMessage>
      <UserInfo>
        <InfoItem>
          <Label>이메일:</Label>
          <Value>{userInfo.email}</Value>
        </InfoItem>
      </UserInfo>
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
`;

const WelcomeMessage = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${textColor.light['fg-neutral-primary']};
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
  color: ${textColor.light['fg-neutral-alternative']};
  width: 80px;
  flex-shrink: 0;
`;

const Value = styled.span`
  color: ${textColor.light['fg-neutral-primary']};
`;
