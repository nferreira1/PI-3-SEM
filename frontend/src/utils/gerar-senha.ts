/**
 * Função para gerar uma senha em formato de string com as seguintes configurações: um número, uma letra maiúscula, uma letra minúscula e um caractere especial.
 * @function
 * @param {number} comprimentoMinimo Comprimento mínimo
 * @returns {string} Retorna a senha gerada
 */
export function gerarSenha(comprimentoMinimo: number): string {
  const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
  const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeros = "0123456789";
  const simbolos = "@$!%*?&";

  function getCaractereAleatorio(conjuntoDeCaracteres: string): string {
    return conjuntoDeCaracteres[
      Math.floor(Math.random() * conjuntoDeCaracteres.length)
    ];
  }

  const caracteresObrigatorios = [
    getCaractereAleatorio(letrasMinusculas),
    getCaractereAleatorio(letrasMaiusculas),
    getCaractereAleatorio(numeros),
    getCaractereAleatorio(simbolos),
  ];

  const todosCaracteres =
    letrasMinusculas + letrasMaiusculas + numeros + simbolos;
  while (caracteresObrigatorios.length < comprimentoMinimo) {
    caracteresObrigatorios.push(getCaractereAleatorio(todosCaracteres));
  }

  for (let i = caracteresObrigatorios.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [caracteresObrigatorios[i], caracteresObrigatorios[j]] = [
      caracteresObrigatorios[j],
      caracteresObrigatorios[i],
    ];
  }

  return caracteresObrigatorios.join("");
}
