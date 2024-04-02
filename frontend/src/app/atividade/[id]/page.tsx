import { getAtividade } from "@/utils/get-atividade";
import AtividadeInfo from "../components/atividade-info";
import AtividadeItem from "../components/atividade-item";
import { redirect } from "next/navigation";

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
    <div>
      <AtividadeInfo atividade={atividade} />

      <div className="px-5 py-6 flex flex-col gap-4">
        {atividade.espacos.map((espaco, i) => (
          <AtividadeItem
            key={`${i}-${espaco.nome}-${espaco.imagem}`}
            espaco={espaco}
          />
        ))}
      </div>
    </div>
  );
}
