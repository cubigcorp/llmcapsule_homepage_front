'use client';

import styled from 'styled-components';
import {
  typography,
  textColor,
  color,
  borderColor,
} from '@cubig/design-system';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        {/* Top Section */}
        <FooterTopSection>
          <FooterLeft>
            <Logo>
              <LogoImage src='/icons/Logo2.svg' alt='LLM Capsule Logo' />
            </Logo>
            <BrandText>
              <BrandTitle>Capsule AI</BrandTitle>
              <BrandSubtitle>for what&apos;s next</BrandSubtitle>
            </BrandText>
          </FooterLeft>

          <FooterRight>
            <FooterColumn>
              {/* <FooterColumnItem>제품소개</FooterColumnItem>
              <FooterColumnItem>솔루션</FooterColumnItem>
              <FooterColumnItem>데모체험</FooterColumnItem> */}
            </FooterColumn>
          </FooterRight>
        </FooterTopSection>

        {/* Bottom Section */}
        <FooterBottomSection>
          <FooterLeft>
            <ContactInfo>
              <ContactItem>Email : contact@cubig.ai</ContactItem>
              <ContactItem>
                Business Registration Number : 133-81-45679
              </ContactItem>
              <ContactItem>
                E-Commerce Registration : 2023-Seoul-Seocho-2822
              </ContactItem>
              <ContactItem>
                4F, NAVER 1784, 95, Jeongjail-ro, Bundang-gu, Seongnam-si,
                Gyeonggi-do, Republic of Korea
              </ContactItem>
            </ContactInfo>
          </FooterLeft>

          <FooterRight></FooterRight>
        </FooterBottomSection>

        <FooterDivider />
        <CopyrightSection>
          <Copyright>© 2025 CUBIG Corp All rights Reserved.</Copyright>
          <SocialIcons>
            <SocialIcon>
              <a
                href='https://blog.naver.com/cubig_'
                target='_blank'
                rel='noopener noreferrer'
              >
                <SocialIconImage src={'/icons/logo_blog.svg'} alt='Blog' />
              </a>
            </SocialIcon>
            <SocialIcon>
              <a
                href='https://www.instagram.com/cubig.ai_official/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <SocialIconImage src='/icons/logo_insta.svg' alt='Instagram' />
              </a>
            </SocialIcon>
            <SocialIcon>
              <a
                href='https://www.youtube.com/@cubig_corp'
                target='_blank'
                rel='noopener noreferrer'
              >
                <SocialIconImage src='/icons/logo_youtube.svg' alt='YouTube' />
              </a>
            </SocialIcon>
            <SocialIcon>
              <a
                href='https://www.linkedin.com/company/cubig-corp/posts/?feedView=all'
                target='_blank'
                rel='noopener noreferrer'
              >
                <SocialIconImage src='/icons/logo_linken.svg' alt='LinkedIn' />
              </a>
            </SocialIcon>
          </SocialIcons>
        </CopyrightSection>
      </FooterWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${color.gray['975']};
  display: flex;
  justify-content: center;
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 80px;

  @media (min-width: 1920px) {
    max-width: 1920px;
  }

  @media (max-width: 1440px) {
    padding: 80px 40px;
  }

  @media (max-width: 1024px) {
    padding: 80px 32px;
  }

  @media (max-width: 768px) {
    padding: 80px 32px;
  }

  @media (max-width: 375px) {
    padding: 80px 32px;
  }
`;

const FooterTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
    margin-bottom: 40px;
  }

  @media (max-width: 375px) {
    gap: 24px;
    margin-bottom: 32px;
  }
`;

const FooterBottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }

  @media (max-width: 375px) {
    gap: 16px;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 16px;
`;

const BrandTitle = styled.span`
  ${typography('ko', 'display1', 'regular')}
  color: ${textColor.dark['fg-neutral-alternative']};
`;

const BrandSubtitle = styled.span`
  ${typography('ko', 'display1', 'regular')}
  color: ${textColor.dark['fg-neutral-strong']};
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialIcon = styled.div`
  cursor: pointer;
  transition: opacity 0.2s ease;

  a {
    display: block;
    text-decoration: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const SocialIconImage = styled.img`
  width: 32px;
  height: 32px;
`;

const FooterDivider = styled.div`
  height: 1px;
  background-color: ${borderColor.dark['color-border-primary']};
  margin-bottom: 24px;
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const ContactItem = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.dark['fg-neutral-alternative']};
`;

const CopyrightSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Copyright = styled.span`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.dark['fg-neutral-primary']};
`;
