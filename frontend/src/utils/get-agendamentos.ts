/**
 * Função para buscar os agendamentos de um usuário.
 * @param id ID do usuário.
 * @returns {Promise<Agendamento[]>} Retorna um array de {@link Agendamento} ou `null` caso ocorra um erro.
 */
export default async function getAgendamentos(
  id: number
): Promise<Agendamento[] | null> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/agendamento/usuario/${id}`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      const agendamentos: Agendamento[] = await response.json();
      return agendamentos;
    }

    return null;
  } catch (error) {
    return null;
  }
}
