"use client";

import { deleteAgendamento } from "@/utils/delete-agendamento";
import { useRouter } from "next/navigation";
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

const AlertCancelarReserva = ({
  idAgendamento,
  setAgendamentoSelecionado,
  onAbertoChange,
}: {
  idAgendamento: number;
  setAgendamentoSelecionado?: (agendamento: Agendamento | null) => void;
  onAbertoChange: (aberto: boolean) => void;
}) => {
  const router = useRouter();
  const handleCancelarReserva = async (id: number) => {
    await deleteAgendamento(id);
    onAbertoChange(false);
    setAgendamentoSelecionado && setAgendamentoSelecionado(null);
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" className="w-full">
          Cancelar reserva
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl w-min">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-bold">
            Cancelamento
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground">
            Deseja mesmo cancelar este agendamento?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row justify-center items-center mt-2 gap-3">
          <AlertDialogCancel className="w-[134px] mt-0">
            Voltar
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-[134px] bg-destructive hover:bg-destructive/80"
            onClick={() => handleCancelarReserva(idAgendamento)}
          >
            Cancelar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertCancelarReserva;
