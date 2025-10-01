export const theme = {
  breakpoints: {
    xl: '1440px', // Desktop
    lg: '1200px', // Laptop
    md: '768px', // Tablet
    sm: '375px', // Mobile
  },

  // 미디어 쿼리 헬퍼 함수들
  media: {
    xl: '@media (min-width: 1441px)',
    lg: '@media (min-width: 1201px) and (max-width: 1440px)',
    md: '@media (min-width: 769px) and (max-width: 1200px)',
    sm: '@media (min-width: 376px) and (max-width: 768px)',
    xs: '@media (max-width: 375px)',

    // max-width만 사용하는 경우
    maxXl: '@media (max-width: 1440px)',
    maxLg: '@media (max-width: 1200px)',
    maxMd: '@media (max-width: 768px)',
    maxSm: '@media (max-width: 375px)',
  },

  // 자주 사용하는 값들
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '40px',
  },

  // 컨테이너 최대 너비
  container: {
    xl: '1440px',
    lg: '1200px',
    md: '100%',
    sm: '100%',
  },
} as const;

export type Theme = typeof theme;
