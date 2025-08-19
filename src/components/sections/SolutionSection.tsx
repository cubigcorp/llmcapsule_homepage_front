'use client';

import styled from 'styled-components';
import {
  typography,
  textColor,
  radius,
  borderColor,
} from '@cubig/design-system';

export default function SolutionSection() {
  return (
    <SolutionContainer>
      <SolutionWrapper>
        <SectionTitle>Solution</SectionTitle>
        <SolutionHeader>
          <SolutionTitle>SaaS 환경은 정보 유출 위험이 있습니다</SolutionTitle>
          <SolutionDescription>
            서버 연결이 필요한 SaaS 환경에서는 언제든 정보가 외부로 새어 나갈 수
            있습니다.
            <br />
            LLM Capsule은 On-Premise 독립 환경에서 입력부터 모든 데이터를
            안전하게 보호합니다.
          </SolutionDescription>
        </SolutionHeader>

        <SolutionGrid>
          <SolutionCard>
            <CardContent>
              <CardNumber>01</CardNumber>
              <CardTitle>ON-PREMISE 독립 운영</CardTitle>
              <CardDescription>
                외부 클라우드 없이 사내망 내에서 완전한 독립 설치가 가능하며,
                더욱 더 안전한 이용이 가능합니다. 기업의 보안 정책에 완벽하게
                부합하는 솔루션입니다.
              </CardDescription>
            </CardContent>
            <CardVisual>
              <img src={'/images/Content_04.svg'} alt='ON-PREMISE 독립 운영' />
            </CardVisual>
          </SolutionCard>

          <SolutionCard>
            <CardContent>
              <CardNumber>02</CardNumber>
              <CardTitle>실시간 프롬프트 필터링</CardTitle>
              <CardDescription>
                프롬프트 입력 시 이름, 연락처, 계좌번호 등 민감정보를 즉시
                감지하고 자동 가명화하여 유출을 방지합니다. 사용자가 인식하지
                못하는 사이에 모든 개인정보가 안전하게 보호됩니다.
              </CardDescription>
            </CardContent>
            <CardVisual>
              <img
                src={'/images/Content_01.svg'}
                alt='실시간 프롬프트 필터링'
              />
            </CardVisual>
          </SolutionCard>

          <SolutionCard>
            <CardContent>
              <CardNumber>03</CardNumber>
              <CardTitle>문서 내 민감정보 탐지</CardTitle>
              <CardDescription>
                업로드/첨부되는 각종 문서에서도 민감정보를 실시간으로 탐지하여
                자동 가명화 또는 마스킹 처리합니다. AI가 대량의 문서 속 숨겨진
                개인정보까지 놓치지 않고 안전하게 관리합니다.
              </CardDescription>
            </CardContent>
            <CardVisual>
              <img src={'/images/Content_02.svg'} alt='문서 내 민감정보 탐지' />
            </CardVisual>
          </SolutionCard>

          <SolutionCard>
            <CardContent>
              <CardNumber>04</CardNumber>
              <CardTitle>문맥 기반 정보 탐지</CardTitle>
              <CardDescription>
                단어 단위가 아닌, 문맥적 의미까지 AI가 이해하여 지능적으로
                탐지합니다. 개인정보뿐만 아니라, 회사별/산업별 중요정보까지
                보호할 수 있습니다.
              </CardDescription>
            </CardContent>
            <CardVisual>
              <img src={'/images/Content_03.svg'} alt='문맥 기반 정보 탐지' />
            </CardVisual>
          </SolutionCard>

          <SolutionCard>
            <CardContent>
              <CardNumber>05</CardNumber>
              <CardTitle>어드민 사용자 관리</CardTitle>
              <CardDescription>
                입력부터 모든 보호 과정이 기록·감사되어 보안관리와 사후 대응까지
                완벽하게 지원합니다. 통합 어드민으로 사용자·이용이력·정책관리 등
                기업의 거버넌스까지 책임집니다.
              </CardDescription>
            </CardContent>
            <CardVisual>
              <img src={'/images/Content_05.svg'} alt='어드민 사용자 관리' />
            </CardVisual>
          </SolutionCard>
        </SolutionGrid>
      </SolutionWrapper>
    </SolutionContainer>
  );
}

const SolutionContainer = styled.section`
  width: 100%;
  display: flex;
`;

const SolutionWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 80px;
  display: flex;
  flex-direction: column;
  gap: 22px;
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

const SolutionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  @media (max-width: 375px) {
    margin-bottom: 32px;
  }
`;

const SolutionTitle = styled.h2`
  ${typography('ko', 'title4', 'semibold')}
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const SolutionDescription = styled.p`
  ${typography('ko', 'heading1', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0 auto;

  @media (max-width: 768px) {
    br {
      display: none;
    }
  }
`;

const SolutionGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 60px;

  @media (max-width: 768px) {
    gap: 32px;
    margin-top: 40px;
  }

  @media (max-width: 375px) {
    gap: 24px;
    margin-top: 32px;
  }
`;

const SolutionCard = styled.div`
  border-radius: ${radius['rounded-4']};
  display: flex;
  gap: 62px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }

  @media (max-width: 375px) {
    gap: 16px;
  }
`;

const CardNumber = styled.div`
  ${typography('ko', 'title1', 'medium')}
  color: ${textColor.light['fg-neutral-assistive']};
  padding-bottom: 40px;
`;

const CardTitle = styled.h3`
  ${typography('ko', 'title1', 'semibold')}

  margin-bottom: 16px;
`;

const CardDescription = styled.p`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-bottom: 24px;
  height: 355px;
  border-left: 1px solid ${borderColor.light['color-border-primary']};
  padding-left: 20px;

  @media (max-width: 768px) {
    height: auto;
    min-height: 200px;
    margin-bottom: 16px;
  }

  @media (max-width: 375px) {
    min-height: 150px;
    padding-left: 16px;
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardVisual = styled.div`
  width: 800px;
  height: auto;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 1200px) {
    width: 600px;
  }

  @media (max-width: 992px) {
    width: 100%;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    height: auto;
  }

  @media (max-width: 375px) {
    max-width: 300px;
  }
`;
