'use client';

import styled from 'styled-components';
import {
  typography,
  textColor,
  radius,
  borderColor,
} from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';

export default function PerformanceSection() {
  return (
    <PerformanceContainer>
      <PerformanceWrapper>
        <SectionTitle>Performance & Certification</SectionTitle>
        <CardsContainer>
          <PerformanceCard>
            <CardTitle>1종 오류 정확도</CardTitle>
            <CardValue>98.10%</CardValue>
            <CardDescription>
              정상 데이터를 불필요하게 차단하지 않아 효율적인
              <br /> 데이터 활용이 가능합니다.
            </CardDescription>
          </PerformanceCard>
          <PerformanceCard>
            <CardTitle>2종 오류 정확도</CardTitle>
            <CardValue>99.14%</CardValue>
            <CardDescription>
              민감정보를 놓치지 않고 탐지·차단하여
              <br /> 기업 데이터 유출 위험을 최소화합니다.
            </CardDescription>
          </PerformanceCard>
          <PerformanceCard>
            <CardTitle>정형화된 개인정보 보호</CardTitle>
            <CardValue>100%</CardValue>
            <CardDescription>
              정형 데이터에서 개인정보 노출 가능성을 <br />
              완벽히 차단합니다.
            </CardDescription>
          </PerformanceCard>
          <PerformanceCard>
            <CardTitle>Public LLM 유사도</CardTitle>
            <CardValue>98%</CardValue>
            <CardDescription>
              민감정보 보호 후에도 답변의 의미와 문맥이
              <br /> 거의 유지됩니다.
            </CardDescription>
          </PerformanceCard>
          <PerformanceCard>
            <CardTitle>Privacy-Utility</CardTitle>
            <CardValue>Trade-off 개선</CardValue>
            <CardDescription>
              고도화된 변환 기술로 보안과 데이터 활용성의
              <br /> 최적 균형을 실현합니다.
            </CardDescription>
          </PerformanceCard>
          <PerformanceCard>
            <CardTitle>벤처나라 등록 제품</CardTitle>
            <CardValue>
              <LogoImage
                src={getAssetPath('/icons/public-procurement-service.svg')}
                alt='조달청'
                style={{ width: '135px', height: '52px' }}
              />
            </CardValue>
            <CardDescription>
              조달청 공식 등록으로 공공기관 도입 신뢰성을
              <br />
              확보했습니다.
            </CardDescription>
          </PerformanceCard>
          <PerformanceCard>
            <CardTitle>개인정보 비식별 가이드라인 준수</CardTitle>
            <CardValue>
              <LogoImage
                src={getAssetPath('/icons/ministry-interior-safety.svg')}
                alt='행정안전부'
                style={{ width: '183px', height: '52px' }}
              />
            </CardValue>
            <CardDescription>
              공식 가이드라인을 준수하여 데이터 안정성과
              <br /> 법적 신뢰성을 실현합니다.
            </CardDescription>
          </PerformanceCard>
          <PerformanceCard>
            <CardTitle>24년도 정보보호제품 혁신 대상</CardTitle>
            <CardValue>
              <LogoImage
                src={getAssetPath('/icons/ministry-science-ict.svg')}
                alt='과학기술정보통신부'
                style={{ width: '268px', height: '52px' }}
              />
            </CardValue>
            <CardDescription>
              국가로부터 혁신성과 기술력을 공식 인정받은
              <br /> 제품입니다.
            </CardDescription>
          </PerformanceCard>
        </CardsContainer>
      </PerformanceWrapper>
    </PerformanceContainer>
  );
}

const PerformanceContainer = styled.section`
  width: 100%;
  display: flex;
`;

const PerformanceWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 80px;
  display: flex;
  flex-direction: column;
  gap: 32px;
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
    gap: 24px;
  }

  @media (max-width: 375px) {
    padding: 32px 12px;
    gap: 20px;
  }
`;

const SectionTitle = styled.h2`
  width: fit-content;
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  border: 1px solid ${textColor.light['fg-neutral-primary']};
  padding: 2px 8px;
  border-radius: ${radius['rounded-1.5']};
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 80px 10px;

  @media (max-width: 1200px) {
    gap: 60px 20px;
  }

  @media (max-width: 768px) {
    gap: 40px 0;
  }
`;

const PerformanceCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-basis: calc(25% - 8px);
  flex-grow: 1;

  @media (max-width: 1200px) {
    flex-basis: calc(50% - 10px);
  }

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

const CardTitle = styled.h3`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin-bottom: 12px;
`;

const CardValue = styled.div`
  ${typography('ko', 'display1', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  margin-bottom: 64px;

  @media (max-width: 1200px) {
    margin-bottom: 52px;
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  @media (max-width: 375px) {
    margin-bottom: 32px;
  }
`;

const CardDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  position: relative;
  padding-bottom: 20px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${borderColor.light['color-border-primary']};
  }
`;

const LogoImage = styled.img`
  width: 135px;
  height: 52px;
  aspect-ratio: 135/52;
`;
