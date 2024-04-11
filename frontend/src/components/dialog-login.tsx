import { Loader2 } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useSession } from "@/hooks/useSession";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";

type UsuarioRequest = z.infer<typeof formSchema>;

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "E-mail inválido!",
    })
    .min(3)
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/),
  senha: z.string().min(3, {
    message: "Senha inválida!",
  }),
});

const DialogLogin = () => {
  const [estadoForm, setEstadoForm] = useState<number>(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const { login } = useSession();
  const { isSubmitting } = useFormState(form);

  const handleSubmit = async (data: UsuarioRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 20000));
    await login(data);
  };

  return (
    <DialogContent className="rounded-2xl w-min pt-8">
      <DialogHeader>
        <DialogTitle className="text-center font-bold">
          Faça login na plataforma
        </DialogTitle>
        <DialogDescription className="text-center text-gray-400">
          Conecte-se usando o seu e-mail e a sua senha.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <motion.div className="space-y-2">
              <FormField
                name="email"
                control={form.control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          className={`w-[268px] ${
                            error && "focus-visible:ring-destructive"
                          }`}
                          type="text"
                          placeholder="example@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{error?.message}</FormMessage>
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="senha"
                control={form.control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          className={`w-[268px] ${
                            error && "focus-visible:ring-destructive"
                          }`}
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{error?.message}</FormMessage>
                    </FormItem>
                  );
                }}
              />
            </motion.div>

            <motion.div></motion.div>

            <div className="space-y-2 mt-4">
              <p className="text-xs">
                Não tem uma conta?{" "}
                <span className="text-xs italic underline cursor-pointer">
                  Clique aqui.
                </span>
              </p>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                )}
                {isSubmitting ? "Carregando..." : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogFooter>
    </DialogContent>
  );
};

export default DialogLogin;
