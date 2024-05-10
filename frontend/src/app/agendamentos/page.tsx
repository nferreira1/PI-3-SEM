import CardAgendamentosInfo from "@/components/item-agendamento/card-agendamentos-info";
import ItemAgendamento from "@/components/item-agendamento/item-agendamento";
import getAgendamentos from "@/utils/get-agendamentos";
import { getServerSession } from "@/utils/get-server-session";

export default async function Agendamento() {
  const { usuario } = await getServerSession();
  const agendamentos = await getAgendamentos(usuario!.id);

  if (agendamentos?.length === 0) {
    return null;
  }

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
    <div className="max-w-screen-lg mx-auto py-6">
      <h1 className="px-5 text-xl font-bold">Agendamentos</h1>

      <div className="px-5 md:hidden">
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
                {agendamentosPorStatus?.map((agendamento) => (
                  <ItemAgendamento
                    key={agendamento.id}
                    agendamento={agendamento}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 hidden md:flex">
        <div className="w-full flex flex-col gap-3">
          <CardAgendamentosInfo agendamentos={agendamentos as Agendamento[]} />
        </div>
      </div>
    </div>
  );
}
