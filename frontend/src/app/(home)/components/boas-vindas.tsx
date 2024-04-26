"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/useSession";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const BoasVindas = () => {
  const diaCompleto = format(new Date(), "EEEE, d 'de' MMMM", {
    locale: ptBR,
  });
  const { data: usuario, status } = useSession();

  if (status === "loading") {
    return (
      <div className="space-y-2">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-40 h-4" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold">
        Olá,
        {status === "authenticated" ? (
          ` ${usuario?.nome}`
        ) : (
          <span> faça o seu login</span>
        )}
        !
      </h2>
      <p className="text-sm">
        {diaCompleto[0].toUpperCase() + diaCompleto.slice(1)}
      </p>
    </div>
  );
};

export default BoasVindas;
