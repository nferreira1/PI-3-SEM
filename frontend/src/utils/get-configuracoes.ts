import { getClientToken } from "./get-client-token";

/**
 * Função que retorna as configurações do sistema.
 * @returns {Configuracao[] | null}
 * @see {@link Configuracao}
 */
export default async function getConfiguracoes(): Promise<
  Configuracao[] | null
> {
  const token = await getClientToken();

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/configuracao`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const configuracoes = (await response.json()) as Configuracao[];
      return configuracoes;
    }
  } catch (error) {
    return null;
  }

  return null;
}
