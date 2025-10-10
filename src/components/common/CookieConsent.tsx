'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Modal,
  SolidButton,
  Checkbox,
  Badge,
  typography,
  textColor,
} from '@cubig/design-system';

interface CookiePreferences {
  acceptedNonEssential: boolean;
  timestamp: number;
  categories?: CookieCategories;
}

interface CookieCategories {
  essential: boolean;
  performance: boolean;
  analytics: boolean;
  advertising: boolean;
  social: boolean;
  unclassified: boolean;
}

const CONSENT_STORAGE_KEY = 'cookie_consent_v1';

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isPrefsOpen, setIsPrefsOpen] = useState(false);
  const [performanceEnabled, setPerformanceEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [advertisingEnabled, setAdvertisingEnabled] = useState(true);
  const [socialEnabled, setSocialEnabled] = useState(true);
  const [unclassifiedEnabled, setUnclassifiedEnabled] = useState(true);
  const openPolicyFromPrefs = () => {
    setIsPolicyOpen(true);
    setIsPrefsOpen(false);
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!raw) {
        setOpen(true);
      } else {
        try {
          const saved = JSON.parse(raw) as CookiePreferences;
          if (saved.categories) {
            setPerformanceEnabled(!!saved.categories.performance);
            setAnalyticsEnabled(!!saved.categories.analytics);
            setAdvertisingEnabled(!!saved.categories.advertising);
            setSocialEnabled(!!saved.categories.social);
            setUnclassifiedEnabled(!!saved.categories.unclassified);
          }
        } catch {}
      }
    } catch {}
  }, []);

  const saveConsent = (
    acceptedNonEssential: boolean,
    categories?: Partial<CookieCategories>
  ) => {
    const prefs: CookiePreferences = {
      acceptedNonEssential,
      timestamp: Date.now(),
      categories: {
        essential: true,
        performance: performanceEnabled,
        analytics: analyticsEnabled,
        advertising: advertisingEnabled,
        social: socialEnabled,
        unclassified: unclassifiedEnabled,
        ...categories,
      },
    };
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
  };

  const handleAcceptAll = () => {
    setPerformanceEnabled(true);
    setAnalyticsEnabled(true);
    setAdvertisingEnabled(true);
    setSocialEnabled(true);
    setUnclassifiedEnabled(true);
    saveConsent(true, {
      performance: true,
      analytics: true,
      advertising: true,
      social: true,
      unclassified: true,
    });
    setOpen(false);
  };

  const handleReject = () => {
    setPerformanceEnabled(false);
    setAnalyticsEnabled(false);
    setAdvertisingEnabled(false);
    setSocialEnabled(false);
    setUnclassifiedEnabled(false);
    saveConsent(false, {
      performance: false,
      analytics: false,
      advertising: false,
      social: false,
      unclassified: false,
    });
    setOpen(false);
    setIsPrefsOpen(false);
  };

  const handleDeclineAll = () => {
    setPerformanceEnabled(false);
    setAnalyticsEnabled(false);
    setAdvertisingEnabled(false);
    setSocialEnabled(false);
    setUnclassifiedEnabled(false);
    saveConsent(false, {
      performance: false,
      analytics: false,
      advertising: false,
      social: false,
      unclassified: false,
    });
    setOpen(false);
    setIsPrefsOpen(false);
  };

  const handleAllowAll = () => {
    setPerformanceEnabled(true);
    setAnalyticsEnabled(true);
    setAdvertisingEnabled(true);
    setSocialEnabled(true);
    setUnclassifiedEnabled(true);
    saveConsent(true, {
      performance: true,
      analytics: true,
      advertising: true,
      social: true,
      unclassified: true,
    });
    setOpen(false);
    setIsPrefsOpen(false);
  };

  const handleDiscardChanges = () => {
    setPerformanceEnabled(true);
    setAnalyticsEnabled(true);
    setAdvertisingEnabled(true);
    setSocialEnabled(true);
    setUnclassifiedEnabled(true);
  };

  const handleSaveAndFinish = () => {
    const anyNonEssential =
      performanceEnabled ||
      analyticsEnabled ||
      advertisingEnabled ||
      socialEnabled ||
      unclassifiedEnabled;
    saveConsent(anyNonEssential);
    setOpen(false);
    setIsPrefsOpen(false);
  };

  const isAllEnabled =
    performanceEnabled &&
    analyticsEnabled &&
    advertisingEnabled &&
    socialEnabled &&
    unclassifiedEnabled;

  if (!open) return null;

  return (
    <>
      <Modal
        open={open}
        onClose={handleReject}
        title='Cookie Policy'
        size='small'
        position='bottom-left'
        actions={
          <Actions>
            <SolidButton
              variant='secondary'
              onClick={() => setIsPrefsOpen(true)}
            >
              Preferences
            </SolidButton>
            <SolidButton variant='primary' onClick={handleAcceptAll}>
              Accept
            </SolidButton>
          </Actions>
        }
      >
        <Content>
          <p>
            We use essential cookies to make our site work. With your consent,
            we may also use non‑essential cookies to improve user experience,
            personalize content, customize advertisements, and analyze website
            traffic. For these reasons, we may share your site usage data with
            our advertising and analytics partners. By clicking “Accept,” you
            agree to store on your device all the technologies described in our{' '}
            <InlineLink as='button' onClick={openPolicyFromPrefs}>
              Cookie Policy
            </InlineLink>
            . You can change your cookie settings at any time by clicking{' '}
            <InlineLink as='button' onClick={() => setIsPrefsOpen(true)}>
              &ldquo;Preferences&rdquo;.
            </InlineLink>
          </p>
        </Content>
      </Modal>

      <Modal
        open={isPolicyOpen && !isPrefsOpen}
        onClose={() => setIsPolicyOpen(false)}
        title='Cookie Policy'
        size='large'
        actions={
          <Actions>
            <SolidButton
              variant='secondary'
              onClick={() => setIsPolicyOpen(false)}
            >
              Back
            </SolidButton>
          </Actions>
        }
      >
        <PolicyScroll>
          <Updated>Last updated June 26, 2025</Updated>
          <p>
            This Cookie Policy explains how CUBIG, Inc. (&ldquo;Company,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; and &ldquo;our&rdquo;) uses
            cookies and similar technologies to recognize you when you visit our
            website at{' '}
            <a href='https://llmcapsule.ai/'>https://llmcapsule.ai/</a>
            (&ldquo;Website&rdquo;). It explains what these technologies are and
            why we use them, as well as your rights to control our use of them.
          </p>
          <p>
            In some cases we may use cookies to collect personal information, or
            that becomes personal information if we combine it with other
            information.
          </p>
          <SectionTitle>What are cookies?</SectionTitle>
          <p>
            Cookies are small data files that are placed on your computer or
            mobile device when you visit a website. Cookies are widely used by
            website owners in order to make their websites work, or to work more
            efficiently, as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, CUBIG, Inc.) are
            called &ldquo;first‑party cookies.&rdquo; Cookies set by parties
            other than the website owner are called &ldquo;third‑party
            cookies.&rdquo; Third‑party cookies enable third‑party features or
            functionality to be provided on or through the website (e.g.,
            advertising, interactive content, and analytics). The parties that
            set these third‑party cookies can recognize your computer both when
            it visits the website in question and also when it visits certain
            other websites.
          </p>
          <SectionTitle>Why do we use cookies?</SectionTitle>
          <p>
            We use first‑ and third‑party cookies for several reasons. Some
            cookies are required for technical reasons in order for our Website
            to operate, and we refer to these as &ldquo;essential&rdquo; or
            &ldquo;strictly necessary&rdquo; cookies. Other cookies also enable
            us to track and target the interests of our users to enhance the
            experience on our Online Properties. Third parties serve cookies
            through our Website for advertising, analytics, and other purposes.
            This is described in more detail below.
          </p>
        </PolicyScroll>
      </Modal>

      <Modal
        open={isPrefsOpen}
        onClose={() => setIsPrefsOpen(false)}
        title='Preferences'
        size='large'
        actions={
          <Actions>
            {isAllEnabled ? (
              <>
                <SolidButton variant='secondary' onClick={handleDeclineAll}>
                  Decline All
                </SolidButton>
                <SolidButton variant='primary' onClick={handleAllowAll}>
                  Allow All
                </SolidButton>
              </>
            ) : (
              <>
                <SolidButton variant='secondary' onClick={handleDiscardChanges}>
                  Discard Changes
                </SolidButton>
                <SolidButton variant='primary' onClick={handleSaveAndFinish}>
                  Save and Finish
                </SolidButton>
              </>
            )}
          </Actions>
        }
      >
        <ContentScrollable>
          <TopDesc>
            We use different types of cookies to optimize your experience on our
            website. Click on the categories below to learn more about their
            purposes. You may choose which types of cookies to allow and can
            change your preferences at any time. Remember that disabling cookies
            may affect your experience on the website. You can learn more about
            how we use cookies by visiting our{' '}
            <InlineLink as='button' onClick={openPolicyFromPrefs}>
              Cookie Policy.
            </InlineLink>
          </TopDesc>

          <CategoryCard className='essential-muted'>
            <CategoryItem>
              <CategoryLeft>
                <Checkbox
                  variant='primary'
                  state={'checked'}
                  disabled
                  onChange={() => {}}
                />
              </CategoryLeft>
              <CategoryRight>
                <CategoryHeader>
                  <TitleWithBadge>
                    <span>Essential Cookies</span>
                    <Badge size='small' type='outline' variant='secondary'>
                      4
                    </Badge>
                  </TitleWithBadge>
                </CategoryHeader>
                <PrefDesc>
                  These cookies are necessary to the core functionality of our
                  website and some of its features, such as access to secure
                  areas.
                </PrefDesc>
                <DetailsRow>
                  <DetailsLink>Details</DetailsLink>
                </DetailsRow>
              </CategoryRight>
            </CategoryItem>
          </CategoryCard>

          <CategoryCard>
            <CategoryItem>
              <CategoryLeft>
                <Checkbox
                  variant='primary'
                  state={performanceEnabled ? 'checked' : 'unchecked'}
                  onChange={(checked) => setPerformanceEnabled(checked)}
                />
              </CategoryLeft>
              <CategoryRight>
                <CategoryHeader>
                  <TitleWithBadge>
                    <span>Performance and Functionality Cookies</span>
                    <Badge size='small' type='outline' variant='secondary'>
                      2
                    </Badge>
                  </TitleWithBadge>
                </CategoryHeader>
                <PrefDesc>
                  These cookies are used to enhance the performance and
                  functionality of our websites but are nonessential to their
                  use. However, without these cookies, certain functionality
                  (like videos) may become unavailable.
                </PrefDesc>
                <DetailsRow>
                  <DetailsLink>Details</DetailsLink>
                </DetailsRow>
              </CategoryRight>
            </CategoryItem>
          </CategoryCard>

          <CategoryCard>
            <CategoryItem>
              <CategoryLeft>
                <Checkbox
                  variant='primary'
                  state={analyticsEnabled ? 'checked' : 'unchecked'}
                  onChange={(checked) => setAnalyticsEnabled(checked)}
                />
              </CategoryLeft>
              <CategoryRight>
                <CategoryHeader>
                  <TitleWithBadge>
                    <span>Analytics and Customization Cookies</span>
                    <Badge size='small' type='outline' variant='secondary'>
                      11
                    </Badge>
                  </TitleWithBadge>
                </CategoryHeader>
                <PrefDesc>
                  These cookies collect information that can help us understand
                  how our websites are being used. This information can also be
                  used to measure effectiveness in our marketing campaigns or to
                  curate a personalized site experience for you.
                </PrefDesc>
                <DetailsRow>
                  <DetailsLink>Details</DetailsLink>
                </DetailsRow>
              </CategoryRight>
            </CategoryItem>
          </CategoryCard>

          <CategoryCard>
            <CategoryItem>
              <CategoryLeft>
                <Checkbox
                  variant='primary'
                  state={advertisingEnabled ? 'checked' : 'unchecked'}
                  onChange={(checked) => setAdvertisingEnabled(checked)}
                />
              </CategoryLeft>
              <CategoryRight>
                <CategoryHeader>
                  <TitleWithBadge>
                    <span>Advertising Cookies</span>
                    <Badge size='small' type='outline' variant='secondary'>
                      0
                    </Badge>
                  </TitleWithBadge>
                </CategoryHeader>
                <PrefDesc>
                  These cookies are used to make advertising messages more
                  relevant to you. They prevent the same ad from continuously
                  reappearing, ensure that ads are properly displayed for
                  advertisers, and in some cases select advertisements that are
                  based on your interests.
                </PrefDesc>
                <DetailsRow>
                  <DetailsLink>Details</DetailsLink>
                </DetailsRow>
              </CategoryRight>
            </CategoryItem>
          </CategoryCard>

          <CategoryCard>
            <CategoryItem>
              <CategoryLeft>
                <Checkbox
                  variant='primary'
                  state={socialEnabled ? 'checked' : 'unchecked'}
                  onChange={(checked) => setSocialEnabled(checked)}
                />
              </CategoryLeft>
              <CategoryRight>
                <CategoryHeader>
                  <TitleWithBadge>
                    <span>Social networking Cookies</span>
                    <Badge size='small' type='outline' variant='secondary'>
                      0
                    </Badge>
                  </TitleWithBadge>
                </CategoryHeader>
                <PrefDesc>
                  These cookies enable you to share our website&apos;s content
                  through third‑party social networks and other websites. These
                  cookies may also be used for advertising purposes.
                </PrefDesc>
                <DetailsRow>
                  <DetailsLink>Details</DetailsLink>
                </DetailsRow>
              </CategoryRight>
            </CategoryItem>
          </CategoryCard>

          <CategoryCard>
            <CategoryItem>
              <CategoryLeft>
                <Checkbox
                  variant='primary'
                  state={unclassifiedEnabled ? 'checked' : 'unchecked'}
                  onChange={(checked) => setUnclassifiedEnabled(checked)}
                />
              </CategoryLeft>
              <CategoryRight>
                <CategoryHeader>
                  <TitleWithBadge>
                    <span>Unclassified Cookies</span>
                    <Badge size='small' type='outline' variant='secondary'>
                      0
                    </Badge>
                  </TitleWithBadge>
                </CategoryHeader>
                <PrefDesc>
                  These are cookies that have not yet been categorized. We are
                  in the process of classifying these cookies with the help of
                  their providers.
                </PrefDesc>
                <DetailsRow>
                  <DetailsLink>Details</DetailsLink>
                </DetailsRow>
              </CategoryRight>
            </CategoryItem>
          </CategoryCard>
        </ContentScrollable>
      </Modal>
    </>
  );
}

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  width: 100%;
`;

const Content = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContentScrollable = styled(Content)`
  max-height: 70vh;
  overflow: auto;
`;

const InlineLink = styled.button`
  padding: 0;
  min-width: 0;
  height: auto;
  text-decoration: underline;
  cursor: pointer;
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;
const PolicyScroll = styled.div`
  width: 100%;
  max-height: 70vh;
  overflow: auto;
  background: white;
  padding: 8px 0;
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 12px 0;
  }
  p {
    ${typography('ko', 'body2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
    margin: 0 0 12px 0;
  }
  ul,
  ol {
    margin: 0 0 12px 20px;
  }
  li {
    margin-bottom: 6px;
  }
  a {
    text-decoration: underline;
  }
`;

const PrefDesc = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const Updated = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0 0 24px 0;
`;

const SectionTitle = styled.h3`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 12px 0 12px 0;
`;

const TopDesc = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const CategoryCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 12px;
  margin: 8px 0;
  &.essential-muted {
    background: #f7f7f8;
  }
`;

const CategoryItem = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 12px;
  align-items: start;
`;

const CategoryLeft = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  padding-top: 4px;
  &.disabled {
    pointer-events: none;
  }
`;

const CategoryRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const TitleWithBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const DetailsRow = styled.div`
  display: flex;
  align-items: center;
`;

const DetailsLink = styled.span`
  ${typography('ko', 'body2', 'regular')}
  text-decoration: underline;
  cursor: default;
  color: ${textColor.light['fg-neutral-alternative']};
`;
