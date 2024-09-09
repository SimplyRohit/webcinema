import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const path = new URL(request.url).pathname;
  const protectRoute: string[] = [];
  const auth = ["/auth/login", "/auth/signup"];
  const isProtectRoute = protectRoute.includes(path);
  const isAuth = auth.includes(path);

  const supabase = createMiddlewareClient({ req: request, res: response });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtectRoute && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuth && user) {
    return NextResponse.redirect(new URL("/settings", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
