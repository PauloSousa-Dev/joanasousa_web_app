// Redirect /admin → /admin/index.html so static CMS loads correctly
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/index.html", req.url))
  }
  return NextResponse.next()
}
