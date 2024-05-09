"use client";

import { useSession } from "@/hooks/useSession";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const BoasVindas = () => {
  const diaCompleto = format(new Date(), "EEEE, d 'de' MMMM", {
    locale: ptBR,
  });
  const { data: usuario, status } = useSession();

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
