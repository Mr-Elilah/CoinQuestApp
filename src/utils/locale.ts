import { cookies, headers } from "next/headers";
import {
  LOCALE_COOKIE,
  DEFAULT_LOCALE,
  type SupportedLocale,
} from "@/src/i18n/routing";
import { detectLocaleFromValues } from "@/src/i18n/detectLocale";

export async function getLocale(): Promise<SupportedLocale> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(LOCALE_COOKIE)?.value ?? null;

    const headersList = await headers();
    const accept = headersList.get("accept-language") ?? null;

    return detectLocaleFromValues(cookie, accept);
  } catch (err) {
    console.warn("[getLocale] cannot read headers/cookies", err);
    return DEFAULT_LOCALE;
  }
}
