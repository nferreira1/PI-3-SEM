declare global {
  /**
   * Enum para revalidações de tags.
   * @type
   * @see {@link https://nextjs.org/docs/app/api-reference/functions/revalidateTag}
   */
  enum Tags {
    POST_AGENDAMENTOS,
  }

  type Tag = keyof typeof Tags;

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
     * Identificador único do espaço.
     * @type {number}
     */
    id: number;

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

  /**
   * Interface para informações de horário.
   * @interface
   * @see {@link Espaco}
   */
  interface Horario {
    /**
     * Identificador único do horário.
     * @type {number}
     */
    id: number;

    /**
     * Horário de abertura.
     * @type {string}
     * @example "08:00"
     */
    horarioInicial: string;

    /**
     * Horário de fechamento.
     * @type {string}
     * @example "18:00"
     */
    horarioFinal: string;
  }

  /**
   * Interface para informações de agendamento.
   * @interface
   * @see {@link Usuario}
   * @see {@link Atividade}
   * @see {@link Espaco}
   * @see {@link Horario}
   */
  interface Agendamento {
    /**
     * Identificador único do agendamento.
     * @type {number}
     */
    id: number;

    /**
     * Data do agendamento.
     * @type {string}
     */
    dataAgendamento: string;

    /**
     * Horário inicial do agendamento.
     * @type {string}
     * @see {@link Horario}
     */
    horarioInicial: string;

    /**
     * Horário final do agendamento.
     * @type {string}
     * @see {@link Horario}
     */
    horarioFinal: string;

    /**
     * Status do agendamento.
     * @type {StatusAgendamento}
     * @see {@link StatusAgendamento}
     */
    status: StatusAgendamento;

    /**
     * Se já foi avaliado ou não.
     * @type {booleean}
     * @default false
     * @see {@link AvaliacaoAtividade}
     */
    avaliado: booleean;

    /**
     * Atividade que o agendamento está relacionado.
     * @type {Pick<Atividade, "nome" | "local" | "imagem" | "telefone">}
     * @see {@link Atividade}
     */
    atividade: Pick<Atividade, "nome" | "local" | "imagem" | "telefone">;

    /**
     * Espaço que o agendamento está relacionado.
     * @type {Pick<Espaco, "id | nome" | "imagem">}
     * @see {@link Espaco}
     */
    espaco: Pick<Espaco, "id" | "nome" | "imagem">;
  }

  /**
   * Status do agendamento.
   * @interface
   * @see {@link Agendamento}
   */
  interface StatusAgendamento {
    /**
     * Identificador único do status.
     * @type {number}
     */
    id: number;

    /**
     * Nome do status.
     * @type {string}
     */
    nome: string;
  }

  /**
   * Interface para informações de configurações.
   * @interface
   */
  interface Configuracao {
    /**
     * Identificador único da configuração.
     * @type {number}
     */
    id: number;

    /**
     * Nome da configuração.
     * @type {string}
     */
    nome: string;

    /**
     * Valor da configuração.
     * @type {string}
     */
    valor: string;

    /**
     * Descrição da configuração.
     * @type {string}
     */
    descricao: string;
  }

  /**
   * Interface para informações de avaliação de uma atividade.
   * @interface
   * @see {@link Atividade}
   * @see {@link Agendamento}
   */
  interface AvaliacaoAtividade {
    /**
     * Quantidade de avaliações.
     * @type {number}
     */
    quantidade: number;

    /**
     * Média das avaliações.
     * @type {number}
     */
    media: number;
  }
}

export {};
