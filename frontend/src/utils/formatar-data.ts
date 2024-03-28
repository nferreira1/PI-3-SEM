/**
 * Função que formata uma data para o formato "Dia da semana, dia de mês de ano".
 * @param {Date} data - Data a ser formatada.
 * @returns {string} - Data formatada.
 * @example
 * formatarData(new Date("2022-03-28T03:24:00")); // "Terça-feira, 28 de março"
 */
export function formatarData(data: Date): string {
  const opcoes: Intl.DateTimeFormatOptions = {
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  const dataFormatada = data.toLocaleDateString("pt-BR", opcoes);
  return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
}
