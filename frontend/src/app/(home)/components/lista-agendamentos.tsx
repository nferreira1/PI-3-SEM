"use client";

import ItemReserva from "@/components/item-reserva";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/useSession";

const ListaAgendamentos = ({
  agendamentos,
}: {
  agendamentos: Agendamento[] | undefined;
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
            <Skeleton key={index} className="min-w-full h-[126px]" />
          ))}
        </div>
      </>
    );
  }

  return (
    status === "authenticated" && (
      <>
        <h2 className="px-5 text-xs text-muted-foreground font-bold mb-3 uppercase">
          Agendamentos
        </h2>

        <div className={className}>
          {agendamentos?.map((agendamento) => (
            <ItemReserva key={agendamento.id} agendamento={agendamento} />
          ))}
        </div>
      </>
    )
  );
};

export default ListaAgendamentos;
