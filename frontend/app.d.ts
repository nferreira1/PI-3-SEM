declare global {
  /**
   * Identificar único UUID.
   * @interface
   * @type {string}
   */
  type UUID = `${string}-${string}-${string}-${string}-${string}`;

  /**
   * Interface para informações de usuário.
   * @interface
   */
  interface Usuario {
    /**
     * Identificador único do usuário.
     * @type {number}
     */
    id: number;

    /**
     * Nome do usuário.
     * @type {string}
     */
    nome: string;

    /**
     * Email do usuário.
     * @type {string}
     */
    email: string;

    /**
     * Imagem de perfil do usuário.
     * @type {string | null}
     */
    imagem: string | null;
  }

  /**
   * Interface para informações de atividade.
   * @interface
   */
  interface Atividade {
    /**
     * Identificador único da atividade.
     * @type {UUID}
     */
    id: UUID;

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

    /**
     * {@link Espaco} que a atividade está relacionada.
     * @see {@link Espaco}
     * @type {Espaco[]}
     */
    espacos: Espaco[];
  }

  /**
   * Interface para informações de espaço, um espaço obrigatoriamente estará relacionado a uma atividade.
   * @interface
   * @see {@link Atividade}
   */
  interface Espaco {
    /**
     * Nome do espaço.
     * @type {string}
     */
    nome: string;

    /**
     * Imagem do espaço.
     * @type {string | null}
     */
    imagem: string | null;
  }
}

export {};
