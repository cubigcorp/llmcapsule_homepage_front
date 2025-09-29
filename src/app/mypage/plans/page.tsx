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

export default function PlansPage() {
  const router = useRouter();

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

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        // plans/my 사용
        const res = await llmService.getMyPlans();
        const data: UserBundlesResponse | null = res.data || null;
        const list = data?.bundles ?? [];
        setBundles(list);
        if (list.length > 0) setSelectedBundleId(String(list[0].id));
      } catch (e) {
        console.error('Failed to load my plans', e);
        setBundles(null);
      } finally {
        setLoading(false);
      }
    };
    run();
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
        <PageTitle>플랜 관리</PageTitle>
        <PageSubtitle>
          현재 구독 상태와 결제 정보를 관리할 수 있습니다.
        </PageSubtitle>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle>플랜 관리</PageTitle>
      <PageSubtitle>
        현재 구독 상태와 결제 정보를 관리할 수 있습니다.
      </PageSubtitle>

      <Tabs>
        <TabButton
          $active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        >
          개요
        </TabButton>
        <TabButton
          $active={activeTab === 'history'}
          onClick={() => setActiveTab('history')}
        >
          구독 내역
        </TabButton>
      </Tabs>

      {!hasPlan ? (
        <EmptyState>
          <EmptyIcon>💳</EmptyIcon>
          <EmptyTitle>구독 중인 플랜이 없습니다.</EmptyTitle>
          <EmptyDesc>원하는 플랜을 선택하고 서비스를 시작해 보세요.</EmptyDesc>
          <SolidButton
            variant='secondary'
            size='small'
            onClick={() => router.push('/#pricing-section')}
          >
            나에게 맞는 플랜 찾기
          </SolidButton>
        </EmptyState>
      ) : activeTab === 'overview' ? (
        <>
          <SectionTitle>내 플랜</SectionTitle>
          <SelectorRow>
            <Dropdown
              label='플랜 번호'
              size='medium'
              value={selectedBundleId}
              onChange={(v) => setSelectedBundleId(v)}
              options={
                bundles?.map((b) => ({
                  value: String(b.id),
                  label: String(b.id),
                })) || []
              }
            />
          </SelectorRow>

          <ActionBar>
            <SolidButton variant='primary' size='medium'>
              업그레이드
            </SolidButton>
            <SolidButton variant='secondary' size='medium'>
              구독취소
            </SolidButton>
          </ActionBar>

          <Divider />
          <SectionSmallTitle>플랜 정보</SectionSmallTitle>
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
                  tokens
                </MetaLeft>
                <MetaDivider />
                <MetaRight>
                  {currentBundle?.created_at
                    ? `${formatDate(currentBundle.created_at)}부터 구독 중`
                    : ''}
                </MetaRight>
              </PlanMetaRow>
            </SummaryTexts>
          </PlanSummaryRow>

          <Divider style={{ marginBottom: 16 }} />
          <InfoGrid>
            <InfoCell>
              <InfoLabel>시리얼 수</InfoLabel>
              <InfoValue>{currentBundle?.serials?.length ?? 0}</InfoValue>
            </InfoCell>
            <InfoCell>
              <InfoLabel>다음 결제일</InfoLabel>
              <InfoValue>
                {currentBundle?.next_billing_date
                  ? formatDateShort(currentBundle.next_billing_date)
                  : '-'}
              </InfoValue>
            </InfoCell>
          </InfoGrid>
          <Divider style={{ marginTop: 16, marginBottom: 40 }} />

          <SectionSmallTitle>시리얼 관리</SectionSmallTitle>
          <SerialToolbar>
            <Selector
              size='small'
              value={serialFilter}
              onChange={(v) =>
                setSerialFilter(v as 'all' | 'active' | 'inactive')
              }
              options={[
                { value: 'all', label: '전체' },
                { value: 'active', label: '활성화' },
                { value: 'inactive', label: '비활성화' },
              ]}
              style={{ width: '120px' }}
            />
          </SerialToolbar>
          <SerialTable>
            <thead>
              <tr>
                <th>No</th>
                <th>시리얼 번호</th>
                <th>활성화</th>
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
                      {s.status === 'ACTIVE' ? '활성화' : '비활성화'}
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
        <HistoryPlaceholder>구독 내역</HistoryPlaceholder>
      )}
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
  gap: 12px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${color.gray['100']};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyTitle = styled.h3`
  ${typography('ko', 'body3', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const EmptyDesc = styled.p`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin: 0 0 8px 0;
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

const HistoryPlaceholder = styled.div`
  ${typography('ko', 'body2', 'regular')}
  color: ${textColor.light['fg-neutral-primary']};
  padding: 16px 0;
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
