"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CreditsProvider } from "@/lib/CreditsContext";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CreditsProvider>{children}</CreditsProvider>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;  