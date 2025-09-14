// app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/src/components/Providers";
import "../styles/globals.css";

import { getMetadata } from "@/metadata/getMetadata";
import { getLocale } from "@/src/utils/locale";
import { loadMessages } from "@/src/utils/loadMessages";
import LocaleSwitcher from "@/src/components/LocaleSwitcher";

const font = Plus_Jakarta_Sans({ subsets: ["latin", "cyrillic-ext"] });

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return getMetadata(locale); // уже корректный тип SupportedLocale
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
      <body className={font.className}>
        <Providers locale={locale} messages={messages}>
          <header className="p-4 flex justify-end">
            <LocaleSwitcher currentLocale={locale} />
          </header>

          <main>
            {children}
            <p>Current locale: {locale}</p>
          </main>
        </Providers>
      </body>
    </html>
  );
}
