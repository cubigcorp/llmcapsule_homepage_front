'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  SolidButton,
  Badge,
  Divider,
  textColor,
  borderColor,
  typography,
  color,
} from '@cubig/design-system';
import WindowsIcon from '@/assets/icons/icon_window.svg';
import InfoIcon from '@/assets/icons/icon_info_small.svg';
import DownloadImage from '@/assets/images/llmcapsule_download_2.png';
import DownloadImage2 from '@/assets/images/llmcapsule_download_1.png';
import DownloadIcon from '@/assets/icons/icon_download.svg';
import { llmService } from '@/services/llm';

export default function DownloadPage() {
  const { t } = useTranslation();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await llmService.getDownloadUrl();

      if (response.data?.download_url) {
        window.open(response.data.download_url, '_blank');
      } else {
        alert('다운로드 URL을 가져올 수 없습니다.');
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('다운로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>{t('mypage:download.title')}</Title>
        <Subtitle>{t('mypage:download.subtitle')}</Subtitle>
      </Header>

      <Card>
        <CardHeader>
          <Left>
            <WindowsIcon />
            <CardTitle>{t('mypage:download.windows')}</CardTitle>
            <Badge size='medium' type='outline' variant='secondary'>
              {t('mypage:download.exe')}
            </Badge>
          </Left>
        </CardHeader>
        <CardBody>
          <Notice>
            <InfoIcon /> {t('mypage:download.notice')}
          </Notice>
          <SolidButton
            variant='primary'
            size='large'
            trailingIcon={DownloadIcon}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? '다운로드 중...' : t('mypage:download.download')}
          </SolidButton>
        </CardBody>
      </Card>

      <GuideSection>
        <SectionTitle>{t('mypage:download.howTo')}</SectionTitle>

        <GuideGrid>
          <TimelineContainer>
            <StepNum>1</StepNum>
            <TimelineDivider />
            <StepNum>2</StepNum>
          </TimelineContainer>

          <ContentContainer>
            <StepContent>
              <StepTextArea>
                <StepTitle>{t('mypage:download.step1.title')}</StepTitle>
                <StepDesc>{t('mypage:download.step1.desc')}</StepDesc>
              </StepTextArea>
              <StepActionArea>
                <SerialImageWrapper $isFirstStep>
                  <img
                    src={DownloadImage2.src}
                    alt='Serial preparation guide'
                  />
                </SerialImageWrapper>
              </StepActionArea>
            </StepContent>

            <StepContent>
              <StepTextArea>
                <StepTitle>{t('mypage:download.step2.title')}</StepTitle>
                <StepDesc>{t('mypage:download.step2.desc')}</StepDesc>
              </StepTextArea>
              <StepActionArea>
                <SerialImageWrapper $isSecondStep>
                  <img
                    src={DownloadImage.src}
                    alt={t('mypage:download.serialImageAlt')}
                  />
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

const SerialImageWrapper = styled.div<{
  $isFirstStep?: boolean;
  $isSecondStep?: boolean;
}>`
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  background: ${color.gray['50']};
  overflow: hidden;

  ${(props) =>
    props.$isFirstStep &&
    `
    padding: 0 60px 0 60px;
  `}

  ${(props) =>
    props.$isSecondStep &&
    `
    padding: 0px 60px 20px 60px;
  `}

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;
