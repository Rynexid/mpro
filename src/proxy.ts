import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/reset-password"];

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/favorites",
  "/messages",
  "/settings",
  "/admin",
];

function isMatch(pathname: string, paths: string[]) {
  return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = Boolean(sessionCookie);

  // Authenticated users should not see the auth pages.
  if (isLoggedIn && isMatch(pathname, AUTH_PAGES)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Unauthenticated users are redirected to login with a redirect hint.
  if (!isLoggedIn && isMatch(pathname, PROTECTED_PREFIXES)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/forgot-password/:path*",
    "/reset-password/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/favorites/:path*",
    "/messages/:path*",
    "/admin/:path*",
  ],
};
