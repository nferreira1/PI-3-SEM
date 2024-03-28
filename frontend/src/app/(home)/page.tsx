import AgendamentoItem from "@/components/agendamento-item";
import Buscar from "@/components/buscar";
import Header from "@/components/header";
import ItemReserva from "@/components/item-reserva";
import { formatarData } from "@/utils/formatar-data";

export default async function Home() {
  const diaCompleto = formatarData(new Date());

  async function getAtividades() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/atividade`, {
        cache: "no-store",
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      return [];
    }
  }

  const atividades = await getAtividades();

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Nathan!</h2>
        <p className="text-sm">{diaCompleto}</p>
      </div>
      <div className="px-5 mt-6">
        <Buscar />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs text-gray-400 font-bold mb-3 uppercase">
          Agendamentos
        </h2>
        <ItemReserva />
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs text-gray-400 font-bold mb-3 uppercase">
          Recomendados
        </h2>

        <div className="px-5 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {atividades.map((esporte: any) => (
            <AgendamentoItem key={esporte.id} atividade={esporte} />
          ))}
        </div>
      </div>
    </div>
  );
}
