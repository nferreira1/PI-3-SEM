import { useSession } from "@/hooks/useSession";
import { loginSchema } from "@/validators/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
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

type LoginRequest = z.infer<typeof loginSchema>;

const FormLogin = ({
  email,
  setIsLogin,
}: {
  email: string;
  setIsLogin: ({ isLogin, email }: { isLogin: boolean; email: string }) => void;
}) => {
  const [tipoSenha, setTipoSenha] = useState<"text" | "password">("password");

  const { login, status } = useSession();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const { isSubmitting } = useFormState(form);

  const handleSubmit = async (data: LoginRequest) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    await login(data);

    if (status === "unauthenticated") {
      form.setError("email", {
        message: "E-mail ou senha inválidos.",
      });
      form.setError("senha", {
        message: "E-mail ou senha inválidos.",
      });
    }
  };

  const handleAlterarTipoSenha = () =>
    setTipoSenha(tipoSenha === "password" ? "text" : "password");

  useEffect(() => {
    form.setValue("email", email.toLowerCase());
  }, [email, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2">
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
                        type={tipoSenha}
                        placeholder="********"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute"
                        onClick={handleAlterarTipoSenha}
                      >
                        {tipoSenha === "password" ? (
                          <Eye className="text-white" />
                        ) : (
                          <EyeOff className="text-white" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="space-y-2 mt-4">
          <p className="text-xs">
            Não tem uma conta?
            <span
              className="text-xs italic underline cursor-pointer"
              onClick={() => setIsLogin({ isLogin: false, email: "" })}
            >
              Clique aqui.
            </span>
          </p>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
            {isSubmitting ? "Carregando..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormLogin;
