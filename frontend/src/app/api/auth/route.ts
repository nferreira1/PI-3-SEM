import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * @function
 * @description
 * Função responsável por realizar a requisição de login na API.
 * @param {Request} request
 * @returns {Promise<Response | void>}
 * @async
 */
export async function POST(request: Request): Promise<Response | void> {
  const body = await request.json();
  const { email, senha } = body;
  const cookieStore = cookies();

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Não foi possível realizar o login." },
        { status: 401 }
      );
    }

    const { token } = await response.json();
    const data = decodeJwt(token);
    const maxAge = (data.exp as number) - (data.iat as number);

    cookieStore.set(process.env.COOKIE_NAME as string, token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge,
      path: "/",
    });

    return NextResponse.json(
      { data },
      { status: 200, headers: { "Set-Cookie": cookieStore.toString() } }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Não foi possível realizar o login." },
      { status: 500 }
    );
  }
}

/**
 * @function
 * @description
 * Função responsável por realizar a requisição de logout na API.
 * @returns {Response}
 */
export function GET(): Response {
  const cookieStore = cookies();
  try {
    const token = cookieStore.get(process.env.COOKIE_NAME as string);

    if (!token) {
      return NextResponse.json({
        status: 500,
        error: "Não foi possível realizar o logout.",
      });
    }

    cookieStore.delete(process.env.COOKIE_NAME as string);

    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Não foi possível realizar o logout.",
    });
  }
}
