"use client";

import { putAgendamento } from "@/utils/put-agendamento";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import AlertCancelarReserva from "./alert-cancelar-agendamento";
import AvaliarAgendamento from "./avaliar-agendamento";
import CardAgendamento from "./card-agendamento";
import DialogConfirmarAvaliacao from "./dialog-confirmar-avaliacao";
import Telefone from "./telefone";

interface Props {
  agendamento: Agendamento;
}

const ItemAgendamento = ({ agendamento }: Props) => {
  const router = useRouter();
  const [sheet, setSheet] = useState<boolean>(false);
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
    setSheet(false);
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  const handleConfimarAvaliacao = () => {
    setSheet(false);
    setResponseAvaliarAgendamento(false);
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <Sheet open={sheet} onOpenChange={setSheet}>
      <SheetTrigger className="w-full">
        <CardAgendamento agendamento={agendamento} />
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image
              src={agendamento.espaco.imagem ?? ""}
              alt="imagem do espaço"
              fill
              className="brightness-50 rounded-md object-cover"
            />

            <div className="absolute bottom-4 w-full px-3">
              <Card>
                <CardContent className="flex gap-2 p-3">
                  <Avatar>
                    <AvatarImage src={agendamento.atividade.imagem ?? ""} />
                    <AvatarFallback>
                      {agendamento.atividade.nome[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{agendamento.atividade.nome}</h2>
                    <h2 className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      {agendamento.espaco.nome}
                    </h2>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge variant={variant} className="w-fit mt-4">
            {agendamento.status.nome}
          </Badge>

          <Card className="mt-3">
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

          <div className="flex flex-col gap-3 mt-6">
            <Telefone telefone={agendamento.atividade.telefone} />
          </div>
        </div>

        <SheetFooter className="absolute bottom-4 w-full flex-row gap-3 px-5">
          {(agendamento.status.id == 1 || agendamento.status.id == 2) && (
            <AlertCancelarReserva
              onAbertoChange={setSheet}
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ItemAgendamento;
