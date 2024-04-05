import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { formatarFrase } from "./formatar-frase";

export interface Payload {
  usuario?: Usuario | null;
  error?: string;
  token?: string;
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

  try {
    const usuario = decodeJwt(value) as Usuario;

    return {
      usuario: { ...usuario, nome: formatarFrase(usuario.nome) },
      status: Status.AUTHENTICATED,
      token: value,
    };
  } catch (error) {
    return {
      usuario: null,
      error: "Token inválido.",
      status: Status.UNAUTHENTICATED,
    };
  }
}
