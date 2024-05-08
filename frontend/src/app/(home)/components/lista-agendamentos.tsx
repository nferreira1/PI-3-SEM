"use client";

import ItemReserva from "@/components/item-agendamento/item-agendamento";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/useSession";
import AutoScroll from "embla-carousel-auto-scroll";

const ListaAgendamentos = ({
  agendamentos,
}: {
  agendamentos: Agendamento[] | undefined;
}) => {
  const { status } = useSession();

  const className =
    "px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden";

  if (status === "loading") {
    return (
      <>
        <Skeleton className="mx-5 h-4 w-32 mb-3.5" />

        <div className={className}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="min-w-full h-[126px]" />
          ))}
        </div>
      </>
    );
  }

  return (
    status === "authenticated" &&
    agendamentos &&
    agendamentos?.length > 0 && (
      <>
        <h2 className="px-5 text-xs text-muted-foreground font-bold mb-3 uppercase">
          Agendamentos
        </h2>

        <div className={className}>
          <Carousel
            className="w-full"
            opts={{
              dragFree: true,
              loop: true,
            }}
            plugins={[
              AutoScroll({
                speed: 1,
              }),
            ]}
          >
            <CarouselContent>
              {agendamentos?.map((agendamento) => (
                <CarouselItem key={agendamento.id}>
                  <ItemReserva agendamento={agendamento} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </>
    )
  );
};

export default ListaAgendamentos;
