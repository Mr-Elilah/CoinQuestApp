import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import "../styles/globals.css";

import { getMetadata } from "@/metadata/getMetadata";
import { getLocaleFromHeaders } from "@/utils/locale";
import { loadMessages } from "@/utils/loadMessages";

const font = Plus_Jakarta_Sans({ subsets: ["latin", "cyrillic-ext"] });

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleFromHeaders();
  return getMetadata(locale);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocaleFromHeaders();

  const messages = await loadMessages(locale);

  return (
    <html lang={locale}>
      <body className={font.className}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
