// app/page.tsx
"use client";

import { useIntl } from "react-intl";

export default function Home() {
  const intl = useIntl();
  return (
    <main className="p-4">
      <h1 className="text-xl">{intl.formatMessage({ id: "welcome" })}</h1>
    </main>
  );
}
