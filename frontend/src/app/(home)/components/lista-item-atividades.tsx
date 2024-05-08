"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/useSession";
import ItemAtividade from "./item-atividade";

const ListaItemAtividades = ({
  atividades,
}: {
  atividades: Atividade[] | null;
}) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <>
        <Skeleton className="mx-5 h-4 w-32 mb-3.5" />

        <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className="min-w-[167px] h-[275px] rounded-2xl lg:min-w-[220px] lg:max-w-[295px]"
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="px-5 text-xs text-muted-foreground font-bold mb-3 uppercase">
        Recomendados
      </h2>

      <div className="px-5">
        <Carousel
          opts={{
            dragFree: true,
          }}
        >
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselContent className="flex">
            {atividades?.map((atividade) => (
              <CarouselItem key={atividade.id} className="basis-auto">
                <ItemAtividade atividade={atividade} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </>
  );
};

export default ListaItemAtividades;
