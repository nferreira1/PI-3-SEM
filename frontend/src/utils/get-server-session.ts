import { parse } from "cookie";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { formatarFrase } from "./formatar-frase";

export interface Payload {
  usuario?: Usuario | null;
  error?: string;
  status: Status;
}

enum Status {
  LOADING = "loading",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}

/**
 * Recupera o estado da sessão do servidor.
 * @function
 * @returns {Payload} Retorna um objeto contendo os dados da sessão.
 *
 */
export async function getServerSession(): Promise<Payload> {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.COOKIE_NAME as string);

  if (!token) {
    return {
      usuario: null,
      error: "Token não encontrado.",
      status: Status.UNAUTHENTICATED,
    };
  }

  const { value } = token;
  const secret = process.env.JWT_SECRET as string;

  try {
    const data = verify(value, secret) as JwtPayload;
    const usuario = data.data as Usuario;

    return {
      usuario: { ...usuario, nome: formatarFrase(usuario.nome) },
      status: Status.AUTHENTICATED,
    };
  } catch (error) {
    return {
      usuario: null,
      error: "Token não encontrado.",
      status: Status.UNAUTHENTICATED,
    };
  }
}
