import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Props {
  espaco: Espaco;
}

const AtividadeItem = ({ espaco }: Props) => {
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
            <h2 className="font-bold">{espaco?.nome}</h2>
            <p className="text-sm text-gray-400">
              Agende o seu horário para jogar!
            </p>

            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-primary font-bold"></p>
              <Button variant="secondary">Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AtividadeItem;
