import { formatarFrase } from "./formatar-frase";

/**
 * Função para obter todas as atividades existentes que tem pelo menos um {@link Espaco} disponível.
 * @async
 * @function
 * @returns {Promise<Atividade[]>} Retorna um array de {@link Atividade}, um array vazio ou `null` caso ocorra um erro.
 */
export async function getAtividades(): Promise<Atividade[] | null> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/atividade`, {
      cache: "no-store",
    });

    if (response.ok) {
      const atividades: Atividade[] = await response.json();

      return atividades.map((atividade) => ({
        ...atividade,
        nome: formatarFrase(atividade.nome),
        local: formatarFrase(atividade.local),
      }));
    }
  } catch (error) {
    return null;
  }

  return null;
}
