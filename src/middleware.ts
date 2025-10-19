import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /keystatic routes
  if (
    pathname.startsWith("/keystatic") ||
    pathname.startsWith("/api/keystatic")
  ) {
    // Safety check: if password is not configured, deny access
    const keystacticPassword = process.env.KEYSTATIC_PASSWORD;
    if (!keystacticPassword) {
      return new NextResponse(
        "Keystatic not configured (missing KEYSTATIC_PASSWORD)",
        {
          status: 503,
        }
      );
    }

    // Check for authentication cookie
    const authCookie = request.cookies.get("keystatic-auth");

    if (authCookie?.value === keystacticPassword) {
      return NextResponse.next();
    }

    // Check for Basic Auth header
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      const [type, credentials] = authHeader.split(" ");
      if (type === "Basic") {
        const [, password] = Buffer.from(credentials, "base64")
          .toString()
          .split(":");

        if (password === keystacticPassword) {
          // Set auth cookie for 24 hours
          const response = NextResponse.next();
          response.cookies.set("keystatic-auth", password, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 24 hours
          });
          return response;
        }
      }
    }

    // Require authentication
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Keystatic Admin"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};
