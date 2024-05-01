INSERT IGNORE INTO agendamentos_status(id, nome) VALUES (
  1,
  "AGUARDANDO CONFIRMAÇÃO"
);

INSERT IGNORE INTO agendamentos_status(id, nome) VALUES (
  2,
	"CONFIRMADO"
);

INSERT IGNORE INTO agendamentos_status(id, nome) VALUES (
  3,
	"CANCELADO"
);

INSERT IGNORE INTO agendamentos_status(id, nome) VALUES (
  4,
	"FINALIZADO"
);

INSERT IGNORE INTO roles(id, nome) VALUES (
  1,
  "admin"
);

INSERT IGNORE INTO roles(id, nome) VALUES (
  2,
  "basico"
);

INSERT IGNORE INTO configuracoes(id, nome, valor, descricao, status) VALUES (
  1,
  "INTERVALO_AGENDAMENTO",
  "7",
  "Intervalo em dias que o cliente pode agendar um serviço (o valor deve ser em dias).",
  1
);

INSERT IGNORE INTO configuracoes(id, nome, valor, descricao, status) VALUES (
  2,
  "TEMPO_VERIFICACAO_AGENDAMENTO_CONFIRMADO",
  "1",
  "Tempo em que o sistema verifica os agendamentos que estão confirmados e se já passaram da data atual (o valor deve ser em minutos).",
  1
);

INSERT IGNORE INTO configuracoes(id, nome, valor, descricao, status) VALUES (
  3,
  "TEMPO_VERIFICACAO_AGENDAMENTO_AGUARDANDO_CONFIRMACAO",
  "1",
  "Tempo em que o sistema verifica os agendamentos que estão aguardando confirmação e se já passaram da data atual (o valor deve ser em minutos).",
  1
);

INSERT IGNORE INTO configuracoes(id, nome, valor, descricao, status) VALUES (
  4,
  "TEMPO_ANTES_DATA_PARA_CONFIRMAR_AGENDAMENTO",
  "1",
  "Tempo anterior a data, em que o usuário tem para confirmar o agendamento (o valor deve ser em minutos). Exemplo: Se o valor for 60, o usuário tem 60 minutos antes da data do agendamento para confirmar.",
  1
);