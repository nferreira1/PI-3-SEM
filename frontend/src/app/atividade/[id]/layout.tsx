import Footer from "@/components/footer";
import Header from "@/components/header/header";

export default function Layout({
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
      <Footer />
    </>
  );
}
