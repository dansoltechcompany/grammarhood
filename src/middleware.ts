import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { canonicalRedirectTarget, schemeFromCfVisitor } from "@/lib/canonical-host";

export function middleware(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host;
  const protocol =
    schemeFromCfVisitor(request.headers.get("cf-visitor")) ??
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol;

  const target = canonicalRedirectTarget({
    host,
    protocol,
    pathname: request.nextUrl.pathname,
    search: request.nextUrl.search,
  });

  if (!target) return NextResponse.next();
  // NextResponse.redirect adds a trailing slash on the apex, which would disagree with the canonical tag.
  return new NextResponse(null, {
    status: 301,
    headers: { Location: target },
  });
}

export const config = {
  matcher: "/:path*",
};
