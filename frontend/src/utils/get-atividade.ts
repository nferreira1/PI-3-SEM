/**
 * Função para obter todos os dados de uma {@link Atividade} específica.
 * @see {@link Atividade}
 * @async
 * @function
 * @param {UUID} id - O identificador único de uma {@link Atividade}
 * @returns {Promise<Atividade>} Retorna um objeto de {@link Atividade}
 */
export async function getAtividade(id: UUID): Promise<Atividade> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/atividade/${id}`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    return {} as Atividade;
  }

  return {} as Atividade;
}
