# Todo App

A simple, secure Todo application built with React Native and Expo modules.

## Features

- ✅ **Comprehensive Todo Controls:**: Add, edit, delete, and mark todos as completed
- 🔐 **Secure Authentication**: Secure access using [Expo Local Authentication](https://docs.expo.dev/versions/latest/sdk/local-authentication/) before adding todos ( PIN and Fingerprint authentication were enabled and tested).
- 💾 **Persistent Storage**: Todos are saved locally using [Async Storage](https://github.com/react-native-async-storage/async-storage)
- 📦 **Expo Modules Integration**: Demonstrates seamless integration of [Expo modules](https://docs.expo.dev/bare/installing-expo-modules) in a bare React Native project

## Prerequisites

Before you begin, ensure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide for your development platform.

## Getting Started

### 1. Install Dependencies

Navigate to the project directory and install the required packages:

```bash
npm install
```

For iOS development, install CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

### 2. Run the Application

**Android:**

```bash
npm run android
```

**iOS:**

```bash
npm run ios
```

**Alternative (using Expo CLI):**

```bash
npx expo run:android
# or
npx expo run:ios
```

### 3. Run Tests

Execute the test suite with:

```bash
npm run test
```

## Tech Stack

- **Framework**: React Native (Bare workflow)
- **Modules**: Expo modules
- **Storage**: AsyncStorage
- **Authentication**: Expo Local Authentication
- **Testing**: Jest
