"use client";

import { Loader2, LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useSession } from "@/hooks/useSession";
import { Input } from "./ui/input";
import { NextResponse } from "next/server";

type UsuarioRequest = {
  email: string;
  senha: string;
};

const DialogLogin = () => {
  const { login } = useSession();
  const router = useRouter();

  const [usuario, setUsuario] = useState<UsuarioRequest>({
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoginClique = async () => {
    setLoading(true);

    try {
      const response = (await login(
        "nathan.1402@hotmail.com",
        "Nathansupergato14"
      )) as NextResponse;

      console.log(response.status);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="rounded-2xl w-min pt-8">
      <DialogHeader>
        <DialogTitle className="text-center font-bold">
          Faça login na plataforma
        </DialogTitle>
        <DialogDescription className="text-center text-gray-400">
          Conecte-se usando a sua matrícula e os 4 primeiros digitos do CPF.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="flex flex-col mt-2 gap-3">
        <div className="flex gap-3">
          <Input
            className="w-[134px]"
            type="text"
            placeholder="E-mail"
            value={usuario?.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />
          <Input
            className="w-[134px]"
            type="password"
            maxLength={50}
            placeholder="Senha"
            value={usuario?.senha}
            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
          />
        </div>

        <Button
          className="w-full"
          onClick={handleLoginClique}
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
          {loading ? "Carregando..." : "Login"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DialogLogin;
