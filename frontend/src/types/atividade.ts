/**
 * Interface para informações de atividade.
 * @interface
 */
export interface Atividade {
  /**
   * Nome da atividade.
   * @type {string}
   */
  nome: string;

  /**
   * Local/endereço onde fica localizado o espaço.
   * @type {string}
   */
  local: string;

  /**
   * Imagem da atividade.
   * @type {string | null}
   */
  imagem: string | null;

  /**
   * Telefone onde se é possível entrar em contato com o responsável.
   * @type {string}
   */
  telefone: string;
}