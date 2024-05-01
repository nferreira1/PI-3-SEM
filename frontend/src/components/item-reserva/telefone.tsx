"use client";

import { Smartphone } from "lucide-react";
import { Button } from "../ui/button";

const Telefone = ({ telefone }: { telefone: string }) => {
  const handleCopiarTexto = async (texto: string) => {
    try {
      await navigator.clipboard.writeText(texto);
    } catch (error) {
      console.error("Erro ao copiar texto", error);
    }
  };

  return (
    <div className="w-full flex justify-between items-center mb-2">
      <div className="flex gap-3">
        <Smartphone />
        <p>{telefone}</p>
      </div>
      <Button variant="outline" onClick={() => handleCopiarTexto(telefone)}>
        Copiar
      </Button>
    </div>
  );
};

export default Telefone;
