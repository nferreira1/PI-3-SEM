import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Payload } from "../route";

/**
 * @see {@link Payload}
 * @function GET
 * @description
 * Função responsável por realizar a requisição de verificação de autenticação na API.
 * @returns {Promise<Payload>}
 * @async
 */
export async function GET(): Promise<Payload> {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.COOKIE_NAME as string);

  if (!token) {
    return NextResponse.redirect(
      new URL("/", "http://localhost:3000").toString()
    );
  }

  const { value } = token;

  const secret = process.env.JWT_SECRET as string;

  try {
    const { data } = verify(value, secret) as Payload;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.redirect(
      new URL("/", "http://localhost:3000").toString()
    );
  }
}
