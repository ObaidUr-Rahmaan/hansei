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

- Node.js 18+
- iOS Simulator (macOS) or Android Studio
- Expo CLI (optional but recommended)

### Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. **Android Setup** (Required for Android development)

   Copy the Android local properties template:
   ```bash
   cp android/local.properties.example android/local.properties
   ```
   
   Then edit `android/local.properties` and replace `YOUR_USERNAME` with your actual username. The default Android SDK location is:
   - **macOS**: `/Users/YOUR_USERNAME/Library/Android/sdk`
   - **Windows**: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
   - **Linux**: `/home/YOUR_USERNAME/Android/Sdk`

3. Start the app

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

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
