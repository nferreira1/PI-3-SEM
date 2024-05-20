import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Github,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  link: string;
  Icon: LucideIcon;
  titulo: string;
  texto: string;
  target: boolean;
}

const ItemNotFound = ({ link, Icon, titulo, texto, target }: Props) => {
  return (
    <Link
      href={link}
      className="relative items-center flex py-3 sm:py-6"
      target={target ? "_blank" : ""}
    >
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-background min-w-10 min-h-10"
      >
        <Icon size={18} />
      </Button>

      <div className="px-5">
        <h4 className="text-sm font-semibold sm:text-base">{titulo}</h4>
        <h6 className="text-xs text-muted-foreground sm:text-sm ">{texto}</h6>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 min-w-10 min-h-10 hover:bg-background"
      >
        <ChevronRight size={24} />
      </Button>
    </Link>
  );
};

export default function NotFound() {
  const items = [
    {
      link: "/agendamentos",
      Icon: Calendar,
      titulo: "Agendamentos",
      texto: "Visualize e gerencie seus agendamentos.",
      target: false,
    },
    {
      link: "https://github.com/nferreira1/PI-3-SEM",
      Icon: Github,
      titulo: "GitHub",
      texto: "Visualize o código fonte do projeto.",
      target: true,
    },
  ];

  return (
    <div className="h-screen max-w-screen-sm mx-auto">
      <div className="h-full flex flex-col items-center">
        <div className="mt-8 h-1/6">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </div>

        <div className="h-5/6">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-sm text-primary font-bold">404</h1>
            <div className="space-y-2 text-center px-5">
              <h2 className="text-2xl font-bold sm:text-5xl">
                Esta página não existe!
              </h2>
              <h6 className="text-xs text-muted-foreground sm:text-lg">
                Desculpe, mas não conseguimos encontrar a página que procura.
              </h6>
            </div>
          </div>

          <div className="flex flex-col p-5 mt-8 sm:mt-16">
            {items.map((item, index) => (
              <>
                <ItemNotFound key={index} {...item} />
                <Separator />
              </>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="link" asChild>
              <Link href="/">
                <ArrowLeft size={18} />
                <h6 className="ml-1">Voltar para página inicial</h6>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
