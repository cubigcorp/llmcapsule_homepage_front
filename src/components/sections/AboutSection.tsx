'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import {
  borderColor,
  color,
  layerColor,
  textColor,
  typography,
} from '@cubig/design-system';

const AboutSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeFeatures, setActiveFeatures] = useState([0, 0, 0]);

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const headerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    const element = headerRefs[index].current;
    if (element) {
      const headerHeight = 72; // 헤더 높이
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleFeatureClick = (sectionIndex: number, featureIndex: number) => {
    setActiveSection(sectionIndex);
    setActiveFeatures((prev) => {
      const newFeatures = [...prev];
      newFeatures[sectionIndex] = featureIndex;
      return newFeatures;
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
                <SectionHeader ref={headerRefs[index]}>
                  <SectionNumber>
                    {String(index + 1).padStart(2, '0')}.
                  </SectionNumber>
                  <SectionTextContent>
                    <SectionTitle>{section.title.split('. ')[1]}</SectionTitle>
                    <SectionSubtitle>{section.subtitle}</SectionSubtitle>
                  </SectionTextContent>
                </SectionHeader>

                <ContentArea>
                  <ImageArea>
                    <ImageContainer>
                      <ImageContentWrapper>
                        <ImageHeader>
                          <ImageTitle>
                            {index === 0 &&
                              activeFeatures[index] === 0 &&
                              'Complete protection of sensitive data in AI usage'}
                            {index === 0 &&
                              activeFeatures[index] === 1 &&
                              'Customizable Data Protection'}
                            {index === 0 &&
                              activeFeatures[index] === 2 &&
                              'Flexible De-identification Methods'}
                            {index === 1 &&
                              activeFeatures[index] === 0 &&
                              'Seamless public LLM integration'}
                            {index === 1 &&
                              activeFeatures[index] === 1 &&
                              'Large-Scale Document Processing & Ontology Management'}
                            {index === 1 &&
                              activeFeatures[index] === 2 &&
                              'RAG & Graph RAG Support'}
                            {index === 2 &&
                              activeFeatures[index] === 0 &&
                              'Context-Aware AI Detection'}
                            {index === 2 &&
                              activeFeatures[index] === 1 &&
                              'Defense Against Prompt Injection & Jailbreak Attacks'}
                            {index === 2 &&
                              activeFeatures[index] === 2 &&
                              'Compliance with Global Security Standards'}
                            {index === 2 &&
                              activeFeatures[index] === 3 &&
                              'Admin-Centric User Management'}
                            {index === 2 &&
                              activeFeatures[index] === 4 &&
                              'On-Premises Deployment Support'}
                          </ImageTitle>
                          <ImageSubtitle>
                            {index === 0 &&
                              activeFeatures[index] === 0 &&
                              'A four-step framework of detection, protection, utilization, and recovery.'}
                            {index === 0 &&
                              activeFeatures[index] === 1 &&
                              'Tailored to corporate policies and environments.'}
                            {index === 0 &&
                              activeFeatures[index] === 2 &&
                              'Optimized protection strategies for every situation.'}
                            {index === 1 &&
                              activeFeatures[index] === 0 &&
                              'ChatGPT, Claude, Gemini—your choice, with efficiency and security.'}
                            {index === 1 &&
                              activeFeatures[index] === 1 &&
                              'Turn enterprise data into structured, valuable assets.'}
                            {index === 1 &&
                              activeFeatures[index] === 2 &&
                              'Use real-time data and knowledge graphs for accurate, trusted answers.'}
                            {index === 2 &&
                              activeFeatures[index] === 0 &&
                              'Beyond keywords, precision designed for enterprise data protection.'}
                            {index === 2 &&
                              activeFeatures[index] === 1 &&
                              'Safeguards that ensure stable AI operations.'}
                            {index === 2 &&
                              activeFeatures[index] === 2 &&
                              'Trusted AI that meets domestic and international regulations.'}
                            {index === 2 &&
                              activeFeatures[index] === 3 &&
                              'Simplified administration for enterprise efficiency.'}
                            {index === 2 &&
                              activeFeatures[index] === 4 &&
                              'Secure operation of sensitive data and workloads on dedicated infrastructure.'}
                          </ImageSubtitle>
                        </ImageHeader>
                        <ImageContent>
                          <FeatureImage
                            src={`/images/area_${index + 1}_feature_${activeFeatures[index] + 1}.png`}
                            alt={`Area ${index + 1} Feature ${activeFeatures[index] + 1}`}
                          />
                        </ImageContent>
                      </ImageContentWrapper>
                    </ImageContainer>
                  </ImageArea>

                  <RightSidebar>
                    <FeaturesList>
                      {section.features.map((feature, featureIndex) => (
                        <FeatureItem
                          key={featureIndex}
                          $isActive={activeFeatures[index] === featureIndex}
                          onClick={() =>
                            handleFeatureClick(index, featureIndex)
                          }
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
  background-color: ${textColor.light['fg-neutral-primary']};
  display: flex;
  justify-content: center;
`;

const AboutWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 160px 40px;

  @media (max-width: 1024px) {
    padding: 80px 24px;
  }

  @media (max-width: 768px) {
    padding: 80px 32px;
  }

  @media (max-width: 375px) {
    padding: 80px 32px;
  }
`;

const HeaderSection = styled.div`
  padding-bottom: 40px;
  border-bottom: 1px solid ${borderColor.dark['color-border-primary']};
`;

const MainTitle = styled.h1`
  ${typography(undefined, 'display1', 'medium')}
  color: ${textColor.dark['fg-neutral-strong']};
  margin-bottom: 12px;
`;

const SubTitle = styled.p`
  ${typography(undefined, 'heading2', 'regular')}
  color: ${textColor.dark['fg-neutral-primary']};
`;

const ContentSection = styled.div`
  display: flex;
  padding-top: 56px;
  align-items: flex-start;
`;

const LeftSidebar = styled.div`
  width: 200px;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const CoreFeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CoreFeatureItem = styled.li<{ $isActive: boolean }>`
  ${typography(undefined, 'body3', 'semibold')}
  color: ${(props) =>
    props.$isActive ? '#8B5CF6' : textColor.dark['fg-neutral-primary']};
  cursor: pointer;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 16px;

  &:hover {
    color: #8b5cf6;
  }

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.$isActive ? '#8B5CF6' : 'transparent'};
    flex-shrink: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const SectionContent = styled.div``;

const SectionHeader = styled.div`
  display: flex;
  gap: 4px;
`;

const SectionNumber = styled.div`
  font-size: 24px;
  line-height: 34px;
  font-weight: 400;
  font-family: 'Geist Mono', sans-serif;
  color: ${textColor.dark['fg-neutral-strong']};
  flex-shrink: 0;
`;

const SectionTextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  ${typography(undefined, 'title1', 'medium')}
  color: ${textColor.dark['fg-neutral-primary']};
`;

const SectionSubtitle = styled.p`
  ${typography(undefined, 'body3', 'regular')}
  color: ${textColor.dark['fg-neutral-alternative']};
`;

const ContentArea = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

const ImageArea = styled.div`
  flex: 1;
`;

const ImageContainer = styled.div`
  background-color: ${layerColor.dark['bg-layer-default']};
  padding: 64px 64px 80px 64px;
  height: 720px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const ImageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ImageTitle = styled.h3`
  ${typography(undefined, 'title1', 'medium')}
  color: ${textColor.dark['fg-neutral-primary']};
`;

const ImageSubtitle = styled.p`
  ${typography(undefined, 'body3', 'regular')}
  color: ${textColor.dark['fg-neutral-alternative']};
`;

const ImageContent = styled.div`
  width: 640px;
  height: 405px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const RightSidebar = styled.div`
  width: 240px;
  flex-shrink: 0;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li<{ $isActive: boolean }>`
  ${typography(undefined, 'heading1', 'medium')}
  color: ${(props) =>
    props.$isActive
      ? textColor.dark['fg-neutral-primary']
      : textColor.dark['fg-neutral-assistive']};
  background-color: ${(props) =>
    props.$isActive
      ? layerColor.dark['bg-layer-default']
      : layerColor.dark['bg-layer-fill']};
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${layerColor.dark['bg-layer-default']};
    color: ${textColor.dark['fg-neutral-primary']};
  }
`;
