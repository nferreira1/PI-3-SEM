import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const rotasPublicas = getRotasPublicas(request.nextUrl.pathname);
  const autenticado = request.cookies.get(process.env.COOKIE_NAME as string);

  if (!rotasPublicas && !autenticado) {
    return NextResponse.redirect(new URL("/", request.nextUrl).toString());
  }

  return NextResponse.next();
}

/**
 * Verifica se a URL é uma rota pública.
 * @function
 * @param {string} URL da requisição.
 * @returns {boolean} Retorna true se a URL é uma rota pública, caso contrário, retorna false.
 */
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
