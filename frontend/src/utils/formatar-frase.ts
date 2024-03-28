/**
 * Formata uma frase para que a primeira letra de toda palavra seja maiúscula e o restante minúscula, caso a palavra tenha menos do que dois caracteres, ele ficará toda minúscula.
 * @function
 * @param {string} frase - Frase a ser formatada.
 * @returns {string} Retorna a frase formatada.
 * @example
 * formatarFrase("exemplo de frase");
 * // Saída: "Exemplo De Frase"
 * @example
 * formatarFrase("EXEMPLO DE FRASE");
 * // Saída: "Exemplo De Frase"
 */
export function formatarFrase(frase: string): string {
  return frase
    .split(" ")
    .map((palavra) =>
      palavra.length > 2
        ? palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()
        : palavra.toLowerCase()
    )
    .join(" ");
}
