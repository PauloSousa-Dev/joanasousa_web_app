"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

/**
 * React Query Provider with optimized configuration
 * Provides global query client for data fetching and caching
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  // Create QueryClient with best practices configuration
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time: Data is considered fresh for 5 minutes
            staleTime: 5 * 60 * 1000, // 5 minutes

            // Cache time: Keep unused data in cache for 10 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

            // Retry failed requests 3 times with exponential backoff
            retry: 3,
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),

            // Refetch on window focus (good UX for stale data)
            refetchOnWindowFocus: true,

            // Don't refetch on mount if data is still fresh
            refetchOnMount: false,

            // Refetch on reconnect
            refetchOnReconnect: true,
          },
          mutations: {
            // Retry mutations once on failure
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
