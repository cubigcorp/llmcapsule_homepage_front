#!/usr/bin/env bash
set -euo pipefail

HOST="ubuntu@ec2-3-37-36-2.ap-northeast-2.compute.amazonaws.com"
KEY="$HOME/.ssh/cubic_llmcapsule_web.pem"
APP_DIR="~/llmcapsule_homepage_front"
APP_NAME="llmcapsule-homepage"
PORT=3000

ssh -i "$KEY" "$HOST" bash -s <<EOF
set -e
cd $APP_DIR

echo "Branch: \$(git rev-parse --abbrev-ref HEAD) @ \$(git rev-parse --short HEAD)"
git fetch --all
git checkout develop
git pull --rebase

npm ci || npm i
npm run build

# 같은 이름만 사용 (중복/충돌 방지)
pm2 delete $APP_NAME || true
PORT=$PORT NODE_ENV=production pm2 start npm --name "$APP_NAME" -- run start

pm2 save
pm2 ls
EOF

echo "✅ 배포 완료: http://$HOST:$PORT/"
echo "PM2 로그: ssh -i \"$KEY\" $USER@$HOST \"pm2 logs $PM2_NAME --lines 200\""