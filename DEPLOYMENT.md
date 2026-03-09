# Deployment Guide for aaziko.com

## Server Information
- **SSH**: root@72.61.233.113
- **Domain**: aaziko.com
- **Web Root**: /var/www/aaziko.com

## Prerequisites
- SSH access to the server
- Nginx installed on the server
- Domain DNS pointing to 72.61.233.113

## Deployment Steps

### 1. Make deployment script executable
```bash
chmod +x deploy-to-server.sh
```

### 2. Deploy the site
```bash
./deploy-to-server.sh
```

### 3. Configure Nginx on the server
SSH into the server and run:
```bash
ssh root@72.61.233.113
```

Then on the server:
```bash
# Install Nginx if not already installed
apt update && apt install -y nginx

# Copy the Nginx configuration
# (Upload nginx-aaziko.conf to server first, or create it manually)
nano /etc/nginx/sites-available/aaziko.com
# Paste the contents from nginx-aaziko.conf

# Enable the site
ln -s /etc/nginx/sites-available/aaziko.com /etc/nginx/sites-enabled/

# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx

# Enable Nginx to start on boot
systemctl enable nginx
```

### 4. (Optional) Setup SSL with Let's Encrypt
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d aaziko.com -d www.aaziko.com
```

## Quick Redeploy
After making changes to the site:
```bash
npm run build
./deploy-to-server.sh
```

## Troubleshooting

### Check Nginx status
```bash
ssh root@72.61.233.113 "systemctl status nginx"
```

### View Nginx error logs
```bash
ssh root@72.61.233.113 "tail -f /var/log/nginx/error.log"
```

### Verify files are uploaded
```bash
ssh root@72.61.233.113 "ls -la /var/www/aaziko.com"
```
