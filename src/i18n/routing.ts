export type SupportedLocale = "ru" | "en" | "uk";

export const SUPPORTED_LOCALES: SupportedLocale[] = ["ru", "en", "uk"];
export const DEFAULT_LOCALE: SupportedLocale = "ru";

export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
