import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// Create i18n middleware

export const runtime = "nodejs";

const serviceWorkerFiles = [
  "/firebase-messaging-sw.js",
  "/custom-firebase-messaging-sw.js",
  "/custom-sw.js",
  "/sw.js",
  "/workbox-*.js",
  "/registerSW.js",
  "/manifest.json",
  "/offline.html",
];
const userRoutes = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/health",
  "/dashboard/donations",
  "/dashboard/achievements",
  "/dashboard/requests",
  "/dashboard/security",
];
const adminRoutes = [
  "/admin",
  "/admin/users",
  "/admin/blood-drives",
  "/admin/blood-requests",
  "/admin/donors",
  "/admin/reviews",
  "/admin/users",
  "/admin/volunteers",
];
const publicRoutes = [
  "/",
  "/auth/signin",
  "/auth/signup",
  "/about",
  "/contact",
  "/privacy",
  "/request",
  "/offline",
];
const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  /*
  const intlResponse = intlMiddleware(req); 
  if (intlResponse) return intlResponse;
*/
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;
  if (
    serviceWorkerFiles.some((file) => {
      if (file.includes("*")) {
        const filePattern = new RegExp(file.replace("*", ".*"));
        return filePattern.test(pathname);
      }
      return pathname === file;
    })
  ) {
    console.log(`[Middleware] Bypassing locale handling for: ${pathname}`);
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0];
  const cleanedPath = `/${segments.slice(1).join("/")}`;

  // Check if route is public
  const isPublicRoute = publicRoutes.some((route) =>
    cleanedPath.startsWith(route)
  );

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL(`/${lang}/auth/signin`, req.url));
  }

  // Restrict User Routes (Only Normal Users)
  if (userRoutes.some((route) => cleanedPath.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL(`/${lang}/auth/signin`, req.url));
    }
    if (token.role === "admin") {
      return NextResponse.redirect(new URL(`/${lang}/admin`, req.url)); // Redirect to admin dashboard
    }
  }

  // Restrict Admin Routes (Only Admins)
  if (adminRoutes.some((route) => cleanedPath.startsWith(route))) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL(`/${lang}/auth/signin`, req.url));
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next|api|static|public|assets|images|favicon.ico).*)",
    "/",
    "/(bn|en)/:path*",
    "/dashboard",
    "/dashboard/:page",
    "/admin",
    "/admin/:page",
  ],
};
