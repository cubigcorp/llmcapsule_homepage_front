'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { SolidButton, TextButton, TextField } from '@cubig/design-system';
import {
  typography,
  textColor,
  color,
  radius,
  borderColor,
} from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';
import CarouselSection from '@/components/common/CarouselSection';
import { validatePassword, validateConfirmPassword } from '@/utils/validation';

export default function ResetPasswordVerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'password') {
      const result = validatePassword(value, false);
      setPasswordError(result.message);
      // 비밀번호 변경 시 확인 비밀번호도 재검증
      if (formData.confirmPassword) {
        const confirmResult = validateConfirmPassword(
          formData.confirmPassword,
          value,
          false
        );
        setConfirmPasswordError(confirmResult.message);
      }
    }

    if (field === 'confirmPassword') {
      const result = validateConfirmPassword(value, formData.password, false);
      setConfirmPasswordError(result.message);
    }
  };

  const handleResetPassword = async () => {
    // 비밀번호 유효성 검사
    const passwordResult = validatePassword(formData.password, true);
    if (!passwordResult.isValid) {
      setPasswordError(passwordResult.message);
      return;
    }

    // 비밀번호 확인 검사
    const confirmPasswordResult = validateConfirmPassword(
      formData.confirmPassword,
      formData.password,
      true
    );
    if (!confirmPasswordResult.isValid) {
      setConfirmPasswordError(confirmPasswordResult.message);
      return;
    }

    try {
      // TODO: 실제 비밀번호 재설정 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연으로 API 호출 시뮬레이션

      // 성공 시 로그인 페이지로 이동
      alert('비밀번호가 성공적으로 재설정되었습니다.');
      window.location.href = '/login';
    } catch (error) {
      alert('비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  // 비밀번호 재설정 버튼 활성화 조건
  const isResetButtonEnabled = () => {
    return (
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      !passwordError &&
      !confirmPasswordError
    );
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
            <Title>비밀번호 재설정</Title>

            <FormField>
              <TextField
                label='새 비밀번호'
                labelType='required'
                size='large'
                type='password'
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder='새 비밀번호 (8~20자, 영문+숫자+특수문자)'
                description={passwordError}
                status={passwordError ? 'negative' : 'default'}
              />
            </FormField>

            <FormField>
              <TextField
                label='비밀번호 확인'
                labelType='required'
                size='large'
                type='password'
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange('confirmPassword', e.target.value)
                }
                placeholder='비밀번호를 다시 입력해주세요.'
                description={confirmPasswordError}
                status={confirmPasswordError ? 'negative' : 'default'}
              />
            </FormField>

            <ResetButton
              size='large'
              onClick={handleResetPassword}
              disabled={!isResetButtonEnabled()}
            >
              비밀번호 재설정
            </ResetButton>

            <HelperText>
              비밀번호가 기억나셨나요?{' '}
              <Link href='/login'>
                <TextButton variant='secondary' size='small'>
                  로그인
                </TextButton>
              </Link>
            </HelperText>
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

const LogoWrapper = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  z-index: 10;
`;

const ResetPasswordWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: 1920px) {
    max-width: 1920px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ResetPasswordLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 40px 40px 40px;

  @media (max-width: 1920px) {
    padding: 120px 40px 40px 40px;
  }

  @media (max-width: 768px) {
    padding: 100px 20px 20px 20px;
  }

  @media (max-width: 375px) {
    padding: 80px 16px 16px 16px;
  }
`;

const ResetPasswordRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ResetPasswordForm = styled.div`
  width: 100%;
  max-width: 398px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  height: 100%;
`;

const Title = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0 0 60px 0;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 0 40px 0;
  }

  @media (max-width: 375px) {
    margin: 0 0 32px 0;
  }
`;

const FormField = styled.div`
  width: 100%;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 32px;
  }
`;

const ResetButton = styled(SolidButton)`
  width: 100%;
  margin-bottom: 32px;
`;

const HelperText = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  text-align: center;
`;
