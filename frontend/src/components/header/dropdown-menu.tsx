"use client";

import { useSession } from "@/hooks/useSession";
import {
  Calendar,
  Github,
  LogInIcon,
  LogOut,
  Mail,
  MessageCircle,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu as D,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AlertLogout from "./alert-logout";
import DialogContent from "./dialog";

const DropdownMenu = () => {
  const { data: usuario, status } = useSession();

  return (
    <div className="flex space-x-4">
      {status === "authenticated" ? (
        <>
          <Button asChild variant="ghost">
            <Link href="/agendamentos">
              <Calendar size={20} />
              <p className="ml-2">Agendamentos</p>
            </Link>
          </Button>

          <D>
            <DropdownMenuTrigger className="flex items-center space-x-2 outline-none">
              <Avatar>
                <AvatarImage src={usuario?.imagem ?? ""} />
                <AvatarFallback>{usuario?.nome[0]}</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">{usuario?.nome}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Agendamentos</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>
                  <Github className="mr-2 h-4 w-4" />
                  <span>GitHub</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup asChild>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Convidar usuários</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem disabled>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>WhatsApp</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup asChild>
                <DropdownMenuItem asChild>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="flex items-center select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-secondary">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </div>
                    </AlertDialogTrigger>
                    <AlertLogout />
                  </AlertDialog>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </D>
        </>
      ) : (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
              >
                <LogInIcon className="mr-2" size={18} />
                Login
              </Button>
            </DialogTrigger>
            <DialogContent />
          </Dialog>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;
