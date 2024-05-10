import { Star } from "lucide-react";

export const AvaliacoesDesktop = ({
  avaliacao,
}: {
  avaliacao: AvaliacaoAtividade | null;
}) => {
  return (
    avaliacao &&
    avaliacao?.quantidade !== 0 && (
      <div className="absolute top-0 right-0 w-32 h-20 bg-card rounded-lg hidden lg:flex justify-center">
        <div className="flex flex-col justify-center gap-1">
          <span className="flex justify-center items-center text-2xl">
            <Star className="text-primary fill-primary mr-1" size={28} />
            {Intl.NumberFormat("pt-BR", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }).format(avaliacao?.media ?? 0)}
          </span>
          <span className="text-xs text-center">
            {avaliacao?.quantidade}
            {avaliacao?.quantidade && avaliacao?.quantidade > 1
              ? " avaliações"
              : " avaliação"}
          </span>
        </div>
      </div>
    )
  );
};

export const AvaliacoesMobile = ({
  avaliacao,
}: {
  avaliacao: AvaliacaoAtividade | null;
}) => {
  return (
    <div className="flex items-center gap-x-1 lg:hidden">
      {avaliacao && avaliacao?.quantidade !== 0 && (
        <>
          <Star className="text-primary fill-primary" size={18} />
          <p className="text-sm">
            {Intl.NumberFormat("pt-BR", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }).format(avaliacao?.media ?? 0)}{" "}
            ({avaliacao?.quantidade}
            {avaliacao?.quantidade && avaliacao?.quantidade > 1
              ? " avaliações"
              : " avaliação"}
            )
          </p>
        </>
      )}
    </div>
  );
};
