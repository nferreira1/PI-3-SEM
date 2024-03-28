import { formatarFrase } from "./formatar-frase";

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
      const atividade: Atividade = await response.json();
      const espacos: Espaco[] = atividade.espacos.map((espaco) => ({
        ...espaco,
        nome: formatarFrase(espaco.nome),
      }));

      return {
        ...atividade,
        espacos,
        nome: formatarFrase(atividade.nome),
        local: formatarFrase(atividade.local),
      };
    }
  } catch (error) {
    return {} as Atividade;
  }

  return {} as Atividade;
}
