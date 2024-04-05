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
import Image from "next/image";
import { useState } from "react";

interface Props {
  atividade: Atividade;
  espaco: Espaco;
}

const AtividadeItem = ({ atividade, espaco }: Props) => {
  const [data, setData] = useState<Date | undefined>(undefined);
  const [horarioSelecionado, setHorarioSelecionado] = useState<
    Horario | undefined
  >(undefined);

  const atividadeFormatada = {
    id: atividade.id,
    imagem: atividade.imagem,
    local: atividade.local,
    nome: atividade.nome,
    telefone: atividade.telefone,
    espaco,
  };

  const handleDataClique = (data: Date | undefined) => {
    setData(data);
    setHorarioSelecionado(undefined);
  };

  const handleHorarioClique = (horario: Horario) =>
    setHorarioSelecionado(horario);

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
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary">Reservar</Button>
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
                    <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5 py-6 border-y border-solid border-secondary">
                      {atividadeFormatada.espaco.horarios.map((horario) => (
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
                    </div>
                  )}

                  <div
                    className={`px-5 py-6 border-solid border-secondary ${
                      !data && "border-t"
                    }`}
                  >
                    <Card>
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="flex justify-between">
                          <h2>{atividade.nome}</h2>
                          <h3 className="font-bold text-sm">{}</h3>
                        </div>

                        {data && (
                          <div className="flex justify-between">
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
                          </div>
                        )}

                        {horarioSelecionado && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Horário</h3>
                            <h4 className="text-sm">
                              {horarioSelecionado.horarioInicial}
                            </h4>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-gray-400 text-sm">Local</h3>
                          <h4 className="text-sm">{espaco.nome}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5">
                    <Button disabled={!data || !horarioSelecionado}>
                      Confirmar reserva
                    </Button>
                  </SheetFooter>
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
