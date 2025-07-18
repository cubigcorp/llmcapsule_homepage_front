/**
 * 환경 변수 관리 유틸리티
 */

export const ENV = {
  // 애플리케이션 설정
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "LLM Capsule Homepage",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  APP_DESCRIPTION:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION || "LLM Capsule 홈페이지",
  ENV: process.env.NEXT_PUBLIC_ENV || "development",

  // API 설정
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  API_SECRET_KEY: process.env.API_SECRET_KEY || "local-development-secret-key",

  // 환경 확인
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_TEST: process.env.NODE_ENV === "test",

  // 외부 서비스 설정
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
  FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,

  // 데이터베이스 설정
  DATABASE_URL: process.env.DATABASE_URL,

  // 이메일 서비스 설정
  SMTP: {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined,
    USER: process.env.SMTP_USER,
    PASSWORD: process.env.SMTP_PASSWORD,
  },

  // 소셜 로그인 설정
  GOOGLE: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },

  GITHUB: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  },

  // 파일 업로드 설정
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
} as const;

/**
 * 필수 환경 변수가 설정되어 있는지 확인
 */
export function validateEnv(): void {
  const requiredEnvVars = [
    "NEXT_PUBLIC_APP_NAME",
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_API_URL",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

/**
 * 환경별 설정 반환
 */
export function getEnvironmentConfig() {
  return {
    isDevelopment: ENV.IS_DEVELOPMENT,
    isProduction: ENV.IS_PRODUCTION,
    isTest: ENV.IS_TEST,
    apiUrl: ENV.API_URL,
    appUrl: ENV.APP_URL,
    appName: ENV.APP_NAME,
    appDescription: ENV.APP_DESCRIPTION,
  };
}
