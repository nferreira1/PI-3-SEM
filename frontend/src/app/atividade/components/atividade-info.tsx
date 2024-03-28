"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, MapPinIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AtividadeInfoProps {
  atividade: Atividade;
}

const AtividadeInfo = ({ atividade }: AtividadeInfoProps) => {
  const router = useRouter();

  const handleVoltarClique = () => router.back();

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          onClick={handleVoltarClique}
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 left-4"
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>

        <Image
          src={atividade?.imagem ?? ""}
          alt={`imagem de ${atividade?.nome}`}
          className="object-cover"
          fill
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{atividade?.nome}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{atividade?.local}</p>
        </div>
      </div>
    </div>
  );
};

export default AtividadeInfo;
