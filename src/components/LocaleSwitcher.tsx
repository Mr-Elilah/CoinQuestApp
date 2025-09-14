// components/LocaleSwitcher.tsx
"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SUPPORTED_LOCALES, LOCALE_COOKIE } from "@/src/i18n/routing";

export default function LocaleSwitcher({
  currentLocale,
}: {
  currentLocale: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    // сохраняем cookie 1 год (expires) и path='/'
    Cookies.set(LOCALE_COOKIE, next, { expires: 365, path: "/" });

    // Обновляем — сервер заново прочитает cookie и вернёт страницу на новом языке
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <select
      value={currentLocale}
      onChange={onChange}
      disabled={isPending}
      className="border px-2 py-1 rounded"
      aria-label="Select language"
    >
      {SUPPORTED_LOCALES.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
