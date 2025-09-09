declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_API_BASE_URL?: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID?: string;
    NEXT_PUBLIC_OTP_API_KEY?: string; // 임시: 프록시 전환 시 제거 권장
    NEXT_PUBLIC_STAGE?: 'development' | 'production';
  }
}
