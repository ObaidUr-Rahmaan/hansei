import { useQuery, useMutation, useAction } from "convex/react";
import { isFeatureEnabled, isServiceEnabled } from "../config";
import type { FunctionReference, OptionalRestArgs } from "convex/server";

// Type-safe wrapper for useQuery that handles disabled state
export function useConvexQuery<Query extends FunctionReference<"query">>(
  query: Query,
  ...args: OptionalRestArgs<Query>
) {
  const isEnabled = isFeatureEnabled('convex') && isServiceEnabled('convex');
  
  // Use the query hook, but it will return undefined if Convex is disabled
  const result = useQuery(isEnabled ? query : undefined, ...(args as any));
  
  return {
    data: result,
    isLoading: isEnabled ? result === undefined : false,
    isEnabled,
  };
}

// Type-safe wrapper for useMutation that handles disabled state
export function useConvexMutation<Mutation extends FunctionReference<"mutation">>(
  mutation: Mutation
) {
  const isEnabled = isFeatureEnabled('convex') && isServiceEnabled('convex');
  
  const mutateFn = useMutation(isEnabled ? mutation : undefined);
  
  return {
    mutate: isEnabled ? mutateFn : () => {
      console.warn('⚠️  Convex mutation called but Convex is disabled');
      return Promise.resolve();
    },
    isEnabled,
  };
}

// Type-safe wrapper for useAction that handles disabled state
export function useConvexAction<Action extends FunctionReference<"action">>(
  action: Action
) {
  const isEnabled = isFeatureEnabled('convex') && isServiceEnabled('convex');
  
  const actionFn = useAction(isEnabled ? action : undefined);
  
  return {
    execute: isEnabled ? actionFn : () => {
      console.warn('⚠️  Convex action called but Convex is disabled');
      return Promise.resolve();
    },
    isEnabled,
  };
}

// Utility to check if Convex features should be shown in UI
export function useConvexEnabled() {
  return isFeatureEnabled('convex') && isServiceEnabled('convex');
}