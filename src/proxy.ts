import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "pl"];
const defaultLocale = "pl";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to the default locale (Polish)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and public assets
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
