"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "@/hooks/useSession";
import { getClientToken } from "@/utils/get-client-token";
import getConfiguracoes from "@/utils/get-configuracoes";
import { getHorarios } from "@/utils/get-horarios";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DialogConfirmarReserva from "./dialog-confirmar-reserva";
import Horarios from "./horarios";
import MotionDivDefault from "./motion-div-default";

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
  const [abertoModal, setAbertoModal] = useState<boolean>(false);
  const [abertoSheet, setAbertoSheet] = useState<boolean>(false);
  const [intervalo, setIntervalo] = useState<number>(0);

  const hoje = new Date();
  const semana = new Date(hoje);
  semana.setDate(hoje.getDate() + intervalo - 1);
  const diasDesabilitados = [{ before: hoje }, { after: semana }];

  const handleGetHorarios = async (
    atividadeId: UUID,
    dataAgendamento: Date,
    espacoId: number
  ) => setHorarios(await getHorarios(atividadeId, dataAgendamento, espacoId));

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
        .join("-") as any as Date,
      espaco.id
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

      if (response.ok) {
        onOpenChange(false);
        setAbertoModal(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        router.refresh();
      }, 1000);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setData(undefined);
      setHorarioSelecionado(undefined);
      setAbertoSheet(false);
      return;
    }
    setAbertoSheet(open);
  };

  useEffect(() => {
    (async () => {
      setToken(await getClientToken());
      const configuracoes = await getConfiguracoes();
      if (configuracoes) {
        const intervalo = configuracoes.find(
          (configuracao) => configuracao.nome === "INTERVALO_AGENDAMENTO"
        );

        if (intervalo) {
          setIntervalo(+intervalo.valor);
        }
      }
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
              className="rounded-lg object-cover brightness-50"
              fill
            />
          </div>

          <div className="w-full flex flex-col">
            <h2 className="font-bold">{espaco.nome}</h2>
            <p className="text-sm text-muted-foreground">
              Agende o seu horário para jogar!
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-primary font-bold"></p>
              <Sheet open={abertoSheet} onOpenChange={onOpenChange}>
                <SheetTrigger asChild>
                  <Button variant="secondary">Agendar</Button>
                </SheetTrigger>

                <SheetContent className="p-0 flex flex-col justify-between">
                  <div>
                    <SheetHeader>
                      <SheetTitle>Fazer reserva</SheetTitle>
                    </SheetHeader>

                    <Calendar
                      mode="single"
                      fromDate={hoje}
                      toDate={semana}
                      disabled={diasDesabilitados}
                      selected={data}
                      onSelect={(data: Date | undefined) =>
                        handleDataClique(data)
                      }
                    />

                    <div
                      className={`${
                        data && "border-y"
                      } border-solid border-secondary`}
                    >
                      <AnimatePresence mode="wait">
                        {data && (
                          <motion.div
                            key={data.toString()}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="px-5 py-6"
                          >
                            <Horarios
                              horarios={horarios}
                              horarioSelecionado={horarioSelecionado}
                              setHorarioSelecionado={handleHorarioClique}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

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
                              <h3 className="text-muted-foreground text-sm">
                                Data
                              </h3>
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
                              <h3 className="text-muted-foreground text-sm">
                                Horário
                              </h3>
                              <h4 className="text-sm">
                                {horarioSelecionado.horarioInicial}
                                <span> - </span>
                                {horarioSelecionado.horarioFinal}
                              </h4>
                            </MotionDivDefault>
                          )}

                          <MotionDivDefault className="flex justify-between">
                            <h3 className="text-muted-foreground text-sm">
                              Local
                            </h3>
                            <h4 className="text-sm">{espaco.nome}</h4>
                          </MotionDivDefault>
                        </CardContent>
                      </Card>
                    </MotionDivDefault>
                  </div>

                  <SheetFooter className="p-5">
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
                </SheetContent>
              </Sheet>
              <DialogConfirmarReserva
                aberto={abertoModal}
                onAbertoChange={setAbertoModal}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AtividadeItem;
