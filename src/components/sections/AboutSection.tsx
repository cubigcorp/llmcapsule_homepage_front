'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  borderColor,
  color,
  layerColor,
  textColor,
  typography,
} from '@cubig/design-system';

const AboutSection = () => {
  const { t, i18n } = useTranslation('common');
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

  const sectionsData = t('about.sections', {
    returnObjects: true,
  }) as Array<{
    title: string;
    subtitle: string;
    mainTitle: string;
    description: string;
    features: string[];
    featureDescriptions: string[];
  }>;

  const sections = sectionsData.map((section, index) => ({
    id: index,
    title: `${String(index + 1).padStart(2, '0')}. ${section.title}`,
    subtitle: section.subtitle,
    mainTitle: section.mainTitle,
    description: section.description,
    features: section.features,
    featureDescriptions: section.featureDescriptions,
  }));

  return (
    <AboutContainer id='about-section'>
      <AboutWrapper>
        <HeaderSection>
          <MainTitle>{t('about.mainTitle')}</MainTitle>
          <SubTitle>{t('about.subTitle')}</SubTitle>
        </HeaderSection>

        <ContentSection>
          <LeftSidebar>
            <CoreFeaturesList>
              <CoreFeatureItem
                $isActive={activeSection === 0}
                onClick={() => scrollToSection(0)}
              >
                {t('about.sidebar.dataControl')}
              </CoreFeatureItem>
              <CoreFeatureItem
                $isActive={activeSection === 1}
                onClick={() => scrollToSection(1)}
              >
                {t('about.sidebar.scalability')}
              </CoreFeatureItem>
              <CoreFeatureItem
                $isActive={activeSection === 2}
                onClick={() => scrollToSection(2)}
              >
                {t('about.sidebar.security')}
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
                            {section.features[activeFeatures[index]]}
                          </ImageTitle>
                          <ImageSubtitle>
                            {section.featureDescriptions[activeFeatures[index]]}
                          </ImageSubtitle>
                        </ImageHeader>
                        <ImageContent>
                          <FeatureImage
                            src={`/images/area_${index + 1}_feature_${activeFeatures[index] + 1}${i18n.language?.toLowerCase().startsWith('en') ? '' : '_ko'}.png`}
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
    padding: 80px 24px;
  }

  @media (max-width: 575px) {
    padding: 80px 16px;
  }
`;

const HeaderSection = styled.div`
  padding-bottom: 40px;
  border-bottom: 1px solid ${borderColor.dark['color-border-primary']};

  @media (max-width: 575px) {
    padding-bottom: 16px;
  }
`;

const MainTitle = styled.h1`
  ${typography(undefined, 'display1', 'medium')}
  color: ${textColor.dark['fg-neutral-strong']};
  margin-bottom: 12px;

  @media (max-width: 575px) {
    font-size: 24px;
    line-height: 34px;
  }
`;

const SubTitle = styled.p`
  ${typography(undefined, 'heading2', 'regular')}
  color: ${textColor.dark['fg-neutral-primary']};

  @media (max-width: 575px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const ContentSection = styled.div`
  display: flex;
  padding-top: 24px;
  align-items: flex-start;

  @media (max-width: 575px) {
    padding-top: 16px;
  }
`;

const LeftSidebar = styled.div`
  width: 200px;
  flex-shrink: 0;

  @media (max-width: 1440px) {
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

  @media (max-width: 575px) {
    gap: 40px;
  }
`;

const SectionContent = styled.div``;

const SectionHeader = styled.div`
  display: flex;
  gap: 4px;

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

const SectionNumber = styled.div`
  font-size: 24px;
  line-height: 34px;
  font-weight: 400;
  font-family: 'Geist Mono', sans-serif;
  color: ${textColor.dark['fg-neutral-strong']};
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 22px;
    line-height: 30px;
  }

  @media (max-width: 575px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const SectionTextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  ${typography(undefined, 'title1', 'medium')}
  color: ${textColor.dark['fg-neutral-primary']};

  @media (max-width: 575px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const SectionSubtitle = styled.p`
  ${typography(undefined, 'body3', 'regular')}
  margin-top: 4px;
  color: ${textColor.dark['fg-neutral-alternative']};

  @media (max-width: 575px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const ContentArea = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  @media (max-width: 1200px) {
    gap: 12px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
  }
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

  @media (max-width: 1200px) {
    padding: 48px;
    height: auto;
  }
  @media (max-width: 768px) {
    padding: 32px 24px 40px 24px;
  }
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
  transition: opacity 0.2s ease-in-out;

  @media (max-width: 1200px) {
    font-size: 18px;
    line-height: 26px;
  }

  @media (max-width: 575px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const ImageSubtitle = styled.p`
  margin-top: 8px;
  ${typography(undefined, 'body3', 'regular')}
  color: ${textColor.dark['fg-neutral-alternative']};
  transition: opacity 0.2s ease-in-out;

  @media (max-width: 575px) {
    margin-top: 4px;
    font-size: 14px;
    line-height: 20px;
  }
`;

const ImageContent = styled.div`
  width: 640px;
  height: 405px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1200px) {
    width: 100%;
    height: auto;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.2s ease-in-out;

  @media (max-width: 1200px) {
    max-width: 480px;
    height: auto;
  }
`;

const RightSidebar = styled.div`
  width: 240px;
  flex-shrink: 0;
  @media (max-width: 1200px) {
    width: 200px;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li<{ $isActive: boolean }>`
  ${typography(undefined, 'body3', 'medium')}
  color: ${(props) =>
    props.$isActive
      ? textColor.dark['fg-neutral-primary']
      : textColor.dark['fg-neutral-disable']};
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

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
    line-height: 20px;
  }
`;
