"use client";

import { Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Telefone = ({ telefone }: { telefone: string }) => {
  const [clique, setClique] = useState<boolean>(false);

  const handleCopiarTexto = async (texto: string) => {
    try {
      await navigator.clipboard.writeText(texto);
      setClique(true);
    } catch (error) {
      console.error("Erro ao copiar texto", error);
    }
  };

  useEffect(() => {
    if (clique) {
      const timer = setTimeout(() => {
        setClique(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [clique]);

  return (
    <div className="w-full flex justify-between items-center mb-2">
      <div className="flex gap-3">
        <Smartphone />
        <p>{telefone}</p>
      </div>
      <Button
        variant="outline"
        onClick={() => handleCopiarTexto(telefone)}
        className={`transition-colors w-24 ${
          clique ? "bg-green-700 hover:bg-green-700" : "bg-background"
        }`}
      >
        {clique ? "Copiado" : "Copiar"}
      </Button>
    </div>
  );
};

export default Telefone;
