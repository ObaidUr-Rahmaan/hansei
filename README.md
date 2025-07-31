# Hansei 反省

A modern React Native boilerplate using Expo, NativeWind, and TailwindCSS for rapid mobile app development.

## Features

- 📱 **React Native 0.79** - Latest React Native for iOS and Android
- ⚡️ **Expo 53** - Managed workflow with native capabilities
- 🎨 **NativeWind** - TailwindCSS for React Native styling
- 🔧 **TailwindCSS v3** - Utility-first CSS framework
- 🔒 **TypeScript** - Type safety throughout
- 📦 **Expo Router Ready** - Navigation foundation
- 🎯 **Cross-platform** - iOS, Android, and Web support
- 🚀 **Fast Refresh** - Instant development feedback

## Integration Status

- ✅ **React Native + Expo** - Core mobile framework (Complete)
- 🚧 **Convex** - Real-time database and backend (Next Priority)
- ⏳ **Clerk** - Authentication with passkeys (Planned)
- ⏳ **RevenueCat** - Subscription management (Planned)

## Tech Stack

### Core
- **React Native 0.79** - Mobile app framework
- **Expo 53** - Development platform and toolchain
- **React 19** - Latest React features
- **TypeScript** - Type safety

### Styling
- **NativeWind** - TailwindCSS for React Native
- **TailwindCSS v3** - Utility-first styling
- **React Native Reanimated** - Smooth animations

### Development
- **ESLint & Prettier** - Code formatting and linting
- **Expo DevTools** - Debugging and development tools

## Getting Started

### Prerequisites

**Required Versions (tested with this project):**
- **Node.js v24.4.1+** (LTS recommended)
- **npm v11.4.2+** or **Bun v1.2.16+**
- **Java (OpenJDK) v17.0.16+** (for Android development)

**Platform Requirements:**
- **iOS Development**: Xcode with iOS Simulator (macOS only)
- **Android Development**: Android Studio with Android emulator
- **Expo CLI** (optional but recommended): `npm install -g @expo/cli`

### Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. **Android Setup** (Required for Android development)

   **Install Android Studio:**
   1. Download and install [Android Studio](https://developer.android.com/studio)
   2. Open Android Studio and follow the setup wizard
   3. Install the Android SDK (API level 34+ recommended)
   4. Install Android SDK Build-Tools
   5. Install Android Emulator

   **Create and Start Android Emulator:**
   1. Open Android Studio
   2. Go to **Tools → Device Manager** (or **AVD Manager**)
   3. Click **Create Device** and select a device (Pixel 7 recommended)
   4. Choose a system image (API 34+ recommended) and download if needed
   5. Click **Finish** to create the AVD
   6. Click the **Play** button to start the emulator

   **Configure Local Properties:**
   ```bash
   cp android/local.properties.example android/local.properties
   ```
   
   Then edit `android/local.properties` and replace `YOUR_USERNAME` with your actual username. The default Android SDK location is:
   - **macOS**: `/Users/YOUR_USERNAME/Library/Android/sdk`
   - **Windows**: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
   - **Linux**: `/home/YOUR_USERNAME/Android/Sdk`

   **Important**: Make sure your Android emulator is running before proceeding to step 3.

3. Start the app

   **For Development Server:**
   ```bash
   npx expo start
   ```

   **For Android (requires running emulator):**
   ```bash
   # Make sure Android emulator is running first!
   bunx expo run:android
   ```

   **For iOS (macOS only):**
   ```bash
   npx expo run:ios
   ```

In the development server output, you'll find options to open the app in a:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/) - **Must be running before using `bunx expo run:android`**
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) - Limited sandbox for basic Expo features

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

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
