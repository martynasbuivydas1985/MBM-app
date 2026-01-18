# MBM-app

MB management dashboard for tracking members, plans, and activity.

## Features
- Member roster with search and status filters
- Summary metrics for active vs inactive members
- Add, activate/deactivate, and remove members
- Demo data persisted in local storage

## Getting started
1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Open `http://localhost:3000` in your browser

## Health check
- `GET /health` returns service status and timestamp

## Project structure
- `server.js` Express server and static file hosting
- `public/` Front-end assets (HTML, CSS, JS)

## Android (native)
The Android project lives in `android/` and loads the dashboard from local assets.

### Build debug APK
1. Install Android SDK and set `ANDROID_SDK_ROOT`.
2. From `android/`, run `./gradlew assembleDebug`.
3. APK output: `android/app/build/outputs/apk/debug/app-debug.apk`.
