/**
 * Função que retorna as avaliações de uma atividade.
 * @param id - id da atividade.
 * @returns {Promise<AvaliacaoAtividade | null>} Promise com as avaliações da atividade ou `null` caso ocorra um erro.
 * @async
 * @function
 * @see {@link AvaliacaoAtividade}
 * @see {@link Atividade}
 */
export async function getAvaliacoesAtividade(
  id: UUID
): Promise<AvaliacaoAtividade | null> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/avaliacao/quantidade/${id}`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    return null;
  }

  return null;
}
