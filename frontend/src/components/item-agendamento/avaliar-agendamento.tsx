"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

const AvaliarAgendamento = ({ idAgendamento }: { idAgendamento: number }) => {
  const [nota, setNota] = useState<number>(0);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" size="icon" className="w-full">
          Avaliar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl w-min flex flex-col items-center">
        <Star className="fill-primary text-primary" size={80} />
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center font-bold">
            Avalie este agendamento!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground flex flex-col gap-y-1">
            <p>Por favor, classifique este agendamento de 1 a 5.</p>
            <div className="flex justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  onClick={() => setNota(i + 1)}
                  className={`cursor-pointer transition-colors ${
                    nota > i && "fill-primary text-primary"
                  }`}
                />
              ))}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row justify-center items-center mt-2 gap-3">
          <AlertDialogCancel className="w-[134px] mt-0">
            Voltar
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-[134px] bg-primary"
            disabled={nota === 0}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AvaliarAgendamento;
