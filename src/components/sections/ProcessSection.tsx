'use client';

import styled from 'styled-components';
import { typography, textColor, radius } from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';

export default function ProcessSection() {
  return (
    <ProcessContainer>
      <ProcessWrapper>
        <SectionTitle>Process</SectionTitle>
        <ProcessTitle>입력부터 시작되는 AI 보안 설계</ProcessTitle>
        <ProcessDescription>
          AI의 정확도는 그대로, 데이터 보안은 설계적으로. LLM Capsule은 입력
          순간부터 작동하며, 보안 위협을 미리 차단하는 구조로 설계되었습니다.
          GPT는 오직 안전하게 처리된 정보만 받아볼 수 있습니다.
        </ProcessDescription>
        <ProcessImageWrapper>
          <img
            src={getAssetPath('/images/Process.svg')}
            alt='AI 보안 프로세스'
          />
        </ProcessImageWrapper>
      </ProcessWrapper>
    </ProcessContainer>
  );
}

const ProcessContainer = styled.section`
  width: 100%;
  background: #18191c;
  display: flex;
  justify-content: center;
  padding-bottom: 120px;

  @media (max-width: 768px) {
    padding-bottom: 80px;
  }

  @media (max-width: 375px) {
    padding-bottom: 60px;
  }
`;

const ProcessWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1920px) {
    max-width: 1920px;
    padding: 120px 0;
  }

  @media (max-width: 1440px) {
    padding: 60px 24px;
  }

  @media (max-width: 768px) {
    padding: 40px 16px;
  }

  @media (max-width: 375px) {
    padding: 32px 12px;
  }
`;

const SectionTitle = styled.h2`
  width: fit-content;
  ${typography('ko', 'body3', 'medium')}
  color: #fff;
  border: 1px solid #fff;
  padding: 2px 8px;
  border-radius: ${radius['rounded-1.5']};
  margin: 0 auto 26px auto;
`;

const ProcessTitle = styled.h2`
  ${typography('ko', 'title4', 'medium')}
  color: #fff;
  text-align: center;
  margin-bottom: 24px;
`;

const ProcessDescription = styled.p`
  width: 600px;
  ${typography('ko', 'heading1', 'medium')}
  color: ${textColor.dark['fg-neutral-alternative']};
  text-align: center;
  margin-bottom: 56px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 40px;
  }

  @media (max-width: 375px) {
    margin-bottom: 32px;
  }
`;

const ProcessImageWrapper = styled.div`
  width: 1280px;
  height: 418px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;

  img {
    width: 100%;
    max-width: 1280px;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }

  @media (max-width: 375px) {
    height: auto;
  }
`;
