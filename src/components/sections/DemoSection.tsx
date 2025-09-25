'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { typography, textColor, SolidButton } from '@cubig/design-system';
import { useTranslation } from 'react-i18next';

// Import SVG icons as React components
import GovernmentIcon from '@/assets/icons/Icon_court.svg';
import FinancialIcon from '@/assets/icons/Icon_money.svg';
import HealthcareIcon from '@/assets/icons/Icon_heart.svg';
import EducationIcon from '@/assets/icons/Icon_compare.svg';
import ManufacturingIcon from '@/assets/icons/Leading Content.svg';
import FnbIcon from '@/assets/icons/icon_award_meal.svg';

const DEMO_CATEGORIES = [
  {
    id: 'Government',
    icon: GovernmentIcon,
    text: 'Government',
  },
  {
    id: 'Financial',
    icon: FinancialIcon,
    text: 'Financial',
  },
  {
    id: 'Healthcare',
    icon: HealthcareIcon,
    text: 'Healthcare',
  },
  {
    id: 'Education',
    icon: EducationIcon,
    text: 'Education',
  },
  {
    id: 'Manufacturing',
    icon: ManufacturingIcon,
    text: 'Manufacturing',
  },
  {
    id: 'F&B',
    icon: FnbIcon,
    text: 'F&B',
  },
];

export default function DemoSection() {
  const { t } = useTranslation('common');
  const [activeButton, setActiveButton] = useState('Government');

  return (
    <DemoContainer id='demo-section'>
      <DemoWrapper>
        <DemoContent>
          <LeftSection>
            <SectionTitle>{t('demo.title')}</SectionTitle>
          </LeftSection>
          <RightSection>
            <DemoTitle>{t('demo.mainTitle')}</DemoTitle>
            <DemoSubtitle>{t('demo.subtitle')}</DemoSubtitle>

            <DemoImageContainer>
              <ButtonGroup>
                {DEMO_CATEGORIES.map((category) => (
                  <DemoButton
                    key={category.id}
                    variant='secondary'
                    size='large'
                    $active={activeButton === category.id}
                    onClick={() => setActiveButton(category.id)}
                    leadingIcon={category.icon}
                  >
                    {category.text}
                  </DemoButton>
                ))}
              </ButtonGroup>
              <DemoImage>
                <ChatArea>
                  <OriginalDocument>
                    <DocumentHeader>
                      <DocumentTitle>Original Document</DocumentTitle>
                    </DocumentHeader>
                    <DocumentContentWrapper>
                      <DocumentContent>
                        <DocumentText>
                          Kim Cheol-su,
                          <br />
                          • Contact: 010-1234-5678,
                          <br />
                          • Resident Registration Number: 123456-1234567,
                          <br />• Email: chulsoo.kim@cubig.ai
                          <br />
                          <br />
                          Came this morning to file a civil petition regarding
                          building permits. They didn&apos;t ask for the address
                          or additional information. During the consultation,
                          the staff member also provided guidance over the
                          phone. When verifying my identity, they personally
                          confirmed the last digits of my resident registration
                          number. The inquiry was about the permit application
                          process an...
                        </DocumentText>
                      </DocumentContent>
                    </DocumentContentWrapper>
                  </OriginalDocument>

                  <SimulationCard>
                    <SimulationPrompt>
                      Please convert the personal information in this document
                      (name, resident registration number, contact information)
                      into a summary form for civil petition submission.
                    </SimulationPrompt>
                    <ActionButtonGroup>
                      <ActionButton>
                        <ButtonIcon>👁️</ButtonIcon>
                        Hide
                      </ActionButton>
                      <ActionButton>
                        <ButtonIcon>🔄</ButtonIcon>
                        Change
                      </ActionButton>
                      <RunSimulationButton>
                        <ButtonIcon>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                          >
                            <path
                              d='M12.0003 10.9494C8.46406 10.2612 6.88093 6.83813 6.88093 3.75C6.88093 3.58424 6.81508 3.42527 6.69787 3.30806C6.58066 3.19085 6.42169 3.125 6.25593 3.125C6.09017 3.125 5.9312 3.19085 5.81399 3.30806C5.69678 3.42527 5.63093 3.58424 5.63093 3.75C5.63093 6.83813 4.04781 10.2612 0.511558 10.9494C0.369592 10.9775 0.241768 11.0539 0.1499 11.1657C0.0580316 11.2776 0.0078125 11.4178 0.0078125 11.5625C0.0078125 11.7072 0.0580316 11.8474 0.1499 11.9593C0.241768 12.0711 0.369592 12.1475 0.511558 12.1756C4.04781 12.8638 5.63093 16.2869 5.63093 19.375C5.63093 19.5408 5.69678 19.6997 5.81399 19.8169C5.9312 19.9342 6.09017 20 6.25593 20C6.42169 20 6.58066 19.9342 6.69787 19.8169C6.81508 19.6997 6.88093 19.5408 6.88093 19.375C6.88093 16.2869 8.46406 12.8638 12.0003 12.1756C12.1423 12.1475 12.2701 12.0711 12.362 11.9593C12.4538 11.8474 12.5041 11.7072 12.5041 11.5625C12.5041 11.4178 12.4538 11.2776 12.362 11.1657C12.2701 11.0539 12.1423 10.9775 12.0003 10.9494ZM19.5059 5.95062C16.6934 5.375 15.9434 2.33187 15.9434 0.625C15.9434 0.45924 15.8776 0.300269 15.7604 0.183058C15.6432 0.065848 15.4842 0 15.3184 0C15.1527 0 14.9937 0.065848 14.8765 0.183058C14.7593 0.300269 14.6934 0.45924 14.6934 0.625C14.6934 2.33187 13.9434 5.375 11.1309 5.95062C10.9903 5.97991 10.8641 6.05673 10.7734 6.16817C10.6828 6.27961 10.6333 6.41886 10.6333 6.5625C10.6333 6.70614 10.6828 6.84539 10.7734 6.95683C10.8641 7.06827 10.9903 7.14509 11.1309 7.17438C13.9434 7.75063 14.6934 10.7931 14.6934 12.5C14.6934 12.6658 14.7593 12.8247 14.8765 12.9419C14.9937 13.0592 15.1527 13.125 15.3184 13.125C15.4842 13.125 15.6432 13.0592 15.7604 12.9419C15.8776 12.8247 15.9434 12.6658 15.9434 12.5C15.9434 10.7931 16.6934 7.75 19.5059 7.17438C19.6466 7.14509 19.7728 7.06827 19.8634 6.95683C19.954 6.84539 20.0035 6.70614 20.0035 6.5625C20.0035 6.41886 19.954 6.27961 19.8634 6.16817C19.7728 6.05673 19.6466 5.97991 19.5059 5.95062Z'
                              fill='white'
                            />
                          </svg>
                        </ButtonIcon>
                        Run Simulation
                      </RunSimulationButton>
                    </ActionButtonGroup>
                  </SimulationCard>
                </ChatArea>
              </DemoImage>
            </DemoImageContainer>
          </RightSection>
        </DemoContent>
      </DemoWrapper>
    </DemoContainer>
  );
}

const DemoContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DemoWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 160px 240px 80px 240px;
  margin: 0 auto;

  @media (max-width: 1440px) {
    padding: 160px 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

const DemoContent = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const LeftSection = styled.div`
  flex: 0 0 auto;
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  ${typography(undefined, 'body3', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin-top: 16px;
`;

const DemoTitle = styled.h3`
  ${typography(undefined, 'display1', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0 0 12px 0;
`;

const DemoSubtitle = styled.p`
  ${typography(undefined, 'heading2', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 40px 0;
`;

const DemoImageContainer = styled.div`
  background-image: url('/images/bg-demo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  padding: 64px 64px 0 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  padding: 8px;

  align-items: flex-start;
  gap: 10px;
  border-radius: 16px;
  border: 1px solid #fff;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.5) 100%);

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
`;

const DemoButton = styled(SolidButton)<{ $active?: boolean }>`
  transition: all 0.2s ease;
`;

const DemoImage = styled.div`
  width: 100%;
  max-width: 1032px;
  height: 650px;
  background-image: url('/images/demo-browser.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  padding: 105px 25px 0 25px;
  box-sizing: border-box;
`;

const ChatArea = styled.div`
  width: 100%;
  height: 100%;
  background: #f8f9fa;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 43px;
  align-items: center;
`;

const OriginalDocument = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  width: 800px;
`;

const DocumentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px 24px;
`;

const DocumentContentWrapper = styled.div`
  padding: 12px 25px 12px 25px;
`;

const DocumentTitle = styled.h3`
  ${typography(undefined, 'body3', 'semibold')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0;
`;

const DocumentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px;
  max-height: 216px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #d1d5db;
  }
`;

const DocumentText = styled.div`
  ${typography(undefined, 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const SimulationCard = styled.div`
  border-radius: 20px;
  border: 1px solid #9d57ff;
  background: linear-gradient(101deg, #f1e6ff 11.64%, #fff 57.14%);
  box-shadow:
    0 0 96.88px 0 rgba(89, 89, 255, 0.24),
    0 0 96.88px 0 rgba(89, 89, 255, 0.24);
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 640px;
`;

const SimulationPrompt = styled.div`
  ${typography(undefined, 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
`;

const RunSimulationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #000000;
  border: none;
  border-radius: 99px;
  cursor: pointer;
  transition: all 0.2s ease;
  ${typography(undefined, 'body3', 'semibold')}
  color: #ffffff;
  margin-left: auto;

  &:hover {
    background: #333333;
    transform: translateY(-1px);
  }
`;

const ButtonIcon = styled.span`
  font-size: 16px;
`;
