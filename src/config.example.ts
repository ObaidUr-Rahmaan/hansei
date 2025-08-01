// ========================
// 📋 HANSEI CONFIG EXAMPLES
// ========================
//
// Copy any of these configurations to config.ts and customize as needed.
// Each example shows a different use case for your app.

import type { AppConfig } from './config';

// ========================
// 🚀 FULL STACK CONFIG
// ========================
// All features enabled - complete mobile app with auth, database, and payments
export const fullStackConfig: AppConfig = {
  features: {
    auth: true,
    convex: true,
    payments: true,
    monitoring: true,
  },
  services: {
    clerk: {
      enabled: true,
      publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
    convex: {
      enabled: true,
      url: process.env.EXPO_PUBLIC_CONVEX_URL,
      deployment: process.env.EXPO_PUBLIC_CONVEX_DEPLOYMENT,
    },
    revenueCat: {
      enabled: true,
      apiKey: process.env.EXPO_PUBLIC_REVENUE_CAT_API_KEY,
      entitlementId: process.env.EXPO_PUBLIC_REVENUE_CAT_ENTITLEMENT_ID,
    },
    sentry: {
      enabled: true,
      dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 0.2,
      environment: process.env.EXPO_PUBLIC_SENTRY_ENVIRONMENT || 'production',
    },
  },
  ui: {
    showAuth: true,
    showDashboard: true,
    showPaywall: true,
    showSettings: true,
  },
};

// ========================
// 🎨 FRONTEND ONLY CONFIG
// ========================
// Static app with no backend dependencies - great for prototyping
export const frontendOnlyConfig: AppConfig = {
  features: {
    auth: false,
    convex: false,
    payments: false,
    monitoring: false,
  },
  services: {
    clerk: { enabled: false },
    convex: { enabled: false },
    revenueCat: { enabled: false },
    sentry: { enabled: false },
  },
  ui: {
    showAuth: false,
    showDashboard: true,
    showPaywall: false,
    showSettings: true,
  },
};

// ========================
// 🔐 AUTH ONLY CONFIG
// ========================
// User authentication without database or payments
export const authOnlyConfig: AppConfig = {
  features: {
    auth: true,
    convex: false,
    payments: false,
    monitoring: false,
  },
  services: {
    clerk: {
      enabled: true,
      publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
    convex: { enabled: false },
    revenueCat: { enabled: false },
    sentry: { enabled: false },
  },
  ui: {
    showAuth: true,
    showDashboard: true,
    showPaywall: false,
    showSettings: true,
  },
};

// ========================
// 🗄️ CONVEX ONLY CONFIG
// ========================
// Database functionality without authentication or payments
export const convexOnlyConfig: AppConfig = {
  features: {
    auth: false,
    convex: true,
    payments: false,
    monitoring: false,
  },
  services: {
    clerk: { enabled: false },
    convex: {
      enabled: true,
      url: process.env.EXPO_PUBLIC_CONVEX_URL,
      deployment: process.env.EXPO_PUBLIC_CONVEX_DEPLOYMENT,
    },
    revenueCat: { enabled: false },
    sentry: { enabled: false },
  },
  ui: {
    showAuth: false,
    showDashboard: true,
    showPaywall: false,
    showSettings: true,
  },
};

// ========================
// 💳 PAYMENTS ONLY CONFIG
// ========================
// Subscription billing without authentication
export const paymentsOnlyConfig: AppConfig = {
  features: {
    auth: false,
    convex: false,
    payments: true,
    monitoring: false,
  },
  services: {
    clerk: { enabled: false },
    convex: { enabled: false },
    revenueCat: {
      enabled: true,
      apiKey: process.env.EXPO_PUBLIC_REVENUE_CAT_API_KEY,
      entitlementId: process.env.EXPO_PUBLIC_REVENUE_CAT_ENTITLEMENT_ID,
    },
    sentry: { enabled: false },
  },
  ui: {
    showAuth: false,
    showDashboard: true,
    showPaywall: true,
    showSettings: true,
  },
};

// ========================
// 📊 MONITORING ONLY CONFIG
// ========================
// Error tracking and monitoring without other services
export const monitoringOnlyConfig: AppConfig = {
  features: {
    auth: false,
    convex: false,
    payments: false,
    monitoring: true,
  },
  services: {
    clerk: { enabled: false },
    convex: { enabled: false },
    revenueCat: { enabled: false },
    sentry: {
      enabled: true,
      dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 0.2,
      environment: process.env.EXPO_PUBLIC_SENTRY_ENVIRONMENT || 'development',
    },
  },
  ui: {
    showAuth: false,
    showDashboard: true,
    showPaywall: false,
    showSettings: true,
  },
};

// ========================
// 🧪 DEVELOPMENT CONFIG
// ========================
// Ideal for local development with minimal dependencies
export const developmentConfig: AppConfig = {
  features: {
    auth: false,
    convex: true,
    payments: false,
    monitoring: false,
  },
  services: {
    clerk: { enabled: false },
    convex: {
      enabled: true,
      url: process.env.EXPO_PUBLIC_CONVEX_URL,
      deployment: process.env.EXPO_PUBLIC_CONVEX_DEPLOYMENT,
    },
    revenueCat: { enabled: false },
    sentry: { enabled: false },
  },
  ui: {
    showAuth: false,
    showDashboard: true,
    showPaywall: false,
    showSettings: true,
  },
};