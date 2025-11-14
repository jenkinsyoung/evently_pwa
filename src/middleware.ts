import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const path = request.nextUrl.pathname;

  const protectedRoutes = ["/my-events", "/account"]
  //"/account", "/friends", "/messages"
  const isProtected = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
        "/my-events/:path*",
        "/account",
        "/friends/:path*",
        "/messages/:path*"
    ],
};
