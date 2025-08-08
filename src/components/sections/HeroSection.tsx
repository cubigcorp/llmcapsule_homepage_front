'use client';

import styled from 'styled-components';
import {
  SolidButton,
  OutlineButton,
  typography,
  textColor,
} from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';

export default function HeroSection() {
  return (
    <HeroContainer>
      <HeroWrapper>
        <ContentArea>
          <LeftContent>
            <TextContent>
              <SubTitle>프라이버시 가디언 에이전트의 기준</SubTitle>
              <MainTitle>
                <TitleLine1>모든 팀의 생산성은 높이고,</TitleLine1>
                <TitleLine2>정보 유출은 원천차단합니다.</TitleLine2>
              </MainTitle>
              <Description>
                GPT의 생산성을 그대로 활용하면서도, 기업 데이터는 안전하게
                <br />
                보호할 수 있는 방법. LLM Capsule은 모두가 안심하고 GPT를
                <br />
                사용할 수 있도록 설계된 보안 솔루션입니다.
              </Description>
            </TextContent>
            <ButtonGroup>
              <SolidButton variant='primary' size='large'>
                구매하기
              </SolidButton>
              <OutlineButton variant='secondary' size='large'>
                데모 체험하기
              </OutlineButton>
            </ButtonGroup>
          </LeftContent>
          <ImageArea>
            <img
              src={getAssetPath('/images/Hero.svg')}
              alt='LLM Capsule 인터페이스'
            />
          </ImageArea>
        </ContentArea>
      </HeroWrapper>
    </HeroContainer>
  );
}

const HeroContainer = styled.section`
  width: 100%;
  margin-top: 80px;
  display: flex;
  align-items: center;
`;

const HeroWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;

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

const ContentArea = styled.div`
  display: flex;
  gap: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const TextContent = styled.div`
  display: flex;
  padding-top: 80px;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding-top: 40px;
    gap: 16px;
  }

  @media (max-width: 375px) {
    padding-top: 24px;
    gap: 12px;
  }
`;

const SubTitle = styled.p`
  ${typography('ko', 'heading1', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const MainTitle = styled.h1`
  ${typography('ko', 'display1', 'semibold')}
`;

const TitleLine1 = styled.div`
  color: ${textColor.light['fg-neutral-alternative']};
`;

const TitleLine2 = styled.div`
  color: ${textColor.light['fg-neutral-strong']};
`;

const Description = styled.p`
  ${typography('ko', 'heading1', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const ImageArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex: none;
    order: -1;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;
