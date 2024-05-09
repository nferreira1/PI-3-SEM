"use client";

import { putAgendamento } from "@/utils/put-agendamento";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import AlertCancelarReserva from "./alert-cancelar-agendamento";
import AvaliarAgendamento from "./avaliar-agendamento";
import DialogConfirmarAvaliacao from "./dialog-confirmar-avaliacao";
import Telefone from "./telefone";

interface Props {
  agendamento: Agendamento;
  saidaAnimacao: boolean;
  variants: Variants | undefined;
  setAgendamentoSelecionado: (agendamento: Agendamento | null) => void;
}

const CardContentAgendamento = ({
  agendamento,
  saidaAnimacao,
  variants,
  setAgendamentoSelecionado,
}: Props) => {
  const router = useRouter();
  const [responseAvaliarAgendamento, setResponseAvaliarAgendamento] =
    useState<boolean>(false);

  const variant =
    agendamento.status.id === 2
      ? "default"
      : agendamento.status.id === 4
      ? "secondary"
      : agendamento.status.id === 3
      ? "destructive"
      : "warning";

  const handleConfirmarAgendamento = async (id: number) => {
    await putAgendamento(id);
    setAgendamentoSelecionado(null);
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  const handleConfimarAvaliacao = () => {
    setResponseAvaliarAgendamento(false);
    setAgendamentoSelecionado(null);
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <Card className="grow mt-8 overflow-hidden">
      <AnimatePresence mode="wait">
        {!saidaAnimacao && (
          <motion.div
            key={
              agendamento
                ? `${agendamento.id}-${agendamento.atividade}-${agendamento.avaliado}-${agendamento.dataAgendamento}-${agendamento.espaco}-${agendamento.horarioFinal}-${agendamento.horarioInicial}-${agendamento.status}`
                : "empty"
            }
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <CardContent className="space-y-4">
              <div className="relative w-full mt-6 min-h-60">
                <Image
                  src={agendamento.espaco.imagem ?? ""}
                  alt="imagem do espaço"
                  fill
                  className="brightness-50 rounded-md object-cover h-full"
                />

                <div className="w-full absolute bottom-4 px-3">
                  <Card className="w-4/6 mx-auto">
                    <CardContent className="flex gap-2 p-3">
                      <Avatar>
                        <AvatarImage src={agendamento.atividade.imagem ?? ""} />
                        <AvatarFallback>
                          {agendamento.atividade.nome[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h2 className="font-bold">
                          {agendamento.atividade.nome}
                        </h2>
                        <h2 className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {agendamento.espaco.nome}
                        </h2>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Telefone telefone={agendamento.atividade.telefone} />
              </div>

              <Separator />

              <Badge variant={variant} className="w-fit mt-4">
                {agendamento.status.nome}
              </Badge>

              <Card>
                <CardContent className="flex flex-col gap-3 p-3">
                  <div className="flex justify-between">
                    <h2>{agendamento.atividade.nome}</h2>
                    <h3 className="font-bold text-sm">{}</h3>
                  </div>

                  <div className="flex justify-between">
                    <h3 className="text-muted-foreground text-sm">Data</h3>
                    <h4 className="text-sm">
                      {format(
                        new Date(
                          agendamento.dataAgendamento +
                            "T" +
                            agendamento.horarioInicial
                        ),
                        "dd/MM/yyyy",
                        {
                          locale: ptBR,
                        }
                      )}
                    </h4>
                  </div>

                  <div className="flex justify-between">
                    <h3 className="text-muted-foreground text-sm">Horário</h3>
                    <h4 className="text-sm">
                      {agendamento.horarioInicial} - {agendamento.horarioFinal}
                    </h4>
                  </div>

                  <div className="flex justify-between">
                    <h3 className="text-muted-foreground text-sm">Local</h3>
                    <h4 className="text-sm">{agendamento.espaco.nome}</h4>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="space-x-3">
              {(agendamento.status.id == 1 || agendamento.status.id == 2) && (
                <AlertCancelarReserva
                  onAbertoChange={() => false}
                  idAgendamento={agendamento.id}
                />
              )}

              {agendamento.status.id == 4 && !agendamento.avaliado && (
                <AvaliarAgendamento
                  setResponse={setResponseAvaliarAgendamento}
                  idAgendamento={agendamento.id}
                />
              )}

              {agendamento.status.id == 1 && (
                <Button
                  variant="default"
                  size="icon"
                  className="w-full"
                  onClick={() => handleConfirmarAgendamento(agendamento.id)}
                >
                  Confirmar reserva
                </Button>
              )}

              <DialogConfirmarAvaliacao
                aberto={responseAvaliarAgendamento}
                onAbertoChange={handleConfimarAvaliacao}
              />
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default CardContentAgendamento;
