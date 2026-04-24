# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Identity liveness setup

This app uses `@infinitered/react-native-mlkit-face-detection` with `expo-camera` for authentication-grade facial liveness checks.

- Use a development build (`expo run:ios`, `expo run:android`, or EAS dev build). Expo Go is not sufficient for this native ML Kit flow.
- iOS setup:
  - After dependency changes, run `npx pod-install` (or run through `expo run:ios`).
- Detector options currently use the iOS-friendly real-time mode:
  - landmark + classification enabled
  - contour mode disabled
  - tracking enabled
- If React Native Firebase is added later, watch for iOS pod dependency conflicts between Firebase and ML Kit Google pods. Resolve by pinning compatible pod versions via config/plugin overrides.
- Android native builds need the Android SDK: set `ANDROID_HOME`, or add `sdk.dir=…` in `android/local.properties` (that file is gitignored). Use **JDK 17** (or 21) for Gradle; JDK 25 is not supported for this toolchain.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
