"use client";

import { postAvaliacao } from "@/utils/post-avaliacao";
import { Loader2, Star } from "lucide-react";
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

const AvaliarAgendamento = ({
  idAgendamento,
  setResponse,
}: {
  idAgendamento: number;
  setResponse: (response: boolean) => void;
}) => {
  const [nota, setNota] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAvaliarAgendamento = async (
    idAgendamento: number,
    nota: number
  ) => {
    setLoading(true);
    const response = await postAvaliacao(idAgendamento, nota);
    setLoading(false);

    if (response) {
      return setResponse(true);
    }

    return setResponse(false);
  };

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
          <AlertDialogCancel className="w-[134px] mt-0" disabled={loading}>
            Voltar
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-[134px] bg-primary space-x-2"
            disabled={nota === 0 || loading}
            onClick={() => handleAvaliarAgendamento(idAgendamento, nota)}
          >
            {loading && <Loader2 className="animate-spin" />}
            <p>{loading ? "Aguarde..." : "Avaliar"}</p>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AvaliarAgendamento;
