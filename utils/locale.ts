export type SupportedLocale = "ru" | "en" | "uk";

const DEFAULT_LOCALE: SupportedLocale = "ru";
// const SUPPORTED_LOCALES: SupportedLocale[] = ["ru", "en", "uk"];

export function getLocaleFromHeaders(
  headers?: Record<string, string | string[]>
): SupportedLocale {
  if (headers?.["accept-language"]) {
    const langHeader = Array.isArray(headers["accept-language"])
      ? headers["accept-language"][0]
      : headers["accept-language"];

    const lang = langHeader.toLowerCase();
     if (lang.startsWith("uk")) return "uk";
     if (lang.startsWith("en")) return "en";
     if (lang.startsWith("ru")) return "ru";
  }

  return DEFAULT_LOCALE;
}

