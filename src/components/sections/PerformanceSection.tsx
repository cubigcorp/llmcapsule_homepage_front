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
          <CardsRow>
            <PerformanceCard>
              <CardTitle>1종 오류 정확도</CardTitle>
              <CardValue>98.1%</CardValue>
              <CardDescription>
                잘못된 허용을 최소화해 안전한 데이터 활용을
                <br /> 보장합니다.
              </CardDescription>
            </PerformanceCard>
            <PerformanceCard>
              <CardTitle>2종 오류 정확도</CardTitle>
              <CardValue>99.14%</CardValue>
              <CardDescription>
                과도한 차단 없이 필요한 정보가 유지되도록 정밀하게
                <br />
                설계되었습니다.
              </CardDescription>
            </PerformanceCard>
            <PerformanceCard>
              <CardTitle>정형화 개인정보 보호</CardTitle>
              <CardValue>100%</CardValue>
              <CardDescription>
                모든 정형 데이터에서 개인정보 노출 가능성을 <br />
                완벽히 차단합니다.
              </CardDescription>
            </PerformanceCard>
            <PerformanceCard>
              <CardTitle>LLM 유사도 유지</CardTitle>
              <CardValue>98%</CardValue>
              <CardDescription>
                고도화된 변환 기술로 원문 의미와 맥락을 <br />
                최대한 유지합니다.
              </CardDescription>
            </PerformanceCard>
          </CardsRow>
          <CardsRow>
            <PerformanceCard>
              <CardTitle>Privacy-Utility</CardTitle>
              <CardValue>Trade-off 개선</CardValue>
              <CardDescription>
                고도화된 변환 기술로 원문 의미와 맥락을 <br />
                최대한 유지합니다.
              </CardDescription>
            </PerformanceCard>
            <PerformanceCard>
              <CardTitle>벤처나라 등록제품</CardTitle>
              <CardValue>
                <LogoImage
                  src={getAssetPath('/icons/public-procurement-service.svg')}
                  alt='벤처나라 등록제품'
                  style={{ width: '135px', height: '52px' }}
                />
              </CardValue>
              <CardDescription>
                공공 데이터 보안 기준을 충족해 안정성을 <br />
                공식 인정받았습니다.
              </CardDescription>
            </PerformanceCard>
            <PerformanceCard>
              <CardTitle>인증 획득</CardTitle>
              <CardValue>
                <LogoImage
                  src={getAssetPath('/icons/ministry-interior-safety.svg')}
                  alt='행정안전부 인증'
                  style={{ width: '183px', height: '52px' }}
                />
              </CardValue>
              <CardDescription>
                공공 데이터 보안 기준을 충족해 안정성을
                <br />
                공식 인정받았습니다.
              </CardDescription>
            </PerformanceCard>
            <PerformanceCard>
              <CardTitle>24년도 정보보호제품 혁신 대상</CardTitle>
              <CardValue>
                <LogoImage
                  src={getAssetPath('/icons/ministry-science-ict.svg')}
                  alt='벤처나라 등록제품'
                  style={{ width: '268px', height: '52px' }}
                />
              </CardValue>
              <CardDescription>
                고도화된 변환 기술로 원문 의미와 맥락을 <br />
                최대한 유지합니다.
              </CardDescription>
            </PerformanceCard>
          </CardsRow>
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
  width: 1440px;
  padding: 80px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 auto;
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
  flex-direction: column;
  align-items: flex-start;
  gap: 80px;
  flex: 1 0 0;
`;

const CardsRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const PerformanceCard = styled.div`
  display: flex;
  width: 314px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
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
`;

const CardDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-bottom: 20px;
  border-bottom: 1px solid ${borderColor.light['color-border-primary']};
  padding-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 135px;
  height: 52px;
  aspect-ratio: 135/52;
`;
