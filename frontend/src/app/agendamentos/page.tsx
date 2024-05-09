import Header from "@/components/header/header";
import CardAgendamentosInfo from "@/components/item-agendamento/card-agendamentos-info";
import ItemAgendamento from "@/components/item-agendamento/item-agendamento";
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

      <div className="max-w-screen-lg mx-auto py-6">
        <h1 className="px-5 text-xl font-bold">Agendamentos</h1>

        <div className="px-5 md:hidden">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase text-gray-400 mt-6 mb-3">
              Aguardando Confirmação
            </h2>
            {aguardando?.map((agendamento) => (
              <ItemAgendamento key={agendamento.id} agendamento={agendamento} />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase text-gray-400 mt-6 mb-3">
              Confirmados
            </h2>
            {confirmados?.map((agendamento) => (
              <ItemAgendamento key={agendamento.id} agendamento={agendamento} />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase text-gray-400 mt-6 mb-3">
              Finalizados
            </h2>
            {finalizados?.map((agendamento) => (
              <ItemAgendamento key={agendamento.id} agendamento={agendamento} />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase text-gray-400 mt-6 mb-3">
              Cancelados
            </h2>
            {cancelados?.map((agendamento) => (
              <ItemAgendamento key={agendamento.id} agendamento={agendamento} />
            ))}
          </div>
        </div>

        <div className="px-5 hidden md:flex">
          <div className="w-full flex flex-col gap-3">
            <CardAgendamentosInfo
              agendamentos={agendamentos as Agendamento[]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
