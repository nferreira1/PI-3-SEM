"use client";

import {
  LogOutIcon,
  LogInIcon,
  HomeIcon,
  CalendarIcon,
  UserRound,
} from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "@/hooks/useSession";
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog";
import AlertLogout from "./alert-logout";
import DialogLogin from "./dialog-login";
import { Dialog, DialogTrigger } from "./ui/dialog";

const SideMenu = () => {
  const { data, status, login } = useSession();

  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {status === "authenticated" ? (
        <div className="flex justify-between px-5 py-6 items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data!.imagem ?? ""} />
              <AvatarFallback>{data!.nome?.charAt(0)}</AvatarFallback>
            </Avatar>

            <h2 className="font-bold">{data!.nome}</h2>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" size="icon">
                <LogOutIcon size={20} />
              </Button>
            </AlertDialogTrigger>
            <AlertLogout />
          </AlertDialog>
        </div>
      ) : (
        <div className="flex flex-col px-5 py-6 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-[3px] border-solid text-secondary">
              <UserRound size={34} />
            </div>
            <h2 className="font-bold">Olá, faça seu login!</h2>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        {status === "unauthenticated" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="w-full justify-start rounded-lg"
              >
                <LogInIcon className="mr-2" size={18} />
                Fazer Login
              </Button>
            </DialogTrigger>
            <DialogLogin />
          </Dialog>
        )}

        <Button variant="outline" className="justify-start rounded-lg" asChild>
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {status === "authenticated" && (
          <Button
            variant="outline"
            className="justify-start rounded-lg"
            asChild
          >
            <Link href="/agendamentos">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default SideMenu;
