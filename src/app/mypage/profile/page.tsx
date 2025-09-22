'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Image from 'next/image';
import {
  TextButton,
  SolidButton,
  Divider,
  TextField,
  Dropdown,
  color,
  textColor,
  borderColor,
  typography,
  Modal,
  Checkbox,
} from '@cubig/design-system';
import { authService } from '@/services/auth';
import type { UserInfo } from '@/utils/api';
import { countries } from '@/utils/countries';
import { otpService } from '@/services/otp';
import { env } from '@/utils/env';

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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    country: '',
    contactNumber: '',
  });
  const [contactErrors, setContactErrors] = useState({
    country: '',
    contactNumber: '',
  });
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    company: '',
  });
  const [companyError, setCompanyError] = useState('');

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

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordCancel = () => {
    setIsPasswordModalOpen(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handlePasswordSave = () => {
    console.log('Password change API call - not implemented yet');
    setIsPasswordModalOpen(false);
  };

  const handlePasswordInputChange = (field: string, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
    setPasswordErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleCurrentPasswordBlur = () => {
    if (!passwordForm.currentPassword.trim()) {
      setPasswordErrors((prev) => ({
        ...prev,
        currentPassword: '현재 비밀번호를 입력해 주세요.',
      }));
    } else {
      setPasswordErrors((prev) => ({ ...prev, currentPassword: '' }));
    }
  };

  const handleNewPasswordBlur = () => {
    if (!passwordForm.newPassword.trim()) {
      setPasswordErrors((prev) => ({
        ...prev,
        newPassword: '새 비밀번호를 입력해 주세요.',
      }));
    } else if (
      passwordForm.newPassword.length < 8 ||
      passwordForm.newPassword.length > 20
    ) {
      setPasswordErrors((prev) => ({
        ...prev,
        newPassword: '비밀번호는 8~20자로 입력해 주세요.',
      }));
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(
        passwordForm.newPassword
      )
    ) {
      setPasswordErrors((prev) => ({
        ...prev,
        newPassword: '영문, 숫자, 특수문자를 포함해 주세요.',
      }));
    } else {
      setPasswordErrors((prev) => ({ ...prev, newPassword: '' }));
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (!passwordForm.confirmPassword.trim()) {
      setPasswordErrors((prev) => ({
        ...prev,
        confirmPassword: '비밀번호 확인을 입력해 주세요.',
      }));
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordErrors((prev) => ({
        ...prev,
        confirmPassword: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setPasswordErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleContactEdit = () => {
    setContactForm({
      country: '',
      contactNumber: '',
    });
    setContactErrors({
      country: '',
      contactNumber: '',
    });
    setIsVerificationSent(false);
    setVerificationCode('');
    setVerificationError('');
    setIsVerificationCompleted(false);
    setIsTimerRunning(false);
    setSelectedCountry(null);
    setIsContactModalOpen(true);
  };

  const handleContactCancel = () => {
    setIsContactModalOpen(false);
  };

  const handleContactInputChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));

    if (field === 'contactNumber') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setContactForm((prev) => ({ ...prev, contactNumber: numericValue }));
    }
  };

  const handleCountryChange = (value: string) => {
    setContactForm((prev) => ({ ...prev, country: value }));
    const country = countries.find((c) => c.value === value);
    if (country) {
      setSelectedCountry(country);
      setContactErrors((prev) => ({ ...prev, country: '' }));
    } else {
      setSelectedCountry(null);
    }
  };

  const extractCountryCode = (countryValue: string): string => {
    const match = countryValue.match(/\+(\d+)/);
    return match ? match[1] : '';
  };

  const startTimer = () => {
    setTimeLeft(120);
    setIsTimerRunning(true);
    setVerificationError('');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setVerificationError(
              '인증 시간이 만료되었습니다. 다시 시도해 주세요.'
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const handleRequestVerification = async () => {
    if (!contactForm.contactNumber.trim()) {
      setContactErrors((prev) => ({
        ...prev,
        contactNumber: '휴대폰 번호를 입력해주세요.',
      }));
      return;
    }
    if (!selectedCountry) {
      setContactErrors((prev) => ({
        ...prev,
        country: '국가를 선택해주세요.',
      }));
      return;
    }

    setContactErrors({
      country: '',
      contactNumber: '',
    });

    try {
      const response = await otpService.sendOtp(
        {
          phone: contactForm.contactNumber,
          country_code: extractCountryCode(selectedCountry.value),
          otp_type: 'phone',
          service_name: 'cubig-auth',
        },
        env.OTP_API_KEY
      );
      if (response.success) {
        setIsVerificationSent(true);
        startTimer();
      } else {
        alert('인증번호 전송에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch {
      alert('인증번호 전송에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setVerificationError('인증번호를 입력해 주세요.');
      return;
    }

    setVerificationError('');

    try {
      const response = await otpService.verifyOtp(
        {
          phone: contactForm.contactNumber,
          otp_type: 'phone',
          otp: verificationCode,
        },
        env.OTP_API_KEY
      );
      if (response.success) {
        setIsVerificationCompleted(true);
        setIsTimerRunning(false);
        setVerificationError('');
      } else {
        setVerificationError('인증번호가 일치하지 않습니다.');
      }
    } catch {
      setVerificationError('인증번호가 일치하지 않습니다.');
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await otpService.sendOtp(
        {
          phone: contactForm.contactNumber,
          country_code: extractCountryCode(selectedCountry!.value),
          otp_type: 'phone',
          service_name: 'cubig-auth',
        },
        env.OTP_API_KEY
      );
      if (response.success) {
        startTimer();
      } else {
        alert('인증번호 재발송에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch {
      alert('인증번호 재발송에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleContactChange = async () => {
    if (!contactForm.contactNumber.trim()) {
      setContactErrors((prev) => ({
        ...prev,
        contactNumber: '휴대폰 번호를 입력해주세요.',
      }));
      return;
    }
    if (!selectedCountry) {
      setContactErrors((prev) => ({
        ...prev,
        country: '국가를 선택해주세요.',
      }));
      return;
    }
    if (!isVerificationCompleted) {
      setVerificationError('인증을 완료해주세요.');
      return;
    }

    try {
      const updateData = {
        update_fields: [
          {
            field: 'phone',
            value: contactForm.contactNumber,
          },
          {
            field: 'phone_country_code',
            value: extractCountryCode(selectedCountry.value),
          },
        ],
      };

      await authService.updateUserInfo(updateData);

      setUserInfo((prev) =>
        prev
          ? {
              ...prev,
              phone: contactForm.contactNumber,
            }
          : null
      );

      setIsContactModalOpen(false);
      console.log('Contact changed successfully');
    } catch (error) {
      console.error('Failed to update contact:', error);
      alert('연락처 변경에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleCompanyEdit = () => {
    setCompanyForm({
      company: userInfo?.organization_name || '',
    });
    setCompanyError('');
    setIsCompanyModalOpen(true);
  };

  const handleCompanyCancel = () => {
    setIsCompanyModalOpen(false);
  };

  const handleCompanySave = async () => {
    if (!companyForm.company.trim()) {
      setCompanyError('회사명을 입력해 주세요.');
      return;
    }

    try {
      const updateData = {
        update_fields: [
          {
            field: 'organization_name',
            value: companyForm.company,
          },
        ],
      };

      await authService.updateUserInfo(updateData);

      setUserInfo((prev) =>
        prev
          ? {
              ...prev,
              organization_name: companyForm.company,
            }
          : null
      );

      setIsCompanyModalOpen(false);
      console.log('Company updated successfully');
    } catch (error) {
      console.error('Failed to update company:', error);
      alert('회사명 변경에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteAgreed, setIsDeleteAgreed] = useState(false);

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setIsDeleteAgreed(false);
  };

  const handleDeleteConfirm = () => {
    if (!isDeleteAgreed) {
      return;
    }
    console.log('Delete account API call - not implemented yet');
    setIsDeleteModalOpen(false);
    setIsDeleteAgreed(false);
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
                    <EditButton size='small' onClick={handleContactEdit}>
                      {t('profile.edit')}
                    </EditButton>
                  </InfoLabelRow>
                  <InfoValue>{userInfo?.phone || '01012345678'}</InfoValue>
                </InfoContent>
              </InfoField>

              <StyledDivider />

              <InfoField>
                <InfoContent>
                  <InfoLabelRow>
                    <InfoLabel>{t('profile.fields.org')}</InfoLabel>
                    <EditButton size='small' onClick={handleCompanyEdit}>
                      {t('profile.edit')}
                    </EditButton>
                  </InfoLabelRow>
                  <InfoValue>{userInfo?.organization_name || '큐빅'}</InfoValue>
                </InfoContent>
              </InfoField>
            </UserInfoContainer>
          </Section>

          <Section>
            <SectionTitle>{t('profile.sectionAccount')}</SectionTitle>

            <AccountContainer>
              {!userInfo?.is_social_login && (
                <>
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
                </>
              )}

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
        title={t('profile.changeName')}
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

      {/* 연락처 변경 Modal */}
      <Modal
        open={isContactModalOpen}
        onClose={handleContactCancel}
        title={t('profile.changeContact')}
        size='small'
        actions={
          <ModalActions>
            <SolidButton variant='secondary' onClick={handleContactCancel}>
              {t('profile.cancel')}
            </SolidButton>
            {!isVerificationSent ? (
              <SolidButton
                variant='primary'
                onClick={handleRequestVerification}
                disabled={
                  !contactForm.country || !contactForm.contactNumber.trim()
                }
              >
                {t('profile.requestVerification')}
              </SolidButton>
            ) : (
              <SolidButton
                variant='primary'
                onClick={handleContactChange}
                disabled={!isVerificationCompleted}
              >
                {t('profile.change')}
              </SolidButton>
            )}
          </ModalActions>
        }
      >
        <ModalContent>
          <ContactFieldsContainer>
            <Dropdown
              type='combobox'
              label={t('profile.country')}
              size='large'
              value={contactForm.country}
              onChange={handleCountryChange}
              options={countries}
              description={contactErrors.country}
              status={contactErrors.country ? 'negative' : 'default'}
            />
            <TextField
              label={t('profile.contactNumber')}
              size='large'
              value={contactForm.contactNumber}
              onChange={(e) =>
                handleContactInputChange('contactNumber', e.target.value)
              }
              placeholder='휴대폰 번호를 입력해 주세요.'
              description={
                isVerificationCompleted ? '' : contactErrors.contactNumber
              }
              status={
                isVerificationCompleted
                  ? 'positive'
                  : contactErrors.contactNumber
                    ? 'negative'
                    : 'default'
              }
              inputMode='numeric'
              pattern='[0-9]*'
              disabled={isVerificationCompleted}
            />
          </ContactFieldsContainer>

          {isVerificationSent && !isVerificationCompleted && (
            <VerificationSection>
              <VerificationRow>
                <VerificationInputContainer>
                  <TextField
                    size='large'
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                      if (verificationError) {
                        setVerificationError('');
                      }
                    }}
                    placeholder={t('profile.verificationCode')}
                    description={verificationError}
                    status={verificationError ? 'negative' : 'default'}
                  />
                  <VerificationActions>
                    <ResendButton onClick={handleResendCode}>
                      {t('profile.resendCode')}
                    </ResendButton>
                    {isTimerRunning && (
                      <TimerContainer>
                        <TimerText>
                          <Image
                            src={'/icons/Icon_history.svg'}
                            alt='Timer'
                            width={16}
                            height={16}
                          />
                          <TimeText>{formatTime(timeLeft)}</TimeText>
                          <RemainingText>
                            {' '}
                            {t('profile.timeRemaining')}
                          </RemainingText>
                        </TimerText>
                      </TimerContainer>
                    )}
                  </VerificationActions>
                </VerificationInputContainer>
                <VerifyButton
                  variant='secondary'
                  size='large'
                  onClick={handleVerifyCode}
                  disabled={isVerificationCompleted}
                >
                  {t('profile.verify')}
                </VerifyButton>
              </VerificationRow>
            </VerificationSection>
          )}
        </ModalContent>
      </Modal>

      {/* 회사/소속기관명 변경 Modal */}
      <Modal
        open={isCompanyModalOpen}
        onClose={handleCompanyCancel}
        title={t('profile.changeCompany')}
        size='small'
        actions={
          <ModalActions>
            <SolidButton variant='secondary' onClick={handleCompanyCancel}>
              {t('profile.cancel')}
            </SolidButton>
            <SolidButton variant='primary' onClick={handleCompanySave}>
              {t('profile.save')}
            </SolidButton>
          </ModalActions>
        }
      >
        <ModalContent>
          <TextField
            label={t('profile.companyName')}
            size='large'
            value={companyForm.company}
            onChange={(e) => setCompanyForm({ company: e.target.value })}
            placeholder={t('profile.companyPlaceholder')}
            description={companyError}
            status={companyError ? 'negative' : 'default'}
            maxLength={50}
          />
        </ModalContent>
      </Modal>

      {/* 비밀번호 변경 Modal */}
      <Modal
        open={isPasswordModalOpen}
        onClose={handlePasswordCancel}
        title={t('profile.changePassword')}
        size='small'
        actions={
          <ModalActions>
            <SolidButton variant='secondary' onClick={handlePasswordCancel}>
              {t('profile.cancel')}
            </SolidButton>
            <SolidButton variant='primary' onClick={handlePasswordSave}>
              {t('profile.save')}
            </SolidButton>
          </ModalActions>
        }
      >
        <ModalContent>
          <TextField
            label={t('profile.currentPassword')}
            size='large'
            type='password'
            value={passwordForm.currentPassword}
            onChange={(e) =>
              handlePasswordInputChange('currentPassword', e.target.value)
            }
            placeholder={t('profile.currentPasswordPlaceholder')}
            description={passwordErrors.currentPassword}
            status={passwordErrors.currentPassword ? 'negative' : 'default'}
            onBlur={handleCurrentPasswordBlur}
          />
          <TextField
            label={t('profile.newPassword')}
            size='large'
            type='password'
            value={passwordForm.newPassword}
            onChange={(e) =>
              handlePasswordInputChange('newPassword', e.target.value)
            }
            placeholder={t('profile.newPasswordPlaceholder')}
            description={passwordErrors.newPassword}
            status={passwordErrors.newPassword ? 'negative' : 'default'}
            onBlur={handleNewPasswordBlur}
          />
          <TextField
            label={t('profile.confirmPassword')}
            size='large'
            type='password'
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              handlePasswordInputChange('confirmPassword', e.target.value)
            }
            placeholder={t('profile.confirmPasswordPlaceholder')}
            description={passwordErrors.confirmPassword}
            status={passwordErrors.confirmPassword ? 'negative' : 'default'}
            onBlur={handleConfirmPasswordBlur}
          />
        </ModalContent>
      </Modal>

      {/* 회원 탈퇴 Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        title={t('profile.deleteAccountTitle')}
        size='small'
        actions={
          <ModalActions>
            <SolidButton variant='secondary' onClick={handleDeleteCancel}>
              {t('profile.cancel')}
            </SolidButton>
            <SolidButton
              variant='negative'
              onClick={handleDeleteConfirm}
              disabled={!isDeleteAgreed}
            >
              {t('profile.deleteAccountBtn')}
            </SolidButton>
          </ModalActions>
        }
      >
        <ModalContent>
          <DeleteWarningText>
            {t('profile.deleteAccountWarning')}
          </DeleteWarningText>
          <CheckboxContainer>
            <Checkbox
              variant='primary'
              state={isDeleteAgreed ? 'checked' : 'unchecked'}
              onChange={(checked) => setIsDeleteAgreed(checked)}
            />
            <CheckboxLabel>{t('profile.deleteAccountAgreement')}</CheckboxLabel>
          </CheckboxContainer>
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
  gap: 12px;
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

const ContactFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const VerificationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const VerificationRow = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 8px;
  align-items: flex-start;
`;

const VerificationInputContainer = styled.div`
  flex: 1;
`;

const VerificationActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: ${textColor.light['fg-neutral-primary']};
  text-decoration: underline;
  cursor: pointer;
  ${typography('ko', 'body2', 'medium')}

  &:disabled {
    color: ${textColor.light['fg-neutral-disable']};
    cursor: not-allowed;
    text-decoration: none;
  }

  &:hover:not(:disabled) {
    color: ${textColor.light['fg-neutral-strong']};
  }
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TimerText = styled.span`
  ${typography('ko', 'caption2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  display: flex;
  align-items: center;
  gap: 4px;
`;
const TimeText = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const RemainingText = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const VerifyButton = styled(SolidButton)`
  width: 95px;
`;

const DeleteWarningText = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 8px;
  background-color: ${color.gray['50']};
`;

const CheckboxLabel = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
`;
