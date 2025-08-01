import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { config, isFeatureEnabled, isServiceEnabled } from "../config";

interface ConvexWrapperProps {
  children: ReactNode;
}

// Create Convex client only if enabled
let convexClient: ConvexReactClient | null = null;

if (isFeatureEnabled('convex') && isServiceEnabled('convex')) {
  const convexUrl = config.services.convex?.url;
  
  if (!convexUrl) {
    console.error('❌ Convex URL is required when Convex is enabled');
    console.error('   Please set EXPO_PUBLIC_CONVEX_URL in your environment variables');
  } else {
    convexClient = new ConvexReactClient(convexUrl, {
      unsavedChangesWarning: false,
    });
    
    if (__DEV__) {
      console.log('✅ Convex client initialized:', convexUrl);
    }
  }
}

export function ConvexWrapper({ children }: ConvexWrapperProps) {
  // If Convex is not enabled or client creation failed, render children directly
  if (!convexClient) {
    if (__DEV__ && isFeatureEnabled('convex')) {
      console.log('⚠️  Convex is enabled but client not available, rendering without provider');
    }
    return <>{children}</>;
  }

  // Wrap with ConvexProvider if client is available
  return (
    <ConvexProvider client={convexClient}>
      {children}
    </ConvexProvider>
  );
}

// Export client for use in other parts of the app
export { convexClient };