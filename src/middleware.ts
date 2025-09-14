import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  type SupportedLocale,
} from "./i18n/routing";

function detectedLocale(req: NextRequest): SupportedLocale {
  // 1) из куки
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value as
    | SupportedLocale
    | undefined;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2) из заголовка Accept-Language
  const acceptLang = req.headers.get("accept-language");
  if (acceptLang) {
    const detected = acceptLang
      .split(",")[0]
      .split("-")[0]
      .toLowerCase() as SupportedLocale;
    if (SUPPORTED_LOCALES.includes(detected)) return detected;
  }

  // 3) fallback
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const locale = detectedLocale(req);
  console.log("[middleware] detected locale:", locale);

  const res = NextResponse.next();

  res.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: false,
  });

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
