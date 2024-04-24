"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

const AlertConfirmarReserva = ({
  aberto,
  onAbertoChange,
}: {
  aberto: boolean;
  onAbertoChange: (aberto: boolean) => void;
}) => {
  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent className="flex flex-col justify-center items-center gap-4 w-[300px] border-none rounded-3xl">
        <Image
          src="/check-circle.svg"
          alt="imagem de check"
          className="text-primary"
          width={80}
          height={80}
        />
        <DialogHeader>
          <DialogTitle>Reserva efetuada!</DialogTitle>
          <DialogDescription>
            Sua reserva foi agendada com sucesso.
          </DialogDescription>
        </DialogHeader>

        <DialogClose asChild>
          <Button variant="secondary" className="w-full">
            Confirmar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AlertConfirmarReserva;
