// src/app/LayoutClient.tsx
"use client";

import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function LayoutClient({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main column */}
      <div className="flex-1">
        <Header
          currentLocale={locale}
          onBurgerClick={() => setSidebarOpen(true)}
        >
          CoinQuest
        </Header>

        <main>
          {children}
          <p>Current locale: {locale}</p>
        </main>
      </div>
    </div>
  );
}
