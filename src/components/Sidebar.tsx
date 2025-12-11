"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  // NOTE: '(admin)' — это route group и НЕ включается в URL.
  // Страницы в src/app/(admin)/dashboard -> доступны по /dashboard
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Profile", href: "/profile", icon: "person" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
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
        className={`bg-gradient-to-b from-[#233044] via-[#0d1626] to-[#233044]
        text-white shadow-lg transition-transform duration-300
        flex flex-col w-64 z-40
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
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

        {/* Nav */}
        <nav className="px-2 pt-10 flex-1 overflow-y-auto">
          <ul className="flex flex-col space-y-1">
            {NAV.map((item) => {
              // active: корректная проверка по pathname
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
                      }
                    `}
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
