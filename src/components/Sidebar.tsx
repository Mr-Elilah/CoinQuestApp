"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Dashboard", href: "/(admin)/dashboard", icon: "dashboard" },
  { label: "Profile", href: "/(admin)/profile", icon: "person" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile burger */}
      <button
        aria-label="Open-sidebar"
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-black/60 text-white backdrop-blur-sm"
      >
        <span className="material-icons">menu</span>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-200 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 transform
        bg-gradient-to-b from-[#081022] via-[#0d1626] to-[#07121b]
        text-white shadow-lg transition-transform duration-300
        flex flex-col
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:h-screen`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded flex items-center justify-center bg-white/10">
              <span className="text-lg font-bold">CQ</span>
            </div>
            <div className="text-lg font-semibold">CoinQuest</div>
          </div>

          <button
            aria-label="Close sidebar"
            onClick={() => setOpen(false)}
            className="md:hidden p-2 rounded hover:bg-white/10"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Nav — теперь flex-1 */}
        <nav className="px-2 flex-1 overflow-y-auto">
          <ul className="flex flex-col space-y-1">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname?.startsWith(item.href + "/");

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                      ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/80 hover:bg-white/5"
                      }`}
                  >
                    <span
                      className={`material-icons text-lg flex-shrink-0 ${
                        active
                          ? "text-white"
                          : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-6 border-t border-white/10">
          <div className="text-xs text-white/60">v0.1 — alpha</div>
        </div>
      </aside>
    </>
  );
}
