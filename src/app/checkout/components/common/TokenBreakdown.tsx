import React from 'react';
import styled from 'styled-components';
import {
  typography,
  textColor,
  borderColor,
  color,
} from '@cubig/design-system';
import { Badge } from '@cubig/design-system';
import { useTranslation } from 'react-i18next';
import IconData from '@/assets/icons/icon_data.svg';
import PrintIcon from '@/assets/icons/Icon_print.svg';
import InfoSmallIcon from '@/assets/icons/icon_info_small.svg';

interface TokenBreakdownProps {
  tokenUsage: number;
}

export default function TokenBreakdown({ tokenUsage }: TokenBreakdownProps) {
  const { t } = useTranslation('checkout');

  return (
    <TokenBreakdownSection>
      <TokenBreakdownGrid>
        <TokenBreakdownLeft>
          <TokenCard>
            <TokenHeader>
              <TokenTitle>{t('breakdown.title')}</TokenTitle>
              <Badge size='small' type='solid' variant='secondary'>
                {t('breakdown.ratio')}
              </Badge>
            </TokenHeader>
            <TokenContent>
              <TokenLeft>
                <TokenIcon>
                  <IconData />
                </TokenIcon>
                <TokenLabel>{t('breakdown.tokenLabel')}</TokenLabel>
              </TokenLeft>
              <TokenRight>
                <TokenTotal>
                  {tokenUsage.toLocaleString()}
                  <TokenUnit>T</TokenUnit>
                </TokenTotal>
                <TokenDivider />
                <TokenBreakdownListComponent>
                  <TokenBreakdownItem>
                    <span>{t('breakdown.input')}</span>
                    <span>
                      {Math.round(tokenUsage * 0.6).toLocaleString()}
                      <BreakdownUnit>T</BreakdownUnit>
                    </span>
                  </TokenBreakdownItem>
                  <TokenBreakdownItem>
                    <span>{t('breakdown.output')}</span>
                    <span>
                      {Math.round(tokenUsage * 0.4).toLocaleString()}
                      <BreakdownUnit>T</BreakdownUnit>
                    </span>
                  </TokenBreakdownItem>
                </TokenBreakdownListComponent>
              </TokenRight>
            </TokenContent>
          </TokenCard>

          <TokenCard>
            <TokenHeader>
              <TokenTitle>{t('convert.pageConversion')}</TokenTitle>
            </TokenHeader>
            <PageContentWrapper>
              <PageTokenContent>
                <TokenLeft>
                  <A4Icon>
                    <PrintIcon />
                  </A4Icon>
                  <TokenLabel>{t('convert.a4Label')}</TokenLabel>
                </TokenLeft>
                <TokenRight>
                  <TokenTotal>
                    {Math.ceil(Math.round(tokenUsage * 1.6) / 2200) +
                      Math.ceil(Math.round(tokenUsage * 4.5) / 3800)}
                    <TokenUnit>{t('convert.pageUnit')}</TokenUnit>
                  </TokenTotal>
                  <TokenDivider />
                  <TokenBreakdownListComponent>
                    <TokenBreakdownItem>
                      <span>{t('convert.ko')}</span>
                      <span>
                        {Math.ceil(Math.round(tokenUsage * 1.6) / 2200)}
                        <BreakdownUnit>{t('convert.pageUnit')}</BreakdownUnit>
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <span>{t('convert.en')}</span>
                      <span>
                        {Math.ceil(Math.round(tokenUsage * 4.5) / 3800)}
                        <BreakdownUnit>{t('convert.pageUnit')}</BreakdownUnit>
                      </span>
                    </TokenBreakdownItem>
                  </TokenBreakdownListComponent>
                </TokenRight>
              </PageTokenContent>
              <PageAssumptionNote>
                <InfoSmallIcon />
                <span>{t('assumptions.pageConversion')}</span>
              </PageAssumptionNote>
            </PageContentWrapper>
          </TokenCard>
        </TokenBreakdownLeft>

        <TokenBreakdownRight>
          <TokenCard>
            <TokenHeader>
              <TokenTitle>{t('convert.characterConversion')}</TokenTitle>
            </TokenHeader>
            <LanguageContent>
              <LanguageCard>
                <TokenLeft>
                  <LanguageIcon>{t('convert.krLabel')}</LanguageIcon>
                  <TokenLabel>{t('convert.ko')}</TokenLabel>
                </TokenLeft>
                <TokenRight>
                  <TokenTotal>
                    {Math.round(tokenUsage * 1.6).toLocaleString()}
                    <TokenUnit>{t('convert.charUnit')}</TokenUnit>
                  </TokenTotal>
                  <TokenDivider />
                  <TokenBreakdownListComponent>
                    <TokenBreakdownItem>
                      <span>{t('breakdown.input')}</span>
                      <span>
                        {Math.round(tokenUsage * 0.6 * 1.6).toLocaleString()}
                        <BreakdownUnit>{t('convert.charUnit')}</BreakdownUnit>
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <span>{t('breakdown.output')}</span>
                      <span>
                        {Math.round(tokenUsage * 0.4 * 1.6).toLocaleString()}
                        <BreakdownUnit>{t('convert.charUnit')}</BreakdownUnit>
                      </span>
                    </TokenBreakdownItem>
                  </TokenBreakdownListComponent>
                </TokenRight>
              </LanguageCard>

              <LanguageCard>
                <TokenLeft>
                  <LanguageIcon>{t('convert.enLabel')}</LanguageIcon>
                  <TokenLabel>{t('convert.en')}</TokenLabel>
                </TokenLeft>
                <TokenRight>
                  <TokenTotal>
                    {Math.round(tokenUsage * 4.5).toLocaleString()}
                    <TokenUnit>{t('convert.charUnit')}</TokenUnit>
                  </TokenTotal>
                  <TokenDivider />
                  <TokenBreakdownListComponent>
                    <TokenBreakdownItem>
                      <span>{t('breakdown.input')}</span>
                      <span>
                        {Math.round(tokenUsage * 0.6 * 4.5).toLocaleString()}
                        <BreakdownUnit>{t('convert.charUnit')}</BreakdownUnit>
                      </span>
                    </TokenBreakdownItem>
                    <TokenBreakdownItem>
                      <span>{t('breakdown.output')}</span>
                      <span>
                        {Math.round(tokenUsage * 0.4 * 4.5).toLocaleString()}
                        <BreakdownUnit>{t('convert.charUnit')}</BreakdownUnit>
                      </span>
                    </TokenBreakdownItem>
                  </TokenBreakdownListComponent>
                </TokenRight>
              </LanguageCard>
              <PageAssumptionNote>
                <InfoSmallIcon />
                <span>{t('assumptions.characterConversion')}</span>
              </PageAssumptionNote>
            </LanguageContent>
          </TokenCard>
        </TokenBreakdownRight>
      </TokenBreakdownGrid>
    </TokenBreakdownSection>
  );
}

const TokenBreakdownSection = styled.div`
  margin-top: 24px;
`;

const TokenBreakdownGrid = styled.div`
  display: flex;
  gap: 20px;
`;

const TokenBreakdownLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TokenBreakdownRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TokenCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: ${color.gray['50']};
`;

const TokenHeader = styled.div`
  padding: 16px 12px 8px 12px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TokenTitle = styled.h5`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  margin: 0;
`;

const TokenContent = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  margin: 0 12px 16px 12px;
`;

const LanguageContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LanguageCard = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
`;

const TokenLeft = styled.div`
  display: flex;
  width: 80px;
  height: 89px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-right: 1px solid ${borderColor.light['color-border-primary']};
  padding: 8px 0;
`;

const TokenIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography('ko', 'caption2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};

  svg {
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;

const TokenLabel = styled.div`
  ${typography('ko', 'caption2', 'regular')}
`;

const TokenRight = styled.div`
  padding: 8px 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TokenTotal = styled.div`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-primary']};
  display: flex;
  align-items: center;
  gap: 2px;
`;

const TokenUnit = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const TokenBreakdownListComponent = styled.div`
  display: flex;
  flex-direction: column;
`;

const TokenDivider = styled.div`
  height: 1px;
  background-color: ${borderColor.light['color-border-primary']};
  margin: 8px 0;
`;

const TokenBreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span:first-child {
    ${typography('ko', 'caption2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
  }

  span:last-child {
    ${typography('ko', 'caption2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;

const BreakdownUnit = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const LanguageIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography('ko', 'caption2', 'medium')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const A4Icon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${borderColor.light['color-border-primary']};
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const PageContentWrapper = styled.div`
  padding: 0 12px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PageTokenContent = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
`;

const PageAssumptionNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${textColor.light['fg-neutral-alternative']};
  }

  span {
    ${typography('ko', 'caption2', 'regular')}
    color: ${textColor.light['fg-neutral-alternative']};
  }
`;
