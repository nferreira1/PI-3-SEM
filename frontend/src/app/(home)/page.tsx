import Buscar from "@/components/buscar";
import getAgendamentos from "@/utils/get-agendamentos";
import { getAtividades } from "@/utils/get-atividades";
import { getServerSession } from "@/utils/get-server-session";
import Image from "next/image";
import BoasVindas from "./components/boas-vindas";
import ListaAgendamentos from "./components/lista-agendamentos";
import ListaItemAtividades from "./components/lista-item-atividades";

export default async function Home() {
  const { usuario, status } = await getServerSession();

  const agendamentos =
    status === "authenticated" ? await getAgendamentos(usuario!.id) : [];
  const confirmados = agendamentos?.filter(
    (agendamento) => agendamento.status.id === 2
  );
  const atividades = await getAtividades();

  return (
    <>
      <div className="relative py-6 xl:py-14">
        <Image
          src="/background.jpg"
          alt="imagem de fundo!"
          fill
          className="hidden object-cover object-center -z-10 brightness-50 opacity-10 lg:block"
        />

        <div className="max-w-screen-xl mx-auto space-y-6 lg:flex xl:gap-24 lg:space-y-0">
          <div className="lg:w-6/12 lg:max-w-[500px]">
            <div className="px-5 space-y-6">
              <BoasVindas />
              <Buscar />
            </div>

            <div className="mt-6">
              <ListaAgendamentos agendamentos={confirmados} />
            </div>
          </div>

          <div className="lg:w-6/12 md:grow">
            <ListaItemAtividades atividades={atividades} />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto pb-6 md:py-12 xl:py-14">
        <ListaItemAtividades atividades={atividades} />
      </div>
    </>
  );
}
