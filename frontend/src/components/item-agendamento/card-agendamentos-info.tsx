"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CardAgendamento from "./card-agendamento";
import CardContentAgendamento from "./card-content-agendamento";

interface Props {
  agendamentos: Agendamento[];
}

const CardAgendamentosInfo = ({ agendamentos }: Props) => {
  const [agendamentoSelecionado, setAgendamentoSelecionado] =
    useState<Agendamento | null>();

  const agendamentosAgrupados = agendamentos?.reduce(
    (acc: { [key: number]: Agendamento[] }, agendamento) => {
      const statusId = agendamento.status.id - 1;
      acc[statusId] = acc[statusId] || [];
      acc[statusId].push(agendamento);
      return acc;
    },
    {}
  );

  const statusAgendamento = [
    "Aguardando Confirmação",
    "Confirmados",
    "Cancelados",
    "Finalizados",
  ];

  return (
    <div className="w-full flex space-x-4 justify-center">
      <div className="w-1/2 space-y-4">
        {statusAgendamento.map((status, index) => {
          const agendamentosPorStatus =
            (agendamentosAgrupados && agendamentosAgrupados[index]) ?? [];

          return (
            <div key={`${status}-${index}`}>
              <h2 className="text-sm font-bold uppercase text-gray-400 mt-6 mb-3">
                {status}
              </h2>

              <div className="space-y-4">
                {agendamentosPorStatus?.map((agendamento) => (
                  <div
                    key={agendamento.id}
                    onClick={() => setAgendamentoSelecionado(agendamento)}
                    className="cursor-pointer max-w-[524px]"
                  >
                    <CardAgendamento agendamento={agendamento} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-1/2 pt-6">
        {agendamentoSelecionado ? (
          <motion.div className="sticky top-6">
            <CardContentAgendamento
              setAgendamentoSelecionado={setAgendamentoSelecionado}
              agendamento={agendamentoSelecionado}
            />
          </motion.div>
        ) : (
          <div className="sticky top-6 flex flex-col justify-center items-center min-h-[635px] mt-8 rounded-md border-2 border-dashed">
            <p className="px-4 text-center text-md text-muted-foreground">
              Selecione um agendamento para obter mais informações
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardAgendamentosInfo;
