import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const ItemReserva = () => {
  return (
    <Card>
      <CardContent className="p-5 py-0 flex justify-between">
        <div className="flex flex-col gap-2 py-5">
          <Badge className="w-fit bg-[#221C3D] text-primary hover:bg-[#221C3D]">
            Confirmado
          </Badge>
          <h2 className="font-bold">Tênis</h2>
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="" />
              <AvatarFallback className="text-[8px]">N</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">Nathan Ferreira</h3>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-3 border-solid border-l border-secondary">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">08</p>
          <p className="text-sm">09:00</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemReserva;
