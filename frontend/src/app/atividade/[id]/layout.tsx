import Footer from "@/components/footer";
import Header from "@/components/header/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
