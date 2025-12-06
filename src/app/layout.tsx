// src/app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/src/components/Providers";
import "../styles/globals.css";

import { getMetadata } from "@/metadata/getMetadata";
import { getLocale } from "@/src/utils/locale";
import { loadMessages } from "@/src/utils/loadMessages";
import LayoutClient from "@/src/app/LayoutClient"; // <- клиентский слой

const font = Plus_Jakarta_Sans({ subsets: ["latin", "cyrillic-ext"] });

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return getMetadata(locale);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await loadMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className={font.className}>
        <Providers locale={locale} messages={messages}>
          <LayoutClient locale={locale}>{children}</LayoutClient>
        </Providers>
      </body>
    </html>
  );
}
