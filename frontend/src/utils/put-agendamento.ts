import { getClientToken } from "./get-client-token";

/**
 * Função para confirmar um agendamento.
 * @param id ID do agendamento a ser confirmado.
 * @returns {Promise<boolean | null>} Retorna uma promise vazia ou `null` caso ocorra um erro.
 */
export async function putAgendamento(id: number): Promise<boolean | null> {
  const token = await getClientToken();

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/agendamento/${id}/confirmar`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    return true;
  } catch (error) {
    return null;
  }
}
