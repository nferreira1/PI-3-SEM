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
  "Intervalo de dias para agendamento",
  1
);