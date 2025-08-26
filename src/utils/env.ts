/**
 * 환경 변수 관리 유틸리티
 */

export const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || getApiBaseUrl(),
  OTP_API_KEY:
    process.env.NEXT_PUBLIC_OTP_API_KEY ||
    'w3ElDchM9YSpvZDLcE9HAi_77E8bpWlH-7K96w9i1_g',
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
} as const;

/**
 * 환경별 API 베이스 URL 반환
 */
function getApiBaseUrl(): string {
  const hostname =
    typeof window !== 'undefined' ? window.location.hostname : '';

  // 개발 환경 (localhost, dev 도메인 등)
  if (
    hostname === 'localhost' ||
    hostname.includes('dev') ||
    hostname.includes('staging')
  ) {
    return 'https://q3jgflfye9.execute-api.ap-northeast-2.amazonaws.com/api';
  }

  // 프로덕션 환경
  if (
    hostname.includes('prod') ||
    hostname.includes('production') ||
    hostname === 'llmcapsule.ai'
  ) {
    return 'https://yottf79147.execute-api.ap-northeast-2.amazonaws.com/api';
  }

  // 기본값 (개발 환경)
  return 'https://q3jgflfye9.execute-api.ap-northeast-2.amazonaws.com/api';
}

/**
 * 환경별 설정 반환
 */
export function getEnvironmentConfig() {
  const hostname =
    typeof window !== 'undefined' ? window.location.hostname : '';

  return {
    isDevelopment:
      env.NODE_ENV === 'development' ||
      hostname === 'localhost' ||
      hostname.includes('dev'),
    isProduction:
      env.NODE_ENV === 'production' ||
      hostname.includes('prod') ||
      hostname.includes('cubig.gabia.io'),
    isTest: env.NODE_ENV === 'test',
    apiBaseUrl: env.API_BASE_URL,
    environment: getEnvironmentName(hostname),
  };
}

/**
 * 환경 이름 반환
 */
function getEnvironmentName(hostname: string): string {
  if (
    hostname === 'localhost' ||
    hostname.includes('dev') ||
    hostname.includes('staging')
  ) {
    return 'development';
  }

  if (
    hostname.includes('prod') ||
    hostname.includes('production') ||
    hostname === 'llmcapsule.ai'
  ) {
    return 'production';
  }

  return 'development';
}
