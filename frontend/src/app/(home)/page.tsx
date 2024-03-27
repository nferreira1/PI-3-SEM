import Buscar from "@/components/buscar";
import Header from "@/components/header";

export default function Home() {
  const now = new Date();
  const month =
    now.toLocaleDateString("pt-BR", { month: "long" }).charAt(0).toUpperCase() +
    now.toLocaleDateString("pt-BR", { month: "long" }).slice(1);
  const weekdayString = now.toLocaleDateString("pt-BR", { weekday: "long" });
  const weekdayNumber = now.toLocaleDateString("pt-BR", { day: "numeric" });
  const dayString =
    weekdayString.charAt(0).toUpperCase() +
    weekdayString.slice(1).split("-")[0];
  const fullDay = `${dayString}, ${weekdayNumber} de ${month}`;

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Nathan!</h2>
        <p className="text-sm">{fullDay}</p>
      </div>

      <div className="px-5 mt-6">
        <Buscar />
      </div>
    </div>
  );
}
