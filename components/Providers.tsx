"use client";

import React, { useMemo } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { IntlProvider } from "react-intl";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
};

export default function Providers({
  children,
  locale,
  messages,
}: ProvidersProps) {
  const client = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={client}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
