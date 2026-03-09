#!/bin/bash

# Deployment script for information site to aaziko.com
# Server: root@72.61.233.113

SERVER="root@72.61.233.113"
REMOTE_DIR="/var/www/aaziko.com"
LOCAL_DIST="./dist"

echo "🚀 Deploying information site to aaziko.com..."

# Create remote directory if it doesn't exist
echo "📁 Creating remote directory..."
ssh $SERVER "mkdir -p $REMOTE_DIR"

# Upload built files
echo "📤 Uploading files..."
rsync -avz --delete $LOCAL_DIST/ $SERVER:$REMOTE_DIR/

# Set proper permissions
echo "🔐 Setting permissions..."
ssh $SERVER "chown -R www-data:www-data $REMOTE_DIR && chmod -R 755 $REMOTE_DIR"

echo "✅ Deployment complete!"
echo "🌐 Site should be available at http://aaziko.com"
