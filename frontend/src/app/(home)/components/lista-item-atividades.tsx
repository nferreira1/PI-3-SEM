"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ItemAtividade from "./item-atividade";

const ListaItemAtividades = ({
  atividades,
}: {
  atividades: Atividade[] | null;
}) => {
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
