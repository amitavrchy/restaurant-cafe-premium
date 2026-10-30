"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SmoothScroll>{children}</SmoothScroll>
      </QueryClientProvider>
    </Provider>
  );
}
