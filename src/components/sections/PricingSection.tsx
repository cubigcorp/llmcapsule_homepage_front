'use client';

import styled from 'styled-components';
import {
  typography,
  textColor,
  radius,
  color,
  SolidButton,
} from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';

interface FeatureProps {
  children: React.ReactNode;
}

function Feature({ children }: FeatureProps) {
  return (
    <FeatureItem>
      <img src={getAssetPath('/icons/Check.svg')} alt='check' />
      {children}
    </FeatureItem>
  );
}

export default function PricingSection() {
  return (
    <PricingContainer>
      <PricingWrapper>
        <SectionTitle>Pricing</SectionTitle>
        <PricingTitle>
          모든 사람을 위한 GPT 보안 솔루션, <br />
          합리적인 비용으로 시작하세요
        </PricingTitle>
        <PricingDescription>
          LLM Capsule은 팀 규모와 목적에 맞는 유연한 라이선스와 On-premise 설치
          옵션을 제공합니다. <br />
          필요한 기능만 선택하여 합리적인 가격으로 LLM Capsule을 도입하세요.
        </PricingDescription>
        <PricingCardsContainer>
          <PricingCard>
            <CardHeader style={{ backgroundColor: color.gray['925'] }}>
              <CardTitle>Standard</CardTitle>
              <CardSubtitle>
                개인정보 보호를 위한 첫 번째 기본 단계
              </CardSubtitle>
              <CardSectionTitle>| 개인을 위한 요금제</CardSectionTitle>
            </CardHeader>
            <CardBody>
              <FeatureList>
                <Feature>문서 내 개인정보 탐지</Feature>
                <Feature>캡슐화를 통한 보호</Feature>
                <Feature>
                  개인정보를 보호함과 동시에 Public LLM 사용까지 한번에 포함
                </Feature>
                <Feature>기본 필터링 기능</Feature>
                <Feature>이메일 지원</Feature>
              </FeatureList>
              <SolidButton variant='primary' size='large' state='default'>
                지금 구매
              </SolidButton>
            </CardBody>
          </PricingCard>

          <PricingCard>
            <CardHeader style={{ backgroundColor: color.gray['975'] }}>
              <CardTitle>Enterprise</CardTitle>
              <CardSubtitle>기업 요구 사항을 반영한 맞춤형 솔루션</CardSubtitle>
              <CardSectionTitle>| 기업을 위한 요금제</CardSectionTitle>
            </CardHeader>
            <CardBody>
              <FeatureList>
                <Feature>STANDARD 요금제 기능 포함</Feature>
                <Feature>기업별 맞춤 민감정보 필터링 가능</Feature>
                <Feature>PC별 토큰 수 제한 기능 제공</Feature>
                <Feature>On-Premise 설치 가능</Feature>
                <Feature>24/7 기술 지원</Feature>
                <Feature>전담 고객 성공 매니저</Feature>
              </FeatureList>
              <SolidButton variant='primary' size='large' state='default'>
                지금 구매
              </SolidButton>
            </CardBody>
          </PricingCard>

          <PricingCard>
            <CardHeader style={{ backgroundColor: color.gray['950'] }}>
              <CardTitle>
                Enterprise
                <ProTag>Pro</ProTag>
              </CardTitle>
              <CardSubtitle>토큰 사용량 구간에 따른 정액 요금제</CardSubtitle>
              <CardSectionTitle>| 기업을 위한 요금제</CardSectionTitle>
            </CardHeader>
            <CardBody>
              <FeatureList>
                <Feature>Enterprise 요금제 기능 포함</Feature>
                <Feature>무제한 사용자</Feature>
                <Feature>고급 분석 및 리포팅</Feature>
                <Feature>API 액세스</Feature>
                <Feature>커스텀 통합 지원</Feature>
                <Feature>SLA 보장</Feature>
              </FeatureList>
              <SolidButton variant='primary' size='large' state='default'>
                지금 구매
              </SolidButton>
            </CardBody>
          </PricingCard>
        </PricingCardsContainer>
      </PricingWrapper>
    </PricingContainer>
  );
}

const PricingContainer = styled.section`
  width: 100%;
  display: flex;
`;

const PricingWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;

  @media (min-width: 1920px) {
    max-width: 1920px;
    padding: 120px;
  }

  @media (max-width: 1440px) {
    padding: 60px 24px;
  }

  @media (max-width: 768px) {
    padding: 40px 16px;
    gap: 16px;
  }

  @media (max-width: 375px) {
    padding: 32px 12px;
    gap: 12px;
  }
`;

const SectionTitle = styled.h2`
  width: fit-content;
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  border: 1px solid ${textColor.light['fg-neutral-primary']};
  padding: 2px 8px;
  border-radius: ${radius['rounded-1.5']};
  margin: 0 auto;
`;

const PricingTitle = styled.h2`
  ${typography('ko', 'title4', 'semibold')}

  text-align: center;
`;

const PricingDescription = styled.p`
  ${typography('ko', 'heading1', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px auto;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  @media (max-width: 375px) {
    margin-bottom: 32px;
  }
`;

const PricingCardsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

const PricingCard = styled.div`
  width: 421px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 421px;
  }
`;

const CardHeader = styled.div`
  background-color: #374151;
  padding: 40px;
  text-align: left;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 768px) {
    padding: 24px;
    height: auto;
    min-height: 200px;
  }

  @media (max-width: 375px) {
    padding: 20px;
    min-height: 180px;
  }
`;

const CardTitle = styled.h3`
  ${typography('ko', 'title3', 'medium')}
  color: #fff;
  margin-bottom: 8px;
  margin-top: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProTag = styled.span`
  ${typography('ko', 'body3', 'medium')}

  color: #fff;
  padding: 2px 8px;
  border-radius: ${radius['rounded-1.5']};
  border: 1px solid #fff;
`;

const CardSubtitle = styled.p`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.dark['fg-neutral-primary']};
  margin-bottom: 40px;
`;

const CardBody = styled.div`
  background-color: #fff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  height: 440px;

  > button {
    margin-top: auto;
  }
  background-color: ${color.gray['50']};

  @media (max-width: 768px) {
    padding: 24px;
    height: auto;
    min-height: 400px;
  }

  @media (max-width: 375px) {
    padding: 20px;
    min-height: 350px;
  }
`;

const CardSectionTitle = styled.h4`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.dark['fg-neutral-strong']};
  margin: 0;
  margin-top: auto;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  flex: 1;
`;

const FeatureItem = styled.li`
  ${typography('ko', 'body3', 'regular')}
  display: flex;
  align-items: flex-start;
  gap: 8px;
  border-bottom: 1px solid ${color.gray['990']};
  padding-bottom: 8px;
  padding-top: 16px;

  &:first-child {
    padding-top: 0;
  }

  img {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;
