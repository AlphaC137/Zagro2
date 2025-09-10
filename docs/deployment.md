# Deployment Documentation

## Overview

This document outlines the deployment process for the Zagro2 ride-sharing application. The app is built using Expo and can be deployed to both iOS and Android platforms.

## Prerequisites

- Node.js v18 or higher
- Expo CLI
- Apple Developer Account (for iOS)
- Google Play Developer Account (for Android)
- AWS Account (for backend services)
- Environment Variables Configuration

## Environment Setup

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
EXPO_PUBLIC_PLACES_API_KEY=your_google_places_key
EXPO_PUBLIC_DIRECTIONS_API_KEY=your_google_directions_key
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_GEOAPIFY_API_KEY=your_geoapify_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### 2. App Configuration

Update `app.json`:

```json
{
  "expo": {
    "name": "Zagro2",
    "slug": "zagro2",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "zagro2",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#2F80ED"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.zagro2",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.yourcompany.zagro2",
      "versionCode": 1
    }
  }
}
```

## Build Process

### 1. Development Build

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### 2. Production Build

#### Using EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both platforms
eas build --platform all
```

#### Build Configuration

Create `eas.json`:

```json
{
  "cli": {
    "version": ">= 3.13.3"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "resourceClass": "m1-medium"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCDEF1234"
      },
      "android": {
        "serviceAccountKeyPath": "./path/to/service-account.json",
        "track": "production"
      }
    }
  }
}
```

## Deployment Steps

### 1. iOS Deployment

```bash
# Build for App Store
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

### 2. Android Deployment

```bash
# Build for Play Store
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android
```

## Continuous Integration/Continuous Deployment (CI/CD)

### 1. GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Setup Expo
        uses: expo/expo-github-action@v7
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - name: Install Dependencies
        run: npm install
      - name: Build
        run: eas build --platform all --non-interactive
```

### 2. Environment Variables in CI/CD

Set up the following secrets in your GitHub repository:
- `EXPO_TOKEN`
- `APPLE_ID`
- `APPLE_APP_SPECIFIC_PASSWORD`
- `GOOGLE_PLAY_API_KEY`

## Monitoring and Analytics

### 1. Error Tracking

```typescript
// Configure Sentry
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'your-sentry-dsn',
  enableInExpoDevelopment: true,
  debug: true
});
```

### 2. Performance Monitoring

```typescript
// Configure Firebase Performance Monitoring
import { perf } from 'firebase/app';

const trace = perf().trace('app_start');
trace.start();
// ... app initialization
trace.stop();
```

## Rollback Procedures

### 1. iOS Rollback

```bash
# List builds
eas build:list

# Submit specific build
eas submit --platform ios --id <build-id>
```

### 2. Android Rollback

```bash
# List builds
eas build:list

# Submit specific build
eas submit --platform android --id <build-id>
```

## Server Configuration

### 1. Backend Server

```nginx
# Nginx configuration
server {
    listen 80;
    server_name api.zagro.dev;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. SSL Configuration

```bash
# Install SSL certificate
certbot --nginx -d api.zagro.dev

# Auto-renewal
certbot renew --dry-run
```

## Post-Deployment Checklist

### 1. Verification Steps
- [ ] Test app launch
- [ ] Verify authentication flow
- [ ] Check API connections
- [ ] Test payment processing
- [ ] Verify push notifications
- [ ] Check analytics integration
- [ ] Monitor error reporting

### 2. Performance Metrics
- [ ] App launch time
- [ ] API response times
- [ ] Memory usage
- [ ] Battery consumption
- [ ] Network usage

## Maintenance Procedures

### 1. Regular Updates

```bash
# Update dependencies
npm update

# Check for vulnerable dependencies
npm audit

# Update Expo SDK
expo upgrade
```

### 2. Database Maintenance

```sql
-- Regular cleanup queries
DELETE FROM expired_sessions WHERE created_at < NOW() - INTERVAL '30 days';
VACUUM ANALYZE;
```

## Disaster Recovery

### 1. Backup Procedures

```bash
# Database backup
pg_dump -Fc zagro > backup.dump

# Assets backup
aws s3 sync s3://zagro-assets backup/assets
```

### 2. Recovery Steps

```bash
# Restore database
pg_restore -d zagro backup.dump

# Restore assets
aws s3 sync backup/assets s3://zagro-assets
```
