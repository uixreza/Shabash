import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Fast, pre-render gate for the admin console. Only short-circuits when the
  // JWT already knows the role; sessions issued before the role column fall
  // through to the console layout, which re-checks the database.
  if (
    request.nextUrl.pathname.startsWith("/console") &&
    token.role === "user"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/console", "/console/:path*"],
};
