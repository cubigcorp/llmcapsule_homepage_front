'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import {
  SolidButton,
  Badge,
  Divider,
  Dropdown,
  textColor,
  borderColor,
  typography,
  color,
} from '@cubig/design-system';
import WindowsIcon from '@/assets/icons/icon_window.svg';
import InfoIcon from '@/assets/icons/icon_info_small.svg';
import DownloadImage from '@/assets/images/llmcapsule_download.png';
import DownloadIcon from '@/assets/icons/icon_download.svg';

export default function DownloadPage() {
  const [selectedSerial, setSelectedSerial] = useState('1234-ABCD-3212');

  const serialOptions = [
    { label: '1234-ABCD-3212', value: '1234-ABCD-3212' },
    { label: '5678-EFGH-9012', value: '5678-EFGH-9012' },
    { label: '3456-IJKL-7890', value: '3456-IJKL-7890' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedSerial).catch(() => {});
  };

  const handleSerialChange = (value: string) => {
    setSelectedSerial(value);
  };

  return (
    <Container>
      <Header>
        <Title>다운로드</Title>
        <Subtitle>
          안전하게, 생산성을 향상시키는 LLM Capsule을 이용해 보세요.
        </Subtitle>
      </Header>

      <Card>
        <CardHeader>
          <Left>
            <WindowsIcon />
            <CardTitle>Windows</CardTitle>
            <Badge size='medium' type='outline' variant='secondary'>
              exe
            </Badge>
          </Left>
        </CardHeader>
        <CardBody>
          <Notice>
            <InfoIcon /> Windows 10 이상부터 이용 가능합니다.
          </Notice>
          <SolidButton
            variant='primary'
            size='large'
            trailingIcon={DownloadIcon}
          >
            다운로드
          </SolidButton>
        </CardBody>
      </Card>

      <GuideSection>
        <SectionTitle>사용방법</SectionTitle>

        <GuideGrid>
          <TimelineContainer>
            <StepNum>1</StepNum>
            <TimelineDivider />
            <StepNum>2</StepNum>
          </TimelineContainer>

          <ContentContainer>
            <StepContent>
              <StepTextArea>
                <StepTitle>사용할 시리얼 키를 준비해주세요</StepTitle>
                <StepDesc>
                  시리얼 키 입력 후 프로그램을 설치할 수 있습니다. 등록이
                  완료되면, 1개의 디바이스에서만 사용할 수 있습니다.
                </StepDesc>
              </StepTextArea>
              <StepActionArea>
                <Dropdown
                  label='시리얼'
                  size='medium'
                  options={serialOptions}
                  value={selectedSerial}
                  onChange={handleSerialChange}
                  placeholder='시리얼을 선택하세요'
                />

                <CopyButton
                  variant='secondary'
                  size='small'
                  onClick={handleCopy}
                >
                  시리얼 키 복사
                </CopyButton>
              </StepActionArea>
            </StepContent>

            <StepContent>
              <StepTextArea>
                <StepTitle>프로그램 실행 후 시리얼을 입력해주세요</StepTitle>
                <StepDesc>
                  설치 프로그램 실행 후, 준비한 시리얼 키를 입력하면 설치가
                  진행됩니다.
                </StepDesc>
              </StepTextArea>
              <StepActionArea>
                <SerialImageWrapper>
                  <img src={DownloadImage.src} alt='시리얼 입력 UI' />
                </SerialImageWrapper>
              </StepActionArea>
            </StepContent>
          </ContentContainer>
        </GuideGrid>
      </GuideSection>
    </Container>
  );
}

const Container = styled.div`
  padding: 64px 32px 32px 32px;
`;

const Header = styled.div`
  margin-bottom: 60px;
`;

const Title = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 12px 0;
`;

const Subtitle = styled.p`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
`;

const Card = styled.div`
  background: white;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  padding: 24px 20px;
  max-width: 420px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardTitle = styled.h3`
  ${typography('ko', 'title1', 'semibold')}
  margin: 0;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Notice = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const GuideSection = styled.div`
  margin-top: 60px;
`;

const GuideGrid = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
`;

const TimelineDivider = styled.div`
  width: 2px;
  height: 108px;
  background: ${borderColor.light['color-border-primary']};
  margin: 8px 0;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

const StepTextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 284px;
`;

const StepActionArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  ${typography('ko', 'heading1', 'semibold')}
  margin: 0 0 24px 0;
`;

const StepNum = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: ${color.gray['100']};
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const StepTitle = styled.h3`
  ${typography('ko', 'body3', 'semibold')}
  margin: 0 0 12px 0;
`;

const StepDesc = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0 0 12px 0;
`;

const SerialLabel = styled.span`
  ${typography('ko', 'caption2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const CopyButton = styled(SolidButton)`
  width: fit-content;
  align-self: flex-start;
`;

const SerialImageWrapper = styled.div`
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  overflow: hidden;
  background: white;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;
