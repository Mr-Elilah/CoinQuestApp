// app/profile/page.tsx
"use client";

import { useIntl } from "react-intl";

export default function Profile() {
  const intl = useIntl();
  return (
    <main className="p-4">
      <h1 className="text-xl">{intl.formatMessage({ id: "profileTitle" })}</h1>
    </main>
  );
}
