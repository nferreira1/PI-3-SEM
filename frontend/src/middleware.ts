import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "./utils/get-server-session";

export async function middleware(request: NextRequest) {
  const rotasPublicas = getRotasPublicas(request.nextUrl.pathname);
  const session = await getServerSession();

  if (!rotasPublicas && session.status === "unauthenticated") {
    return NextResponse.redirect(
      new URL("/", request.nextUrl.origin).toString()
    );
  }

  return NextResponse.next();
}

function getRotasPublicas(URL: string): boolean {
  const rotasPublicas = ["/"];
  return rotasPublicas.includes(URL);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
