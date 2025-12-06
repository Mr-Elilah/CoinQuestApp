// src/app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/src/components/Providers";
import "../styles/globals.css";

import { getMetadata } from "@/metadata/getMetadata";
import { getLocale } from "@/src/utils/locale";
import { loadMessages } from "@/src/utils/loadMessages";
import Header from "../components/Header";
import Sidebar from "@/src/components/Sidebar"; // <- new

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
          {/* Sidebar + main layout */}
          <div className="min-h-screen flex">
            {/* Sidebar (fixed on md+, slide on mobile) */}
            <Sidebar />

            {/* Main column: header + page content.
                On md+ we need left padding equal to sidebar width (w-64) so content not hidden under fixed sidebar.
            */}
            <div className="flex-1">
              <Header currentLocale={locale}>CoinQuest</Header>

              <main>
                {children}
                <p>Current locale: {locale}</p>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
