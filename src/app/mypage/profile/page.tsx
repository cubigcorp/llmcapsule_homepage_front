'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import {
  TextButton,
  SolidButton,
  Divider,
  color,
  textColor,
  borderColor,
  typography,
} from '@cubig/design-system';
import { authService } from '@/services/auth';
import type { UserInfo } from '@/utils/api';

export default function ProfilePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await authService.getMyInfo();
        const user = response.data;
        setUserInfo(user || null);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handlePasswordChange = () => {
    // TODO: 비밀번호 변경 로직
    console.log('Change password');
  };

  const handleDeleteAccount = () => {
    // TODO: 회원 탈퇴 로직
    console.log('Delete account');
  };

  if (loading) {
    return <LoadingContainer>로딩 중...</LoadingContainer>;
  }

  return (
    <Container>
      <FormContainer>
        <Header>
          <Title>회원정보 수정</Title>
          <Subtitle>
            연락처, 기본 설정 등 내 계정 정보를 관리할 수 있습니다.
          </Subtitle>
        </Header>

        <Content>
          <Section>
            <SectionTitle>회원 정보</SectionTitle>

            <UserInfoContainer>
              <InfoField>
                <InfoContent>
                  <InfoLabelRow>
                    <InfoLabel>이름</InfoLabel>
                    <EditButton size='small'>수정</EditButton>
                  </InfoLabelRow>
                  <InfoValue>
                    {userInfo?.last_name && userInfo?.first_name
                      ? `${userInfo.last_name}${userInfo.first_name}`
                      : userInfo?.last_name || userInfo?.first_name || '김규빅'}
                  </InfoValue>
                </InfoContent>
              </InfoField>

              <StyledDivider />

              <InfoField>
                <InfoContent>
                  <InfoLabelRow>
                    <InfoLabel>연락처</InfoLabel>
                    <EditButton size='small'>수정</EditButton>
                  </InfoLabelRow>
                  <InfoValue>{userInfo?.phone || '01012345678'}</InfoValue>
                </InfoContent>
              </InfoField>

              <StyledDivider />

              <InfoField>
                <InfoContent>
                  <InfoLabelRow>
                    <InfoLabel>회사/소속기관명</InfoLabel>
                    <EditButton size='small'>수정</EditButton>
                  </InfoLabelRow>
                  <InfoValue>{userInfo?.organization_name || '큐빅'}</InfoValue>
                </InfoContent>
              </InfoField>
            </UserInfoContainer>
          </Section>

          <Section>
            <SectionTitle>계정 관리</SectionTitle>

            <AccountContainer>
              <InfoField>
                <InfoContent>
                  <InfoLabel>비밀번호 변경</InfoLabel>
                  <InfoValue>
                    현재 비밀번호를 새 비밀번호로 업데이트할 수 있습니다.
                  </InfoValue>
                </InfoContent>
                <SolidButton
                  variant='secondary'
                  size='small'
                  onClick={handlePasswordChange}
                >
                  변경
                </SolidButton>
              </InfoField>

              <StyledDivider />

              <InfoField>
                <InfoContent>
                  <InfoLabel>회원 탈퇴</InfoLabel>
                  <InfoValue>
                    LLM Capsule 계정을 영구적으로 삭제합니다.
                  </InfoValue>
                </InfoContent>
                <SolidButton
                  variant='secondary'
                  size='small'
                  onClick={handleDeleteAccount}
                >
                  회원 탈퇴
                </SolidButton>
              </InfoField>
            </AccountContainer>
          </Section>
        </Content>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 64px 32px;
`;

const FormContainer = styled.div`
  max-width: 668px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 60px;
`;

const Title = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const UserInfoContainer = styled.div`
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  padding: 20px;
`;

const InfoField = styled.div`
  display: flex;
  padding: 0;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const InfoLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoLabel = styled.div`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const InfoValue = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const AccountContainer = styled.div`
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`;

const EditButton = styled(TextButton)`
  min-width: 48px;
  flex-shrink: 0;
`;

const StyledDivider = styled(Divider)`
  margin: 20px 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;
