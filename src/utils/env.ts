/**
 * 환경 변수 관리 유틸리티
 */

export const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  LLM_API_BASE_URL: process.env.NEXT_PUBLIC_LLM_API_BASE_URL || '',
  OTP_API_KEY: process.env.NEXT_PUBLIC_OTP_API_KEY || '',
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
} as const;

export const stage = (
  process.env.NEXT_PUBLIC_STAGE === 'development' ? 'development' : 'production'
) as 'development' | 'production';

export const isDevStage = stage === 'development';
export const isProdStage = stage === 'production';
