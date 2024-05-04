import Header from "@/components/header/header";
import ItemReserva from "@/components/item-agendamento/item-agendamento";
import getAgendamentos from "@/utils/get-agendamentos";
import { getServerSession } from "@/utils/get-server-session";

export default async function Agendamento() {
  const { usuario } = await getServerSession();
  const agendamentos = await getAgendamentos(usuario!.id);

  const aguardando = agendamentos?.filter(
    (agendamento) => agendamento.status.id === 1
  );
  const confirmados = agendamentos?.filter(
    (agendamento) => agendamento.status.id === 2
  );
  const cancelados = agendamentos?.filter(
    (agendamento) => agendamento.status.id === 3
  );
  const finalizados = agendamentos?.filter(
    (agendamento) => agendamento.status.id === 4
  );

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="text-sm font-bold uppercase text-gray-400 mt-6 mb-3">
          Aguardando Confirmação
        </h2>

        <div className="flex flex-col gap-3">
          {aguardando?.map((agendamento) => (
            <ItemReserva key={agendamento.id} agendamento={agendamento} />
          ))}
        </div>

        <h2 className="text-sm font-bold uppercase text-gray-400 mt-6 mb-3">
          Confirmados
        </h2>

        <div className="flex flex-col gap-3">
          {confirmados?.map((agendamento) => (
            <ItemReserva key={agendamento.id} agendamento={agendamento} />
          ))}
        </div>

        <h2 className="text-sm font-bold uppercase text-gray-400 mt-6 mb-3">
          Finalizados
        </h2>

        <div className="flex flex-col gap-3">
          {finalizados?.map((agendamento) => (
            <ItemReserva key={agendamento.id} agendamento={agendamento} />
          ))}
        </div>

        <h2 className="text-sm font-bold uppercase text-gray-400 mt-6 mb-3">
          Cancelados
        </h2>

        <div className="flex flex-col gap-3">
          {cancelados?.map((agendamento) => (
            <ItemReserva key={agendamento.id} agendamento={agendamento} />
          ))}
        </div>
      </div>
    </>
  );
}
