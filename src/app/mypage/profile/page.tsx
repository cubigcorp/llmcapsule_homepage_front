'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  TextButton,
  SolidButton,
  Divider,
  TextField,
  color,
  textColor,
  borderColor,
  typography,
  Modal,
} from '@cubig/design-system';
import { authService } from '@/services/auth';
import type { UserInfo } from '@/utils/api';

export default function ProfilePage() {
  const router = useRouter();
  const { t } = useTranslation('mypage');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [nameForm, setNameForm] = useState({
    lastName: '',
    firstName: '',
  });
  const [nameErrors, setNameErrors] = useState({
    lastName: '',
    firstName: '',
  });

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

  const handleNameEdit = () => {
    setNameForm({
      lastName: userInfo?.last_name || '',
      firstName: userInfo?.first_name || '',
    });
    setNameErrors({
      lastName: '',
      firstName: '',
    });
    setIsNameModalOpen(true);
  };

  const handleNameSave = async () => {
    // 에러 초기화
    setNameErrors({
      lastName: '',
      firstName: '',
    });

    if (!nameForm.lastName.trim()) {
      setNameErrors((prev) => ({ ...prev, lastName: '성을 입력해 주세요.' }));
      return;
    }
    if (!nameForm.firstName.trim()) {
      setNameErrors((prev) => ({
        ...prev,
        firstName: '이름을 입력해 주세요.',
      }));
      return;
    }

    try {
      const updateData = {
        update_fields: [
          {
            field: 'last_name',
            value: nameForm.lastName,
          },
          {
            field: 'first_name',
            value: nameForm.firstName,
          },
        ],
      };

      await authService.updateUserInfo(updateData);

      setUserInfo((prev) =>
        prev
          ? {
              ...prev,
              last_name: nameForm.lastName,
              first_name: nameForm.firstName,
            }
          : null
      );

      setIsNameModalOpen(false);
      console.log('Name updated successfully');
    } catch (error) {
      console.error('Failed to save name:', error);
    }
  };

  const handleNameCancel = () => {
    setIsNameModalOpen(false);
  };

  const handleFirstNameBlur = () => {
    if (!nameForm.firstName.trim()) {
      setNameErrors((prev) => ({
        ...prev,
        firstName: '이름을 입력해 주세요.',
      }));
    } else {
      setNameErrors((prev) => ({ ...prev, firstName: '' }));
    }
  };

  const handleLastNameBlur = () => {
    if (!nameForm.lastName.trim()) {
      setNameErrors((prev) => ({ ...prev, lastName: '성을 입력해 주세요.' }));
    } else {
      setNameErrors((prev) => ({ ...prev, lastName: '' }));
    }
  };

  const handlePasswordChange = () => {
    console.log('Change password');
  };

  const handleDeleteAccount = () => {
    console.log('Delete account');
  };

  if (loading) {
    return <LoadingContainer>{t('profile.loading')}</LoadingContainer>;
  }

  return (
    <Container>
      <FormContainer>
        <Header>
          <Title>{t('profile.title')}</Title>
          <Subtitle>{t('profile.subtitle')}</Subtitle>
        </Header>

        <Content>
          <Section>
            <SectionTitle>{t('profile.sectionUser')}</SectionTitle>

            <UserInfoContainer>
              <InfoField>
                <InfoContent>
                  <InfoLabelRow>
                    <InfoLabel>{t('profile.fields.name')}</InfoLabel>
                    <EditButton size='small' onClick={handleNameEdit}>
                      {t('profile.edit')}
                    </EditButton>
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
                    <InfoLabel>{t('profile.fields.phone')}</InfoLabel>
                    <EditButton size='small'>{t('profile.edit')}</EditButton>
                  </InfoLabelRow>
                  <InfoValue>{userInfo?.phone || '01012345678'}</InfoValue>
                </InfoContent>
              </InfoField>

              <StyledDivider />

              <InfoField>
                <InfoContent>
                  <InfoLabelRow>
                    <InfoLabel>{t('profile.fields.org')}</InfoLabel>
                    <EditButton size='small'>{t('profile.edit')}</EditButton>
                  </InfoLabelRow>
                  <InfoValue>{userInfo?.organization_name || '큐빅'}</InfoValue>
                </InfoContent>
              </InfoField>
            </UserInfoContainer>
          </Section>

          <Section>
            <SectionTitle>{t('profile.sectionAccount')}</SectionTitle>

            <AccountContainer>
              <InfoField>
                <InfoContent>
                  <InfoLabel>{t('profile.changePassword')}</InfoLabel>
                  <InfoValue>{t('profile.changePasswordDesc')}</InfoValue>
                </InfoContent>
                <SolidButton
                  variant='secondary'
                  size='small'
                  onClick={handlePasswordChange}
                >
                  {t('profile.edit')}
                </SolidButton>
              </InfoField>

              <StyledDivider />

              <InfoField>
                <InfoContent>
                  <InfoLabel>{t('profile.deleteAccount')}</InfoLabel>
                  <InfoValue>{t('profile.deleteAccountDesc')}</InfoValue>
                </InfoContent>
                <SolidButton
                  variant='secondary'
                  size='small'
                  onClick={handleDeleteAccount}
                >
                  {t('profile.deleteAccountBtn')}
                </SolidButton>
              </InfoField>
            </AccountContainer>
          </Section>
        </Content>
      </FormContainer>

      {/* 이름 수정 Modal */}
      <Modal
        open={isNameModalOpen}
        onClose={handleNameCancel}
        title={t('profile.editName')}
        size='small'
        actions={
          <ModalActions>
            <SolidButton variant='secondary' onClick={handleNameCancel}>
              {t('profile.cancel')}
            </SolidButton>
            <SolidButton variant='primary' onClick={handleNameSave}>
              {t('profile.save')}
            </SolidButton>
          </ModalActions>
        }
      >
        <ModalContent>
          <NameFieldsContainer>
            <TextField
              label={t('profile.fields.lastName')}
              value={nameForm.lastName}
              onChange={(e) =>
                setNameForm((prev) => ({ ...prev, lastName: e.target.value }))
              }
              onBlur={handleLastNameBlur}
              placeholder='예) 홍'
              description={nameErrors.lastName}
              status={nameErrors.lastName ? 'negative' : 'default'}
            />
            <TextField
              label={t('profile.fields.firstName')}
              value={nameForm.firstName}
              onChange={(e) =>
                setNameForm((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              onBlur={handleFirstNameBlur}
              placeholder='예) 길동'
              description={nameErrors.firstName}
              status={nameErrors.firstName ? 'negative' : 'default'}
            />
          </NameFieldsContainer>
        </ModalContent>
      </Modal>
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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameFieldsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ModalActions = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  justify-content: flex-end;
`;
