import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * @function GET
 * @description
 * Função responsável por realizar a requisição de verificação de autenticação na API.
 * @returns {Promise<Response | void>}
 * @async
 */
export async function GET(): Promise<Response | void> {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.COOKIE_NAME as string);

  if (!token) {
    return NextResponse.redirect(
      new URL("/", "http://localhost:3000").toString()
    );
  }

  const { value } = token;

  try {
    const data = decodeJwt(value);
    return NextResponse.json({ data, token: value }, { status: 200 });
  } catch (error) {
    return NextResponse.redirect(
      new URL("/", "http://localhost:3000").toString()
    );
  }
}
