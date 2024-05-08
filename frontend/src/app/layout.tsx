import Footer from "@/components/footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SysClub",
  description:
    "SysClub é o seu assistente digital definitivo para agendar e organizar atividades esportivas. Com uma interface amigável e recursos robustos, facilitamos a conexão de entusiastas do esporte, permitindo a reserva de espaços, a participação em eventos locais e a organização de jogos com amigos. Seja para encontrar um parceiro de tênis, marcar uma partida de futebol ou explorar novas atividades esportivas na sua área, o SysClub é a plataforma perfeita para manter-se ativo e engajado na comunidade esportiva. Junte-se a nós para simplificar como você planeja, participa e desfruta de esportes!",
  icons: [
    {
      rel: "icon",
      href: "/logo.png",
      url: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} dark flex flex-col min-h-screen`}>
        <div className="flex-grow">
          <Providers>{children}</Providers>
        </div>
        <Footer />
      </body>
    </html>
  );
}
