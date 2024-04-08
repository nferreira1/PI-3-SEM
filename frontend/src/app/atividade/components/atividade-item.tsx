"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import MotionDivDefault from "./motion-div-default";
import { getHorarios } from "@/utils/get-horarios";
import { getClientToken } from "@/utils/get-client-token";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

interface Props {
  atividade: Atividade;
  espaco: Espaco;
}

const AtividadeItem = ({ atividade, espaco }: Props) => {
  const { data: usuario } = useSession();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<Date | undefined>(undefined);
  const [horarios, setHorarios] = useState<Horario[] | null>([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState<
    Horario | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetHorarios = async (atividadeId: UUID, dataAgendamento: Date) =>
    setHorarios(await getHorarios(atividadeId, dataAgendamento));

  const handleDataClique = (data: Date | undefined) => {
    setData(data);
    setHorarioSelecionado(undefined);
    handleGetHorarios(
      atividade.id,
      new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .format(data)
        .split("/")
        .reverse()
        .join("-") as any as Date
    );
  };

  const handleHorarioClique = (horario: Horario) =>
    setHorarioSelecionado(horario);

  const handleRealizarAgendamento = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/agendamento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dataAgendamento: Intl.DateTimeFormat("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
            .format(data)
            .split("/")
            .reverse()
            .join("-") as any as Date,
          idUsuario: +usuario!.id,
          horarioId: horarioSelecionado?.id,
          espacoId: espaco.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar agendamento");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setData(undefined);
      setHorarioSelecionado(undefined);
    }
  };

  useEffect(() => {
    (async () => {
      setToken(await getClientToken());
    })();
  }, []);

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center gap-4">
          <div className="relative min-h-[110px] min-w-[110px]">
            <Image
              src={espaco?.imagem ?? ""}
              alt={`imagem de ${espaco?.nome}`}
              className="rounded-lg object-contain brightness-50"
              fill
            />
          </div>

          <div className="w-full flex flex-col">
            <h2 className="font-bold">{espaco.nome}</h2>
            <p className="text-sm text-gray-400">
              Agende o seu horário para jogar!
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-primary font-bold"></p>
              <Sheet onOpenChange={onOpenChange}>
                <SheetTrigger asChild>
                  <Button variant="secondary">Agendar</Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left p-5 border-b border-solid border-t">
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <Calendar
                    mode="single"
                    selected={data}
                    onSelect={(data: Date | undefined) =>
                      handleDataClique(data)
                    }
                    className="mt-6"
                  />

                  {data && (
                    <MotionDivDefault className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5 py-6 border-y border-solid border-secondary">
                      {horarios?.map((horario) => (
                        <Button
                          key={horario.horarioInicial}
                          variant={
                            horario === horarioSelecionado
                              ? "default"
                              : "secondary"
                          }
                          className="rounded-full"
                          onClick={() => handleHorarioClique(horario)}
                        >
                          {horario.horarioInicial}
                        </Button>
                      ))}
                    </MotionDivDefault>
                  )}

                  <MotionDivDefault
                    className={`px-5 py-6 border-solid border-secondary ${
                      !data && "border-t"
                    }`}
                  >
                    <Card>
                      <CardContent className="flex flex-col gap-3 p-3">
                        <MotionDivDefault className="flex justify-between">
                          <h2>{atividade.nome}</h2>
                          <h3 className="font-bold text-sm">{}</h3>
                        </MotionDivDefault>

                        {data && (
                          <MotionDivDefault className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Data</h3>
                            <h4 className="text-sm">
                              {data.toLocaleDateString("pt-BR", {
                                day: "numeric",
                              })}
                              <span> de </span>
                              {data.toLocaleDateString("pt-BR", {
                                month: "long",
                              })}
                            </h4>
                          </MotionDivDefault>
                        )}

                        {horarioSelecionado && (
                          <MotionDivDefault className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Horário</h3>
                            <h4 className="text-sm">
                              {horarioSelecionado.horarioInicial}
                              <span> - </span>
                              {horarioSelecionado.horarioFinal}
                            </h4>
                          </MotionDivDefault>
                        )}

                        <MotionDivDefault className="flex justify-between">
                          <h3 className="text-gray-400 text-sm">Local</h3>
                          <h4 className="text-sm">{espaco.nome}</h4>
                        </MotionDivDefault>
                      </CardContent>
                    </Card>
                  </MotionDivDefault>

                  <MotionDivDefault>
                    <SheetFooter className="px-5">
                      <Button
                        onClick={handleRealizarAgendamento}
                        disabled={!data || !horarioSelecionado}
                      >
                        {loading && (
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        )}
                        {loading ? "Confirmando..." : "Confirmar"}
                      </Button>
                    </SheetFooter>
                  </MotionDivDefault>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AtividadeItem;
