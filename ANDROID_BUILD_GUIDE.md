# BBC English Phonetics Trainer - Android Build Guide

This guide will walk you through the process of converting the BBC English Phonetics Trainer web application into an Android APK using Capacitor.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Android Studio](https://developer.android.com/studio)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (version 11 or later)

## Step 1: Set Up the Project

1. Open a terminal/command prompt in the project directory (where index.html is located)
2. Install Capacitor dependencies:

```bash
npm install
npm install -g @capacitor/cli
```

## Step 2: Initialize Capacitor

1. Create the www directory and copy all web assets:

```bash
mkdir www
xcopy /E /I *.html www\
xcopy /E /I *.css www\
xcopy /E /I *.js www\
xcopy /E /I *.svg www\
xcopy /E /I *.json www\
xcopy /E /I /S sounds www\sounds\
```

2. Initialize Capacitor:

```bash
npx cap init BBC-English-Phonetics com.phonetics.bbctrainer --web-dir www
```

## Step 3: Add Android Platform

```bash
npx cap add android
```

## Step 4: Configure Android Project

1. Copy web content to Android:

```bash
npx cap copy android
```

2. Open the Android project in Android Studio:

```bash
npx cap open android
```

## Step 5: Ensure Offline Assets Work

The `sounds` folder with all audio files needs special handling to ensure it works offline in the Android app:

1. In Android Studio, locate the `assets/public` directory in the Android project
2. Verify that the `sounds` folder and all audio files are present
3. If not, manually copy the `sounds` folder to `android/app/src/main/assets/public/`

## Step 6: Build the APK

1. In Android Studio, select `Build > Build Bundle(s) / APK(s) > Build APK(s)`
2. Wait for the build to complete
3. Click on the "locate" link in the popup notification to find your APK
4. The APK will be in `android/app/build/outputs/apk/debug/app-debug.apk`

## Step 7: Install on Your Device

1. Transfer the APK to your Android device
2. On your device, navigate to the APK file and tap to install
3. You may need to enable "Install from Unknown Sources" in your device settings

## Troubleshooting

### Audio Files Not Playing

If audio files aren't playing in the Android app:

1. Check that the file paths in `script.js` use relative paths starting with `./sounds/`
2. Verify that all audio files are in the correct folders in `android/app/src/main/assets/public/sounds/`
3. Add this to your `capacitor.config.json` if not already present:
   ```json
   "android": {
     "allowMixedContent": true
   }
   ```

### App Crashes on Launch

1. Check Android Studio's Logcat for error messages
2. Ensure your `index.html` doesn't have any absolute file paths
3. Verify that all required files are properly copied to the `www` directory

## Additional Notes

- The app icon is defined by the SVG file and will be used in the Android app
- The splash screen is configured in `capacitor.config.json`
- All offline functionality should work as expected since the service worker is included

For more detailed information, refer to the [Capacitor documentation](https://capacitorjs.com/docs).