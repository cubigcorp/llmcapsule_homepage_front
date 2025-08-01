'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { spacing, TextButton, SolidButton } from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';

export default function Header() {
  const pathname = usePathname();
  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    setIsAuthPage(
      pathname === '/login' ||
        pathname === '/login/' ||
        pathname === '/signup' ||
        pathname === '/signup/' ||
        pathname.startsWith('/signup/verify')
    );
  }, [pathname]);

  if (isAuthPage) {
    return null;
  }
  console.log('Current pathname:', pathname);
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <GNB>
          <Leading>
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
            {/* <Menu>
              <TextButton variant='primary' size='medium'>
                제품소개
              </TextButton>
              <TextButton variant='primary' size='medium'>
                구매
              </TextButton>
              <TextButton variant='primary' size='medium'>
                회사소개
              </TextButton>
            </Menu> */}
          </Leading>

          <ButtonGroup>
            <Link href='/login'>
              <TextButton variant='primary' size='medium'>
                로그인
              </TextButton>
            </Link>
            <SolidButton variant='primary' size='medium'>
              문의하기
            </SolidButton>
          </ButtonGroup>
        </GNB>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: white;
  height: 80px;
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (min-width: 1920px) {
    max-width: 1920px;
    padding: 0 120px;
  }

  @media (max-width: 1440px) {
    padding: 0 24px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  @media (max-width: 375px) {
    padding: 0 12px;
  }
`;

const GNB = styled.div`
  display: flex;
  padding: ${spacing.gap['gap-1']} ${spacing.gap['gap-1']};
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 375px) {
    gap: 4px;
  }
`;

const Leading = styled.div`
  display: flex;
  align-items: center;
  gap: 64px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
