import { useSession } from "@/hooks/useSession";
import { criarContaSchema } from "@/validators/criar-conta";
import { loginSchema } from "@/validators/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type UsuarioRequest = z.infer<typeof loginSchema>;

const DialogLogin = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const formLogin = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const formCriarConta = useForm({
    resolver: zodResolver(criarContaSchema),
    defaultValues: {
      nomeCompleto: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const { login } = useSession();
  const { isSubmitting } = useFormState(formLogin);

  const handleSubmit = async (data: UsuarioRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await login(data);
  };

  const variants = {
    enter: (isLogin: boolean) => ({
      x: !isLogin ? 250 : -250,
    }),
    center: {
      x: 0,
      transition: { type: "tween" },
    },
    exit: (isLogin: boolean) => ({
      x: !isLogin ? -250 : 250,
      transition: { type: "tween" },
    }),
  };
  return (
    <DialogContent className="rounded-2xl w-min overflow-hidden">
      <DialogHeader>
        <AnimatePresence mode="wait" initial={false} custom={isLogin}>
          <motion.div
            key={isLogin ? "login" : "criar-conta"}
            custom={isLogin}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {isLogin ? (
              <motion.div
                key="login"
                custom={isLogin}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <DialogTitle className="text-center font-bold">
                  Faça login na plataforma
                </DialogTitle>
                <DialogDescription className="text-center text-gray-400">
                  Conecte-se usando o seu e-mail e a sua senha.
                </DialogDescription>
              </motion.div>
            ) : (
              <>
                <DialogTitle className="text-center font-bold">
                  Crie a sua conta em nossa plataforma
                </DialogTitle>
                <DialogDescription className="text-center text-gray-400">
                  Faça o seu cadastro e comece a usar a nossa plataforma.
                </DialogDescription>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogHeader>

      <AnimatePresence mode="wait" initial={false} custom={isLogin}>
        <motion.div
          key={isLogin ? "login" : "criar-conta"}
          custom={isLogin}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          <DialogFooter>
            {isLogin ? (
              <motion.div
                key="login"
                custom={isLogin}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Form {...formLogin}>
                  <form onSubmit={formLogin.handleSubmit(handleSubmit)}>
                    <div className="space-y-2">
                      <FormField
                        name="email"
                        control={formLogin.control}
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
                        control={formLogin.control}
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
                          onClick={() => setIsLogin(false)}
                        >
                          Clique aqui.
                        </span>
                      </p>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting && (
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        )}
                        {isSubmitting ? "Carregando..." : "Login"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="criar-conta"
                custom={isLogin}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Form {...formCriarConta}>
                  <form onSubmit={formCriarConta.handleSubmit(handleSubmit)}>
                    <div className="space-y-2">
                      <FormField
                        name="nomeCompleto"
                        control={formCriarConta.control}
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
                        control={formCriarConta.control}
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
                        control={formCriarConta.control}
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
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        name="confirmarSenha"
                        control={formCriarConta.control}
                        render={({ field, fieldState: { error } }) => {
                          return (
                            <FormItem>
                              <FormLabel>Confirmar senha</FormLabel>
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
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>

                    <div className="space-x-2 mt-4 flex">
                      <Button
                        className="w-full"
                        variant="secondary"
                        disabled={isSubmitting}
                        onClick={() => setIsLogin(true)}
                      >
                        <ArrowLeft className="mr-2 w-4" />
                        Voltar
                      </Button>

                      <Button
                        // type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting && (
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        )}
                        {isSubmitting ? "Carregando..." : "Criar conta"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
          </DialogFooter>
        </motion.div>
      </AnimatePresence>
    </DialogContent>
  );
};

export default DialogLogin;
