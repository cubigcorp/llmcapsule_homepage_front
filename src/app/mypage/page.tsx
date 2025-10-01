'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import {
  textColor,
  typography,
  borderColor,
  color,
  IconButton,
  SolidButton,
  Divider,
  Selector,
} from '@cubig/design-system';
import { authService } from '@/services/auth';
import { llmService } from '@/services/llm';
import type {
  UserInfo,
  MyPageHomeResponse,
  UserBundleResponse,
} from '@/utils/api';
import { formatDateShort } from '@/utils/date';
import DataIcon from '@/assets/icons/icon_data.svg';
import ArrowRightIcon from '@/assets/icons/icon_arrow_forward.svg';
import PlanTrialImage from '@/assets/images/plan_trial.png';
import InfoCircleIcon from '@/assets/icons/icon_info_circle.svg';
import CallCircleIcon from '@/assets/icons/icon_call_circle.svg';
import DashboardCircleIcon from '@/assets/icons/icon_dashboard_circle.svg';
import UsageCircleIcon from '@/assets/icons/icon_usage_circle.svg';
import CardCircleIcon from '@/assets/icons/icon_card_circle.svg';
import CardIcon from '@/assets/icons/icon_card.svg';
import PlanBasicImage from '@/assets/images/plan_basic.png';
import PlanPlusImage from '@/assets/images/plan_plus.png';
import PlanProImage from '@/assets/images/plan_pro.png';
import PlanMaxImage from '@/assets/images/plan_max.png';
export default function MyPage() {
  const router = useRouter();
  const { t } = useTranslation('mypage');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [myPageData, setMyPageData] = useState<MyPageHomeResponse | null>(null);
  const [userBundles, setUserBundles] = useState<UserBundleResponse[] | null>(
    null
  );
  const [selectedBundleId, setSelectedBundleId] = useState<string>('');
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await authService.getMyInfo();

        if (!userResponse.success) {
          throw new Error('Failed to get user info');
        }

        setUserInfo(userResponse.data || null);

        const [myPageResponse, bundlesResponse] = await Promise.all([
          llmService.getMyStatic(),
          llmService.getMyBundles(),
        ]);

        setMyPageData(myPageResponse.data || null);

        const dataAny = bundlesResponse.data as unknown as
          | { bundles?: UserBundleResponse[] }
          | UserBundleResponse[]
          | null;
        const bundles = Array.isArray(dataAny)
          ? (dataAny as UserBundleResponse[])
          : dataAny?.bundles || [];
        setUserBundles(bundles);

        const hasBundles = bundles.length > 0;
        setHasSubscription(hasBundles);
        if (hasBundles) {
          setSelectedBundleId(String(bundles[0].id));
        }
      } catch (error: unknown) {
        console.error('데이터 조회 실패:', error);
        setUserInfo(null);
        setMyPageData(null);
        setUserBundles(null);
        setSelectedBundleId('');

        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          router.push('/login');
        }
      }
    };

    fetchData();
  }, [router]);

  return (
    <Container>
      <Header>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
      </Header>

      <MainGrid>
        <LeftColumn>
          {hasSubscription ? (
            <>
              <StatsGrid>
                <StatCard>
                  <DashboardCircleIcon />
                  <StatLabel>{t('stats.usingPlan')}</StatLabel>
                  <StatValue>{myPageData?.active_plan_count || 0}</StatValue>
                </StatCard>
                <StatDivider />
                <StatCard>
                  <UsageCircleIcon />
                  <StatLabel>{t('stats.activeSerial')}</StatLabel>
                  <StatValue>{myPageData?.active_serial_count || 0}</StatValue>
                </StatCard>
                <StatDivider />
                <StatCard>
                  <CardCircleIcon />
                  <StatLabel>{t('stats.nextPayment')}</StatLabel>
                  <StatValue>
                    {myPageData?.earliest_expiry_date
                      ? formatDateShort(myPageData.earliest_expiry_date)
                      : '-'}
                  </StatValue>
                </StatCard>
              </StatsGrid>

              <PlanSection>
                <SectionTitle>{t('plan.title')}</SectionTitle>

                <PlanSelectorWrapper>
                  <PlanLabel>{t('plan.number')}</PlanLabel>
                  <Selector
                    value={selectedBundleId}
                    onChange={(value) => setSelectedBundleId(value)}
                    options={
                      userBundles?.map((b) => ({
                        value: String(b.id),
                        label: String(b.id),
                      })) || []
                    }
                  />
                </PlanSelectorWrapper>

                <PlanCardContainer>
                  <PlanCardHeader>
                    <PlanCard>
                      <PlanImageContainer>
                        <img
                          src={(() => {
                            const bundle = userBundles?.find(
                              (b) => String(b.id) === selectedBundleId
                            );
                            const name = bundle?.plan?.name || '';
                            if (name === 'BASIC') return PlanBasicImage.src;
                            if (name === 'PLUS') return PlanPlusImage.src;
                            if (name === 'PRO') return PlanProImage.src;
                            if (name === 'MAX') return PlanMaxImage.src;
                            return PlanBasicImage.src;
                          })()}
                          alt='Plan Image'
                        />
                      </PlanImageContainer>
                      <PlanInfo>
                        <PlanName>
                          {userBundles?.find(
                            (b) => String(b.id) === selectedBundleId
                          )?.plan?.name || '-'}
                        </PlanName>
                        <PlanTokens>
                          {(userBundles
                            ?.find((b) => String(b.id) === selectedBundleId)
                            ?.plan?.monthly_token_limit?.toLocaleString() ||
                            0) + '/tokens'}
                        </PlanTokens>
                      </PlanInfo>
                    </PlanCard>
                  </PlanCardHeader>
                  <PlanDate>
                    <CardIcon />
                    <span>{t('plan.nextPayment')}</span>
                    <span>
                      {(() => {
                        const date = userBundles?.find(
                          (b) => String(b.id) === selectedBundleId
                        )?.next_billing_date;
                        return date ? formatDateShort(date) : '-';
                      })()}
                    </span>
                  </PlanDate>
                </PlanCardContainer>

                <PlanActions>
                  <SolidButton
                    variant='secondary'
                    size='small'
                    onClick={() => router.push('/mypage/plans')}
                  >
                    {t('plan.manage')}
                  </SolidButton>
                  {/**
                   * <SolidButton variant='secondary' size='small'>
                   *   {t('plan.receipt')}
                   * </SolidButton>
                   */}
                </PlanActions>

                <PlanDivider />
              </PlanSection>
            </>
          ) : hasSubscription === null ? null : (
            <>
              <EmptyStateContainer>
                <IconButton type='outline' icon={DataIcon} />
                <EmptyStateTitle>{t('empty.title')}</EmptyStateTitle>
                <EmptyStateDescription>{t('empty.desc')}</EmptyStateDescription>
                <SolidButton
                  variant='primary'
                  size='small'
                  onClick={() => {
                    const accessToken = localStorage.getItem('access_token');
                    if (!accessToken) {
                      router.push('/login');
                      return;
                    }
                    window.location.href = '/#pricing-section';
                  }}
                >
                  {t('empty.cta')}
                </SolidButton>
              </EmptyStateContainer>

              <TrialCard
                onClick={async () => {
                  const accessToken = localStorage.getItem('access_token');
                  if (!accessToken) {
                    router.push('/login');
                    return;
                  }

                  try {
                    const response = await llmService.createPurchase({
                      plan_id: 1,
                      seat_count: 1,
                      contract_month: 0,
                      is_prepayment: false,
                      add_on: [],
                      total_price: 0,
                      purchase_type: 'PERSONAL',
                    });

                    if (response.success) {
                      router.push('/mypage/plans');
                    }
                  } catch (error) {
                    console.error('Trial purchase failed:', error);
                  }
                }}
              >
                <TrialImageContainer>
                  <img src={PlanTrialImage.src} alt='Trial Plan' />
                </TrialImageContainer>
                <TrialContent>
                  <TrialTitle>{t('trial.title')}</TrialTitle>
                  <TrialTokens>{t('trial.tokens')}</TrialTokens>
                </TrialContent>
                <TrialArrowIcon />
              </TrialCard>
            </>
          )}

          {/* <SupportSection>
            <SectionTitle>{t('support.title')}</SectionTitle>
            <SupportGrid>
              <SupportCard>
                <InfoCircleIcon />
                <SupportContent>
                  <SupportTitle>{t('support.guide')}</SupportTitle>
                  <SupportDesc>{t('support.guideDesc')}</SupportDesc>
                </SupportContent>
                <SupportArrowIcon />
              </SupportCard>
              <SupportCard>
                <CallCircleIcon />
                <SupportContent>
                  <SupportTitle>{t('support.contact')}</SupportTitle>
                  <SupportDesc>{t('support.contactDesc')}</SupportDesc>
                </SupportContent>
                <SupportArrowIcon />
              </SupportCard>
            </SupportGrid>
          </SupportSection> */}
        </LeftColumn>

        <RightColumn>
          <AccountSection>
            <AccountTitle>
              {userInfo?.last_name && userInfo?.first_name
                ? `${userInfo.last_name}${userInfo.first_name}`
                : userInfo?.first_name ||
                  userInfo?.last_name ||
                  t('account.user')}
            </AccountTitle>
            <AccountEmail>{userInfo?.email || 'account@cubig.ai'}</AccountEmail>
            <SolidButton
              variant='secondary'
              size='small'
              onClick={() => router.push('/mypage/profile')}
            >
              {t('account.edit')}
            </SolidButton>
            <AccountInfo>
              <InfoItem>
                <InfoLabel>{t('account.contact')}</InfoLabel>
                <InfoValue>{userInfo?.phone || '01012345678'}</InfoValue>
              </InfoItem>
              <Divider />
              <InfoItem>
                <InfoLabel>{t('account.org')}</InfoLabel>
                <InfoValue>{userInfo?.organization_name || '큐빅'}</InfoValue>
              </InfoItem>
            </AccountInfo>
          </AccountSection>
        </RightColumn>
      </MainGrid>
    </Container>
  );
}

const Container = styled.div`
  padding: 64px 32px;
`;

const Header = styled.div`
  margin-bottom: 12px;
`;

const Title = styled.h1`
  ${typography('ko', 'heading1', 'bold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 12px 0;
`;

const Subtitle = styled.p`
  ${typography('ko', 'body1', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
`;

const StatsGrid = styled.div`
  background: white;
  display: flex;
  align-items: center;
`;

const StatCard = styled.div`
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const StatDivider = styled.div`
  width: 1px;
  height: 138px;
  background: ${borderColor.light['color-border-primary']};
  margin: 0 12px;
`;

const StatLabel = styled.div`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 20px 0 4px 0;
`;

const StatValue = styled.div`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};

  @media (max-width: 575px) {
    font-size: 36px;
    line-height: 48px;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 60px;
  align-items: start;
  margin-top: 64px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const RightColumn = styled.div`
  width: 320px;
  position: relative;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 320px;
  width: 100%;
`;

const EmptyStateTitle = styled.h2`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 20px 0 4px 0;
`;

const EmptyStateDescription = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0 0 20px 0;
`;

const TrialCard = styled.div`
  background: ${color.gray['950']};
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const TrialImageContainer = styled.div`
  width: 80px;
  height: 64px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TrialContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TrialTitle = styled.h3`
  ${typography('ko', 'body3', 'medium')}
  color: white;
  margin: 0;
`;

const TrialTokens = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${color.gray['300']};
  margin: 0;
`;

const AccountSection = styled.div`
  background: white;
  padding: 0;
`;

const PlanSection = styled.div``;

const SectionTitle = styled.h2`
  ${typography('ko', 'heading1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 20px 0;
`;

const AccountTitle = styled.h1`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 4px 0;
`;

const AccountEmail = styled.p`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 12px 0;
`;

const AccountInfo = styled.div`
  margin-top: 24px;
`;

const InfoItem = styled.div`
  padding: 20px 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const PlanSelectorWrapper = styled.div`
  margin-bottom: 20px;
`;

const PlanLabel = styled.div`
  ${typography('ko', 'body2', 'medium')}
  margin-bottom: 4px;
`;

const PlanCardContainer = styled.div`
  background: ${color.gray['50']};
  border-radius: 12px;
  border: none;
`;

const PlanCardHeader = styled.div`
  padding: 4px;
`;

const PlanCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 8px;
  border-radius: 12px;
  background: white;
`;

const PlanImageContainer = styled.div`
  width: 80px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlanInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlanName = styled.h3`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const PlanTokens = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
`;

const PlanDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-bottom: 0;
  padding: 8px 8px 12px 8px;
  span:last-child {
    color: ${textColor.light['fg-neutral-primary']};
  }
`;

const PlanActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const PlanDivider = styled(Divider)`
  margin-top: 40px;
`;

const SupportSection = styled.div``;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const SupportCard = styled.div`
  background: white;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  transition: border-color 0.2s;
  display: flex;
  align-items: center;
  gap: 20px;

  &:hover {
    border-color: ${borderColor.light['color-border-focused']};
  }
`;

const SupportContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SupportTitle = styled.h3`
  ${typography('ko', 'body1', 'bold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const SupportDesc = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
`;

const SupportArrowIcon = styled(ArrowRightIcon)`
  color: ${textColor.light['fg-neutral-primary']};
  flex-shrink: 0;
`;

const TrialArrowIcon = styled(ArrowRightIcon)`
  color: white;
  flex-shrink: 0;
`;
