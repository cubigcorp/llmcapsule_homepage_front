declare namespace NodeJS {
  interface ProcessEnv {
    // 애플리케이션 설정
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_APP_DESCRIPTION: string;
    NEXT_PUBLIC_ENV: "development" | "production";

    // API 설정
    NEXT_PUBLIC_API_URL: string;
    API_SECRET_KEY: string;

    // 데이터베이스 설정
    DATABASE_URL?: string;

    // 외부 서비스 설정
    GOOGLE_ANALYTICS_ID?: string;
    GOOGLE_SITE_VERIFICATION?: string;
    FACEBOOK_PIXEL_ID?: string;

    // 이메일 서비스 설정
    SMTP_HOST?: string;
    SMTP_PORT?: string;
    SMTP_USER?: string;
    SMTP_PASSWORD?: string;

    // 소셜 로그인 설정
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    GITHUB_CLIENT_ID?: string;
    GITHUB_CLIENT_SECRET?: string;

    CLOUDINARY_CLOUD_NAME?: string;
    CLOUDINARY_API_KEY?: string;
    CLOUDINARY_API_SECRET?: string;

    NODE_ENV: "development" | "production" | "test";
  }
}
