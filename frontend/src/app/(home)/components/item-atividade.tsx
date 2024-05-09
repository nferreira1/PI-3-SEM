"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@/hooks/useSession";
import { getAvaliacoesAtividade } from "@/utils/get-avaliacoes";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  atividade: Atividade;
}

const ItemAtividade = ({ atividade }: Props) => {
  const [avaliacao, setAvaliacao] = useState<AvaliacaoAtividade | null>(null);
  const { status } = useSession();

  useEffect(() => {
    (async () => {
      const avaliacao = await getAvaliacoesAtividade(atividade.id);

      if (avaliacao) {
        setAvaliacao(avaliacao);
      }
    })();
  }, [atividade.id]);

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl lg:min-w-[220px] lg:max-w-[220px]">
      <CardContent className="p-1">
        <div className="relative min-w-full h-[159px]">
          <div className="absolute top-1 left-1 z-50">
            {avaliacao && avaliacao?.quantidade !== 0 && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 opacity-90"
              >
                <StarIcon size={12} className="fill-primary text-primary" />
                <span className="">
                  {Intl.NumberFormat("pt-BR", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }).format(avaliacao?.media ?? 0)}
                </span>
              </Badge>
            )}
          </div>

          <Image
            src={atividade?.imagem ?? ""}
            alt={atividade?.nome}
            width={0}
            height={0}
            sizes="100vw"
            fill
            className="rounded-2xl object-cover brightness-50"
          />
        </div>

        <div className="px-2 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {atividade?.nome}
          </h2>
          <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
            {atividade?.local}
          </p>
          <Link href={`/atividade/${atividade.id}`} legacyBehavior>
            <Button
              variant="secondary"
              className="w-full mt-3"
              disabled={status == "unauthenticated"}
            >
              Reservar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemAtividade;
