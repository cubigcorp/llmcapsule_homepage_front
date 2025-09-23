'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { color, textColor, typography } from '@cubig/design-system';

const AboutSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    setActiveFeature(0); // 섹션 변경 시 첫 번째 기능으로 리셋
    sectionRefs[index].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const sections = [
    {
      id: 0,
      title: '01. You choose how AI works for you',
      subtitle: 'Because AI for business should always be safe.',
      mainTitle: 'Complete protection of sensitive data in AI usage',
      description:
        'A four-step framework of detection, protection, utilization, and recovery.',
      features: [
        'Complete protection of sensitive data in AI usage',
        'Customizable data protection',
        'Flexible de-identification methods',
      ],
    },
    {
      id: 1,
      title: '02. AI that works at enterprise scale',
      subtitle: 'Smarter AI, valuable data — built for enterprise scale.',
      mainTitle: 'Seamless public LLM integration',
      description:
        'ChatGPT, Claude, Gemini — your choice, with efficiency and security.',
      features: [
        'Seamless public LLM integration',
        'Large-scale document processing & ontology management',
        'RAG & graph RAG support',
      ],
    },
    {
      id: 2,
      title: '03. Compliance ready, threat resilient',
      subtitle:
        'Enterprise-grade AI security and management for safe, compliant, and reliable operations.',
      mainTitle: 'Context-Aware AI Detection',
      description:
        'Beyond keywords, precision designed for enterprise data protection.',
      features: [
        'Context-Aware AI Detection',
        'Defense Against Prompt Injection & Jailbreak Attacks',
        'Compliance with Global Security Standards',
        'Admin-Centric User Management',
        'On-Premises Deployment Support',
      ],
    },
  ];

  return (
    <AboutContainer>
      <AboutWrapper>
        <HeaderSection>
          <MainTitle>LLM Capsule makes it possible</MainTitle>
          <SubTitle>
            The secure LLM gateway built by AI and data infrastructure experts.
          </SubTitle>
        </HeaderSection>

        <ContentSection>
          <LeftSidebar>
            <CoreFeaturesTitle>Core Features</CoreFeaturesTitle>
            <CoreFeaturesList>
              <CoreFeatureItem
                $isActive={activeSection === 0}
                onClick={() => scrollToSection(0)}
              >
                Data Control
              </CoreFeatureItem>
              <CoreFeatureItem
                $isActive={activeSection === 1}
                onClick={() => scrollToSection(1)}
              >
                Scalability
              </CoreFeatureItem>
              <CoreFeatureItem
                $isActive={activeSection === 2}
                onClick={() => scrollToSection(2)}
              >
                Security
              </CoreFeatureItem>
            </CoreFeaturesList>
          </LeftSidebar>

          <MainContent>
            {sections.map((section, index) => (
              <SectionContent key={section.id} ref={sectionRefs[index]}>
                <SectionHeader>
                  <SectionTitle>{section.title}</SectionTitle>
                  <SectionSubtitle>{section.subtitle}</SectionSubtitle>
                </SectionHeader>

                <ContentArea>
                  <LeftContent>
                    <ContentTitle>{section.mainTitle}</ContentTitle>
                    <ContentDescription>
                      {section.description}
                    </ContentDescription>

                    <ImagePlaceholder>
                      <PlaceholderText>
                        Image Area {index + 1} - Feature {activeFeature + 1}
                      </PlaceholderText>
                    </ImagePlaceholder>
                  </LeftContent>

                  <RightSidebar>
                    <FeaturesList>
                      {section.features.map((feature, featureIndex) => (
                        <FeatureItem
                          key={featureIndex}
                          $isActive={
                            activeSection === index &&
                            activeFeature === featureIndex
                          }
                          onClick={() => {
                            setActiveSection(index);
                            setActiveFeature(featureIndex);
                          }}
                        >
                          {feature}
                        </FeatureItem>
                      ))}
                    </FeaturesList>
                  </RightSidebar>
                </ContentArea>
              </SectionContent>
            ))}
          </MainContent>
        </ContentSection>
      </AboutWrapper>
    </AboutContainer>
  );
};

export default AboutSection;

const AboutContainer = styled.section`
  width: 100%;
  background-color: ${color.gray['975']};
  display: flex;
  justify-content: center;
`;

const AboutWrapper = styled.div`
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

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const MainTitle = styled.h1`
  ${typography('en', 'display2', 'bold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin-bottom: 16px;
`;

const SubTitle = styled.p`
  ${typography('en', 'title1', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const ContentSection = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

const LeftSidebar = styled.div`
  width: 200px;
  flex-shrink: 0;
`;

const CoreFeaturesTitle = styled.h3`
  ${typography('en', 'body1', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin-bottom: 16px;
`;

const CoreFeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CoreFeatureItem = styled.li<{ $isActive: boolean }>`
  ${typography('en', 'body2', 'regular')}
  color: ${(props) =>
    props.$isActive
      ? textColor.light['fg-neutral-primary']
      : textColor.light['fg-neutral-alternative']};
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${textColor.light['fg-neutral-primary']};
  }

  &::before {
    content: '•';
    margin-right: 8px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const SectionContent = styled.div`
  background-color: ${color.gray['950']};
  border-radius: 12px;
  padding: 40px;
`;

const SectionHeader = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  ${typography('en', 'heading1', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin-bottom: 8px;
`;

const SectionSubtitle = styled.p`
  ${typography('en', 'body1', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const ContentArea = styled.div`
  display: flex;
  gap: 40px;
`;

const LeftContent = styled.div`
  flex: 1;
`;

const ContentTitle = styled.h3`
  ${typography('en', 'heading2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin-bottom: 16px;
`;

const ContentDescription = styled.p`
  ${typography('en', 'body1', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-bottom: 32px;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${color.gray['900']};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${color.gray['800']};
`;

const PlaceholderText = styled.span`
  ${typography('en', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const RightSidebar = styled.div`
  width: 300px;
  flex-shrink: 0;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li<{ $isActive: boolean }>`
  ${typography('en', 'body2', 'regular')}
  color: ${(props) =>
    props.$isActive
      ? textColor.light['fg-neutral-primary']
      : textColor.light['fg-neutral-alternative']};
  background-color: ${(props) =>
    props.$isActive ? color.gray['900'] : color.gray['950']};
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? textColor.light['fg-neutral-primary']
        : color.gray['800']};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: ${color.gray['900']};
    border-color: ${textColor.light['fg-neutral-primary']};
    color: ${textColor.light['fg-neutral-primary']};
  }

  &::before {
    content: '';
    position: absolute;
    left: 16px;
    top: 20px;
    width: 4px;
    height: 4px;
    background-color: ${(props) =>
      props.$isActive
        ? textColor.light['fg-neutral-primary']
        : textColor.light['fg-neutral-alternative']};
    border-radius: 50%;
  }
`;
