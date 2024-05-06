import Buscar from "@/components/buscar";
import getAgendamentos from "@/utils/get-agendamentos";
import { getAtividades } from "@/utils/get-atividades";
import { getServerSession } from "@/utils/get-server-session";
import BoasVindas from "./components/boas-vindas";
import ListaAgendamentos from "./components/lista-agendamentos";
import ListaItemAtividades from "./components/lista-item-atividades";

export default async function Home() {
  const { usuario, status } = await getServerSession();

  const agendamentos =
    status === "authenticated" ? await getAgendamentos(usuario!.id) : [];
  const aguardando = agendamentos?.filter(
    (agendamento) => agendamento.status.nome === "AGUARDANDO CONFIRMAÇÃO"
  );
  const atividades = await getAtividades();

  return (
    <div className="lg:px-32">
      <div className="px-5 pt-5 space-y-6">
        <BoasVindas />
        <Buscar />
      </div>

      <div className="mt-6">
        <ListaAgendamentos agendamentos={aguardando} />
      </div>

      <div className="mt-6">
        <ListaItemAtividades atividades={atividades} />
      </div>
    </div>
  );
}
