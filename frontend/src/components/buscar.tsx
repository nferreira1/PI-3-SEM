"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/useSession";
import { SearchIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const Buscar = () => {
  const { status } = useSession();

  const className = "flex items-center gap-2";

  if (status === "loading") {
    return (
      <div className={className}>
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-12 h-10" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Input placeholder="Buscar por uma atividade" />
      <Button className="w-12" variant="default" size="icon">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default Buscar;
