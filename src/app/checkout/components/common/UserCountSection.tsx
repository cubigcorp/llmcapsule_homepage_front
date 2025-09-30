import React from 'react';
import styled from 'styled-components';
import { typography, textColor, TextField, Chip } from '@cubig/design-system';
import { useTranslation } from 'react-i18next';
import RemoveIcon from '@/assets/icons/icon_remove.svg';
import SmallAddIcon from '@/assets/icons/icon_add_small.svg';

interface UserCountSectionProps {
  userCount: number;
  onUserCountChange: (count: number) => void;
  type?: 'business' | 'personal';
}

export default function UserCountSection({
  userCount,
  onUserCountChange,
  type = 'personal',
}: UserCountSectionProps) {
  const { t } = useTranslation('checkout');

  const handleUserCountChange = (value: string) => {
    const count = parseInt(value) || (type === 'business' ? 100 : 1);
    const minValue = type === 'business' ? 100 : 1;
    const maxValue = type === 'business' ? 280000 : 999999;

    if (count >= minValue && count <= maxValue) {
      onUserCountChange(count);
    }
  };

  const stepValue = type === 'business' ? 50 : 1;
  const minValue = type === 'business' ? 100 : 1;

  return (
    <UserCountContainer>
      <UserCountLabel>{t('users.title')}</UserCountLabel>
      <UserInputSection>
        <TextField
          label={t('users.label')}
          size='large'
          value={userCount.toString()}
          onChange={(e) => handleUserCountChange(e.target.value)}
        />
        <UserCountControls>
          <Chip
            size='x-small'
            leadingIcon={<RemoveIcon />}
            onClick={() =>
              onUserCountChange(Math.max(minValue, userCount - stepValue))
            }
          >
            {t('users.step')}
          </Chip>
          <Chip
            size='x-small'
            leadingIcon={<SmallAddIcon />}
            onClick={() => onUserCountChange(userCount + stepValue)}
          >
            {t('users.step')}
          </Chip>
        </UserCountControls>
      </UserInputSection>
    </UserCountContainer>
  );
}

const UserCountContainer = styled.div`
  margin-bottom: 24px;
`;

const UserCountLabel = styled.h3`
  ${typography('ko', 'heading1', 'semibold')}
  margin-bottom: 12px;
`;

const UserInputSection = styled.div`
  margin-top: 20px;
`;

const UserCountControls = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;
