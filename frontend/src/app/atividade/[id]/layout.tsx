import Header from "@/components/header/header";

export default function AtividadeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden lg:block">
        <Header />
      </div>
      {children}
    </>
  );
}
