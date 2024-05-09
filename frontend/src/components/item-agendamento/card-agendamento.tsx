"use client";

import { useSession } from "@/hooks/useSession";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

interface Props {
  agendamento: Agendamento;
}
const CardAgendamento = ({ agendamento }: Props) => {
  const { data: usuario } = useSession();

  const variant =
    agendamento.status.id === 2
      ? "default"
      : agendamento.status.id === 4
      ? "secondary"
      : agendamento.status.id === 3
      ? "destructive"
      : "warning";

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

  return (
    <Card className="min-w-full">
      <CardContent className="p-0 flex relative">
        <div className="w-9/12 flex flex-col gap-2 py-5 pl-5">
          <Badge
            variant={variant}
            className="w-fit whitespace-nowrap text-ellipsis"
          >
            {agendamento.status.nome}
          </Badge>
          <h2 className="font-bold text-left">{agendamento.atividade.nome}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={usuario?.imagem ?? ""} />
              <AvatarFallback className="text-[8px]">
                {usuario?.nome[0]}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-sm">{usuario?.nome}</h3>
          </div>
        </div>

        {agendamento.status.id == 4 && (
          <Bookmark
            className={`absolute right-32 -top-1 ${
              agendamento.avaliado
                ? "fill-green-500 text-green-500"
                : "fill-red-500 text-red-500"
            }`}
            strokeWidth={1}
          />
        )}

        <div className="w-3/12 flex flex-col items-center justify-center border-solid border-l border-secondary">
          <p className="text-sm capitalize">{mes}</p>
          <p className="text-2xl">{dia}</p>
          <p className="text-sm">{agendamento.horarioInicial}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardAgendamento;
