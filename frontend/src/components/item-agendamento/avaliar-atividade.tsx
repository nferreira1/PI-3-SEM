"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const AvaliarAtividade = ({ idAgendamento }: { idAgendamento: number }) => {
  const [nota, setNota] = useState<number>(0);
  return (
    <AlertDialogContent className="rounded-2xl w-min">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex justify-center font-bold">
          <Star fill="white" size={80} />
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center text-muted-foreground flex flex-col gap-y-2">
          <p>Avalie este agendamento</p>
          <div className="flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={24}
                onClick={() => setNota(i + 1)}
                className={`cursor-pointer ${
                  nota > i && "fill-primary text-primary"
                }`}
              />
            ))}
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="flex-row justify-center items-center mt-2 gap-3">
        <AlertDialogCancel className="w-[134px] mt-0">Voltar</AlertDialogCancel>
        <AlertDialogAction
          className="w-[134px] bg-primary"
          disabled={nota === 0}
        >
          Confirmar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AvaliarAtividade;
