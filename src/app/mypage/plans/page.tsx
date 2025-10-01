'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import {
  SolidButton,
  Divider,
  textColor,
  color,
  typography,
  Selector,
  Dropdown,
  Badge,
  IconButton,
  TextButton,
} from '@cubig/design-system';
import DataIcon from '@/assets/icons/icon_data.svg';
import HistoryIcon from '@/assets/icons/icon_history.svg';
import UpgradeModal from './UpgradeModal';
import CancelModal from './CancelModal';
import ChevronLeftIcon from '@/assets/icons/icon_chevron_left.svg';
import ChevronRightIcon from '@/assets/icons/icon_chevron_right.svg';
import { llmService } from '@/services/llm';
import type {
  UserBundlesResponse,
  UserBundleResponse,
  SerialInfo,
} from '@/utils/api';
import { formatDateShort, formatDate } from '@/utils/date';
import PlanBasicImage from '@/assets/images/plan_basic.png';
import PlanPlusImage from '@/assets/images/plan_plus.png';
import PlanProImage from '@/assets/images/plan_pro.png';
import PlanMaxImage from '@/assets/images/plan_max.png';
import { useTranslation } from 'react-i18next';

export default function PlansPage() {
  const router = useRouter();
  const { t } = useTranslation('plans');

  const [loading, setLoading] = useState(true);
  const [bundles, setBundles] = useState<UserBundleResponse[] | null>(null);
  const [selectedBundleId, setSelectedBundleId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>(
    'overview'
  );
  const [serialFilter, setSerialFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const res = await llmService.getMyPlans();

      if (!res.success) {
        throw new Error(res.error || 'Failed to load plans');
      }

      const data: UserBundlesResponse | null = res.data || null;
      const list = data?.bundles ?? [];
      setBundles(list);
      if (list.length > 0) setSelectedBundleId(String(list[0].id));
    } catch (e) {
      console.error('Failed to load my plans', e);
      setBundles(null);

      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [serialFilter, selectedBundleId]);

  const hasPlan = useMemo(() => (bundles?.length ?? 0) > 0, [bundles]);
  const currentBundle = useMemo(
    () => bundles?.find((b) => String(b.id) === selectedBundleId) || null,
    [bundles, selectedBundleId]
  );

  const filteredSerials = useMemo(() => {
    if (!currentBundle?.serials) return [];
    return currentBundle.serials.filter((s: SerialInfo) =>
      serialFilter === 'all'
        ? true
        : serialFilter === 'active'
          ? s.status === 'ACTIVE'
          : s.status !== 'ACTIVE'
    );
  }, [currentBundle?.serials, serialFilter]);

  const totalPages = Math.ceil(filteredSerials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSerials = filteredSerials.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <Container>
        <PageTitle>{t('pageTitle')}</PageTitle>
        <PageSubtitle>{t('pageSubtitle')}</PageSubtitle>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle>{t('pageTitle')}</PageTitle>
      <PageSubtitle>{t('pageSubtitle')}</PageSubtitle>

      <Tabs>
        <TabButton
          $active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        >
          {t('tabs.overview')}
        </TabButton>
        <TabButton
          $active={activeTab === 'history'}
          onClick={() => setActiveTab('history')}
        >
          {t('tabs.history')}
        </TabButton>
      </Tabs>

      {activeTab === 'overview' && !hasPlan ? (
        <EmptyState>
          <IconButton type='outline' icon={DataIcon} />
          <EmptyTexts>
            <EmptyTitle>{t('empty.noPlan.title')}</EmptyTitle>
            <EmptyDesc>{t('empty.noPlan.description')}</EmptyDesc>
          </EmptyTexts>
          <SolidButton
            variant='primary'
            size='small'
            onClick={() => router.push('/#pricing-section')}
          >
            {t('empty.noPlan.button')}
          </SolidButton>
        </EmptyState>
      ) : activeTab === 'overview' ? (
        <>
          <SectionTitle>{t('myPlan.title')}</SectionTitle>
          <SelectorRow>
            <Dropdown
              label={t('myPlan.planNumberLabel')}
              size='medium'
              value={selectedBundleId}
              onChange={(v) => setSelectedBundleId(v)}
              options={
                bundles?.map((b) => ({
                  value: String(b.id),
                  label: `${b.id} (${b?.purchase_type || 'PERSONAL'})`,
                })) || []
              }
            />
          </SelectorRow>

          <ActionBar>
            {/**
            <SolidButton
              variant='primary'
              size='medium'
              onClick={() => setUpgradeOpen(true)}
            >
              {t('myPlan.upgrade')}
            </SolidButton>
            */}
            <SolidButton
              variant='secondary'
              size='medium'
              onClick={() => setCancelOpen(true)}
            >
              {t('myPlan.cancel')}
            </SolidButton>
          </ActionBar>

          <Divider />
          <SectionSmallTitle>{t('planInfo.title')}</SectionSmallTitle>
          <PlanSummaryRow>
            <PlanThumb
              src={
                (currentBundle?.plan?.name || '') === 'PLUS'
                  ? PlanPlusImage.src
                  : (currentBundle?.plan?.name || '') === 'PRO'
                    ? PlanProImage.src
                    : (currentBundle?.plan?.name || '') === 'MAX'
                      ? PlanMaxImage.src
                      : PlanBasicImage.src
              }
              alt='plan'
            />
            <SummaryTexts>
              <PlanName>{currentBundle?.plan?.name || '-'}</PlanName>
              <PlanMetaRow>
                <MetaLeft>
                  {(
                    currentBundle?.plan?.monthly_token_limit || 0
                  ).toLocaleString()}{' '}
                  {t('planInfo.tokens')}
                </MetaLeft>
                <MetaDivider />
                <MetaRight>
                  {currentBundle?.created_at
                    ? `${formatDate(currentBundle.created_at)} ${t('planInfo.subscribedSince')}`
                    : ''}
                </MetaRight>
              </PlanMetaRow>
            </SummaryTexts>
          </PlanSummaryRow>

          <Divider style={{ marginBottom: 16 }} />
          <InfoGrid>
            <InfoCell>
              <InfoLabel>{t('planInfo.serialCount')}</InfoLabel>
              <InfoValue>{currentBundle?.serials?.length ?? 0}</InfoValue>
            </InfoCell>
            <InfoCell>
              <InfoLabel>{t('planInfo.expiryDate')}</InfoLabel>
              <InfoValue>
                {currentBundle?.next_billing_date
                  ? formatDateShort(currentBundle.next_billing_date)
                  : '-'}
              </InfoValue>
            </InfoCell>
          </InfoGrid>
          <Divider style={{ marginTop: 16, marginBottom: 40 }} />

          <SectionSmallTitle>{t('serialManagement.title')}</SectionSmallTitle>
          <SerialToolbar>
            <Selector
              size='small'
              value={serialFilter}
              onChange={(v) =>
                setSerialFilter(v as 'all' | 'active' | 'inactive')
              }
              options={[
                { value: 'all', label: t('serialManagement.filters.all') },
                {
                  value: 'active',
                  label: t('serialManagement.filters.active'),
                },
                {
                  value: 'inactive',
                  label: t('serialManagement.filters.inactive'),
                },
              ]}
              style={{ width: '120px' }}
            />
          </SerialToolbar>
          <SerialTable>
            <thead>
              <tr>
                <th>{t('serialManagement.table.no')}</th>
                <th>{t('serialManagement.table.serialNumber')}</th>
                <th>{t('serialManagement.table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {currentSerials.map((s: SerialInfo, idx: number) => (
                <tr key={s.id}>
                  <td>{startIndex + idx + 1}</td>
                  <td>{s.serial_number}</td>
                  <td>
                    <Badge
                      type='solid'
                      variant={s.status === 'ACTIVE' ? 'positive' : 'secondary'}
                      size='small'
                    >
                      {s.status === 'ACTIVE'
                        ? t('serialManagement.table.statusActive')
                        : t('serialManagement.table.statusInactive')}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </SerialTable>

          {totalPages > 1 && (
            <PaginationContainer>
              <IconButton
                size='small'
                type='solid'
                variant='secondary'
                icon={ChevronLeftIcon}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />

              <PageNumbers>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <TextButton
                      key={page}
                      size='small'
                      state={page === currentPage ? 'focused' : 'default'}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </TextButton>
                  )
                )}
              </PageNumbers>

              <IconButton
                size='small'
                type='solid'
                variant='secondary'
                icon={ChevronRightIcon}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationContainer>
          )}
        </>
      ) : (
        <>
          {bundles && bundles.length > 0 ? (
            <SerialTable>
              <thead>
                <tr>
                  <th>{t('history.table.planName')}</th>
                  <th>{t('history.table.serialCount')}</th>
                  <th>{t('history.table.firstPaymentDate')}</th>
                  <th>{t('history.table.expiryDate')}</th>
                  <th>{t('history.table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {bundles.map((b) => (
                  <tr key={b.id}>
                    <td>{b.plan?.name || '-'}</td>
                    <td>{b.serials?.length ?? 0}</td>
                    <td>{b.created_at ? formatDate(b.created_at) : '-'}</td>
                    <td>
                      {b.next_billing_date
                        ? formatDate(b.next_billing_date)
                        : '-'}
                    </td>
                    <td>
                      <Badge
                        type='solid'
                        variant={
                          b.status === 'ACTIVE' ? 'positive' : 'secondary'
                        }
                        size='small'
                      >
                        {b.status === 'ACTIVE'
                          ? t('history.table.statusActive')
                          : t('history.table.statusExpired')}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </SerialTable>
          ) : (
            <EmptyState>
              <IconButton type='outline' icon={HistoryIcon} />
              <EmptyTexts>
                <EmptyTitle>{t('empty.noHistory.title')}</EmptyTitle>
                <EmptyDesc>{t('empty.noHistory.description')}</EmptyDesc>
              </EmptyTexts>
              <SolidButton
                variant='primary'
                size='small'
                onClick={() => router.push('/#pricing-section')}
              >
                {t('empty.noHistory.button')}
              </SolidButton>
            </EmptyState>
          )}
        </>
      )}
      <UpgradeModal
        open={upgradeOpen}
        currentPlanName={
          (currentBundle?.plan?.name as 'BASIC' | 'PLUS' | 'PRO' | 'MAX') ||
          'BASIC'
        }
        purchaseType={
          currentBundle?.purchase_type === 'BUSINESS' ? 'BUSINESS' : 'PERSONAL'
        }
        onClose={() => setUpgradeOpen(false)}
        onUpgrade={() => setUpgradeOpen(false)}
      />
      <CancelModal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        planName={currentBundle?.plan?.name}
        planNumber={selectedBundleId}
        nextBillingDate={currentBundle?.next_billing_date || ''}
        bundleId={currentBundle?.id}
        onConfirm={() => {
          setCancelOpen(false);
          loadPlans();
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 64px 32px;
`;

const PageTitle = styled.h1`
  ${typography(undefined, 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 8px 0;
`;

const PageSubtitle = styled.p`
  ${typography(undefined, 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0 0 60px 0;
`;

const Tabs = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid ${color.gray['200']};
  margin-bottom: 40px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 8px 0;
  cursor: pointer;
  ${typography('ko', 'body2', 'medium')}
  color: ${(p) =>
    p.$active
      ? textColor.light['fg-neutral-primary']
      : textColor.light['fg-neutral-alternative']};
  border-bottom: 2px solid
    ${(p) =>
      p.$active ? textColor.light['fg-neutral-primary'] : 'transparent'};
`;

const SectionTitle = styled.h2`
  ${typography(undefined, 'heading1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0 0 24px 0;
`;

const EmptyState = styled.div`
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
`;

const EmptyTitle = styled.h3`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const EmptyTexts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const EmptyDesc = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0;
`;

const SelectorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const PlanName = styled.h3`
  ${typography('ko', 'title1', 'semibold')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const SectionSmallTitle = styled.h3`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 16px 0 12px 0;
`;

const PlanSummaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0 16px 0;
`;

const PlanThumb = styled.img`
  width: 80px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
`;

const SummaryTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlanMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MetaLeft = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const MetaDivider = styled.div`
  width: 1px;
  height: 12px;
  background: ${color.gray['300']};
`;

const MetaRight = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const InfoCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoLabel = styled.div`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const InfoValue = styled.div`
  ${typography('ko', 'title1', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
`;

const ActionBar = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0 16px 0;
  justify-content: flex-end;
`;

const SerialToolbar = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const SerialTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border: 1px solid ${color.gray['200']};
  border-radius: 8px;
  overflow: hidden;

  thead tr {
    background: ${color.gray['50']};
    text-align: left;
  }

  th {
    padding: 4px 0 4px 20px;
    border-bottom: 1px solid ${color.gray['200']};
    ${typography('ko', 'body2', 'medium')}
  }

  td {
    padding: 8px 0 8px 20px;
    border-bottom: 1px solid ${color.gray['200']};
    ${typography('ko', 'body2', 'medium')}
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 4px;
`;
