import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from "./i18n/routing";
import { detectLocaleFromRequest } from "./i18n/detectLocale";

export function middleware(req: NextRequest) {
  const locale = detectLocaleFromRequest(req);
  console.log("[middleware] detected locale:", locale);

  const res = NextResponse.next();

  // Устанавливаем куку (сохраняем прежнюю конфигурацию)
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
