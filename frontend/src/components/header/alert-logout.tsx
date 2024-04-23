"use client";

import { useSession } from "@/hooks/useSession";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const AlertLogout = () => {
  const { logout } = useSession();

  const handleLogoutClique = () => logout();

  return (
    <AlertDialogContent className="rounded-2xl w-min">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center font-bold">
          Sair
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center text-muted-foreground">
          Deseja mesmo sair da plataforma?
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="flex-row justify-center items-center mt-2 gap-3">
        <AlertDialogCancel className="w-[134px] mt-0">
          Cancelar
        </AlertDialogCancel>
        <AlertDialogAction
          className="w-[134px] bg-destructive hover:bg-destructive/80"
          onClick={handleLogoutClique}
        >
          Sair
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AlertLogout;
