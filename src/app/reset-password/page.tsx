'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import {
  SolidButton,
  TextButton,
  TextField,
  toast,
} from '@cubig/design-system';
import { typography, textColor } from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';
import CarouselSection from '@/components/common/CarouselSection';
import EmailVerificationSection from '@/components/common/EmailVerificationSection';
import { authService } from '@/services/auth';
import { validateEmail } from '@/utils/validation';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // 실시간 이메일 검증
    const result = validateEmail(value, false);
    setEmailError(result.message);
  };

  const handleSubmit = async () => {
    // 이메일 유효성 검사
    const emailResult = validateEmail(email, true);
    if (!emailResult.isValid) {
      setEmailError(emailResult.message);
      return;
    }

    setEmailError('');

    try {
      // 실제 비밀번호 재설정 API 호출
      const response = await authService.requestPasswordReset({
        email: email,
        redirect_url: `${window.location.origin}/reset-password/verify`,
      });

      if (response.success) {
        // 성공 시 이메일 확인 화면으로 변경
        setIsEmailSent(true);
      } else {
        // 실패 시 에러 메시지 표시
        setEmailError('입력하신 정보를 다시 확인해주세요.');
      }
    } catch {
      // 실패 시 에러 메시지 표시
      setEmailError('입력하신 정보를 다시 확인해주세요.');
    }
  };

  const handleResendEmail = async () => {
    try {
      // 실제 비밀번호 재설정 이메일 재발송 API 호출
      const response = await authService.requestPasswordReset({
        email: email,
        redirect_url: `${window.location.origin}/reset-password/verify`,
      });

      if (response.success) {
        toast.success(
          '인증 메일을 재발송하였습니다.\n메일함을 확인해주시기 바랍니다.'
        );
      } else {
        toast.error('이메일 재발송에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch {
      toast.error('이메일 재발송에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  // 버튼 활성화 조건
  const isSubmitButtonEnabled = () => {
    return email.trim() !== '' && !validateEmail(email, false).message;
  };

  return (
    <ResetPasswordContainer>
      <ResetPasswordWrapper>
        <LogoWrapper>
          <Link href='/'>
            <Image
              src={getAssetPath('/icons/Logo.svg')}
              alt='Logo'
              width={32}
              height={32}
            />
          </Link>
        </LogoWrapper>
        <ResetPasswordLeft>
          <ResetPasswordForm>
            {!isEmailSent ? (
              <>
                <Title>비밀번호 재설정</Title>

                <FormField>
                  <TextField
                    label='이메일'
                    size='large'
                    value={email}
                    onChange={handleEmailChange}
                    placeholder='Email@example.com'
                    description={emailError}
                    status={emailError ? 'negative' : 'default'}
                  />
                </FormField>

                <SubmitButton
                  size='large'
                  onClick={handleSubmit}
                  disabled={!isSubmitButtonEnabled()}
                >
                  재설정 이메일 보내기
                </SubmitButton>

                <HelperText>
                  이메일이 기억나지 않으시나요?{' '}
                  <Link href='/contact'>
                    <TextButton variant='secondary' size='small'>
                      문의하기
                    </TextButton>
                  </Link>
                </HelperText>
              </>
            ) : (
              <EmailVerificationSection
                email={email}
                onResendEmail={handleResendEmail}
                type='password-reset'
              />
            )}
          </ResetPasswordForm>
        </ResetPasswordLeft>

        <ResetPasswordRight>
          <CarouselSection />
        </ResetPasswordRight>
      </ResetPasswordWrapper>
    </ResetPasswordContainer>
  );
}

const ResetPasswordContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const ResetPasswordWrapper = styled.div`
  max-width: ${({ theme }) => theme.container.lg};
  margin: 0 auto;
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: 1921px) {
    max-width: ${({ theme }) => theme.container.xl};
  }

  ${({ theme }) => theme.media.maxMd} {
    flex-direction: column;
  }
`;

const ResetPasswordLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 160px ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};

  ${({ theme }) => theme.media.maxXl} {
    padding: 160px ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
  }

  ${({ theme }) => theme.media.maxMd} {
    padding: 100px ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  }

  ${({ theme }) => theme.media.maxSm} {
    padding: 80px ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm};
  }
`;

const ResetPasswordRight = styled.div`
  flex: 1;

  ${({ theme }) => theme.media.maxMd} {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  z-index: 10;
`;

const ResetPasswordForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 400px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const Title = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: -200px 0 60px 0;
  text-align: center;

  @media (max-width: 768px) {
    ${typography('ko', 'heading2', 'bold')}
    margin: -100px 0 40px 0;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const SubmitButton = styled(SolidButton)`
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const HelperText = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  text-align: center;
  margin-top: 8px;
`;
