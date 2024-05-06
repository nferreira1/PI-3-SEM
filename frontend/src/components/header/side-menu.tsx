"use client";

import { useSession } from "@/hooks/useSession";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import AlertLogout from "./alert-logout";
import DialogContent from "./dialog";

const SideMenu = () => {
  const { data, status } = useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="flex lg:hidden">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0">
        <SheetHeader>
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
              <DialogContent />
            </Dialog>
          )}

          <Button
            variant="outline"
            className="justify-start rounded-lg"
            asChild
          >
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
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
