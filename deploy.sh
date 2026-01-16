#!/bin/bash

# Deployment script for aaziko.com information-home project
# Server: 72.61.233.113 (Hostinger VPS)

SERVER_IP="72.61.233.113"
SERVER_USER="root"
SERVER_PASS="Aaziko@12345"
DEPLOY_PATH="/var/www/aaziko-info"

echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "📦 Uploading files to server..."
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -r dist/* $SERVER_USER@$SERVER_IP:$DEPLOY_PATH/

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Site: https://aaziko.com"
else
    echo "❌ Deployment failed!"
    exit 1
fi
