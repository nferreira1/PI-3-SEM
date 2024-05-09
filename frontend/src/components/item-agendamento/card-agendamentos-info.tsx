"use client";

import { Variants } from "framer-motion";
import { useState } from "react";
import CardAgendamento from "./card-agendamento";
import CardContentAgendamento from "./card-content-agendamento";

interface Props {
  agendamentos: Agendamento[];
}

const CardAgendamentosInfo = ({ agendamentos }: Props) => {
  const [agendamentoSelecionado, setAgendamentoSelecionado] =
    useState<Agendamento | null>();
  const [saidaAnimacao, setSaidaAnimacao] = useState(false);
  const [variants, setVariants] = useState<Variants | undefined>(undefined);

  const handleSetAgendamentoSelecionado = (agendamento: Agendamento) => {
    if (agendamentoSelecionado?.id === agendamento.id) {
      return;
    }

    if (agendamentoSelecionado == null) {
      setVariants({
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { x: 500 },
      });
    } else {
      setVariants({
        initial: { x: -500 },
        animate: { x: 0 },
        exit: { x: 500 },
      });
    }
    setSaidaAnimacao(true);
    setTimeout(() => {
      setAgendamentoSelecionado(agendamento);
      setSaidaAnimacao(false);
    }, 500);
  };

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

          if (agendamentosPorStatus.length === 0) return null;

          return (
            <div key={`${status}-${index}`}>
              <h2 className="text-sm font-bold uppercase text-muted-foreground mt-6 mb-3">
                {status}
              </h2>

              <div className="space-y-4">
                {agendamentosPorStatus?.map((agendamento, i) => (
                  <div
                    key={`${i}-${agendamento.id}-${agendamento.atividade}-${agendamento.avaliado}-${agendamento.dataAgendamento}-${agendamento.espaco}-${agendamento.horarioFinal}-${agendamento.horarioInicial}-${agendamento.status}`}
                    onClick={() => handleSetAgendamentoSelecionado(agendamento)}
                    className="cursor-pointer"
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
          <div className="sticky top-6">
            <CardContentAgendamento
              agendamento={agendamentoSelecionado}
              saidaAnimacao={saidaAnimacao}
              variants={variants}
              setAgendamentoSelecionado={setAgendamentoSelecionado}
            />
          </div>
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
