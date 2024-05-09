"use client";

import ItemReserva from "@/components/item-agendamento/item-agendamento";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useSession } from "@/hooks/useSession";
import AutoScroll from "embla-carousel-auto-scroll";

const ListaAgendamentos = ({
  agendamentos,
}: {
  agendamentos: Agendamento[] | undefined;
}) => {
  const { status } = useSession();

  return (
    status === "authenticated" &&
    agendamentos &&
    agendamentos?.length > 0 && (
      <>
        <h2 className="px-5 text-xs text-muted-foreground font-bold mb-3 uppercase">
          Agendamentos
        </h2>

        <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
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
                <CarouselItem
                  key={agendamento.id}
                  className="basis-full sm:basis-1/2 lg:basis-full"
                >
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
