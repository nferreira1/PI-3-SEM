"use client";

import SideMenu from "@/components/header/side-menu";
import { Button } from "@/components/ui/button";
import { getAvaliacoesAtividade } from "@/utils/get-avaliacoes";
import { ChevronLeftIcon, MapPinIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  atividade: Atividade;
}

const AtividadeInfo = ({ atividade }: Props) => {
  const [avaliacao, setAvaliacaos] = useState<AvaliacaoAtividade | null>(null);

  useEffect(() => {
    (async () => {
      const avaliacao = await getAvaliacoesAtividade(atividade.id);

      if (avaliacao) {
        setAvaliacaos(avaliacao);
      }
    })();
  }, [atividade.id]);

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Link href="/" passHref replace>
          <Button
            size="icon"
            variant="outline"
            className="z-50 absolute top-4 left-4"
          >
            <ChevronLeftIcon />
          </Button>
        </Link>

        <div className="z-50 absolute top-4 right-4">
          <SideMenu />
        </div>

        <Image
          src={atividade?.imagem ?? ""}
          alt={`imagem de ${atividade?.nome}`}
          className="object-cover"
          fill
        />
      </div>

      <div className="px-5 pt-3 pb-6 space-y-1 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{atividade?.nome}</h1>
        <div className="flex items-center gap-x-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{atividade?.local}</p>
        </div>
        <div className="flex items-center gap-x-1">
          {avaliacao?.quantidade && avaliacao?.quantidade !== 0 && (
            <>
              <Star className="text-primary fill-primary" size={18} />
              <p className="text-sm">
                {Intl.NumberFormat("pt-BR", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }).format(avaliacao?.media ?? 0)}{" "}
                ({avaliacao?.quantidade}
                {avaliacao?.quantidade && avaliacao?.quantidade > 1
                  ? " avaliações"
                  : " avaliação"}
                )
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AtividadeInfo;
