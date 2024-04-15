import { gerarSenha } from "@/utils/gerar-senha";
import { criarContaSchema } from "@/validators/criar-conta";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Dices, Loader2 } from "lucide-react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type CriarContaRequest = z.infer<typeof criarContaSchema>;

const FormCriarConta = ({
  setIsLogin,
}: {
  setIsLogin: (isLogin: boolean) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(criarContaSchema),
    defaultValues: {
      nomeCompleto: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const { isSubmitting } = useFormState(form);

  const handleSortearSenha = () => {
    const numeroAleatorio = Math.random() * 20;
    const comprimentoAleatorio = numeroAleatorio < 8 ? 8 : numeroAleatorio;
    const senhaAleatoria = gerarSenha(comprimentoAleatorio);
    form.setValue("senha", senhaAleatoria);
    form.setValue("confirmarSenha", senhaAleatoria);
  };

  const handleSubmit = async (data: CriarContaRequest) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2">
          <FormField
            name="nomeCompleto"
            control={form.control}
            render={({ field, fieldState: { error } }) => {
              return (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input
                      className={`w-[268px] ${
                        error && "focus-visible:ring-destructive"
                      }`}
                      type="text"
                      placeholder="Nathan Ferreira"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

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
                  <FormMessage />
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
                    <div className="flex items-center justify-end">
                      <Input
                        className={`w-[268px] ${
                          error && "focus-visible:ring-destructive"
                        }`}
                        type="text"
                        placeholder="********"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute"
                        onClick={handleSortearSenha}
                      >
                        <Dices className="text-white" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name="confirmarSenha"
            control={form.control}
            render={({ field, fieldState: { error } }) => {
              return (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      className={`w-[268px] ${
                        error && "focus-visible:ring-destructive"
                      }`}
                      type="text"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="space-x-2 mt-4 flex">
          <Button
            type="button"
            className="w-full"
            variant="secondary"
            disabled={isSubmitting}
            onClick={() => setIsLogin(true)}
          >
            <ArrowLeft className="mr-2 w-4" />
            Voltar
          </Button>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
            {isSubmitting ? "Carregando..." : "Criar conta"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormCriarConta;
