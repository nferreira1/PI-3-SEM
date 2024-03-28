"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  atividade: Atividade;
}

const AgendamentoItem = ({ atividade }: Props) => {
  const router = useRouter();

  /**
   * Função para redirecionar o usuário para a página de reserva da {@link Atividade}.
   * @see {@link Atividade}
   * @function
   * @returns {void}
   * @example
   * <Button onClick={handleRouteAtividade}>Detalhes</Button>
   * @example
   * <div onClick={handleRouteAtividade}>Detalhes</div>
   * @example
   * <Link href="/atividade/[id]" as={`/atividade/${atividade.id}`}>
   *    <a onClick={handleRouteAtividade}>Detalhes</a>
   * </Link>
   */
  const handleRouteAtividade = (): void =>
    router.push(`/atividade/${atividade.id}`);

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="p-1">
        <div className="relative w-full h-[159px]">
          <div className="absolute top-1 left-1 z-50">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 opacity-90"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="">5,0</span>
            </Badge>
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
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {atividade?.nome}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {atividade?.local}
          </p>
          <Button
            variant="secondary"
            className="w-full mt-3"
            onClick={handleRouteAtividade}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendamentoItem;
