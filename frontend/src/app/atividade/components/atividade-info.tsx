"use client";

import SideMenu from "@/components/header/side-menu";
import { Button } from "@/components/ui/button";
import { getAvaliacoesAtividade } from "@/utils/get-avaliacoes";
import { ChevronLeftIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AvaliacoesDesktop, AvaliacoesMobile } from "./avaliacoes";

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
    <div className="lg:px-5">
      <div className="h-[250px] w-full relative lg:h-[487px]">
        <Link href="/" passHref replace>
          <Button
            size="icon"
            variant="outline"
            className="z-50 absolute top-4 left-4 flex lg:hidden"
          >
            <ChevronLeftIcon />
          </Button>
        </Link>

        <div className="z-50 absolute top-4 right-4 block lg:hidden">
          <SideMenu />
        </div>

        <Image
          src={atividade?.imagem ?? ""}
          alt={`imagem de ${atividade?.nome}`}
          className="object-cover lg:rounded-2xl lg:brightness-50"
          fill
        />
      </div>

      <div className="px-5 pt-3 pb-6 space-y-1 border-b border-solid border-secondary lg:px-0 lg:border-none">
        <div className="relative">
          <h1 className="text-xl font-bold lg:text-3xl">{atividade?.nome}</h1>
          <AvaliacoesDesktop avaliacao={avaliacao} />
        </div>
        <div className="flex items-center gap-x-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{atividade?.local}</p>
        </div>
        <AvaliacoesMobile avaliacao={avaliacao} />
      </div>
    </div>
  );
};

export default AtividadeInfo;
