import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 30;

export interface Payload {
  data?: Usuario;
  error?: string;
  status?: number;
}

/**
 * @function
 * @description
 * Função responsável por realizar a requisição de login na API.
 * @param {Request} request
 * @returns {Promise<Payload>}
 * @async
 */
export async function POST(request: Request): Promise<Payload> {
  const body = await request.json();
  const { email, senha } = body;

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

    const data = await response.json();

    const secret = process.env.JWT_SECRET as string;

    const token = sign({ data }, secret);

    const seralized = serialize(process.env.COOKIE_NAME as string, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    return NextResponse.json(
      { data },
      { status: 200, headers: { "Set-Cookie": seralized } }
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
 * @returns {Payload}
 */
export function GET(): Payload {
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
