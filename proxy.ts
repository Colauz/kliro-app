import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Enumerate public paths instead of protected ones so the root "/" is
// implicitly protected without a startsWith("/") that would match everything.
const PUBLIC_PATHS = ["/login", "/portal"];

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Do not add any logic between createServerClient and getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  if (!user && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return redirectWithCookies(url, supabaseResponse);
  }

  if (user && pathname.startsWith("/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return redirectWithCookies(url, supabaseResponse);
  }

  return supabaseResponse;
}

// Forward any cookies that Supabase wrote during getUser() (e.g. a refreshed
// token) onto the redirect response, otherwise the next request will see the
// old token, fail auth, and redirect again — causing an infinite loop.
function redirectWithCookies(url: URL, supabaseResponse: NextResponse): NextResponse {
  const response = NextResponse.redirect(url);
  for (const cookie of supabaseResponse.cookies.getAll()) {
    const { name, value, ...options } = cookie;
    response.cookies.set(name, value, options);
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
