#!/usr/bin/env bash
set -euo pipefail

# ========= 환경 선택 =========
ENVIRONMENT="${1:-development}"
if [[ "$ENVIRONMENT" != "development" && "$ENVIRONMENT" != "production" ]]; then
  echo "❌ Usage: $0 [development|production]"
  exit 1
fi

# ========= 공통 설정 =========
KEY="${HOME}/.ssh/cubig_llmcapsule_web.pem"   # PEM 경로
APP_DIR="/home/ubuntu/llmcapsule_homepage_front" # 서버에서 앱이 있는 경로(이미 clone 되어있어야 함)
PORT=3000

# ========= 환경별 설정 =========
if [[ "$ENVIRONMENT" == "development" ]]; then
  HOST="ubuntu@ec2-13-209-70-65.ap-northeast-2.compute.amazonaws.com"
  BRANCH="develop"
  NODE_ENV="development"
  APP_NAME="llmcapsule-homepage-dev"          # dev는 항상 이 이름 1개만
  echo "🚀 개발(dev) 배포 시작..."
  ENV_SYNC_CMD='if [ -f .env.development ]; then echo "🔄 Using .env.development for build"; cp .env.development .env.production; fi'
else
  HOST="ubuntu@ec2-3-39-187-55.ap-northeast-2.compute.amazonaws.com"
  BRANCH="main"
  NODE_ENV="production"
  APP_NAME="llmcapsule-homepage"              # prod는 항상 이 이름 1개만
  echo "🚀 프로덕션(prod) 배포 시작..."
  ENV_SYNC_CMD='echo "🔒 Using .env.production for build"'
fi

HOST_ADDR="${HOST#*@}"                        # URL 출력용 IP/호스트만 추출

echo "📍 환경: $ENVIRONMENT"
echo "📍 호스트: $HOST"
echo "📍 브랜치: $BRANCH"
echo "📍 NODE_ENV: $NODE_ENV"
echo "📍 APP_NAME: $APP_NAME"
echo "📍 PORT: $PORT"

# ========= 원격 실행 =========
ssh -i "$KEY" "$HOST" bash -s <<EOF
set -e

# 앱 디렉터리 확인
if [ ! -d "$APP_DIR/.git" ]; then
  echo "❌ $APP_DIR 가 없습니다. 먼저 서버에 git clone 해주세요."
  exit 1
fi

cd "$APP_DIR"

echo "📦 현재: \$(git rev-parse --abbrev-ref HEAD) @ \$(git rev-parse --short HEAD) (있으면)"
git fetch --all --prune
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

# 의존성 & 빌드 (ci 실패 시 i)
npm ci || npm i
rm -rf .next
$ENV_SYNC_CMD
npm run build

# 항상 1개만: 같은 이름 삭제 + 포트 비우기(선택)
pm2 delete "$APP_NAME" || true
fuser -k $PORT/tcp || true

# 기동 (단일 인스턴스)
PORT=$PORT NODE_ENV=$NODE_ENV \
pm2 start "npm run start -- -H 0.0.0.0 -p $PORT" --name "$APP_NAME" --time --update-env

pm2 save
pm2 ls
EOF

echo "✅ $ENVIRONMENT 배포 완료: http://$HOST_ADDR:$PORT/"
echo "🔎 로그 보기: ssh -i \"$KEY\" \"$HOST\" \"pm2 logs $APP_NAME --lines 200\""
