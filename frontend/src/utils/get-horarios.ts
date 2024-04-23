import { getClientToken } from "./get-client-token";

/**
 * Função para obter todos os horários disponíveis para uma {@link Atividade} em uma determinada data.
 * @see {@link Atividade}
 * @see {@link Horario}
 * @async
 * @function
 * @param {UUID} atividadeId - O identificador único de uma {@link Atividade}
 * @param {Date} dataAgendamento - A data para a qual deseja-se obter os horários disponíveis
 * @param {number} espacoId - O identificador único de um {@link Espaco}
 * @returns {Promise<Horario[]>} Retorna um array de {@link Horario} ou `null` caso ocorra um erro.
 */
export async function getHorarios(
  atividadeId: UUID,
  dataAgendamento: Date,
  espacoId: number
): Promise<Horario[] | null> {
  const token = await getClientToken();

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/espaco/horarios?atividadeId=${atividadeId}&dataAgendamento=${dataAgendamento}&espacoId=${espacoId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const horarios: Horario[] = await response.json();
      return horarios;
    }
  } catch (error) {
    return null;
  }
  return null;
}
