# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo Router and TypeScript. The app uses NativeWind for Tailwind CSS styling, Clerk for authentication with passkeys support, and Jotai for state management. It includes audio/video functionality and media library access.

## Architecture

### Directory Structure
- `src/app/` - Expo Router file-based routing pages (uses file-based routing with typed routes enabled)
- `src/components/` - Reusable React Native components  
- `src/store/` - Jotai state management atoms and stores
- `src/utils/` - Utility functions and helpers
- `src/mocks/` - Mock data for development/testing
- `src/assets/` - Images, fonts, and other static assets
- `android/` - Android-specific native code and configuration
- `ios/` - iOS-specific native code and configuration

### Key Technologies
- **Expo SDK 53** with new architecture enabled
- **Expo Router** for file-based navigation with typed routes
- **NativeWind** for Tailwind CSS styling in React Native
- **Clerk** for authentication with expo-passkeys integration
- **Jotai** for atomic state management
- **TypeScript** with strict mode enabled
- **Poppins** font family (400, 500, 600, 700 weights)

### Path Aliases
- `@/*` maps to `./src/*`
- `~/*` maps to `./*`

## Development Commands

### Setup
```bash
# Install dependencies
npm install

# Android setup (required for Android development)
cp android/local.properties.example android/local.properties
# Edit android/local.properties and replace YOUR_USERNAME with actual username
```

### Running the App
```bash
# Start Expo development server
npm start
# or
npx expo start

# Run on specific platforms
npm run android    # Android emulator/device
npm run ios        # iOS simulator/device  
npm run web        # Web browser
```

### Development Tools
```bash
npm run lint       # Run ESLint for code linting
```

### Project Reset
```bash
npm run reset-project  # Move starter code to app-example/ and create blank app/
```

## Styling Configuration

### Custom Colors
- Primary: `#F3B01C` (accessible via `primary` class)
- Dark: `#131417` (accessible via `dark` class)

### Font Classes
- `font-Poppins_400Regular` - Regular weight
- `font-Poppins_500Medium` - Medium weight  
- `font-Poppins_600SemiBold` - Semi-bold weight
- `font-Poppins_700Bold` - Bold weight

## Native Permissions

The app requires these Android permissions:
- `RECORD_AUDIO` - For audio recording functionality
- `MODIFY_AUDIO_SETTINGS` - For audio settings modification
- Media library access with photo permissions

## Platform-Specific Notes

### iOS
- Deployment target: iOS 16.0+
- Supports tablets
- Bundle ID: `com.anonymous.hansei`

### Android  
- Edge-to-edge display enabled
- Package: `com.anonymous.hansei`
- Adaptive icon configured

## Authentication

Uses Clerk with expo-passkeys for modern authentication including:
- Passkey authentication
- Secure token storage via expo-secure-store
- Web browser integration for OAuth flows