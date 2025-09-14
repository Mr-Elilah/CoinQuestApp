import { cookies, headers } from "next/headers";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  type SupportedLocale,
} from "@/src/i18n/routing";

export async function getLocale(): Promise<SupportedLocale> {
  try {
    // Получаем cookies с помощью await
    const cookieStore = await cookies();
    const cookie = cookieStore.get(LOCALE_COOKIE)?.value;
    if (cookie && SUPPORTED_LOCALES.includes(cookie as SupportedLocale)) {
      return cookie as SupportedLocale;
    }

    // Получаем headers с помощью await
    const headersList = await headers();
    const accept = headersList.get("accept-language");

    if (accept) {
      const lang = accept
        .split(",")[0]
        .split("-")[0]
        .toLowerCase() as SupportedLocale;
      if (SUPPORTED_LOCALES.includes(lang)) return lang;
    }
  } catch (err) {
    console.warn("[getLocale] cannot read headers/cookies", err);
  }
  return DEFAULT_LOCALE;
}
