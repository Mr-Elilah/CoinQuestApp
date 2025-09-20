// app/dashboard/page.tsx
"use client";

import { useIntl } from "react-intl";

export default function Dashboard() {
  const intl = useIntl();
  return (
    <main className="p-4">
      <h1 className="text-xl">
        {intl.formatMessage({ id: "dashboardTitle" })}
      </h1>
    </main>
  );
}
