import { getServerSession } from "@/utils/get-server-session";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface Props {
  agendamento: Agendamento;
}

const ItemReserva = async ({ agendamento }: Props) => {
  const { usuario } = await getServerSession();
  const dia = format(new Date(agendamento.dataAgendamento), "dd");
  const mes = format(new Date(agendamento.dataAgendamento), "MMMM", {
    locale: ptBR,
  });

  const variant =
    agendamento.status.nome === "CONFIRMADO"
      ? "default"
      : agendamento.status.nome === "FINALIZADO"
      ? "secondary"
      : agendamento.status.nome === "CANCELADO"
      ? "destructive"
      : "warning";

  return (
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
  );
};

export default ItemReserva;
