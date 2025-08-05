/**
 * 환경 변수 관리 유틸리티
 */

export const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://q3jgflfye9.execute-api.ap-northeast-2.amazonaws.com/api',
  OTP_API_KEY:
    process.env.NEXT_PUBLIC_OTP_API_KEY ||
    'w3ElDchM9YSpvZDLcE9HAi_77E8bpWlH-7K96w9i1_g',
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
  };
}
