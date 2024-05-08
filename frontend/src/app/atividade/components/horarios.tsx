import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const Horarios = ({
  horarios,
  horarioSelecionado,
  setHorarioSelecionado,
}: {
  horarios: Horario[] | null;
  horarioSelecionado: Horario | undefined;
  setHorarioSelecionado: (horario: Horario) => void;
}) => {
  return horarios && horarios?.length > 0 ? (
    <Carousel
      opts={{
        dragFree: true,
      }}
    >
      <CarouselContent>
        {horarios?.map((horario, i) => (
          <CarouselItem key={horario.horarioInicial} className="basis-auto">
            <motion.div
              initial={{ x: 50 * i, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50 * i, opacity: 0 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
            >
              <Button
                key={horario.horarioInicial}
                variant={
                  horario === horarioSelecionado ? "default" : "secondary"
                }
                className="rounded-full"
                onClick={() => setHorarioSelecionado(horario)}
              >
                {horario.horarioInicial}
              </Button>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  ) : (
    <p className="text-sm h-10 leading-10">Nenhum horário disponível</p>
  );
};

export default Horarios;
