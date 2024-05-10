import { getAtividade } from "@/utils/get-atividade";
import { redirect } from "next/navigation";
import AtividadeInfo from "../components/atividade-info";
import AtividadeItem from "../components/atividade-item";

export default async function AtividadeDetalhes({
  params,
}: {
  params: { id: UUID };
}) {
  const atividade = await getAtividade(params.id);

  if (!atividade) {
    return redirect("/");
  }

  return (
    <div className="max-w-screen-lg mx-auto lg:pt-6 lg:pb-12">
      <AtividadeInfo atividade={atividade} />

      <div className="px-5 py-4 flex flex-col gap-4 lg:px-5 md:grid grid-cols-2">
        {atividade.espacos.map((espaco, i) => (
          <AtividadeItem
            key={`${i}-${espaco.nome}-${espaco.imagem}`}
            atividade={atividade}
            espaco={espaco}
          />
        ))}
      </div>
    </div>
  );
}
