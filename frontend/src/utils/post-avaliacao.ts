import { getClientToken } from "./get-client-token";

/**
 * Função para realizar a avaliação de um agendamento.
 * @param id - id do agendamento.
 * @param nota - nota da avaliação.
 * @function
 * @async
 * @returns {Promise<true | null>} Promise com `true` caso a avaliação tenha sido realizada com sucesso ou `null` caso ocorra um erro.
 * @see {@link Agendamento}
 * @see {@link AvaliacaoAtividade}
 */
export async function postAvaliacao(
  idAgendamento: number,
  nota: number
): Promise<true | null> {
  const token = await getClientToken();
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/avaliacao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idAgendamento,
        nota,
      }),
    });

    if (!response.ok) {
      return null;
    }

    return true;
  } catch (error) {
    return null;
  }
}
