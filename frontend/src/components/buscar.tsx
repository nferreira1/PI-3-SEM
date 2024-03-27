"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const Buscar = () => {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Buscar..." />
      <Button className="w-12" variant="default" size="icon">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default Buscar;
