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

## Deploy

이 프로젝트는 GitHub Pages로 배포됩니다.

### GitHub Pages 배포 방법

1. **GitHub 저장소 설정**
   - GitHub 저장소의 Settings > Pages로 이동
   - Source를 "GitHub Actions"로 설정

2. **자동 배포**
   - `main` 브랜치에 push하면 자동으로 배포됩니다
   - GitHub Actions가 빌드하고 GitHub Pages에 배포합니다

3. **수동 배포**
   ```bash
   npm run deploy
   ```

### 배포 URL

배포 후 다음 URL에서 확인할 수 있습니다:
`https://[username].github.io/llmcapsule_homepage_front/`

## Tech Stack

- **Framework**: Next.js 15.4.1
- **Language**: TypeScript
- **Styling**: Styled Components
- **Design System**: @cubig/design-system
- **Font**: Pretendard
