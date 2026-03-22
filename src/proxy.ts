import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, api routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    (pathname.includes(".") && !pathname.endsWith(".html"))
  ) {
    return NextResponse.next();
  }

  // Create response to pass through
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Create Supabase client for auth check
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh session
  const { data: { user } } = await supabase.auth.getUser();

  // Admin routes — require authenticated admin user
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user is in admin_users table
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("id, is_active")
      .eq("auth_user_id", user.id)
      .single();

    if (!adminUser || !adminUser.is_active) {
      // Not an admin — redirect to homepage
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protected account routes — require authentication
  if (pathname.startsWith("/account") || pathname === "/checkout") {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
