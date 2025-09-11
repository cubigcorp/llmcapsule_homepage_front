# LLM Capsule Homepage

LLM Capsule의 공식 홈페이지입니다.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

```bash
npm run build
```

## Environment Configuration

이 프로젝트는 개발 환경과 프로덕션 환경을 지원합니다.

### 환경별 API 엔드포인트

- **Development**: `https://q3jgflfye9.execute-api.ap-northeast-2.amazonaws.com/api`
- **Production**: `https://yottf79147.execute-api.ap-northeast-2.amazonaws.com/api`

### 환경 자동 감지

시스템은 호스트명을 기반으로 자동으로 환경을 감지합니다:

- `localhost`, `dev`, `staging` → Development 환경
- `prod`, `production`, `cubig.gabia.io` → Production 환경

## Deploy

이 프로젝트는 EC2 서버에 배포됩니다.

### 배포 방법

1. **개발 환경 배포**

   ```bash
   ./deploy.sh development
   ```

2. **프로덕션 환경 배포**

   ```bash
   ./deploy.sh production
   ```

3. **기본값 (개발 환경)**
   ```bash
   ./deploy.sh
   ```

### 배포 설정

- **개발 환경**: `develop` 브랜치, `NODE_ENV=development`, `ec2-13-209-70-65.ap-northeast-2.compute.amazonaws.com`
- **프로덕션 환경**: `main` 브랜치, `NODE_ENV=production`, `ec2-3-39-187-55.ap-northeast-2.compute.amazonaws.com`
- **PM2 프로세스**: 환경별로 분리 (`llmcapsule-homepage-development`, `llmcapsule-homepage-production`)

### 환경 변수 설정

필요한 경우 `.env.local` 파일을 생성하여 환경별 설정을 오버라이드할 수 있습니다:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://your-custom-api-endpoint.com/api
NEXT_PUBLIC_OTP_API_KEY=your-otp-api-key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

## Tech Stack

- **Framework**: Next.js 15.4.1
- **Language**: TypeScript
- **Styling**: Styled Components
- **Design System**: @cubig/design-system
- **Font**: Pretendard
