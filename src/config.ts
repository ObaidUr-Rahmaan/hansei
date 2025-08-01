// ========================
// 🔧 HANSEI CONFIGURATION
// ========================
// 
// ⚠️  IMPORTANT: Configure this file FIRST before running the app!
//
// This file controls which features are enabled in your application.
// Choose the features you want, then follow the setup guide for those features only.
//
//
// 🚀 Want to see all examples?
//    Check out config.example.ts for pre-made configurations:
//    - Full Stack Config (all features)
//    - Frontend Only Config (static app)
//    - Auth Only Config (user management)
//    - Convex Only Config (database without auth)
//    - Static Config (no dynamic features)
//
// 💡 Pro tip: Start simple and add features as you need them!

export interface AppConfig {
  features: {
    auth: boolean;        // Enable Clerk user authentication
    convex: boolean;      // Enable Convex real-time database
    payments: boolean;    // Enable RevenueCat subscription billing  
    monitoring: boolean;  // Enable error reporting and monitoring
  };
  services: {
    clerk?: {
      enabled: boolean;
      publishableKey?: string;
    };
    convex?: {
      enabled: boolean;
      url?: string;
      deployment?: string;
    };
    revenueCat?: {
      enabled: boolean;
      apiKey?: string;
      entitlementId?: string;
    };
    sentry?: {
      enabled: boolean;
      dsn?: string;
      tracesSampleRate?: number;
      environment?: string;
    };
  };
  ui: {
    showAuth: boolean;      // Show login/signup screens
    showDashboard: boolean; // Show dashboard routes  
    showPaywall: boolean;   // Show subscription paywall
    showSettings: boolean;  // Show settings screen
  };
}

// ========================
// 🌐 ENV VARIABLE HELPER
// ========================
// Access Expo environment variables safely
const getEnvVar = (key: string): string | undefined => {
  // Expo environment variables must be prefixed with EXPO_PUBLIC_
  const expoKey = key.startsWith('EXPO_PUBLIC_') ? key : `EXPO_PUBLIC_${key}`;
  
  if (typeof process !== 'undefined' && process.env && process.env[expoKey] !== undefined) {
    return process.env[expoKey] as string;
  }
  
  return undefined;
};

// ========================
// 🎯 YOUR CONFIGURATION
// ========================
// Edit these values to enable/disable features:

export const config: AppConfig = {
  features: {
    auth: false,        // Enable/disable Clerk authentication
    convex: false,      // Enable/disable Convex backend
    payments: false,    // Enable/disable RevenueCat payments
    monitoring: false,  // Enable/disable error reporting and monitoring
  },
  services: {
    clerk: {
      enabled: false,
      publishableKey: getEnvVar('CLERK_PUBLISHABLE_KEY'),
    },
    convex: {
      enabled: false,
      url: getEnvVar('CONVEX_URL'),
      deployment: getEnvVar('CONVEX_DEPLOYMENT'),
    },
    revenueCat: {
      enabled: false,
      apiKey: getEnvVar('REVENUE_CAT_API_KEY'),
      entitlementId: getEnvVar('REVENUE_CAT_ENTITLEMENT_ID'),
    },
    sentry: {
      enabled: false,
      dsn: getEnvVar('SENTRY_DSN'),
      tracesSampleRate: 0.2,
      environment: getEnvVar('SENTRY_ENVIRONMENT') || 'development',
    },
  },
  ui: {
    showAuth: false,       // Show sign-in/sign-up screens
    showDashboard: true,   // Show dashboard routes
    showPaywall: false,    // Show subscription paywall
    showSettings: true,    // Show settings screen
  },
};

// Helper functions to check feature availability
export const isFeatureEnabled = (feature: keyof AppConfig['features']): boolean => {
  return config.features[feature] === true;
};

export const isServiceEnabled = (service: keyof AppConfig['services']): boolean => {
  return config.services[service]?.enabled === true;
};

export const getServiceConfig = <T extends keyof AppConfig['services']>(
  service: T
): AppConfig['services'][T] => {
  return config.services[service];
};

// Validation function to check if required env vars are present for enabled features
export const validateConfig = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (isFeatureEnabled('auth') && isServiceEnabled('clerk')) {
    if (!config.services.clerk?.publishableKey) {
      errors.push('EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is required when auth is enabled');
    }
  }

  if (isFeatureEnabled('convex') && isServiceEnabled('convex')) {
    if (!config.services.convex?.url) {
      errors.push('EXPO_PUBLIC_CONVEX_URL is required when convex is enabled');
    }
  }

  if (isFeatureEnabled('payments') && isServiceEnabled('revenueCat')) {
    if (!config.services.revenueCat?.apiKey) {
      errors.push('EXPO_PUBLIC_REVENUE_CAT_API_KEY is required when payments is enabled');
    }
  }

  if (isFeatureEnabled('monitoring') && isServiceEnabled('sentry')) {
    if (!config.services.sentry?.dsn) {
      errors.push('EXPO_PUBLIC_SENTRY_DSN is required when monitoring is enabled');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

// Environment detection
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Runtime config validation (run this in your app startup)
export const initializeConfig = () => {
  const validation = validateConfig();
  
  if (!validation.valid) {
    console.warn('⚠️  Configuration validation failed:');
    validation.errors.forEach(error => console.warn(`   - ${error}`));
    
    if (isProduction) {
      throw new Error('Invalid configuration for production environment');
    }
  }

  // Log enabled features in development
  if (isDevelopment) {
    console.log('🔧 Hansei Configuration:');
    console.log('   Features:', Object.entries(config.features)
      .filter(([, enabled]) => enabled)
      .map(([name]) => name)
      .join(', ') || 'None');
    console.log('   Services:', Object.entries(config.services)
      .filter(([, service]) => service?.enabled)
      .map(([name]) => name)
      .join(', ') || 'None');
  }
};

export default config;