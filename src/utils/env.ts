/**
 * 환경 변수 관리 유틸리티
 */

export const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  OTP_API_KEY: process.env.NEXT_PUBLIC_OTP_API_KEY || '',
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
} as const;

/**
 * 환경별 설정 반환
 */
export function getEnvironmentConfig() {
  return {
    isDevelopment: env.NODE_ENV === 'development',
    isProduction: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
    apiBaseUrl: env.API_BASE_URL,
    environment: env.NODE_ENV ?? 'development',
  };
}
