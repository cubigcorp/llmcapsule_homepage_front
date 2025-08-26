#!/usr/bin/env bash
set -euo pipefail

# 환경 설정 (development 또는 production)
ENVIRONMENT=${1:-development}

if [ "$ENVIRONMENT" != "development" ] && [ "$ENVIRONMENT" != "production" ]; then
    echo "❌ 잘못된 환경입니다. 'development' 또는 'production'을 입력해주세요."
    echo "사용법: ./deploy.sh [development|production]"
    exit 1
fi

# 환경별 설정
if [ "$ENVIRONMENT" = "development" ]; then
    HOST="ubuntu@ec2-3-37-36-2.ap-northeast-2.compute.amazonaws.com"
    BRANCH="develop"
    NODE_ENV="development"
    echo "🚀 개발 환경 배포 시작..."
else
    HOST="ubuntu@ec2-3-39-187-55.ap-northeast-2.compute.amazonaws.com"
    BRANCH="main"
    NODE_ENV="production"
    echo "🚀 프로덕션 환경 배포 시작..."
fi

KEY="$HOME/.ssh/cubic_llmcapsule_web.pem"
APP_DIR="~/llmcapsule_homepage_front"
APP_NAME="llmcapsule-homepage-$ENVIRONMENT"
PORT=3000

echo "📍 환경: $ENVIRONMENT"
echo "📍 호스트: $HOST"
echo "📍 브랜치: $BRANCH"
echo "📍 NODE_ENV: $NODE_ENV"

ssh -i "$KEY" "$HOST" bash -s <<EOF
set -e
cd $APP_DIR

echo "Branch: \$(git rev-parse --abbrev-ref HEAD) @ \$(git rev-parse --short HEAD)"
git fetch --all
git checkout $BRANCH
git pull --rebase

npm ci || npm i
npm run build

# 같은 이름만 사용 (중복/충돌 방지)
pm2 delete $APP_NAME || true
PORT=$PORT NODE_ENV=$NODE_ENV pm2 start npm --name "$APP_NAME" -- run start

pm2 save
pm2 ls
EOF

echo "✅ $ENVIRONMENT 환경 배포 완료: http://$HOST:$PORT/"
echo "PM2 로그: ssh -i \"$KEY\" $USER@$HOST \"pm2 logs $APP_NAME --lines 200\""