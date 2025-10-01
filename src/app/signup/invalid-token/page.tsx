'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { SolidButton, toast } from '@cubig/design-system';
import { typography, textColor } from '@cubig/design-system';
import CarouselSection from '@/components/common/CarouselSection';
import SignupLoading from '@/components/common/SignupLoading';
import { authService } from '@/services/auth';

function InvalidTokenContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const ResendIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M4.23385 7.99994C4.23385 8.15039 4.2443 8.30294 4.26519 8.45761C4.28619 8.61239 4.31208 8.76155 4.34285 8.90511C4.3633 9.01367 4.35047 9.12433 4.30435 9.23711C4.25824 9.34989 4.17874 9.42339 4.06585 9.45761C3.9573 9.4875 3.84941 9.47594 3.74219 9.42294C3.63497 9.36994 3.56552 9.28922 3.53385 9.18078C3.4783 8.99611 3.43663 8.80483 3.40885 8.60694C3.38108 8.40917 3.36719 8.20683 3.36719 7.99994C3.36719 6.7025 3.82447 5.59761 4.73902 4.68528C5.65358 3.77283 6.77408 3.33328 8.10052 3.36661H8.50435L7.68902 2.55128C7.59669 2.45894 7.54947 2.35678 7.54735 2.24478C7.54524 2.13289 7.59247 2.02861 7.68902 1.93194C7.78558 1.83539 7.88874 1.78711 7.99852 1.78711C8.10841 1.78711 8.21163 1.83539 8.30819 1.93194L9.80435 3.42811C9.9138 3.53755 9.96852 3.6615 9.96852 3.79994C9.96852 3.93839 9.9138 4.06233 9.80435 4.17178L8.30819 5.66794C8.21585 5.76017 8.11652 5.80461 8.01019 5.80128C7.90374 5.79783 7.80224 5.74783 7.70569 5.65128C7.60913 5.55461 7.56085 5.45139 7.56085 5.34161C7.56085 5.23183 7.60913 5.12861 7.70569 5.03194L8.50435 4.23328H8.10052C7.00908 4.21105 6.09174 4.5715 5.34852 5.31461C4.60541 6.05783 4.23385 6.95294 4.23385 7.99994ZM11.7672 7.99994C11.7672 7.8495 11.7567 7.69694 11.7359 7.54228C11.7149 7.3875 11.689 7.23833 11.6582 7.09478C11.6377 6.97511 11.6506 6.86167 11.6967 6.75444C11.7428 6.64722 11.8223 6.57094 11.9352 6.52561C12.0437 6.48461 12.1478 6.48783 12.2474 6.53528C12.3469 6.58272 12.4125 6.66067 12.444 6.76911C12.4996 6.96489 12.5451 7.1645 12.5807 7.36794C12.6161 7.57128 12.6339 7.78194 12.6339 7.99994C12.6339 9.28628 12.1766 10.3884 11.262 11.3063C10.3475 12.2243 9.22697 12.6666 7.90052 12.6333H7.49669L8.31202 13.4486C8.40435 13.5409 8.45158 13.6431 8.45369 13.7551C8.4558 13.867 8.40858 13.9713 8.31202 14.0679C8.21547 14.1645 8.1123 14.2128 8.00252 14.2128C7.89263 14.2128 7.78941 14.1645 7.69285 14.0679L6.19669 12.5718C6.08724 12.4623 6.03252 12.3384 6.03252 12.1999C6.03252 12.0615 6.08724 11.9376 6.19669 11.8281L7.69285 10.3319C7.78519 10.2397 7.8873 10.1925 7.99919 10.1903C8.11119 10.1882 8.21547 10.2354 8.31202 10.3319C8.40858 10.4286 8.45685 10.5318 8.45685 10.6416C8.45685 10.7514 8.40858 10.8546 8.31202 10.9513L7.49669 11.7666H7.90052C8.99197 11.7888 9.9093 11.4284 10.6525 10.6853C11.3956 9.94205 11.7672 9.04694 11.7672 7.99994Z'
        fill='#171719'
      />
    </svg>
  );

  const handleResendEmail = async () => {
    try {
      const response = await authService.verifyEmail({
        email: email,
        password: '',
        redirect_url: `${window.location.origin}/signup/verify`,
        service_name: '',
      });

      if (response.success) {
        toast.success(
          '인증 메일을 재발송하였습니다.\n메일함을 확인해주시기 바랍니다.'
        );
      } else {
        toast.error('이메일 재발송에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('Email resend error:', error);
      toast.error('이메일 재발송에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <SignupContainer>
      <SignupWrapper>
        <LogoWrapper>
          <Link href='/'>
            <Image src={'/icons/Logo.svg'} alt='Logo' width={32} height={32} />
          </Link>
        </LogoWrapper>
        <SignupLeft>
          <SignupForm>
            <Image
              src={'/icons/Icon_error.svg'}
              alt='Error'
              width={48}
              height={48}
            />
            <Title>
              잘못된 인증 링크입니다.
              <br />
              인증을 다시 시도해주세요.
            </Title>
            <RetryButton
              variant='secondary'
              size='small'
              onClick={handleResendEmail}
              leadingIcon={ResendIcon}
            >
              메일 재발송
            </RetryButton>
          </SignupForm>
        </SignupLeft>

        <SignupRight>
          <CarouselSection />
        </SignupRight>
      </SignupWrapper>
    </SignupContainer>
  );
}

export default function InvalidTokenPage() {
  return (
    <Suspense fallback={<SignupLoading />}>
      <InvalidTokenContent />
    </Suspense>
  );
}

const SignupContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const SignupWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 10;
  cursor: pointer;
`;

const SignupLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupRight = styled.div`
  flex: 1;

  @media (max-width: 992px) {
    display: none;
  }
`;

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
`;

const RetryButton = styled(SolidButton)``;
