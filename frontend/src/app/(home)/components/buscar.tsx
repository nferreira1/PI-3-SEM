"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { buscarAtividadeSchema } from "@/validators/buscar-atividade";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type buscarAtividadeRequest = z.infer<typeof buscarAtividadeSchema>;

const Buscar = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(buscarAtividadeSchema),
    defaultValues: {
      nomeAtividade: "",
    },
  });

  const handleSubmit = async (data: buscarAtividadeRequest) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-center gap-2"
      >
        <FormField
          name="nomeAtividade"
          control={form.control}
          render={({ field }) => {
            return (
              <Input
                placeholder="Buscar por uma atividade"
                disabled
                {...field}
              />
            );
          }}
        />

        <Button
          type="submit"
          className="w-12"
          variant="default"
          size="icon"
          disabled
        >
          <SearchIcon size={20} />
        </Button>
      </form>
    </Form>
  );
};

export default Buscar;
