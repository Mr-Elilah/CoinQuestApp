import type { NextRequest } from "next/server";
import type { SupportedLocale } from "./routing";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "./routing";

/**
 * Нормализует строку типа "en-US,en;q=0.9" или "ru-RU" → "en" / "ru".
 */
export function normalizeLocaleString(value?: string): string | undefined {
  if (!value) return undefined;
  return value.split(",")[0].split("-")[0].toLowerCase().trim();
}

/**
 * Проверяет и возвращает SupportedLocale или undefined.
 */
export function validateLocale(value?: string): SupportedLocale | undefined {
  const norm = normalizeLocaleString(value);
  if (!norm) return undefined;
  return SUPPORTED_LOCALES.includes(norm as SupportedLocale)
    ? (norm as SupportedLocale)
    : undefined;
}

/**
 * Универсальная детекция по значениям (кука и/или accept-language).
 * Возвращает SupportedLocale или DEFAULT_LOCALE, если ничего не подошло.
 */
export function detectLocaleFromValues(
  cookieValue?: string | null,
  acceptLanguage?: string | null
): SupportedLocale {
  const fromCookie = validateLocale(cookieValue ?? undefined);
  if (fromCookie) return fromCookie;

  const fromAccept = validateLocale(acceptLanguage ?? undefined);
  if (fromAccept) return fromAccept;

  return DEFAULT_LOCALE;
}

/**
 * Удобная обёртка для NextRequest (используется в middleware).
 */
export function detectLocaleFromRequest(req: NextRequest): SupportedLocale {
  const cookieVal = req.cookies.get(LOCALE_COOKIE)?.value ?? undefined;
  const accept = req.headers.get("accept-language") ?? undefined;
  return detectLocaleFromValues(cookieVal, accept);
}
