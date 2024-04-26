"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/useSession";
import ItemAtividade from "./item-atividade";

const ListaItemAtividades = ({
  atividades,
}: {
  atividades: Atividade[] | null;
}) => {
  const { status } = useSession();

  const className =
    "px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden";

  if (status === "loading") {
    return (
      <>
        <Skeleton className="mx-5 h-4 w-32 mb-3.5" />

        <div className={className}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className="min-w-[167px] h-[275px] rounded-2xl"
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="px-5 text-xs text-muted-foreground font-bold mb-3 uppercase">
        Recomendados
      </h2>

      <div className={className}>
        {atividades?.map((atividade) => (
          <ItemAtividade key={atividade.id} atividade={atividade} />
        ))}
      </div>
    </>
  );
};

export default ListaItemAtividades;
