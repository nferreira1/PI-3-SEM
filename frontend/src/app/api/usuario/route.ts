import { NextResponse } from "next/server";

export interface Payload {
  error?: string;
  status?: number;
}

/**
 * @function
 * @description
 * Função responsável por realizar a requisição de criação de conta de usuário na API.
 * @param {Request} request
 * @returns {Promise<Payload>}
 * @async
 */
export async function POST(request: Request): Promise<Payload> {
  const body = await request.json();
  const { nome, email, senha, imagem } = body;

  console.log(body);

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha, imagem }),
    });

    if (response.status === 409) {
      return NextResponse.json(
        { error: "Usuário já cadastrado." },
        { status: 409 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "Não foi possível criar a conta." },
        { status: 401 }
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: "Não foi possível criar a conta.",
      status: 500,
    });
  }
}
