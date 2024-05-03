"use client";

import { useSession } from "@/hooks/useSession";
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
import AvaliarAtividade from "./avaliar-atividade";
import Telefone from "./telefone";

interface Props {
  agendamento: Agendamento;
}

const ItemAgendamento = ({ agendamento }: Props) => {
  const router = useRouter();
  const { data: usuario } = useSession();
  const [sheet, setSheet] = useState<boolean>(false);
  const dia = format(
    new Date(agendamento.dataAgendamento + "T" + agendamento.horarioInicial),
    "dd",
    {
      locale: ptBR,
    }
  );
  const mes = format(
    new Date(agendamento.dataAgendamento + "T" + agendamento.horarioInicial),
    "MMMM",
    {
      locale: ptBR,
    }
  );

  const variant =
    agendamento.status.nome === "CONFIRMADO"
      ? "default"
      : agendamento.status.nome === "FINALIZADO"
      ? "secondary"
      : agendamento.status.nome === "CANCELADO"
      ? "destructive"
      : "warning";

  const handleConfirmarAgendamento = async (id: number) => {
    await putAgendamento(id);
    setSheet(false);
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <Sheet open={sheet} onOpenChange={setSheet}>
      <SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="p-0 flex">
            <div className="w-9/12 flex flex-col gap-2 py-5 pl-5">
              <Badge variant={variant} className="w-fit">
                {agendamento.status.nome}
              </Badge>
              <h2 className="font-bold">{agendamento.atividade.nome}</h2>

              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-[8px]">
                    {usuario?.nome[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{usuario?.nome}</h3>
              </div>
            </div>

            <div className="w-3/12 flex flex-col items-center justify-center border-solid border-l border-secondary">
              <p className="text-sm capitalize">{mes}</p>
              <p className="text-2xl">{dia}</p>
              <p className="text-sm">{agendamento.horarioInicial}</p>
            </div>
          </CardContent>
        </Card>
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
                <h3 className="text-gray-400 text-sm">Data</h3>
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
                <h3 className="text-gray-400 text-sm">Horário</h3>
                <h4 className="text-sm">
                  {agendamento.horarioInicial} - {agendamento.horarioFinal}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Local</h3>
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

          {agendamento.status.id == 4 && (
            <AvaliarAtividade idAgendamento={agendamento.id} />
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ItemAgendamento;
